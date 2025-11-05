from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime

class ProjectBase(BaseModel):
    title: str = Field(..., max_length=100)
    description: str
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    tags: Optional[List[str]] = None 
    featured: bool = False 

    model_config = ConfigDict(from_attributes=True)

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    tags: Optional[List[str]] = None 
    featured: Optional[bool] = False 

class ProjectInDB(ProjectBase):
    id: int
    created_at: datetime 
    updated_at: Optional[datetime] = None

    # model_config = ConfigDict(from_attributes=True)