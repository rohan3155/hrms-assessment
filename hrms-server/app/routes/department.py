from fastapi import APIRouter , Depends , HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from app.database import get_db
from app.models.department import Department
from app.schemas.department import DepartmentCreate , DepartmentUpdate , DepartmentResponse, DepartmentPaginatedResponse
from typing import Optional, List

router = APIRouter(prefix="/departments", tags=["departments"])

@router.get("/departments/", response_model=DepartmentPaginatedResponse)
async def read_departments(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None),
    sort_by: str = Query("id"),
    order: str = Query("asc"),
    db: Session = Depends(get_db)
):
    query = db.query(Department)
    
    if search:
        query = query.filter(Department.name.ilike(f"%{search}%"))
    
    sort_column = getattr(Department, sort_by, Department.id)
    if order.lower() == "desc":
        query = query.order_by(desc(sort_column))
    else:
        query = query.order_by(asc(sort_column))
    
    total = query.count()
    departments = query.offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": departments
    }

@router.post("/departments/", response_model=DepartmentResponse)
async def create_department(department: DepartmentCreate, db: Session = Depends(get_db)):
        db_department = Department(**department.dict())
        db.add(db_department)
        db.commit()
        db.refresh(db_department)
        return db_department

@router.get("/departments/{department_id}")
async def read_department(department_id: int, db: Session = Depends(get_db)):
        db_department = db.query(Department).filter(Department.id == department_id).first()
        if db_department is None:
                raise HTTPException(status_code=404, detail="Department not found")
        return db_department

@router.patch("/departments/{department_id}")
async def update_department(department_id: int, department: DepartmentUpdate, db: Session = Depends(get_db)):
    db_department = db.query(Department).filter(Department.id == department_id).first()

    if db_department is None:
        raise HTTPException(status_code=404, detail="Department not found")

    update_data = department.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_department, key, value)

    db.commit()
    db.refresh(db_department)

    return db_department

@router.delete("/departments/{department_id}")
async def delete_department(department_id: int, db: Session = Depends(get_db)):
        db_department = db.query(Department).filter(Department.id == department_id).first()
        if db_department is None:
                raise HTTPException(status_code=404, detail="Department not found")
        db.delete(db_department)
        db.commit()
        return