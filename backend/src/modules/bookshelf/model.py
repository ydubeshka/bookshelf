import enum
from sqlalchemy import ForeignKey, Integer, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.database.database import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from src.modules.users.model import User
    from src.modules.books.model import Book


class ReadStatus(str, enum.Enum):
    TO_READ = "to_read"
    READING = "reading"
    READ = "read"


class UserBook(Base):
    __tablename__ = "user_books"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    book_id: Mapped[int] = mapped_column(ForeignKey("books.id", ondelete="CASCADE"))

    status: Mapped[ReadStatus] = mapped_column(Enum(ReadStatus), default=ReadStatus.TO_READ)
    rating: Mapped[int | None] = mapped_column(Integer, nullable=True)

    user: Mapped["User"] = relationship(back_populates="bookshelf")
    book: Mapped["Book"] = relationship(back_populates="readers")
