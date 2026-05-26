from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.modules.books.model import Book
from src.modules.books.schema import BookCreate

async def get_book_by_title(session:AsyncSession, title:str) -> Book | None:
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

async def get_all_books(session: AsyncSession) -> list[Book]:
    stmt = select(Book)
    result = await session.execute(stmt)

    return list(result.scalars().all())