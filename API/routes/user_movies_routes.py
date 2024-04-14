from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
from fastapi.security import OAuth2PasswordBearer

from controllers.user_movies_controllers import getAllMoviesByUser, getAllMoviesLikedByUser, getAllMoviesSeenByUser, addMovieToUser, deleteLikedMovieFromUser, deleteSeenMovieFromUser, getMovieForUser, updateMovieForUser
from identity_provider.jwt_utils import decode_token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter( prefix="/user_films", tags=["user_films"])

class UserFilm(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    film_tmdb_id: int
    liked: Optional[bool] = False
    seen: Optional[bool] = False

# Endpoint pour récupérer les films aimés par un utilisateur
@router.get("/{user_id}/liked_films/", response_model=List[UserFilm])
def get_user_liked_films(user_id: UUID, token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    return getAllMoviesLikedByUser(user_id)

# Endpoint pour récupérer les films déjà vus par un utilisateur
@router.get("/{user_id}/seen_films/", response_model=List[UserFilm])
def get_user_seen_films(user_id: UUID, token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    return getAllMoviesSeenByUser(user_id)

# Endpoint pour récupérer tous les films associés un utilisateur
@router.get("/{user_id}/films/", response_model=List[UserFilm])
def get_user_seen_films(user_id: UUID, token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    return getAllMoviesByUser(user_id)

# Endpoint pour ajouter un film à la liste des films aimés ou déjà vus par un utilisateur
@router.post("/{user_id}/films/", response_model=UserFilm)
def add_user_film(user_id: UUID, film: UserFilm, token: str = Depends(oauth2_scheme)):  
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    
    existing_film = getMovieForUser(user_id, film.film_tmdb_id)

    if existing_film:
        return updateMovieForUser(user_id, film)
    else:
        return addMovieToUser(user_id, film)

# Endpoint pour supprimer un film aimé par un utilisateur
@router.delete("/{user_id}/liked_films/{film_tmdb_id}", response_model=UserFilm)
def delete_liked_film(user_id: UUID, film_tmdb_id: int, token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    return deleteLikedMovieFromUser(user_id, film_tmdb_id)

# Endpoint pour supprimer un film déjà vu par un utilisateur
@router.delete("/{user_id}/seen_films/{film_tmdb_id}", response_model=UserFilm)
def delete_seen_film(user_id: UUID, film_tmdb_id: int, token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    return deleteSeenMovieFromUser(user_id, film_tmdb_id)