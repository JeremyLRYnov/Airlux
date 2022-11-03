# Airlux

# Docker commands

**FROM** qui vous permet de définir l'image source ;

**RUN** qui vous permet d’exécuter des commandes dans votre conteneur ;

**ADD** qui vous permet d'ajouter des fichiers dans votre conteneur ;

**WORKDIR** qui vous permet de définir votre répertoire de travail ;

**EXPOSE** qui permet de définir les ports d'écoute par défaut ;

**VOLUME** qui permet de définir les volumes utilisables ;

**CMD** qui permet de définir la commande par défaut lors de l’exécution de vos conteneurs Docker.

# Instructions

Pour la création d'une image Docker, il faut créer un dockerfile pour lui indiquer le nécessaire :

1. Il faut pouvoir lui installer avec "RUN" les dépendances sqlite pour son fonctionnement
2. Faire une "COPY" ou "ADD" les fichiers nécessaires dans l'image Docker (fichiers .sqlite)
3. Il faut lui configurer un "VOLUME" pour la persistance des données
4. Définir un port avec "EXPOSE" (3306 par exemple)

On peut ensuite build l'image docker avec "docker run"
