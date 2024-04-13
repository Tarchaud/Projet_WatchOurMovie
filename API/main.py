from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from movie_routes import router as movie_router
from user_routes import router as user_router
from user_movies_routes import router as user_movies_router
from group_routes import router as group_router
from identity_provider.auth import auth_router

app = FastAPI()

app.include_router(auth_router) # Ajout des routes d'authentification
app.include_router(movie_router) # Ajout des routes films
app.include_router(user_router) # Ajout des routes user
app.include_router(user_movies_router) # Ajout des routes user_movies
app.include_router(group_router) # Ajout des routes group

# Gestion des erreurs
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail}
    )
