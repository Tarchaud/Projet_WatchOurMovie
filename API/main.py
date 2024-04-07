from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
import mysql.connector
import time

app = FastAPI()

class User(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    username: str
    email: str

class Group(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    user_ids: List[UUID]

class UserFilm(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    film_id: UUID

# Connexion à la base de données MySQL
def connect_to_database():
    while True:
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
            print("Retrying in 1 second...")
            time.sleep(1)

db_connection = connect_to_database()

@app.on_event("shutdown")
def shutdown_event():
    db_connection.close()

# Endpoint pour récupérer tous les utilisateurs depuis la base de données
@app.get("/users/", response_model=List[User])
def read_users():
    cursor = db_connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM User")
    users = cursor.fetchall()
    cursor.close()
    return users

# Endpoint pour ajouter un nouvel utilisateur à la base de données
@app.post("/users/", response_model=User)
def add_user(user: User):
    cursor = db_connection.cursor()
    cursor.execute("INSERT INTO User (id, username, email) VALUES (%s, %s, %s)", 
                   (str(user.id), user.username, user.email))
    db_connection.commit()
    cursor.close()
    return user

# Endpoint pour récupérer tous les groupes depuis la base de données
@app.get("/groups/", response_model=List[Group])
def read_groups():
    cursor = db_connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Groupe")
    groups = cursor.fetchall()
    cursor.close()
    return groups

# Endpoint pour ajouter un nouveau groupe à la base de données
@app.post("/groups/", response_model=Group)
def add_group(group: Group):
    cursor = db_connection.cursor()
    cursor.execute("INSERT INTO Groupe (id, name) VALUES (%s, %s)", 
                   (str(group.id), group.name))
    db_connection.commit()
    cursor.close()
    return group

# Endpoint pour récupérer tous les films qu'un utilisateur aime
@app.get("/users/{user_id}/films/", response_model=List[UserFilm])
def read_user_films(user_id: UUID):
    cursor = db_connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM User_film WHERE user_id = %s", (user_id,))
    user_films = cursor.fetchall()
    cursor.close()
    return user_films

# Endpoint pour ajouter un film que l'utilisateur aime
@app.post("/users/{user_id}/films/", response_model=UserFilm)
def add_user_film(user_id: UUID, film_id: UUID):
    cursor = db_connection.cursor()
    cursor.execute("INSERT INTO User_film (id, user_id, film_id) VALUES (%s, %s, %s)", 
                   (str(uuid4()), user_id, film_id))
    db_connection.commit()
    cursor.close()
    return {"user_id": user_id, "film_id": film_id}

# Endpoint pour supprimer un film que l'utilisateur aime
@app.delete("/users/{user_id}/films/{film_id}", response_model=UserFilm)
def delete_user_film(user_id: UUID, film_id: UUID):
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
