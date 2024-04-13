from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import requests
from cachetools import cached, TTLCache
from dotenv import load_dotenv
import os

load_dotenv()

#INFO Récupération des variables d'environnement
BASE_URL = os.getenv("TMDB_BASE_URL")
ACCESS_TOKEN = os.getenv("TMDB_ACCESS_TOKEN")

HEADER = {
    "accept": "application/json",
    "Authorization" : f"Bearer {ACCESS_TOKEN}"
}


cache = TTLCache(maxsize=100, ttl=360)


def fetch_TMDB_movie_details(movie_id : int, params: dict, cache_key: tuple):
    """
    Récupère le details d'un film depuis l'API TMDB.
    """

    # Tentative de récupération des données depuis le cache
    data = cache.get(cache_key)
    if data is None:
        # Si les données ne sont pas dans le cache, effectuer la requête
        response = requests.get(f"{BASE_URL}/movie/{movie_id}", params=params, headers=HEADER)
        response.raise_for_status()
        data = response.json()
        # Mise en cache des détails du film pour une utilisation ultérieure
        cache[cache_key] = data
    return data

def fetch_TMDB_movie_search( params: dict, cache_key: tuple):
    """
    Récupère la liste des films correspondant à la recherche depuis l'API TMDB.
    """

    # Tentative de récupération des données depuis le cache
    data = cache.get(cache_key)
    if data is None:
        # Si les données ne sont pas dans le cache, effectuer la requête
        response = requests.get(f"{BASE_URL}/search/movie", params=params, headers=HEADER)
        response.raise_for_status()
        data = response.json()
        # Mise en cache des détails du film pour une utilisation ultérieure
        cache[cache_key] = data
    return data


def fetch_TMDB_movie_trending(time_window :str, params: dict, cache_key: tuple):
    """
    Récupère la liste des films en tendance depuis l'API TMDB.
    """

    # Tentative de récupération des données depuis le cache
    data = cache.get(cache_key)
    if data is None:
        # Si les données ne sont pas dans le cache, effectuer la requête
        response = requests.get(f"{BASE_URL}/trending/movie/{time_window}", params=params, headers=HEADER)
        response.raise_for_status()
        data = response.json()
        # Mise en cache des détails du film pour une utilisation ultérieure
        cache[cache_key] = data
    return data


def fetch_TMDB_genre_movie(params: dict, cache_key: tuple):
    """
    Récupère la liste des genres de films depuis l'API TMDB.
    """

    # Tentative de récupération des données depuis le cache
    data = cache.get(cache_key)
    if data is None:
        # Si les données ne sont pas dans le cache, effectuer la requête
        response = requests.get(f"{BASE_URL}/genre/movie/list", params=params, headers=HEADER)
        response.raise_for_status()
        data = response.json()
        # Mise en cache des détails du film pour une utilisation ultérieure
        cache[cache_key] = data
    return data

def fetch_TMDB_movie_genre(params: dict, cache_key: tuple):
    """
    Récupère la liste des films par genre depuis l'API TMDB.
    """

    # Tentative de récupération des données depuis le cache
    data = cache.get(cache_key)
    if data is None:
        # Si les données ne sont pas dans le cache, effectuer la requête
        response = requests.get(f"{BASE_URL}/discover/movie", params=params, headers=HEADER)
        response.raise_for_status()
        data = response.json()
        # Mise en cache des détails du film pour une utilisation ultérieure
        cache[cache_key] = data
    return data