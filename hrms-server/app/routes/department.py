from fastapi import APIRouter , Depends , HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.department import Department
from app.schemas.department import DepartmentCreate , DepartmentResponse

router = APIRouter(prefix="/departments", tags=["departments"])

@router.get("/departments/")
async def read_departments(db: Session = Depends(get_db)):
        departments = db.query(Department).all()
        return departments

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

@router.put("/departments/{department_id}")
async def update_department(department_id: int, department: DepartmentCreate, db: Session = Depends(get_db)):
        db_department = db.query(Department).filter(Department.id == department_id).first()
        if db_department is None:
                raise HTTPException(status_code=404, detail="Department not found")
        db_department.name = department.name
        db.commit()
        return db_department

@router.delete("/departments/{department_id}")
async def delete_department(department_id: int, db: Session = Depends(get_db)):
        db_department = db.query(Department).filter(Department.id == department_id).first()
        if db_department is None:
                raise HTTPException(status_code=404, detail="Department not found")
        db.delete(db_department)
        db.commit()
        return