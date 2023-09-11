# Routes "user"

## Inscription

POST ``http://localhost:6869/user/signup``

JSON exemple à envoyer :

```JSON
{
  "name": "jeremy5",
  "email": "jeremy5@orange.fr",
  "password": "password",
  "admin": true
}
```

Résultat : 

```JSON
{
    "message": "Inscription réussi",
    "result": {
        "id": "01H9Z9KGSQW488MKXPZVVT08TS",
        "name": "jeremy5",
        "email": "jeremy5@orange.fr",
        "admin": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcmVteTVAb3JhbmdlLmZyIiwiaWQiOiIwMUg5WjlLR1NRVzQ4OE1LWFBaVlZUMDhUUyIsImlhdCI6MTY5NDM0MTEyMCwiZXhwIjoxNzAyMTE3MTIwfQ.RTtoBqAXPftWvVN41Z9JN3tya5B9Yb41DowDyXen5Js"
}
```

## Connexion

POST ``http://localhost:6869/user/signin``

JSON exemple à envoyer :

```JSON
{
  "email": "jeremy5@orange.fr",
  "password": "password"
}
```

Résultat : 

```JSON
{
    "message": "Connexion réussi",
    "result": {
        "id": "01H9Z9KGSQW488MKXPZVVT08TS",
        "name": "jeremy5",
        "email": "jeremy5@orange.fr",
        "admin": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcmVteTVAb3JhbmdlLmZyIiwiaWQiOiIwMUg5WjlLR1NRVzQ4OE1LWFBaVlZUMDhUUyIsImlhdCI6MTY5NDM0OTk0MywiZXhwIjoxNzAyMTI1OTQzfQ.fHUPi_TXjUK3oau2yolXL4nmLp4xbM4-ntBsQg6XKJo"
}
```
## Récupérer un utilisateur

GET ``http://localhost:6869/user/:id``

Pour notre exemple : ``http://localhost:6869/user/01H9Z9KGSQW488MKXPZVVT08TS``

Résultat :

```JSON
{
    "result": {
        "entityId": "01H9Z9KGSQW488MKXPZVVT08TS",
        "name": "jeremy",
        "email": "jeremy@orange.fr",
        "password": "160797",
        "admin": true
    }
}
```

## Récupérer tous les utilisateurs

GET ``http://localhost:6869/user/``

Résultat : 

```JSON
{
    "result": [
        {
            "entityId": "01H9Z9KGSQW488MKXPZVVT08TS",
            "name": "jeremy5",
            "email": "jeremy5@orange.fr",
            "password": "$2a$12$Ax8d0cBA9sDNBg/DeTUC8O/ArFr9GoILbRLCmRs27CO3sMpikuwwK",
            "admin": true
        },
        {
            "entityId": "01H9ZJ4PAKPD9DTSCD90Q5X4S4",
            "name": "jeremy65",
            "email": "jeremy65@orange.fr",
            "password": "$2a$12$9/AGVQyWgHoBDfWbflrSBuBSjpkAakNQ8yPIfd3/zSaN7IUytkfzG",
            "admin": null
        }
    ]
}
```

## Mise à jour d'un utilisateur

PATCH ``http://localhost:6869/user/:userId``

Pour notre exemple : ```http://localhost:6869/user/01H9Z9KGSQW488MKXPZVVT08TS```

JSON exemple à envoyer :

```JSON
{
  "name": "jeremy",
  "email": "jeremy@orange.fr",
  "password": "160797",
  "admin": true
}
```

Résultat : 

```JSON
{
    "result": {
        "entityId": "01H9Z9KGSQW488MKXPZVVT08TS",
        "name": "jeremy",
        "email": "jeremy@orange.fr",
        "password": "160797",
        "admin": true
    }
}
```

## Supprimer un utilisateur

DELETE ```http://localhost:6869/user/:id```

Pour notre exemple : ```http://localhost:6869/user/01H9ZJ4PAKPD9DTSCD90Q5X4S4```

Résultat : 

```JSON
{
    "result": "User 01H9ZJ4PAKPD9DTSCD90Q5X4S4 deleted successfully."
}
```