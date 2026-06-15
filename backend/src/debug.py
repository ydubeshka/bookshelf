from fastapi import APIRouter

router = APIRouter()

@router.get("/debug/cors")
async def cors_debug():
    return {"message": "CORS is configured"}
