from pydantic import BaseModel
from typing import List, Optional


class DepartmentCreate(BaseModel):
    name: str


class DepartmentUpdate(BaseModel):
    name: Optional[str] = None


class DepartmentResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class DepartmentPaginatedResponse(BaseModel):
    total: int
    skip: int
    limit: int
    data: List[DepartmentResponse]