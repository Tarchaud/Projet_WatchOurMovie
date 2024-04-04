from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import requests

router = APIRouter()

# URL de base de l'API TMDB
base_url = "https://api.themoviedb.org/3"

# Clé d'API TMDB (remplacez-la par votre propre clé)
ACCESS_TOKEN = "access_token_here"


# Route pour obtenir le détails d'un film
@router.get("/movie/{movie_id}/details")
async def get_movie_details(movie_id: int, movie_data: dict):
    """
    Obtention des détails d'un film par ID.
    """ 

    language = movie_data.get("language")

    params = {
        "language": language
    }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }
    response = requests.get(f"{base_url}/movie/{movie_id}", params=params, headers=headers)
    response.raise_for_status()
    return response.json()