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

## Récupérer toutes les rooms

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

## Récupérer les rooms à partir de l'Id d'un building

GET ``http://localhost:6869/room/buildingId/:id``

Pour notre exemple : ``http://localhost:6869/room/buildingId/01HA7BBQJJJY0T1H1K0WKB1GYW``

L'ID que l'on utilise est celui d'un building !

Résultat : 

```JSON
{
    "result": [
        {
            "entityId": "01HA7BF7CQ4F1T7XXECGF0A8W3",
            "name": "Salon",
            "buildingId": "01HA7BBQJJJY0T1H1K0WKB1GYW"
        },
        {
            "entityId": "01HAF05830T0V53W1MX2MD6P1R",
            "name": "Chambre",
            "buildingId": "01HA7BBQJJJY0T1H1K0WKB1GYW"
        },
        {
            "entityId": "01HAF05JGKQHB42HCWGPM4PTSD",
            "name": "Toilettes",
            "buildingId": "01HA7BBQJJJY0T1H1K0WKB1GYW"
        },
        {
            "entityId": "01HAF05R1Q0YDQKFC1SVWZQM19",
            "name": "Cuisine",
            "buildingId": "01HA7BBQJJJY0T1H1K0WKB1GYW"
        },
        {
            "entityId": "01HAF05XZGPCRE4FCDHRE42SYB",
            "name": "Garage",
            "buildingId": "01HA7BBQJJJY0T1H1K0WKB1GYW"
        }
    ]
}
```

Vous pouvez retrouver les différentes routes ici :

| Routes de user | Routes de building | Routes de room | Routes de sensor | Routes de switch |
| :---:| :---:    | :---:| :---:  | :---:  |
| [User](../user/README.md) | [Building](../building/README.md) | [Room](../room/README.md) | [Sensor](../sensor/README.md) | [Switch](../switch/README.md) |