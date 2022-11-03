# Comment utiliser Docker-compose

## Pour lancer le docker-compose :
docker-compose up -d

## Pour vérifier si les container se sont lancer : 
docker ps

## Pour connaître les différent réseau : 
docker network ls

## Pour vérifier si ils sont dans le même réseau : 
docker network inspect docker_nom-network

Pour le volume, il faut créer un dossier redis et un dossier mysql dans le répertoire où se trouve le docker-compose.
