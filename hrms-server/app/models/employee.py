from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class Employee(Base):
        __tablename__ = "employees"

        id = Column(Integer, primary_key=True, index=True)
        employee_id = Column(Integer, primary_key=True, index=True)
        email = Column(String , unique=True, index=True)
        full_name = Column(String)
        department_id = Column(Integer)
        department = relationship("Department", back_populates="employees")
