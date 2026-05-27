from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.modules.bookshelf.model import UserBook
from src.modules.bookshelf.schema import UserBookCreate, UserBookUpdate


async def add_book_to_shelf(session: AsyncSession, shelf_in: UserBookCreate, user_id: int) -> UserBook:
    db_user_book = UserBook(
        user_id=user_id,
        book_id=shelf_in.book_id,
        status=shelf_in.status,
        rating=shelf_in.rating
    )

    session.add(db_user_book)
    await session.commit()
    await session.refresh(db_user_book)

    return db_user_book

async def get_user_shelf(session:AsyncSession, user_id: int) -> list[UserBook]:
    stmt = select(UserBook).where(UserBook.user_id == user_id)
    result = await session.execute(stmt)

    return list(result.scalars().all())

async def update_book_on_shelf(
        session: AsyncSession,
        user_id: int,
        book_id: int,
        update_data: UserBookUpdate
) -> UserBook | None:
    stmt = select(UserBook).where(UserBook.user_id == user_id, UserBook.book_id == book_id)
    result = await session.execute(stmt)

    db_user_book = result.scalar_one_or_none()

    if not db_user_book:
        return None

    if update_data.status is not None:
        db_user_book.status = update_data.status

    if update_data.rating is not None:
        db_user_book.rating = update_data.rating

    await session.commit()
    await session.refresh(db_user_book)

    return db_user_book

async def get_user_book(session: AsyncSession, user_id: int, book_id: int) -> UserBook | None:
    stmt = select(UserBook).where(UserBook.user_id == user_id, UserBook.book_id == book_id)
    result = await session.execute(stmt)

    return result.scalar_one_or_none()

async def delete_book_from_shelf(session: AsyncSession, book_id: int, user_id: int) -> bool:
    stmt = select(UserBook).where(UserBook.user_id == user_id, UserBook.book_id == book_id)
    result = await session.execute(stmt)

    db_user_book = result.scalar_one_or_none()

    if not db_user_book:
        return False

    await session.delete(db_user_book)
    await session.commit()
    return True