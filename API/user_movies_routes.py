from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
import mysql.connector
import time
from calculer_recommandations import RecommandationSystem

router = APIRouter()

class UserFilm(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    user_id: str
    film_id: int
    
class RecommandationFilms(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    user_id: str
    film_ids: List[int]

class RecommandationFilms(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    user_id: str
    film_ids: List[int]

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
        cursor.execute("SELECT * FROM User_film WHERE user_id = %s", (user_id,))
        user_films = cursor.fetchall()
        cursor.close()
        return user_films
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

# Endpoint pour ajouter un film que l'utilisateur aime
@router.post("/users/{user_id}/films/", response_model=UserFilm)
def add_user_film(user_id: UUID, film_id: int):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor()
        cursor.execute("INSERT INTO User_film (id, user_id, film_id) VALUES (%s, %s, %s)", 
                       (str(uuid4()), user_id, film_id))
        db_connection.commit()
        cursor.close()
        return {"user_id": user_id, "film_id": film_id}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

# Endpoint pour supprimer un film que l'utilisateur aime
@router.delete("/users/{user_id}/films/{film_id}", response_model=UserFilm)
def delete_user_film(user_id: UUID, film_id: int):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM User_film WHERE user_id = %s AND film_id = %s", (user_id, film_id))
        user_film = cursor.fetchone()
        if user_film:
            cursor.execute("DELETE FROM User_film WHERE user_id = %s AND film_id = %s", (user_id, film_id))
            db_connection.commit()
            cursor.close()
            return user_film
        else:
            cursor.close()
            raise HTTPException(status_code=404, detail="User film not found")
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

# Endpoint pour récupérer des recommendations pour l'utilisateur
@router.get("/users/{user_id}/recommendations/", response_model=RecommandationFilms)
def get_recommendations(user_id: UUID):
    try:
        film_ids_recommandes = calculer_recommandations(user_id, db_connection)
        if film_ids_recommandes:
            return {"user_id": user_id, "film_ids": film_ids_recommandes}
        else:
            raise HTTPException(status_code=404, detail="No recommendations available.")
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
