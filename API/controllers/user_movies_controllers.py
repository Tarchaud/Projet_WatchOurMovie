from fastapi import HTTPException
from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from typing import List, Optional
import mysql.connector
import time

from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")

class UserFilm(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    film_tmdb_id: int
    liked: Optional[bool] = False
    seen: Optional[bool] = False

# Connexion à la base de données MySQL
def connect_to_database():
    try:
        db_connection = mysql.connector.connect(
            host = DB_HOST,
            user = DB_USER,
            password = DB_PASSWORD,
            database = DB_DATABASE
        )
        return db_connection
    except mysql.connector.Error as err:
        print(f"MySQL connection error: {err}")
        return None

db_connection = connect_to_database()


def getAllMoviesLikedByUser(user_id: UUID):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM User_film WHERE user_id = %s AND liked = TRUE", (str(user_id),))
        user_liked_films = cursor.fetchall()
        cursor.close()
        return user_liked_films
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

def getAllMoviesSeenByUser(user_id: UUID):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM User_film WHERE user_id = %s AND seen = TRUE", (str(user_id),))
        user_seen_films = cursor.fetchall()
        cursor.close()
        return user_seen_films
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

def getMovieForUser(user_id: UUID, film_tmdb_id: int):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM User_film WHERE user_id = %s AND film_tmdb_id = %s", 
                       (str(user_id), film_tmdb_id))
        existing_film = cursor.fetchone()
        cursor.close()
        return existing_film
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

def addMovieToUser(user_id: UUID, film: UserFilm):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor()
        cursor.execute("INSERT INTO User_film (id, user_id, film_tmdb_id, liked, seen) VALUES (%s, %s, %s, %s, %s)", 
                       (str(uuid4()), str(user_id), film.film_tmdb_id, film.liked, film.seen))
        db_connection.commit()
        cursor.close()
        return film
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    
def deleteLikedMovieFromUser(user_id: UUID, film_tmdb_id: int):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM User_film WHERE user_id = %s AND film_tmdb_id = %s AND liked = TRUE", (str(user_id), film_tmdb_id))
        user_film = cursor.fetchone()
        if user_film:
            cursor.execute("UPDATE User_film SET liked = FALSE WHERE user_id = %s AND film_tmdb_id = %s", (str(user_id), film_tmdb_id)) 
            db_connection.commit()
            cursor.close()
            return user_film
        else:
            cursor.close()
            raise HTTPException(status_code=404, detail="User film not found")
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

def deleteSeenMovieFromUser(user_id: UUID, film_tmdb_id: int):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM User_film WHERE user_id = %s AND film_tmdb_id = %s AND seen = TRUE", (str(user_id), film_tmdb_id))
        user_film = cursor.fetchone()
        if user_film:
            cursor.execute("UPDATE User_film SET seen = FALSE WHERE user_id = %s AND film_tmdb_id = %s", (str(user_id), film_tmdb_id)) 
            db_connection.commit()
            cursor.close()
            return user_film
        else:
            cursor.close()
            raise HTTPException(status_code=404, detail="User film not found")
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

def updateMovieForUser(user_id: UUID, film: UserFilm):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor()
        cursor.execute("UPDATE User_film SET liked = %s, seen = %s WHERE user_id = %s AND film_tmdb_id = %s", 
                       (film.liked, film.seen, str(user_id), film.film_tmdb_id))
        db_connection.commit()
        cursor.close()
        return film
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")