from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.modules.books.model import Book
from src.modules.books.schema import BookCreate


async def get_book_by_title(session: AsyncSession, title: str) -> Book | None:
    stmt = select(Book).where(Book.title == title)
    result = await session.execute(stmt)

    return result.scalar_one_or_none()


async def create_book(session: AsyncSession, book: BookCreate) -> Book:
    db_book = Book(
        title=book.title,
        description=book.description,
        genre=book.genre,
        published_year=book.published_year
    )

    session.add(db_book)
    await session.commit()
    await session.refresh(db_book)
    return db_book


async def get_all_books(
        session: AsyncSession,
        skip: int = 0,
        limit: int = 20,
        search_query: str | None = None,
        genre: str | None = None
) -> list[Book]:
    stmt = select(Book)

    if search_query:
        stmt = stmt.where(Book.title.ilike(f"%{search_query}%"))

    if genre:
        stmt = stmt.where(Book.genre.ilike(f"%{genre}%"))

    stmt = stmt.offset(skip).limit(limit)
    result = await session.execute(stmt)

    return list(result.unique().scalars().all())


async def get_book_by_id(session: AsyncSession, book_id: int) -> Book | None:
    stmt = select(Book).where(Book.id == book_id)
    result = await session.execute(stmt)

    return result.scalar_one_or_none()
