#include <WiFi.h>
#include <WiFiManager.h>
#include "WifiConnexion.h"

const char* ssid = SECRET_SSID_POINT_ACCESS; //a changer selon wifi
const char* password = SECRET_PASS_POINT_ACCESS; //a changer selon wifi

const int mqttPort = 1883;

//IPAddress ip (192, 168, 1, 72); // Ip du pc a changer a chaque fois

WiFiManager wifiManager;

void setup() {
  Serial.begin(115200);

  connexion_wifi();
  
}

void loop() {
  // Faire quelque chose après la connexion WiFi...
}

void connexion_wifi(){

  wifiManager.resetSettings(); //pour supprimer les informations de connexion wifi sauvegardés
  Serial.println("Suppression des anciennes données");
  Serial.println("Connexion au WiFi");

  wifiManager.startConfigPortal(ssid,password); // ouvre un point d'acces sur l'esp32
                                            // se connecter a ce point d'acces avec tel/pc
                                            // configurer la connexion au wifi avec l'ip sur l'onglet du serial monitor

  Serial.println("Connecte au WiFi");
  Serial.println(WiFi.localIP());   // afficher l'adresse IP obtenue
}

void send_data_mqtt(){

}