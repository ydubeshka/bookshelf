from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.modules.authors.model import Author
from src.modules.authors.schema import AuthorCreate


async def get_all_authors(session: AsyncSession) -> list[Author]:
    stmt = select(Author)
    result = await session.execute(stmt)

    return list(result.scalars().all())


async def create_author(session: AsyncSession, author_in: AuthorCreate) -> Author:
    db_author = Author(
        first_name=author_in.first_name,
        last_name=author_in.last_name,
        bio=author_in.bio,
    )

    session.add(db_author)
    await session.commit()
    await session.refresh(db_author)

    return db_author


async def get_author_by_id(session: AsyncSession, author_id: int) -> Author | None:
    stmt = select(Author).where(Author.id == author_id)
    result = await session.execute(stmt)

    return result.scalar_one_or_none()
