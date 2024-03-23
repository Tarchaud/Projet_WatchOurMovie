# Utiliser une image de base Python officielle.
FROM python:3.9-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /code

# Copier les fichiers de dépendances et installer les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copier les fichiers locaux dans le conteneur
COPY ./ .

# Commande pour lancer l'application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]