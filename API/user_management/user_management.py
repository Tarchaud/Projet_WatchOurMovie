import mysql.connector
from uuid import UUID
from typing import List

class RecommandationSystem:
    def __init__(self, db_params):
        self.db_params = db_params

    def connect_to_database(self):
        try:
            db_connection = mysql.connector.connect(**self.db_params)
            return db_connection
        except mysql.connector.Error as err:
            print(f"Database error: {err}")
            return None

    def get_most_popular_films(self, db_connection):
        try:
            cursor = db_connection.cursor(dictionary=True)
            cursor.execute("SELECT film_id, COUNT(*) as count FROM User_film GROUP BY film_id ORDER BY count DESC LIMIT 10")
            popular_films = cursor.fetchall()
            cursor.close()
            return [film['film_id'] for film in popular_films]
        except mysql.connector.Error as err:
            print(f"Database error: {err}")
            return []

    def read_user_films(self, user_id: UUID, db_connection):
        try:
            cursor = db_connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM User_film WHERE user_id = %s", (str(user_id),))
            user_films = cursor.fetchall()
            cursor.close()
            return user_films
        except mysql.connector.Error as err:
            print(f"Database error: {err}")
            return []

    def calculer_recommandations(self, user_id: UUID, max_recommandations=5):
        db_connection = self.connect_to_database()
        if not db_connection:
            return []

        user_films = self.read_user_films(user_id, db_connection)
        user_film_ids = {film['film_id'] for film in user_films}

        popular_films = self.get_most_popular_films(db_connection)
        
        recommandations = []
        for film_id in popular_films:
            if film_id not in user_film_ids:
                recommandations.append(film_id)
                if len(recommandations) >= max_recommandations:
                    break

        db_connection.close()
        return recommandations
