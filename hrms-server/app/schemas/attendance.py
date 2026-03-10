from pydantic import BaseModel
from datetime import date as dateType
from typing import List, Optional


class AttendanceCreate(BaseModel):
    employee_id: int
    date: dateType
    isCheckedInNow: bool = False


class AttendanceUpdate(BaseModel):
    status: Optional[str] = None


class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    date: dateType
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    status: str

    class Config:
        from_attributes = True


class AttendancePaginatedResponse(BaseModel):
    total: int
    skip: int
    limit: int
    data: List[AttendanceResponse]