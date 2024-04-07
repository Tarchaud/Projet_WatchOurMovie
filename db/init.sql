USE watchOurMoviesDB;

-- Création de la table User
CREATE TABLE IF NOT EXISTS User (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Création de la table Groupe
CREATE TABLE IF NOT EXISTS Groupe (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Création de la table User_film
CREATE TABLE IF NOT EXISTS User_film (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    film_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (film_id) REFERENCES films(id) --ici on fait référence aux films de tmdb
);
