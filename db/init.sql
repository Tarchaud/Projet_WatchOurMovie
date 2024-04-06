USE watchOurMoviesDB;

-- Création de la table films
CREATE TABLE IF NOT EXISTS films (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    description VARCHAR(255)
);

-- Insertion de quelques films
INSERT INTO films (id, title, year, description) VALUES 
    ('4e8f7f12-6716-4cf9-8227-8a8a6d1f1e9c', 'The Shawshank Redemption', 1994, 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'),
    ('c0a2a71c-1f8d-4be3-8265-d47708d5af85', 'The Godfather', 1972, 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'),
    ('bc10d957-41af-49a4-89c5-0b2e4fc36c2b', 'The Dark Knight', 2008, 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'),
    ('1f92bc36-1080-4e2c-aef5-7d8284e76a40', 'Inception', 2010, 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'),
    ('9feee3d8-c20d-4264-9b20-4dd845b40f6d', 'Pulp Fiction', 1994, 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.');
