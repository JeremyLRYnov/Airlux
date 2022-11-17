

# Docker

Nous utilisons Docker pour créer et utiliser différents conteneurs, utiles pour
la simulation de notre environnement final.

## Contenu du Docker compose

Le Docker compose crée actuellement dans les services :
- une base de données locale Redis
- une base de données distante MySQL
- un pulseur python (avec filter)
- un reader python

## Présentation du Docker compose

#### Base de données locale Redis | docker-compose.yml
```yml
    redis:
        image: redis
        environment:
          - ALLOW_EMPTY_PASSWORD=yes
        volumes:
          - ./local_server:/data
        build: local_server
        ports:
          - 6379
```

#### Base de données distante MySQL | docker-compose.yml
```yml
    mysql:
        image: mysql
        environment:
          - MYSQL_ALLOW_EMPTY_PASSWORD=yes
          - MYSQL_DATABASE=db
        volumes:
          - ./cloud_server:/data
        build: cloud_server
        ports:        
          - 3306:80
```
#### Pulseur python | docker-compose.yml
```yml
    pulseur:
        image: pulseur
        stdin_open: true
        tty: true
        volumes:
          - ./pulse_bdd:/data
        build: pulse_bdd
        ports:
          - 7080:83
```

#### Reader python | docker-compose.yml
```yml
    reader:
        image: reader
        stdin_open: true
        tty: true
        volumes:
          - ./reader:/data
        build: reader
        ports:
          - 8000
```

### Commandes Docker

#### Gestion des conteneurs 
- Créer les images et lancer les conteneurs : ```$ docker-compose up -d ```
- Arrêter les conteneurs : ```$ docker-compose stop ```
- Afficher l'état des conteneurs : ```$ docker ps ```
- Supprimer des conteneurs : ```$ docker rm ID_or_Name ID_or_Name ```
- Supprimer tous les conteneurs : ```$ docker rm -vf ```
#### Gestion des images
- Afficher les images : ```$ docker images ``` 
- Supprimer une image Docker : ```$ docker rmi nom-image ```
- Supprimer toutes les images Docker : ```$ docker rmi -f ```
#### Gestion des réseaux
- Afficher les différents réseaux : ```$ docker network ls ```
- Comparer les réseaux : ```$ docker network inspect docker_nom-network ```

