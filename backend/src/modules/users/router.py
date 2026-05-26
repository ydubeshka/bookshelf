from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.database import get_db
from src.modules.users.schema import UserCreate, UserResponse, Token # ИМПОРТИРУЕМ Token
from src.modules.users import crud
from src.core.security import verify_password, create_access_token

router = APIRouter(prefix='/users', tags=['Users'])


@router.post('/register', status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def register_user(user_in: UserCreate, session: AsyncSession = Depends(get_db)):
    existing_user = await crud.get_user_by_email(session, user_in.email)

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    new_user = await crud.create_user(session, user_in)

    return new_user

@router.post('/login', response_model=Token)
async def login_for_access_token(
        form_data: OAuth2PasswordRequestForm = Depends(),
        session: AsyncSession = Depends(get_db)
):
    user = await crud.get_user_by_email(session, form_data.username)

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный email или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}