from fastapi import HTTPException
from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from typing import List, Optional
import mysql.connector
import time

from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")


class Group(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    user_ids: List[UUID]

# Connexion à la base de données MySQL
def connect_to_database():
    try:
        db_connection = mysql.connector.connect(
            host = DB_HOST,
            user = DB_USER,
            password = DB_PASSWORD,
            database = DB_DATABASE
        )
        return db_connection
    except mysql.connector.Error as err:
        print(f"MySQL connection error: {err}")
        return None

db_connection = connect_to_database()


def getAllGroups():
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Groupe")
        groups = cursor.fetchall()
        
        # Récupérer les user_ids pour chaque groupe
        for group in groups:
            cursor.execute("SELECT user_id FROM Group_User WHERE group_id = %s", (group["id"],))
            user_ids = [user_id["user_id"] for user_id in cursor.fetchall()]
            group["user_ids"] = user_ids
        
        cursor.close()
        return groups
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    

def createGroup(group : Group):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor()

        # Vérication que tous les utilisateurs existent
        for user_id in group.user_ids:
            cursor.execute("SELECT * FROM User WHERE id = %s", (str(user_id),))
            user = cursor.fetchone()
            if user is None:
                raise HTTPException(status_code=400, detail=f"User {user_id} does not exist")

        cursor.execute("INSERT INTO Groupe (id, name) VALUES (%s, %s)", 
                       (str(group.id), group.name))

        for user_id in group.user_ids:
            cursor.execute("INSERT INTO Group_User (group_id, user_id) VALUES (%s, %s)", 
                           (str(group.id), str(user_id)))

        db_connection.commit()
        cursor.close()
        return group
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    
def getGroupById(group_id):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Groupe WHERE id = %s", (str(group_id),))
        group = cursor.fetchone()
        
        if group is None:
            raise HTTPException(status_code=404, detail="Group not found")
        
        cursor.execute("SELECT user_id FROM Group_User WHERE group_id = %s", (group_id,))
        user_ids = [user_id["user_id"] for user_id in cursor.fetchall()]
        group["user_ids"] = user_ids
        
        cursor.close()
        return group
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    
def getAllGroupsOfUser(user_id):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT group_id FROM Group_User WHERE user_id = %s", (str(user_id),))
        group_ids = [group_id["group_id"] for group_id in cursor.fetchall()]
        
        groups = []
        for group_id in group_ids:
            cursor.execute("SELECT * FROM Groupe WHERE id = %s", (group_id,))
            group = cursor.fetchone()
            cursor.execute("SELECT user_id FROM Group_User WHERE group_id = %s", (group_id,))
            user_ids = [user_id["user_id"] for user_id in cursor.fetchall()]
            group["user_ids"] = user_ids
            groups.append(group)
        
        cursor.close()
        return groups
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")


def removeUserFromGroup(group_id: UUID, user_id: UUID):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor()

        cursor.execute("DELETE FROM Group_User WHERE group_id = %s AND user_id = %s", 
                       (str(group_id), str(user_id)))

        db_connection.commit()
        cursor.close()
        return {"message": "User removed from group"}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    

def addUserToGroup(group_id: UUID, user_id: UUID):
    try:
        if not db_connection.is_connected():
            db_connection.reconnect()
        cursor = db_connection.cursor()

        cursor.execute("INSERT INTO Group_User (group_id, user_id) VALUES (%s, %s)", 
                       (str(group_id), str(user_id)))

        db_connection.commit()
        cursor.close()
        return {"message": "User added to group"}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
