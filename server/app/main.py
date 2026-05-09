from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware,
)

from app.routes.contact_routes import (
    router as contact_router,
)

from app.routes.project_routes import (
    router as project_router,
)

app = FastAPI()

# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =====================================================
# ROOT
# =====================================================

@app.get("/")
def home():
    return {
        "message":
        "Saranga Portfolio API Running"
    }

# =====================================================
# ROUTES
# =====================================================

app.include_router(contact_router)

app.include_router(project_router)