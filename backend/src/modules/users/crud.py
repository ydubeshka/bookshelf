from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.modules.users.model import User
from src.modules.users.schema import UserCreate
from src.core.security import get_password_hash


async def get_user_by_email(session: AsyncSession, email: str) -> User | None:
    stmt = select(User).where(User.email == email)
    result = await session.execute(stmt)

    return result.scalar_one_or_none()


async def create_user(session: AsyncSession, user_in: UserCreate) -> User:
    hashed_pwd = get_password_hash(user_in.password)
    db_user = User(email=user_in.email, hashed_password=hashed_pwd)

    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)

    return db_user


async def get_user_by_id(session: AsyncSession, user_id: int) -> User | None:
    stmt = select(User).where(User.id == user_id)
    result = await session.execute(stmt)

    return result.scalar_one_or_none()
