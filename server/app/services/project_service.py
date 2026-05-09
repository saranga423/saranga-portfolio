from app.config.database import db

def get_projects():
    collection = db.projects

    projects = list(collection.find({}, {"_id": 0}))

    return projects