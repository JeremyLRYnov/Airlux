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


# Arduino IDE & ESP32

## Installation

Cliquez sur le lien pour télécharger [Arduino IDE](https://www.arduino.cc/en/software)

## Tutoriel pour utiliser l'ESP32 avec Arduino IDE

Une fois Arduino IDE installé il faut mettre des add-on afin de faire fonctionner l'ESP32 sur Arduino IDE.

1 - Pour cela il faut tout d'abord aller dans l'onglet **File** et cliquer sur **Preferences** :

![Preferences](https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2016/12/arduino-ide-open-preferences.png?w=196&quality=100&strip=all&ssl=1image.png)

2 - La fenêtre **Preferences** va s'ouvrir et il faudra ajouter le lien : https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json dans **"Additional Board Manager URLs"**.

![Preferences2](https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2022/04/ESP32-URL-Arduino-IDE.png?w=828&quality=100&strip=all&ssl=1)

3 - Il faut ensuite cliquer sur l'onglet **Tools**, aller sur Board, appuyer sur **Boards Manager**

![BoardManager](https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2018/06/boardsManager.png?w=628&quality=100&strip=all&ssl=1)

4- Dans la fenêtre **Boards Manager** il faut rechercher **esp32** et installer **esp32 by Espressif Systems**

![espressif](https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2018/06/installing.png?w=786&quality=100&strip=all&ssl=1)

## Tester l'ESP32

1 - Tout d'abord il faut cliquer sur l'onglet **Tools**, faire **Board** et choisir le board **DOIT ESP32 DEVKIT V1** *( on peut choisir d'autres boards liés a l'esp32 )*.

![choixBoard](https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2016/12/windows-select-board.png?w=614&quality=100&strip=all&ssl=1)


2 - Il faut ensuite selectionner le port de l'ESP32. Pour cela il faut aller dans l'onglet **Tools** > **Port** et choisir le port **COM4**

![choixPort](https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2018/08/com-port-selected.jpg?w=687&quality=100&strip=all&ssl=1)

3 - Une fois le Board et le Port choisis on peut lancer notre code réalisé sur Arduino IDE sur notre ESP32. Pour cela il faut cliquer sur le bouton **Upload**

![upload](https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2016/12/arduino-ide-upload-button.png?resize=34%2C29&quality=100&strip=all&ssl=1)

4 - Pour voir les logs de l'ESP32 il faut cliquer sur le bouton **Serial Monitor**

![serialMonitor](https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2016/12/mac-open-arduino-ide-serial-monitor.png?resize=38%2C29&quality=100&strip=all&ssl=1) 

et mettre le **baud rate** écrit dans le code *(Par exemple 115200)

![baudRate](https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2016/12/windows-arduino-ide-serial-monitor.png?w=646&quality=100&strip=all&ssl=1) 


# Processus pour la connexion de l'ESP32 au WiFi


Vous trouverez ci-dessous le processus de connexion au WiFi avec l'ESP32.

![Processus](https://cdn.discordapp.com/attachments/1030042569519923221/1068471993919357000/process_connexion_esp32.png)
