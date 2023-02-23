#include <WiFi.h>
#include <WiFiManager.h>
#include "WifiConnexion.h"

WiFiServer server(80);
WiFiClient client;
const char* ssid = SECRET_SSID_POINT_ACCESS; //a changer selon wifi
const char* password = SECRET_PASS_POINT_ACCESS; 

void setup() {
  Serial.begin(115200);
  // listen for incoming clients
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid, password);
  Serial.println();
  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());

  server.begin();

}

void loop() {
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