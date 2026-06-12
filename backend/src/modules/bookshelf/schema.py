from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from src.modules.books.schema import BookResponse

class UserBookBase(BaseModel):
    book_id: int
    status: str = Field(default="to_read", description="read, reading, to_read")
    rating: Optional[int] = Field(default=None, ge=1, le=5)


class UserBookCreate(UserBookBase):
    pass

class UserBookResponse(UserBookBase):
    id: int
    book: BookResponse
    model_config = ConfigDict(from_attributes=True)

class UserBookUpdate(BaseModel):
    status: Optional[str] = Field(default=None, description="read, reading, to_read")
    rating: Optional[int] = Field(default=None, ge=1, le=5)