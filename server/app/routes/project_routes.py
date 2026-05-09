from fastapi import APIRouter

from app.services.project_service import (
    get_projects,
)

router = APIRouter()

@router.get("/projects")
def fetch_projects():

    projects = get_projects()

    return projects