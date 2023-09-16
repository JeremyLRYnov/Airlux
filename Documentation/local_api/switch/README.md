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

## Mise à jour du status d'un switch

PATCH ``http://localhost:6869/switch/updateStatus``

Pour notre exemple : ``http://localhost:6869/switch/updateStatus/01HA7BHS6EYTTQTNYXJGHRJ7Q8``

JSON exemple à envoyer : 

```JSON
{
    "status": false
}
```

Résultat : 

```JSON
{
    "result": {
        "entityId": "01HA7BHS6EYTTQTNYXJGHRJ7Q8",
        "name": "lumiere",
        "switchId": "3",
        "roomId": "01HA7BF7CQ4F1T7XXECGF0A8W3",
        "status": false
    }
}
```

Vous pouvez retrouver les différentes routes ici :

| Routes de user | Routes de building | Routes de room | Routes de sensor | Routes de switch |
| :---:| :---:    | :---:| :---:  | :---:  |
| [User](../user/README.md) | [Building](../building/README.md) | [Room](../room/README.md) | [Sensor](../sensor/README.md) | [Switch](../switch/README.md) |