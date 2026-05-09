from app.config.database import db

def save_contact(data):

    try:
        collection = db.contacts

        result = collection.insert_one(data)

        return {
            "success": True,

            "id":
            str(result.inserted_id),
        }

    except Exception as e:

        print("DATABASE ERROR:")
        print(e)

        return {
            "success": False,

            "error": str(e),
        }