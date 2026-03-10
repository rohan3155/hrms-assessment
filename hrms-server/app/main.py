from fastapi import FastAPI
from app.routes import department , employee, attendance
from app.database import Base , engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite Assessment")

app.include_router(department.router)
app.include_router(employee.router)
app.include_router(attendance.router)

app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)

@app.get("/")
def health():
        return {"status": "ok"}
