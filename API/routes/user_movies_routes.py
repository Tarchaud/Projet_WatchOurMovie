from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
import mysql.connector
import time

from controllers.user_movies_controllers import getAllMoviesLikedByUser, getAllMoviesSeenByUser, addMovieToUser, deleteLikedMovieFromUser, deleteSeenMovieFromUser

router = APIRouter( prefix="/user_films", tags=["user_films"])

class UserFilm(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    film_tmdb_id: int
    liked: Optional[bool] = False
    seen: Optional[bool] = False

# Endpoint pour récupérer les films aimés par un utilisateur
@router.get("/{user_id}/liked_films/", response_model=List[UserFilm])
def get_user_liked_films(user_id: UUID):
    return getAllMoviesLikedByUser(user_id)

# Endpoint pour récupérer les films déjà vus par un utilisateur
@router.get("/{user_id}/seen_films/", response_model=List[UserFilm])
def get_user_seen_films(user_id: UUID):
    return getAllMoviesSeenByUser(user_id)

# Endpoint pour ajouter un film aimé ou déjà vu par un utilisateur
@router.post("/{user_id}/films/", response_model=UserFilm)
def add_user_film(user_id: UUID, film: UserFilm):  
    return addMovieToUser(user_id, film)

# Endpoint pour supprimer un film aimé par un utilisateur
@router.delete("/{user_id}/liked_films/{film_tmdb_id}", response_model=UserFilm)
def delete_liked_film(user_id: UUID, film_tmdb_id: int):
    return deleteLikedMovieFromUser(user_id, film_tmdb_id)

# Endpoint pour supprimer un film déjà vu par un utilisateur
@router.delete("/{user_id}/seen_films/{film_tmdb_id}", response_model=UserFilm)
def delete_seen_film(user_id: UUID, film_tmdb_id: int):
    return deleteSeenMovieFromUser(user_id, film_tmdb_id)