from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.database import get_db
from src.modules.books.schema import BookCreate, BookResponse
from src.modules.books import crud
from src.modules.users.router import get_current_user
from src.modules.users.model import User

router = APIRouter(prefix="/books", tags=["Books"])


@router.get("/", response_model=list[BookResponse])
async def all_books(session: AsyncSession = Depends(get_db)):
    books = await crud.get_all_books(session)

    return books


@router.post('/', response_model=BookResponse, status_code=status.HTTP_201_CREATED)
async def create_new_book(
        book_in: BookCreate,
        session: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    existing_book = await crud.get_book_by_title(session, title=book_in.title)

    if existing_book:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Book title already exists",
        )

    new_book = await crud.create_book(session, book_in)

    return new_book