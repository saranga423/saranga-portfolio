from fastapi import APIRouter

from app.models.contact_model import (
    ContactModel,
)

from app.services.contact_service import (
    save_contact,
)

router = APIRouter()

@router.post("/contact")
def create_contact(
    contact: ContactModel
):

    result = save_contact(
        contact.dict()
    )

    return result