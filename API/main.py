from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4

app = FastAPI()

class Film(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    title: str
    year: int
    description: Optional[str] = None

# Bdd
films_db: List[Film] = [Film(title="The Shawshank Redemption", year=1994, description="Two imprisoned guys bond over a number of years, finding solace and eventual redemption through acts of common decency.")]

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/films/", response_model=List[Film])
def read_films():
    return films_db

@app.post("/films/", response_model=Film)
def add_film(film: Film):
    films_db.append(film)
    return film

@app.get("/films/{film_id}", response_model=Film)
def read_film(film_id: UUID):
    for film in films_db:
        if film.id == film_id:
            return film
    raise HTTPException(status_code=404, detail="Film not found")

@app.delete("/films/{film_id}", response_model=Film)
def delete_film(film_id: UUID):
    for film in films_db:
        if film.id == film_id:
            films_db.remove(film)
            return film
    raise HTTPException(status_code=404, detail="Film not found")