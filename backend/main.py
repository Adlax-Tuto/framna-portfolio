from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.project import create_db
from routes.project import router as project_router

app = FastAPI(title="Portfolio API - PostgreSQL Local")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(project_router)

@app.on_event("startup")
async def startup():
    await create_db()

@app.get("/")
def read_root():
    return {
        "message": "Portfolio API + PostgresSQL local is ok!"
    }