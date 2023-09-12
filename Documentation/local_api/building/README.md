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

## Recherche de building par userId du createdBy


GET ``http://localhost:6869/building/userId/:userId``

Pour notre exemple ``http://localhost:6869/building/userId/01H9Z9KGSQW488MKXPZVVT08TS``

Résultat :

```JSON
{
    "result": [
        {
            "entityId": "01HA4C2WBW3TKEACQ4WXYQP5GC",
            "name": "Salon",
            "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
            "users": [
                "jeremy1@orange.fr",
                "jeremy2@orange.fr",
                "jeremy@orange.fr",
                "jeremy65@orange.fr"
            ]
        },
        {
            "entityId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ",
            "name": "Bureau",
            "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
            "users": [
                "jeremy5@orange.fr",
                "jeremy65@orange.fr"
            ]
        }
    ]
}
```

## Recherche de building par email de users

GET `` http://localhost:6869/building/userEmail/:email``

Pour notre exemple : ``http://localhost:6869/building/userEmail/jeremy1@orange.fr``

Résultat : 

```JSON
{
    "result": [
        {
            "entityId": "01HA4C2WBW3TKEACQ4WXYQP5GC",
            "name": "Salon",
            "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
            "users": [
                "jeremy1@orange.fr",
                "jeremy2@orange.fr",
                "jeremy@orange.fr",
                "jeremy65@orange.fr"
            ]
        },
        {
            "entityId": "01HA4D6T95XZ969MDFF80YHZF8",
            "name": "Chambre3",
            "createdBy": "01HA4BX94GSMFXF3MMXJR3AD7N",
            "users": [
                "jeremy5@orange.fr",
                "jeremy1@orange.fr",
                "jeremy2@orange.fr"
            ]
        },
        {
            "entityId": "01HA4C7H7HR8QNBVR8JDXS22XT",
            "name": "Chambre2",
            "createdBy": "01HA4BX94GSMFXF3MMXJR3AD7N",
            "users": [
                "jeremy5@orange.fr",
                "jeremy1@orange.fr",
                "jeremy2@orange.fr"
            ]
        },
        {
            "entityId": "01HA4C6FDN34XTWN30DHS9WAKB",
            "name": "Chambre1",
            "createdBy": "01HA4BX94GSMFXF3MMXJR3AD7N",
            "users": [
                "jeremy5@orange.fr",
                "jeremy1@orange.fr",
                "jeremy2@orange.fr"
            ]
        }
    ]
}
```

## Recherche de building par user

POST ``http://localhost:6869/building/user``

JSON exemple à envoyer : 

```JSON
{
    "userId": "01H9Z9KGSQW488MKXPZVVT08TS",
    "email": "jeremy5@orange.fr"
}
```

Résultat :

```JSON
{
    "buildingByCreatedBy": [
        {
            "entityId": "01HA4C2WBW3TKEACQ4WXYQP5GC",
            "name": "Salon",
            "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
            "users": [
                "jeremy1@orange.fr",
                "jeremy2@orange.fr",
                "jeremy@orange.fr",
                "jeremy65@orange.fr"
            ]
        },
        {
            "entityId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ",
            "name": "Bureau",
            "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
            "users": [
                "jeremy5@orange.fr",
                "jeremy65@orange.fr"
            ]
        }
    ],
    "buildingByUserEmail": [
        {
            "entityId": "01HA4D6T95XZ969MDFF80YHZF8",
            "name": "Chambre3",
            "createdBy": "01HA4BX94GSMFXF3MMXJR3AD7N",
            "users": [
                "jeremy5@orange.fr",
                "jeremy1@orange.fr",
                "jeremy2@orange.fr"
            ]
        },
        {
            "entityId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ",
            "name": "Bureau",
            "createdBy": "01H9Z9KGSQW488MKXPZVVT08TS",
            "users": [
                "jeremy5@orange.fr",
                "jeremy65@orange.fr"
            ]
        },
        {
            "entityId": "01HA4C7H7HR8QNBVR8JDXS22XT",
            "name": "Chambre2",
            "createdBy": "01HA4BX94GSMFXF3MMXJR3AD7N",
            "users": [
                "jeremy5@orange.fr",
                "jeremy1@orange.fr",
                "jeremy2@orange.fr"
            ]
        },
        {
            "entityId": "01HA4C6FDN34XTWN30DHS9WAKB",
            "name": "Chambre1",
            "createdBy": "01HA4BX94GSMFXF3MMXJR3AD7N",
            "users": [
                "jeremy5@orange.fr",
                "jeremy1@orange.fr",
                "jeremy2@orange.fr"
            ]
        }
    ]
}
```
On peut remarquer que, du coup, le bureau apparaît deux fois. Il ne faut surtout pas renseigner l'adresse e-mail dans le champ "users" de l'utilisateur qui a créé le bâtiment.

____

Vous pouvez retrouver les différentes routes ici :

| Routes de user | Routes de building | Routes de room | Routes de sensor | Routes de switch |
| :---:| :---:    | :---:| :---:  | :---:  |
| [User](../user/README.md) | [Building](../building/README.md) | [Room](../room/README.md) | [Sensor](../sensor/README.md) | [Switch](../switch/README.md) |