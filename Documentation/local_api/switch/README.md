# Routes "switch"

## Création d'un switch

POST ``http://localhost:6869/switch/create``

JSON exemple à envoyer :

```JSON
{
    "name": "lumière",
    "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
    "status": true
}
```

Résultat : 

```JSON
{
    "result": {
        "id": "01H9ZX2C28MWABY68G5RKMK2VF",
        "name": "lumière",
        "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
        "status": true
    }
}
```

## Récupérer un switch

GET ``http://localhost:6869/switch/:id``

Pour notre exemple : ``http://localhost:6869/switch/01H9ZX2C28MWABY68G5RKMK2VF``

Résultat : 

```JSON
{
    "result": {
        "entityId": "01H9ZX2C28MWABY68G5RKMK2VF",
        "name": "lumière",
        "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
        "status": true
    }
}
```

## Récupérer tous les switchs

GET ``http://localhost:6869/switch/``

Résultat : 

```JSON
{
    "result": [
        {
            "entityId": "01H9ZX2C28MWABY68G5RKMK2VF",
            "name": "lumière",
            "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
            "status": true
        },
        {
            "entityId": "01H9ZX5XZC2TAYWK7XY6JTR8J6",
            "name": "volet",
            "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
            "status": false
        }
    ]
}
```

## Supprimer un switch

DELETE ``http://localhost:6869/switch/:id``

Pour notre exemple : ``http://localhost:6869/switch/01H9ZX5XZC2TAYWK7XY6JTR8J6``

Résultat : 

```JSON
{
    "message": "Switch 01H9ZX5XZC2TAYWK7XY6JTR8J6 deleted successfully."
}
```

## Mise à jour d'une switch

PATCH ``http://localhost:6869/switch/:id``

Pour notre exemple : ``http://localhost:6869/switch/01H9ZX2C28MWABY68G5RKMK2VF``

JSON exemple à envoyer : 

```JSON
{
    "name": "lumière",
    "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
    "status": false
}
```

Résultat : 

```JSON
{
    "result": {
        "entityId": "01H9ZX2C28MWABY68G5RKMK2VF",
        "name": "lumière",
        "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
        "status": false
    }
}
```