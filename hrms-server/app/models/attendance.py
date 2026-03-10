from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Attendance(Base):
    __tablename__ = "attendances"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    employee = relationship("Employee", back_populates="attendances")

    date = Column(String)
    check_in = Column(String, nullable=True)
    check_out = Column(String, nullable=True)
    status = Column(String)