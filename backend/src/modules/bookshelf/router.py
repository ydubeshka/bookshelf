from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.database import get_db
from src.modules.bookshelf.schema import UserBookCreate, UserBookResponse, UserBookUpdate
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
    existing_item = await crud.get_user_book(session, user_id=current_user.id, book_id=shelf_in.book_id)
    if existing_item:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This book is already on your bookshelf"
        )

    new_shelf_item = await crud.add_book_to_shelf(session, shelf_in, user_id=current_user.id)

    return new_shelf_item

@router.patch('/{book_id}', response_model=UserBookResponse, status_code=status.HTTP_200_OK)
async def update_book(
        book_id: int,
        update_data: UserBookUpdate,
        session: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    update_item = await crud.update_book_on_shelf(session, user_id=current_user.id, book_id=book_id, update_data=update_data)

    if not update_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found on shelf")

    return update_item

@router.delete('/{book_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_my_shelf_item(
        book_id: int,
        session: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    success = await crud.delete_book_from_shelf(session, user_id=current_user.id, book_id=book_id)

    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found in your bookshelf")

    return None