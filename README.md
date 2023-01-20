
![Logo](https://pcdt.fr/images/pd/brand/airlux.svg)


# AirLux

AirLux est une application de domotique avec une architecture complète permettant
à un utilisateur de se connecter, gérer ses appareils et accéder aux différentes
données liées à la température ou à l'humidité par exemple.



## Authors

- [@AlexisB](https://www.github.com/alexibrouard)
- [@JeremyLR](https://github.com/JeremyLRYnov)
- [@JérémyG](https://github.com/Zetsuy)
- [@EnzoP](https://github.com/DaoGod)
- [@NicolasS](https://github.com/Nicolas-3050)


# Architecture Logicielle

## Schéma

Vous trouverez ci-dessous le schéma de l'architecture suivie concernant les
différents conteneurs ainsi que leur fonctionnement / importance.

![Logo](https://cdn.discordapp.com/attachments/1030042569519923221/1065369946575605760/Page_1_1.png)

## Tableau


Obligatoire |
:----------:|
 ~~Pulseur~~ |
 ~~Base de données locale - Redis~~ |
 ~~Base de données distante - MySQL~~ |
 ~~MQTT Mosquitto~~|
 ~~Grafana~~ |
  API Distante/locale - en cours |
  Application mobile - en cours |
  Mise en place de l'ESP32 - en cours |
  Connexion MQTT/API Locale |
  Post API Locale vers Redis |
  Post API Distante vers MySQL |
  Websocket entre API locale et distante |
  Validator |

## Installation

Dans un premier temps, pour faire fonctionner la simulation de notre architecture,
il est nécessaire de suivre plusieurs étapes clés.

### Installation de Git

Si ce n'est pas déjà fait, installez Git :

#### Windows :

Cliquez sur le lien vers [git](https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Installation-de-Git)

#### Linux :
```bash
  $ sudo apt-get update
  $ sudo apt-get install git
```

### Installation de Docker

Pour la simulation, nous utilisons Docker, pour la facilité de gestion de ses
conteneurs :

#### Windows :

Téléchargez [Docker Desktop](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)

#### Linux :

Suivez le guide pour l'installation de [Docker](https://docs.docker.com/engine/install/ubuntu/)

## Déploiement

Pour déployer le projet, vous trouverez un `README` juste [ici](/docker/README.md)
