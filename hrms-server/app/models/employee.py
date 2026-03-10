from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Employee(Base):
        __tablename__ = "employees"

        id = Column(Integer, primary_key=True, autoincrement=True, index=True)
        employee_id = Column(Integer, unique=True, index=True)
        email = Column(String , unique=True, index=True)
        full_name = Column(String)
        department_id = Column(Integer, ForeignKey("departments.id"))
        department = relationship("Department", back_populates="employees")
        attendances = relationship("Attendance", back_populates="employee")
