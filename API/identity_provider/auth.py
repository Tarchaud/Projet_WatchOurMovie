from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from identity_provider.jwt_utils import create_access_token, verify_password
from controllers.users_controllers import createUser, getUserByUsername

class User(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    username: str
    password: str
    email: str

class UserLogin(BaseModel):
    username: str
    password: str

auth_router = APIRouter(prefix="/auth", tags=["auth"])

# Endpoint pour la création de compte
@auth_router.post("/signup")
def signup(user: User):
    # Mettre la logique de création de compte
    user = createUser(user)
    # On supprime le mot de passe pour des raisons de sécurité
    del user.password
    # Puis si les informations sont valides, générer un token JWT mettre user dans le sub
    access_token = create_access_token(data={"sub": {
        "id": str(user.id),
        "username": user.username,
        "email": user.email
    } })
    return {"access_token": access_token, "token_type": "bearer", "user": user.dict()}

# Endpoint pour la connexion
@auth_router.post("/login")
def login(login_data: UserLogin):
    # Mettre la logique de connexion
    user = getUserByUsername(login_data.username)
    if user is None:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    if not verify_password(login_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")

    # Puis si les informations sont valides, générer un token JWT
    access_token = create_access_token(data={"sub": {
        "id": user["id"],
        "username": user["username"],
        "email": user["email"]
    }})
    user_response = {
        "id": user["id"],
        "username": user["username"],
        "email": user["email"]
    }
    return {"access_token": access_token, "token_type": "bearer", "user": user_response}