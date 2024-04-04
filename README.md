# Projet_WatchOurMovie

## Architecture

![asset/architecture.png](asset/architecture.png)

- API : FastAPI
- Recommendation engine : Python (probablement un module interne)
- Frontend : React/Angular
- Caching : A voir
- Identity Provider : OAuth/Keycloak ? (Gestion JWT interne suffisante)
- User Management : Go (Ou du Python en tant que module interne)
- DB : MySQL/MariaDB

on part sur `Recommendation engine` et `User Manager` en tant que module interne de l'api et le systeme de caching de requête aussi avec le module `cachetools`
