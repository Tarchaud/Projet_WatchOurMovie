from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
from dotenv import load_dotenv
import os
from identity_provider.jwt_utils import create_access_token

class User(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    username: str
    email: str

auth_router = APIRouter(prefix="/auth", tags=["auth"])
load_dotenv()

#TODO : mettre la logique de création de compte et de connexion

@auth_router.post("/signup")
def signup(user: User):
    # Mettre la logique de création de compte
    # Une fois le compte créé, générer un token JWT
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Endpoint pour la connexion
@auth_router.post("/login")
def login(login_data: User):
    # Mettre la logique de connexion
    # Puis si les informations sont valides, générer un token JWT
    access_token = create_access_token(data={"sub": login_data.username})
    return {"access_token": access_token, "token_type": "bearer"}
