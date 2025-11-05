from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database import AsyncSessionLocal
from models.project import Project
from schemas.project import ProjectCreate, ProjectUpdate, ProjectInDB
from typing import List 

router = APIRouter(prefix="/projects", tags=["projects"])

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/", response_model=List[ProjectInDB])
async def get_projects(db: AsyncSession = Depends(get_db)):
    results = await db.execute(Project.__table__.select())    
    projects = results.all()

    return projects

@router.post("/", response_model=ProjectInDB, status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectCreate, db: AsyncSession = Depends(get_db)):
    project_db = Project(
        title = project.title,
        description = project.description,
        image_url = project.image_url,
        project_url = project.project_url,
        tags = project.tags,
        featured = project.featured
    )
    db.add(project_db)
    await db.commit()
    await db.refresh(project_db)
    return project_db

@router.put("/{project_id}", response_model=ProjectInDB)
async def update_project(project_id: int, project: ProjectUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.get(Project, project_id)
    if not result:
        raise HTTPException(status_code=404, detail= "Not found")
    update_data = project.model_dump(exclude_unset=True)
    if "tags" in update_data and isinstance(update_data["tags"], str):
        update_data["tags"] = [tag.strip() for tag in project["tags"].split(",") if tag.strip()]
    for key, value in update_data.items():
        setattr(result, key, value)
    await db.commit()
    await db.refresh(result)
    return result

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.get(Project, project_id)
    if not result:
        raise HTTPException(status_code=404, detail="Not found")
    await db.delete(result)
    await db.commit()
    return None
