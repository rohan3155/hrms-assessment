from pydantic import BaseModel
from datetime import date

class AttendanceCreate(BaseModel):
        employee_id: int
        date: date
        check_in: str
        check_out: str

class AttendanceResponse(BaseModel):
        id: int
        employee_id: int
        date: date
        check_in: str
        check_out: str

        class Config:
                from_attributes = True