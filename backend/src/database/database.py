from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncAttrs
from sqlalchemy.orm import DeclarativeBase
from src.core.config import settings
from collections.abc import AsyncGenerator

engine = create_async_engine(settings.DATABASE_URL, echo=True)

async_sessionmaker = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase, AsyncAttrs):
    pass


async def get_db() -> AsyncGenerator:
    async with async_sessionmaker() as session:
        yield session
