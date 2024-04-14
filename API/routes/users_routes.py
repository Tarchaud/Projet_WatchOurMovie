from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
import mysql.connector
import time

from controllers.users_controllers import getAllUsers, createUser, getUserById

router = APIRouter( prefix="/users", tags=["users"])

class User(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    username: str
    password: str
    email: str

class UserRes(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    username: str
    email: str



# Endpoint pour récupérer tous les utilisateurs depuis la base de données
@router.get("/", response_model=List[UserRes])
def get_all_users():
    users = getAllUsers()
    return users
    
    
# Endpoint pour ajouter un nouvel utilisateur à la base de données
@router.post("/", response_model=User)
def add_user(user: User):
    user = createUser(user)
    return user

# Endpoint pour récupérer un utilisateur par ID
@router.get("/{user_id}", response_model=UserRes)
def get_user_by_id(user_id: UUID):
    user = getUserById(user_id)
    return user