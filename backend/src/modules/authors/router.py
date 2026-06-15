from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.database import get_db
from src.modules.authors.schema import AuthorCreate, AuthorResponse
from src.modules.authors import crud
from src.modules.users.router import get_current_user
from src.modules.users.model import User

router = APIRouter(prefix="/authors", tags=["Authors"])


@router.get("/", response_model=list[AuthorResponse])
async def read_all_authors(session: AsyncSession = Depends(get_db)):
    authors = await crud.get_all_authors(session)
    return authors


@router.post("/", response_model=AuthorResponse, status_code=status.HTTP_201_CREATED)
async def create_new_author(
        author_in: AuthorCreate,
        session: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    new_author = await crud.create_author(session, author_in)
    return new_author


@router.get('/{author_id}', response_model=AuthorResponse)
async def get_author_by_id(author_id: int, session: AsyncSession = Depends(get_db)):
    author = await crud.get_author_by_id(session, author_id)

    if not author:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Автор не найден"
        )
    return author