USE watchOurMoviesDB;

-- Création de la table User
CREATE TABLE IF NOT EXISTS User (
    id VARCHAR(36),
    username VARCHAR(255) NOT NULL ,
    PRIMARY KEY (id, username),
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Création de la table Groupe
CREATE TABLE IF NOT EXISTS Groupe (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Création de la table Group_User pour la relation entre les groupes et les utilisateurs
CREATE TABLE IF NOT EXISTS Group_User (
    group_id VARCHAR(36),
    user_id VARCHAR(36),
    PRIMARY KEY (group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES Groupe(id),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Création de la table User_film, films que l'utilisateur a aimé / vus
CREATE TABLE IF NOT EXISTS User_film (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    film_tmdb_id INT, -- Colonne pour stocker les identifiants TMDB des films
    liked BOOLEAN DEFAULT FALSE,
    seen BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES User(id)
);
