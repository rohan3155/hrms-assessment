from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class Attendance(Base):
        __tablename__ = "attendances"
        
        id = Column(Integer, primary_key=True, index=True)
        employee_id = Column(Integer)
        employee = relationship("Employee", back_populates="attendances")
        date = Column(String)
        check_in = Column(String)
        check_out = Column(String)