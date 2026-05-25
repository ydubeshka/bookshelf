from sqlalchemy import String, ForeignKey, Integer, Table, Column
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.database.database import Base

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from src.modules.authors.model import Author
    from src.modules.bookshelf.model import UserBook

book_authors = Table(
    'book_authors',
    Base.metadata,
    Column('book_id', ForeignKey('books.id', ondelete='CASCADE'), primary_key=True),
    Column('author_id', ForeignKey('authors.id', ondelete='CASCADE'), primary_key=True)
)


class Book(Base):
    __tablename__ = 'books'

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255), index=True)
    published_year: Mapped[int | None] = mapped_column(Integer, nullable=True)
    genre: Mapped[str | None] = mapped_column(String(100), nullable=True)
    authors: Mapped[list['Author']] = relationship(
        secondary=book_authors,
        back_populates='books'
    )

    readers: Mapped[list['UserBook']] = relationship(back_populates='book')
