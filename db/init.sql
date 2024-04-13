USE watchOurMoviesDB;

-- Création de la table User
CREATE TABLE IF NOT EXISTS User (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
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


INSERT INTO User (id, username, password, email) VALUES ("34684a18-5bcf-40be-8343-ba0cb6c5af93", "test","$2b$12$Z6QKaVgWxGVibFDPuEBh9.p2gSRqbZQMlu4uuv/NZA5DG4exmMtEG", "test@test.fr");