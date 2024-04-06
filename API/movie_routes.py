from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import requests
from cachetools import cached, TTLCache
from dotenv import load_dotenv
import os


cache = TTLCache(maxsize=100, ttl=360)

router = APIRouter()

load_dotenv()

# URL de base de l'API TMDB
BASE_URL = os.getenv("TMDB_BASE_URL")

# Clé d'API TMDB (remplacez-la par votre propre clé)
ACCESS_TOKEN = os.getenv("TMDB_ACCESS_TOKEN")


# Route pour obtenir le détails d'un film
@router.get("/movie/{movie_id}/details")
async def get_movie_details(movie_id: int, movie_data: dict):
    """
    Obtention des détails d'un film par ID.
    Renvoie les détails du film correspondant à l'ID donné.
    """ 

    language = movie_data.get("language") if movie_data.get("language") else "fr-FR"

    params = {
        "language": language,
    }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }
    try:
        # Récupérer les détails du film depuis le cache
        response = cache.get(("details",movie_id, language))
        if response is None:

            response = requests.get(f"{BASE_URL}/movie/{movie_id}", params=params, headers=headers)
            response.raise_for_status()
            response = response.json()

            # Mise en cache des détails du film pour une utilisation ultérieure
            cache[("details",movie_id, language)] = response
    
        return response
    except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail=f"{BASE_URL}")


@router.get("/movie/search")
async def search_movie_by_title(data_req: dict):
    """
    Rechercher un film par titre.
    Renvoie une liste de films correspondant au titre donné.
    """

    title = data_req.get("title") if data_req.get("title") else ""
    language = data_req.get("language") if data_req.get("language") else "fr-FR"

    params = {
        "query": title,
        "language": language,
    }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }
    
    try:
        # clé de cache
        cache_key = ("search", title, language)
        # Tentative de récupération des données depuis le cache
        response = cache.get(cache_key)
        if response is None:

            response = requests.get(f"{BASE_URL}/search/movie", params=params, headers=headers)
            response.raise_for_status()
            response = response.json()
            # Mise en cache des données pour une utilisation ultérieure
            cache[cache_key] = response

        return response
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail="Erreur lors de la recherche du film")


@router.get("/movie/trending")
async def get_trending_movies(movie_data: dict):
    """
    Obtenir une liste de films en tendance.
    Renvoie la liste des films en tendance.
    """

    language = movie_data.get("language") if movie_data.get("language") else "fr-FR"
    time_window = movie_data.get("time_window") if movie_data.get("time_window") else "days"

    # Paramètres de la requête
    params = {
        "language": language,
        "time_window": time_window,
    }
    
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }

    try:
        # Récupérer les films en tendance depuis le cache
        response = cache.get(("trending", language, time_window))
        if response is None:
            # Effectuer la requête à l'API TMDB
            response = requests.get(f"{BASE_URL}/trending/movie/day", params=params, headers=headers)
            response.raise_for_status()
            response = response.json()
            # Mise en cache des films en tendance pour une utilisation ultérieure
            cache[("trending", language, time_window)] = response

        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des films en tendance")
