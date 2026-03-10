from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.routes import department , employee, attendance
from app.database import Base , engine
from fastapi.middleware.cors import CORSMiddleware
import traceback

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite Assessment")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Print the error for backend logs
    traceback.print_exc()
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred.", "error": str(exc)},
    )

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
