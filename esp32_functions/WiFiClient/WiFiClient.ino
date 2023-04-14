#include <WiFi.h>
#include <WiFiManager.h>
#include "WifiConnexion.h"
#include <DHT.h>

#define DHTPIN 14
#define DHTTYPE DHT11

WiFiServer server(80);
WiFiClient client;

const char* ssid = SECRET_SSID_POINT_ACCESS; //a changer selon wifi
const char* password = SECRET_PASS_POINT_ACCESS; 

DHT dht(DHTPIN, DHTTYPE);

void setup() {

  Serial.begin(115200);
  dht.begin();
  pointAccesWifi();
  server.begin();

}

void loop() {
  
  connectionWifi();
  gestionSensors();
  
}

void pointAccesWifi(){

  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid, password);
  Serial.println();
  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());

}

void connectionWifi(){

  // Écoute les connexions entrantes
  client = server.available();
  if (client) {
    // Lorsqu'une connexion est détectée, lire les données reçues
    String ssid = client.readStringUntil('\n');
    String password = client.readStringUntil('\n');
    Serial.print("ssid: " + ssid);
    Serial.print("password: " + password);

    // Supprime les espaces en début et fin de chaîne
    ssid.trim();
    password.trim();

    // Essaye de se connecter au Wi-Fi
    WiFi.begin(ssid.c_str(), password.c_str());
    while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
    }

    // Connecté au Wi-Fi, affiche l'adresse IP
    Serial.print("Connecté au Wi-Fi ");
    Serial.println(ssid);
    Serial.print("Adresse IP : ");
    Serial.println(WiFi.localIP());
    WiFi.softAPdisconnect(true);
    Serial.print("Point d'acces arrete : ");
  }

}

void gestionSensors(){

  // Si le WiFi est connecté, afficher les données du capteur
  if (WiFi.status() == WL_CONNECTED) {
    // Le DHT11 renvoie au maximum une mesure toute les 1s
    float h = dht.readHumidity();
    //Lis le taux d'humidite en %
    float t = dht.readTemperature();
    //Lis la température en degré celsius

    if (isnan(h) || isnan(t)) {
      Serial.println("Echec reception");
      return;
      //Renvoie une erreur si l'ESP32 ne reçoit aucune mesure
    }

    Serial.print("Humidite: ");
    Serial.print(h);
    Serial.print("%  Temperature: ");
    Serial.print(t);
    Serial.print("°C, ");
    // Transmet les mesures reçues dans le moniteur série
    delay(30000);
  }

}