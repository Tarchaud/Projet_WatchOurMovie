from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import requests
from controllers.call_api_TMDB import fetch_TMDB_movie_details, fetch_TMDB_movie_search, fetch_TMDB_movie_trending, fetch_TMDB_genre_movie, fetch_TMDB_movie_genre



router = APIRouter( prefix="/movies", tags=["movies"])


# Route pour obtenir le détails d'un film
@router.get("/{movie_id}/details")
async def get_movie_details(movie_id: int, language : Optional[str] = "fr-FR", append_to_response: Optional[str] = ""):
    """
    Obtention des détails d'un film par ID.
    Renvoie le détail du film correspondant à l'ID donné.
    """ 

    params = {
        "language": language,
        "append_to_response": append_to_response,
    }

    try:
        # Récupérer les détails du film depuis le cache
        response = fetch_TMDB_movie_details(movie_id, params, ("details",movie_id, language))
    
        return response
    except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail="Erreur lors de la récupération des détails du film")



@router.get("/search")
async def search_movie_by_title(title: str, language: Optional[str] = "fr-FR", page: Optional[int] = 1):
    """
    Rechercher un film par titre.
    Renvoie une liste de films correspondant au titre donné.
    """

    params = {
        "query": title,
        "language": language,
        "page": page,
    }
    
    try:
        # clé de cache
        cache_key = ("Movie_Search", title, language)
        response = fetch_TMDB_movie_search(params, cache_key)
        return response
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail="Erreur lors de la recherche du film")



@router.get("/trending")
async def get_trending_movies(language: Optional[str] = "fr-FR", time_window: Optional[str] = "day"):
    """
    Obtenir une liste de films en tendance.
    Renvoie la liste des films en tendance.
    """

    if time_window not in ["day", "week"]:
        time_window = "day"

    # Paramètres de la requête
    params = {
        "language": language,
    }
    
    try:
        # Récupérer les films en tendance depuis le cache
        cache_key = ("Movie_Trending", language, time_window)
        response = fetch_TMDB_movie_trending(time_window, params, cache_key)

        return response
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des films en tendance")




@router.get("/genre/movie")
async def get_list_genre_of_movies(language: Optional[str] = "fr-FR"):
    """
    Obtenir une liste des genres de film.
    Renvoie la liste des genre de film.
    """

    # Paramètres de la requête
    params = {
        "language": language
    }
    
    try:
        # Récupérer les films en tendance depuis le cache
        cache_key = ("Movie_List_Genre", language)
        response = fetch_TMDB_genre_movie(params, cache_key)
        return response
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail="Erreur lors de la liste des genres de films")



#INFO Permet de récupérer les films par genre peut être la modif pour l'utiliser avec les autres paramètres qui sont possible pour cette route de l'API TMDB (30 paramètres possibles)
# with_genres = genre_id1,genre_id2,genre_id3 => permet de récupérer les films qui ont tous les genres spécifiés
# with_genres = genre_id1|genre_id2|genre_id3 => permet de récupérer les films qui ont un des genres spécifiés
@router.get("/genre")
async def get_movies_by_genre(language: Optional[str] = "fr-FR", with_genres: str = "", page: Optional[int] = 1):
    """
    Obtenir une liste de films selon le genre spécifié.
    Renvoie la liste des films du genre donné.
    """

    params = {
        "language": language,
        "with_genres": with_genres,
        "include_adult": False,
        "include_video": False,
        "page": page,
        "sort_by" : "popularity.desc"
    }
    
    try:
        # Récupérer les films par genre depuis le cache
        cache_key = ("Movie_Genre", with_genres, language, page)
        response = fetch_TMDB_movie_genre(params, cache_key)
        return response
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des films par genre")


