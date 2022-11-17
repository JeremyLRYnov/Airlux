
# Comment utiliser Docker-compose


## Docker Compose

### Pour lancer le docker-compose

docker-compose up -d

### Pour arrêter les dockers

docker-compose stop

## Docker Container

### Pour vérifier si les container se sont lancer

docker ps

### Pour supprimer des container dockers

docker rm ID_or_Name ID_or_Name

### Pour supprimer touts les container dockers

docker rm -vf
## Docker Images

### Pour vérifier les images

docker images

### Pour supprimer une images

docker rmi nom-image

### Pour supprimer toutes les images

docker rmi -f
## Docker Network

### Pour connaître les différent réseau

docker network ls

### Pour vérifier si ils sont dans le même réseau

docker network inspect docker_nom-network

