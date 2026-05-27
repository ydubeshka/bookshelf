import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jwt import InvalidTokenError
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.config import settings
from src.database.database import get_db
from src.modules.users.schema import UserCreate, UserResponse, Token
from src.modules.users import crud
from src.core.security import verify_password, create_access_token
from src.modules.users.model import User

router = APIRouter(prefix='/users', tags=['Users'])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")


async def get_current_user(
        token: str = Depends(oauth2_scheme),
        session: AsyncSession = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id_str: str | None = payload.get("sub")

        if user_id_str is None:
            raise credentials_exception

        user_id = int(user_id_str)
    except InvalidTokenError:
        raise credentials_exception

    user = await crud.get_user_by_id(session, user_id=user_id)

    if user is None:
        raise credentials_exception

    return user


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


@router.get('/me', response_model=UserResponse)
async def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user
