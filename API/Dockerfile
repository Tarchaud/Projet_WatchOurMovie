# Utiliser une image de base Python officielle.
FROM python:3.9-slim

# Installer le client mysql pour le script wait for
RUN apt-get update && apt-get install -y default-mysql-client

# Définir le répertoire de travail dans le conteneur
WORKDIR /code

# Copier les fichiers de dépendances et installer les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copier les fichiers locaux dans le conteneur
COPY ./ .

# Copier le script de santé personnalisé dans l'image et ajouter les droits d'exécution
COPY wait-for-mysql.sh /usr/local/bin/wait-for-mysql.sh
RUN chmod +x /usr/local/bin/wait-for-mysql.sh

# Commande pour lancer l'application
CMD /bin/sh -c "/usr/local/bin/wait-for-mysql.sh && uvicorn main:app --host 0.0.0.0 --port 8000"
