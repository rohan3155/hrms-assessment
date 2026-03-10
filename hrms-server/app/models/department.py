from sqlalchemy import String
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy.orm import Mapped, mapped_column, declarative_base

Base = declarative_base()

class Department(Base):
        __tablename__ = "departments"

        id:   Mapped[int] = mapped_column(primary_key=True)
        name: Mapped[str] = mapped_column(String(50), nullable=False)