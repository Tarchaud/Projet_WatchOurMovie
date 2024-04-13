from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
import mysql.connector
import time

from controllers.users_controllers import getAllUsers, createUser
from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")

router = APIRouter( prefix="/users", tags=["users"])

class User(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    username: str
    password: str
    email: str

class UserRes(BaseModel):
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
@router.get("/", response_model=List[UserRes])
def read_users():
    users = getAllUsers()
    return users
    
    
# Endpoint pour ajouter un nouvel utilisateur à la base de données
@router.post("/", response_model=User)
def add_user(user: User):
    user = createUser(user)
    return user