from fastapi import HTTPException
from pydantic import BaseModel, Field
from uuid import UUID, uuid4
import mysql.connector
import time

from identity_provider.jwt_utils import get_password_hash
from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")

class User(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    username: str
    password: str
    email: str

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
    

def getAllUsers():
    db_connection = connect_to_database()
    if db_connection is None:
        raise HTTPException(status_code=500, detail="Failed to connect to the database.")
    
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT id, username, email FROM User")
        users = cursor.fetchall()
        cursor.close()
        db_connection.disconnect()
        return users
    except mysql.connector.Error as err:
        db_connection.disconnect()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

def createUser(user : User):
    db_connection = connect_to_database()
    # On hash le mot de passe avant de l'insérer dans la base de données
    user.password = get_password_hash(user.password)
    if db_connection is None:
        raise HTTPException(status_code=500, detail="Failed to connect to the database.")
    
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor()
        res = cursor.execute("INSERT INTO User (id, username, password, email) VALUES (%s, %s, %s, %s)", 
                       (str(user.id), user.username, user.password, user.email))
        db_connection.commit()
        cursor.close()
        db_connection.disconnect()
        return user
    except mysql.connector.Error as err:
        db_connection.disconnect()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    

def getUserByEmailAddress(email):
    db_connection = connect_to_database()
    if db_connection is None:
        raise HTTPException(status_code=500, detail="Failed to connect to the database.")
    
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM User WHERE email = %s", email)
        user = cursor.fetchone()
        cursor.close()
        db_connection.disconnect()
        return user
    except mysql.connector.Error as err:
        db_connection.disconnect()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    

def getUserByUsername(username: str):
    db_connection = connect_to_database()
    if db_connection is None:
        raise HTTPException(status_code=500, detail="Failed to connect to the database.")
    
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM User WHERE username = %s", (username,))
        user = cursor.fetchone()
        cursor.close()
        db_connection.disconnect()
        return user
    except mysql.connector.Error as err:
        db_connection.disconnect()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")