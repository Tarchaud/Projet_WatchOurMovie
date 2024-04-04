from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
import mysql.connector
import time
from movie_routes import router as movie_router

app = FastAPI()

app.include_router(movie_router) # Ajout des routes films

class Film(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    title: str
    year: int
    description: Optional[str] = None

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

# Endpoint pour récupérer tous les films depuis la base de données
@app.get("/films/", response_model=List[Film])
def read_films():
    cursor = db_connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM films")
    films = cursor.fetchall()
    cursor.close()
    return films

# Endpoint pour ajouter un nouveau film à la base de données
@app.post("/films/", response_model=Film)
def add_film(film: Film):
    cursor = db_connection.cursor()
    cursor.execute("INSERT INTO films (id, title, year, description) VALUES (%s, %s, %s, %s)", 
                   (str(film.id), film.title, film.year, film.description))
    db_connection.commit()
    cursor.close()
    return film

# Endpoint pour récupérer un film spécifique par ID depuis la base de données
@app.get("/films/{film_id}", response_model=Film)
def read_film(film_id: UUID):
    cursor = db_connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM films WHERE id = %s", (film_id,))
    film = cursor.fetchone()
    cursor.close()
    if film:
        return film
    else:
        raise HTTPException(status_code=404, detail="Film not found")

# Endpoint pour supprimer un film de la base de données
@app.delete("/films/{film_id}", response_model=Film)
def delete_film(film_id: UUID):
    cursor = db_connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM films WHERE id = %s", (film_id,))
    film = cursor.fetchone()
    if film:
        cursor.execute("DELETE FROM films WHERE id = %s", (film_id,))
        db_connection.commit()
        cursor.close()
        return film
    else:
        cursor.close()
        raise HTTPException(status_code=404, detail="Film not found")
