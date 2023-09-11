# Routes "sensor"

## Création d'un sensor

POST ``http://localhost:6869/sensor/create``

JSON exemple à envoyer :

```JSON
{
    "name": "temperature",
    "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
    "value": 27,
    "unit": "°C"
}
```

Résultat : 

```JSON
{
    "result": {
        "id": "01H9ZVC2DV7VVFHBAZQ0V0V0D7",
        "name": "temperature",
        "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
        "value": 27,
        "unit": "°C"
    }
}
```

## Récupérer un sensor

GET ``http://localhost:6869/sensor/:id``

Pour notre exemple : ``http://localhost:6869/sensor/01H9ZVC2DV7VVFHBAZQ0V0V0D7``

Résultat : 

```JSON
{
    "result": {
        "entityId": "01H9ZVC2DV7VVFHBAZQ0V0V0D7",
        "name": "temperature",
        "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
        "value": 27,
        "unit": "°C"
    }
}
```

## Récupérer tous les sensors

GET ``http://localhost:6869/sensor/``

Résultat : 

```JSON
{
    "result": [
        {
            "entityId": "01H9ZVC2DV7VVFHBAZQ0V0V0D7",
            "name": "temperature",
            "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
            "value": 27,
            "unit": "°C"
        },
        {
            "entityId": "01H9ZVH7DSTJM4VH2FZJ4BZD4Z",
            "name": "humidité",
            "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
            "value": 32,
            "unit": "%"
        }
    ]
}
```

## Supprimer un sensor

DELETE ``http://localhost:6869/sensor/:id``

Pour notre exemple : ``http://localhost:6869/sensor/01H9ZVH7DSTJM4VH2FZJ4BZD4Z``

Résultat : 

```JSON
{
    "message": "Sensor 01H9ZVH7DSTJM4VH2FZJ4BZD4Z deleted successfully."
}
```

## Mise à jour d'une sensor

PATCH ``http://localhost:6869/sensor/:id``

Pour notre exemple : ``http://localhost:6869/sensor/01H9ZVC2DV7VVFHBAZQ0V0V0D7``

JSON exemple à envoyer : 

```JSON
{
    "name": "humidité",
    "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
    "value": 32,
    "unit": "%"
}
```

Résultat : 

```JSON
{
    "result": {
        "entityId": "01H9ZVC2DV7VVFHBAZQ0V0V0D7",
        "name": "humidité",
        "roomId": "01H9ZPGKQ17BT643RPZAAMEN0Y",
        "value": 32,
        "unit": "%"
    }
}
```

Vous pouvez retrouver les différentes routes ici :

| Routes de user | Routes de building | Routes de room | Routes de sensor | Routes de switch |
| :---:| :---:    | :---:| :---:  | :---:  |
| [User](user/README.md) | [Building](building/README.md) | [Room](room/README.md) | [Sensor](sensor/README.md) | [Switch](switch/README.md) |