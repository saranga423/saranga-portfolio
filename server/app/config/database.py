from pymongo import MongoClient

from app.config.settings import (
    MONGO_URL,
    DATABASE_NAME,
)

if not MONGO_URL:
    raise ValueError(
        "MONGO_URL must be set"
    )

if not DATABASE_NAME:
    raise ValueError(
        "DATABASE_NAME must be set"
    )

client = MongoClient(MONGO_URL)

db = client[DATABASE_NAME]