from pydantic import BaseModel, ConfigDict
from typing import Optional


class AuthorBase(BaseModel):
    first_name: str
    last_name: str
    bio: Optional[str] = None


class AuthorCreate(AuthorBase):
    pass


class AuthorResponse(AuthorBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
