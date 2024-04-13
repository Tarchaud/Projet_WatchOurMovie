from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4
from fastapi.security import OAuth2PasswordBearer

from controllers.groups_controllers import getAllGroups, createGroup, getGroupById, getAllGroupsOfUser, removeUserFromGroup, addUserToGroup
from identity_provider.jwt_utils import decode_token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter( prefix="/groups", tags=["groups"])

class Group(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    user_ids: List[UUID]

# Endpoint pour récupérer tous les groupes depuis la base de données
@router.get("/", response_model=List[Group])
def get_all_groups(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    groups = getAllGroups()
    return groups

# Endpoint pour ajouter un nouveau groupe à la base de données
@router.post("/", response_model=Group)
def add_group(group: Group, token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    group_res = createGroup(group)
    return group_res

# Endpoint pour récupérer un groupe par ID
@router.get("/{group_id}")
def get_group_by_id(group_id: UUID, token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    group_res = getGroupById(group_id)
    return group_res

# Endpoint pour récupérer tout les groupes d'un utilisateur
@router.get("/user/{user_id}")
def get_groups_by_user_id(user_id: UUID, token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    group_list = getAllGroupsOfUser(user_id)
    return group_list

#TODO : a revoir les truc a renvoyer

# Endpoint pour supprimer un user du groupe
@router.put("/{group_id}/users/remove/{user_id}")
def remove_user_from_group(group_id: UUID, user_id: UUID, token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    res = removeUserFromGroup(group_id, user_id)
    return {"message": "User removed from group"}

# Endpoint pour ajouter un user au groupe
@router.put("/{group_id}/users/add/{user_id}")
def add_user_to_group(group_id: UUID, user_id: UUID, token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
        )
    res = addUserToGroup(group_id, user_id)
    return {"message": "User added to group"}