from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc, cast, String
from app.database import get_db
from app.models.attendance import Attendance
from app.schemas.attendance import AttendanceCreate, AttendanceUpdate, AttendanceResponse, AttendancePaginatedResponse
from typing import Optional, List
from datetime import datetime, time

router = APIRouter(prefix="/attendances", tags=["attendances"])

@router.get("/", response_model=AttendancePaginatedResponse)
async def read_attendances(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None),
    sort_by: str = Query("id"),
    order: str = Query("asc"),
    db: Session = Depends(get_db)
):
    query = db.query(Attendance)
    
    if search:
        query = query.filter(
            (cast(Attendance.date, String).ilike(f"%{search}%")) |
            (cast(Attendance.check_in, String).ilike(f"%{search}%")) |
            (cast(Attendance.check_out, String).ilike(f"%{search}%")) |
            (Attendance.status.ilike(f"%{search}%")) |
            (cast(Attendance.employee_id, String).ilike(f"%{search}%"))
        )
    
    sort_column = getattr(Attendance, sort_by, Attendance.id)
    if order.lower() == "desc":
        query = query.order_by(desc(sort_column))
    else:
        query = query.order_by(asc(sort_column))
    
    total = query.count()
    attendances = query.offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": attendances
    }

@router.post("/", response_model=AttendanceResponse)
async def create_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    current_time = datetime.now().time()

    existing_attendance = db.query(Attendance).filter(
        Attendance.employee_id == attendance.employee_id,
        Attendance.date == str(attendance.date)
    ).first()

    if existing_attendance:
        raise HTTPException(
            status_code=400,
            detail="Attendance already exists for this employee today"
        )

    if attendance.isCheckedInNow:
        status = "checked-in"
        check_in = current_time
    else:
        status = "absent"
        check_in = None

    db_attendance = Attendance(
        employee_id=attendance.employee_id,
        date=str(attendance.date),
        check_in=check_in,
        check_out=None,
        status=status
    )

    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)

    return db_attendance


@router.get("/{attendance_id}")
async def read_attendance(attendance_id: int, db: Session = Depends(get_db)):
    db_attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if db_attendance is None:
        raise HTTPException(status_code=404, detail="Attendance not found")
    return db_attendance

@router.patch("/{attendance_id}")
async def update_attendance(attendance_id: int, attendance: AttendanceUpdate, db: Session = Depends(get_db)):
    db_attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()

    if not db_attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")

    if attendance.status:
        current_time = datetime.now().time()

        if attendance.status == "checked-in":
            if db_attendance.check_in is not None:
                raise HTTPException(status_code=400, detail="Already checked in")

            db_attendance.check_in = current_time
            db_attendance.status = "checked-in"

        elif attendance.status == "checked-out":
            if db_attendance.check_in is None:
                raise HTTPException(status_code=400, detail="Check-in required first")

            if db_attendance.check_out is not None:
                raise HTTPException(status_code=400, detail="Already checked out")

            db_attendance.check_out = current_time
            db_attendance.status = "checked-out"

    db.commit()
    db.refresh(db_attendance)

    return db_attendance

@router.delete("/{attendance_id}")
async def delete_attendance(attendance_id: int, db: Session = Depends(get_db)):
    db_attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if db_attendance is None:
        raise HTTPException(status_code=404, detail="Attendance not found")
    db.delete(db_attendance)
    db.commit()
    return
