from fastapi import FastAPI
from src.modules.users.router import router as user_router
from src.modules.books.router import router as book_router
from src.modules.bookshelf.router import router as bookshelf_router


from src.modules.users.model import User
from src.modules.authors.model import Author
from src.modules.books.model import Book
from src.modules.bookshelf.model import UserBook
app = FastAPI(
    title='Bookshelf API',
    version='1.0',
    description='Backend for personal bookshelf'
)

app.include_router(user_router)
app.include_router(book_router)
app.include_router(bookshelf_router)

@app.get('/')
async def health_check():
    return {
        "status": "ok",
        "message": "Healthy!"
    }
