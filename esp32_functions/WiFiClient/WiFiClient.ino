#include <WiFi.h>
#include <BluetoothSerial.h>

BluetoothSerial ESP_BT;

const char* ssid = "JeremyPointAcces"; //a changer selon wifi
const char* password = "ewhj5675"; //a changer selon wifi

IPAddress ip (192, 168, 0, 40); // Ip du pc a changer a chaque fois

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

  // Lire les données reçues via Bluetooth
  String receivedData = ESP_BT.readString();
  Serial.println("Received: " + receivedData);

  // Se connecter au réseau WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connexion au WiFi...");
  }
  Serial.println("Connecte au WiFi!");
}

void loop() {
  // Faire quelque chose après la connexion WiFi...
}