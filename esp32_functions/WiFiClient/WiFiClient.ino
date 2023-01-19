#include <WiFi.h>
#include <BluetoothSerial.h>

BluetoothSerial ESP_BT;

const char* ssid = "SSID"; //a changer selon wifi
const char* password = "MDP"; //a changer selon wifi

const int mqttPort = 1883;

IPAddress ip (192, 168, 1, 72); // Ip du pc a changer a chaque fois

void setup() {
  // Ouvrir la communication Bluetooth
  ESP_BT.begin("ESP32_Jeremy");  // Remplacez "ESP32_DeviceName" par le nom de votre appareil
  Serial.begin(115200);

  // Attendre la connexion Bluetooth
  while (!ESP_BT.connected()) {
    delay(1000);
    Serial.println("En attente de la connexion Bluetooth...");
  }
  Serial.println("Connecte au Bluetooth!");

  connexion_wifi();

  deconnexion_bluetooth();
  
}

void loop() {
  // Faire quelque chose après la connexion WiFi...
}

void connexion_wifi(){
  // Se connecter au réseau WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connexion au WiFi...");
  }
  Serial.println("Connecte au WiFi!");
}

void deconnexion_bluetooth(){
  delay(1000);
  Serial.println("Arret du Bluetooth");
  ESP_BT.println("Arret du Bluetooth...");
  delay(1000);
  ESP_BT.flush();
  ESP_BT.disconnect();
  ESP_BT.end();
  Serial.println("Bluetooth terminé");
  delay(1000);
}

void send_data_mqtt(){

}