from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.database import get_db
from src.modules.books.schema import BookCreate, BookResponse
from src.modules.books import crud
from src.modules.users.router import get_current_user
from src.modules.users.model import User

router = APIRouter(prefix="/books", tags=["Books"])


@router.get("/", response_model=list[BookResponse])
async def read_all_books(
        skip: int = Query(default=0, ge=0, description="Сколько записей пропустить"),
        limit: int = Query(default=20, ge=1, le=100, description="Сколько записей вернуть (макс 100)"),
        search: str | None = Query(default=None, description="Поиск по названию"),
        genre: str | None = Query(default=None, description="Фильтр по жанру"),
        session: AsyncSession = Depends(get_db)
):
    books = await crud.get_all_books(
        session=session,
        skip=skip,
        limit=limit,
        search_query=search,
        genre=genre
    )
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


@router.get("/{book_id}", response_model=BookResponse)
async def read_book(book_id: int, session: AsyncSession = Depends(get_db)):
    book = await crud.get_book_by_id(session, book_id)

    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")

    return book
