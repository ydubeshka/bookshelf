from pydantic import BaseModel, ConfigDict
from typing import Optional
from src.modules.authors.schema import AuthorBase


class BookBase(BaseModel):
    title: str
    description: Optional[str] = None
    genre: Optional[str] = None
    published_year: Optional[int] = None
    cover_url: Optional[str] = None


class BookCreate(BookBase):
    pass


class BookResponse(BookBase):
    id: int
    authors: list[AuthorBase]
    model_config = ConfigDict(from_attributes=True)