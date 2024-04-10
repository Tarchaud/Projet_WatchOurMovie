from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
import mysql.connector
import time

router = APIRouter()

class UserFilm(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    film_tmdb_id: int

# Connexion à la base de données MySQL
def connect_to_database():
    try:
        db_connection = mysql.connector.connect(
            host="mysql",
            user="your_username",
            password="your_password",
            database="watchOurMoviesDB"
        )
        return db_connection
    except mysql.connector.Error as err:
        print(f"MySQL connection error: {err}")
        return None

db_connection = connect_to_database()

# Endpoint pour récupérer tous les films qu'un utilisateur aime
@router.get("/users/{user_id}/films/", response_model=List[UserFilm])
def read_user_films(user_id: UUID):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM User_film WHERE user_id = %s", (str(user_id),))
        user_films = cursor.fetchall()
        cursor.close()
        return user_films
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

# Endpoint pour ajouter un film que l'utilisateur aime
@router.post("/users/{user_id}/films/", response_model=UserFilm)
def add_user_film(user_film: UserFilm):  # Utilisez UserFilm comme type de paramètre
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor()
        cursor.execute("INSERT INTO User_film (id, user_id, film_tmdb_id) VALUES (%s, %s, %s)", 
                       (str(uuid4()), str(user_film.user_id), user_film.film_tmdb_id))
        db_connection.commit()
        cursor.close()
        return {"id": str(uuid4()), "user_id": user_film.user_id, "film_tmdb_id": user_film.film_tmdb_id}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

# Endpoint pour supprimer un film que l'utilisateur aime
@router.delete("/users/{user_id}/films/{film_tmdb_id}", response_model=UserFilm)
def delete_user_film(user_id: UUID, film_tmdb_id: int):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM User_film WHERE user_id = %s AND film_tmdb_id = %s", (str(user_id), film_tmdb_id))
        user_film = cursor.fetchone()
        if user_film:
            cursor.execute("DELETE FROM User_film WHERE user_id = %s AND film_tmdb_id = %s", (str(user_id), film_tmdb_id)) 
            db_connection.commit()
            cursor.close()
            return user_film
        else:
            cursor.close()
            raise HTTPException(status_code=404, detail="User film not found")
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")