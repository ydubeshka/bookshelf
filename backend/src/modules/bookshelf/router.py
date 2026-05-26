from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.database import get_db
from src.modules.bookshelf.schema import UserBookCreate, UserBookResponse
from src.modules.bookshelf import crud
from src.modules.users.router import get_current_user
from src.modules.users.model import User

router = APIRouter(prefix='/bookshelf', tags=["Bookshelf"])


@router.get('/', response_model=list[UserBookResponse])
async def get_my_shelf(
        session: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    shelf = await crud.get_user_shelf(session, user_id=current_user.id)

    return shelf


@router.post('/', response_model=UserBookResponse, status_code=status.HTTP_201_CREATED)
async def add_book_to_shelf(
        shelf_in: UserBookCreate,
        session: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    new_shelf_item = await crud.add_book_to_shelf(session, shelf_in, user_id=current_user.id)

    return new_shelf_item
