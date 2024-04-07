from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
import mysql.connector
import time

router = APIRouter()

class User(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    username: str
    email: str

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

# Endpoint pour récupérer tous les utilisateurs depuis la base de données
@router.get("/users/", response_model=List[User])
def read_users():
    db_connection = connect_to_database()
    if db_connection is None:
        raise HTTPException(status_code=500, detail="Failed to connect to the database.")
    
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM User")
        users = cursor.fetchall()
        cursor.close()
        return users
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

# Endpoint pour ajouter un nouvel utilisateur à la base de données
@router.post("/users/", response_model=User)
def add_user(user: User):
    db_connection = connect_to_database()
    if db_connection is None:
        raise HTTPException(status_code=500, detail="Failed to connect to the database.")
    
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor()
        cursor.execute("INSERT INTO User (id, username, email) VALUES (%s, %s, %s)", 
                       (str(user.id), user.username, user.email))
        db_connection.commit()
        cursor.close()
        return user
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
