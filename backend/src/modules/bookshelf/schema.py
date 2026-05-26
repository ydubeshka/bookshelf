from pydantic import BaseModel, ConfigDict, Field
from typing import Optional

class UserBookBase(BaseModel):
    book_id: int
    status: str = Field(default="want_to_read", description="read, reading, want_to_read")
    rating: Optional[int] = Field(default=None, ge=1, le=5)


class UserBookCreate(UserBookBase):
    pass

class UserBookResponse(UserBookBase):
    id: int
    user_i: int

    model_config = ConfigDict(from_attributes=True)