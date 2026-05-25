from pydantic import BaseModel, ConfigDict
from typing import Optional

class AuthorCreate(BaseModel):
    first_name: str
    last_name: str
    bio: Optional[str] = None


class AuthorResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    bio: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)