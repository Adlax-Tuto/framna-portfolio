from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, JSON
from sqlalchemy.sql import func 
from database import engine 
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String, nullable=True)
    project_url = Column(String, nullable=True)
    tags = Column(JSON, nullable=True)
    featured = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

async def create_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)