from fastapi import FastAPI
from src.modules.users.router import router as user_router

app = FastAPI(
    title='Bookshelf API',
    version='1.0',
    description='Backend for personal bookshelf'
)

app.include_router(user_router)

@app.get('/')
async def health_check():
    return {
        "status": "ok",
        "message": "Healthy!"
    }
