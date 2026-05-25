from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.database.database import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from src.modules.books.model import Book


class Author(Base):
    __tablename__ = "authors"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    bio: Mapped[str | None] = mapped_column(String, nullable=True)

    books: Mapped[list["Book"]] = relationship(
        secondary="book_authors",
        back_populates="authors"
    )
