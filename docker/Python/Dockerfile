FROM python:3.8-slim-buster

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y python3-pip

# Copier le script dans le conteneur
COPY script.py /usr/src/app/


# Installer les dépendances du script
RUN pip install pymysql


# Exécuter le script lorsque le conteneur démarre
CMD ["python", "/usr/src/app/script.py"]
