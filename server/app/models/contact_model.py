from pydantic import BaseModel

class ContactModel(BaseModel):
    name: str
    email: str
    subject: str
    message: str