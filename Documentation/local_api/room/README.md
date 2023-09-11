# Routes "room"

## Création d'une room

POST ``http://localhost:6869/room/create``

JSON exemple à envoyer :

```JSON
{
    "name": "Salon",
    "buildingId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ"
}
```

Résultat : 

```JSON
{
    "result": {
        "id": "01H9ZPGKQ17BT643RPZAAMEN0Y",
        "name": "Salon",
        "buildingId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ"
    }
}
```

## Récupérer une room

GET ``http://localhost:6869/room/:id``

Pour notre exemple : ``http://localhost:6869/room/01H9ZPQ5W6RY0YZ9DAH4F07H85``

Résultat : 

```JSON
{
    "result": {
        "entityId": "01H9ZPQ5W6RY0YZ9DAH4F07H85",
        "name": "Chambre",
        "buildingId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ"
    }
}
```

## Récupérer tous les rooms

GET ``http://localhost:6869/room/``

Résultat : 

```JSON
{
    "result": [
        {
            "entityId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
            "name": "Salon",
            "buildingId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ"
        },
        {
            "entityId": "01H9ZPJ91V2THSM4R3E4F3F6ZE",
            "name": "Chambre",
            "buildingId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ"
        }
    ]
}
```

## Supprimer une room

DELETE ``http://localhost:6869/room/:id``

Pour notre exemple : ``http://localhost:6869/room/01H9ZPQ5W6RY0YZ9DAH4F07H85``

Résultat : 

```JSON
{
    "message": "Room 01H9ZPQ5W6RY0YZ9DAH4F07H85 deleted successfully."
}
```

## Mise à jour d'une room

PATCH ``http://localhost:6869/room/:id``

Pour notre exemple : ``http://localhost:6869/room/01H9ZPGKQ17BT643RPZAAMEN0Y``

JSON exemple à envoyer : 

```JSON
{
    "name": "Chambre",
    "buildingId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ"
}
```

Résultat : 

```JSON
{
    "result": {
        "entityId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
        "name": "Chambre",
        "buildingId": "01H9Z9MBXDRRQKWF7YF3ABK5DQ"
    }
}
```

Vous pouvez retrouver les différentes routes ici :

| Routes de user | Routes de building | Routes de room | Routes de sensor | Routes de switch |
| :---:| :---:    | :---:| :---:  | :---:  |
| [User](user/README.md) | [Building](building/README.md) | [Room](room/README.md) | [Sensor](sensor/README.md) | [Switch](switch/README.md) |