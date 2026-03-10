from pydantic import BaseModel , EmailStr
from typing import List

class EmployeeCreate(BaseModel):
        full_name: str
        email: EmailStr
        department_id: int
        employee_id: int

from pydantic import BaseModel, EmailStr
from typing import Optional

class EmployeeUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    department_id: Optional[int] = None
    employee_id: Optional[int] = None

class EmployeeResponse(BaseModel):
        id: int
        employee_id: int
        full_name: str
        email: EmailStr
        department_id: int
        
        class Config:
                from_attributes = True

class EmployeePaginatedResponse(BaseModel):
        total: int
        skip: int
        limit: int
        data: List[EmployeeResponse]
