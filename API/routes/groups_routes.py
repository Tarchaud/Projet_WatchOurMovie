from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
import mysql.connector

from controllers.groups_controllers import getAllGroups, createGroup

router = APIRouter( prefix="/groups", tags=["groups"])

class Group(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    user_ids: List[UUID]

# Connexion à la base de données MySQL
def connect_to_database():
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
        return None

db_connection = connect_to_database()

# Endpoint pour récupérer tous les groupes depuis la base de données
@router.get("/", response_model=List[Group])
def get_all_groups():
    groups = getAllGroups()
    return groups

# Endpoint pour ajouter un nouveau groupe à la base de données
@router.post("/", response_model=Group)
def add_group(group: Group):
    group_res = createGroup(group)
    return group_res