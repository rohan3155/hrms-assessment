from pydantic import BaseModel , EmailStr

class EmployeeCreate(BaseModel):
        name: str
        email: EmailStr
        department_id: int
        employee_id: int

class EmployeeResponse(BaseModel):
        id: int
        employee_id: int
        full_name: str
        email: EmailStr
        department_id: int
        
        class Config:
                from_attributes = True
