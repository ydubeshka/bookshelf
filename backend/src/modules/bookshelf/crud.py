from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.modules.bookshelf.model import UserBook
from src.modules.bookshelf.schema import UserBookCreate


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
