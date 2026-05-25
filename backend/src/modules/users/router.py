from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.database import get_db
from src.modules.users.schema import UserCreate, UserResponse
from src.modules.users import crud

router = APIRouter(prefix='/users', tags=['Users'])


@router.post('/register', status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def register_user(user_in: UserCreate, session: AsyncSession = Depends(get_db)):
    existing_user = await crud.get_user_by_email(session, user_in.email)

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    new_user = await crud.create_user(session, user_in)

    return new_user
