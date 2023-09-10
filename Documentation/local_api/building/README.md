# Routes "building"

## Création d'un building

POST ``http://localhost:6869/building/create``

JSON exemple à envoyer :

```JSON
{
    "name": "Bureau",
    "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
    "users": [
        "jeremy5@orange.fr"
    ]
}
```

Résultat : 

```JSON
{
    "result": {
        "id": "01H9ZKY5QMAK88Q73BEAG1194T",
        "name": "Bureau",
        "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
        "users": [
            "jeremy5@orange.fr"
        ]
    }
}
```

## Récupérer un building

GET ``http://localhost:6869/building/:id``

Pour notre exemple : ``http://localhost:6869/building/01H9ZMD0SP8J32RBCA5EXRMWJD``

Résultat : 

```JSON
{
    "result": {
        "entityId": "01H9ZMD0SP8J32RBCA5EXRMWJD",
        "name": "Bureau",
        "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
        "users": [
            "jeremy5@orange.fr"
        ]
    }
}
```

## Récupérer tous les buildings

GET ``http://localhost:6869/building/``

Résultat : 

```JSON
{
    "result": [
        {
            "entityId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ",
            "name": "Maison",
            "createdBy": "01H9X49RGKAF5WZBC47H7VHJEP",
            "users": [
                "jeremy5@orange.fr"
            ]
        },
        {
            "entityId": "01H9ZMD0SP8J32RBCA5EXRMWJD",
            "name": "Bureau",
            "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
            "users": [
                "jeremy5@orange.fr"
            ]
        }
    ]
}
```

## Supprimer un building

DELETE ``http://localhost:6869/building/:id``

Pour notre exemple : ``http://localhost:6869/building/01H9ZMD0SP8J32RBCA5EXRMWJD``

Résultat : 

```JSON
{
    "message": "Building 01H9ZMD0SP8J32RBCA5EXRMWJD deleted successfully."
}
```

## Mise à jour d'un building

PATCH ``http://localhost:6869/building/:id``

Pour notre exemple : ``http://localhost:6869/building/01H9Z9MBXDRRQKWF7YF3ABK5DQ``

JSON exemple à envoyer : 

```JSON
{
    "name": "Bureau",
    "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
    "users": [
        "jeremy5@orange.fr",
        "jeremy65@orange.fr"
    ]
}
```

Résultat : 

```JSON
{
    "result": {
        "entityId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ",
        "name": "Bureau",
        "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
        "users": [
            "jeremy5@orange.fr",
            "jeremy65@orange.fr"
        ]
    }
}
```