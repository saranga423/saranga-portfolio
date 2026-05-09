from pydantic import BaseModel

class ProjectModel(BaseModel):
    title: str
    description: str
    tech_stack: list[str]
    github: str