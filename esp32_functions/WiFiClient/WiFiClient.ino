#include <WiFi.h>
#include <WiFiManager.h>
#include "WifiConnexion.h"
#include <DHT.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>


#define DHTPIN 14
#define DHTTYPE DHT11

WiFiServer server(80);
WiFiClient client;
PubSubClient mqttClient(client);

const char* ssid = SECRET_SSID_POINT_ACCESS; //a changer selon wifi
const char* password = SECRET_PASS_POINT_ACCESS; 

//mettre l'adresse ip (ipconfig) de l'ordinateur avec le docker mosquitto lancé
const char* ipbroker = "ip ordinateur docker";
int portbroker = 1883;

DHT dht(DHTPIN, DHTTYPE);

bool AccessPointOn = true;

void setup() {

  Serial.begin(115200);
  dht.begin();
  pointAccesWifi();
  server.begin();

}

void loop() {

  
  connectionWifi();
  if (!AccessPointOn) {
      //si le point d'accès est éteint se connecter au mqtt
      mqttClient.setServer(ipbroker, portbroker);
      mqttClient.connect("ESP32");
      Serial.println("Connecté au broker MQTT!");
      gestionSensors();
      mqttClient.loop();
    }
  
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
    AccessPointOn = false;
  }

}

void gestionSensors(){

  // Si le WiFi est connecté, afficher les données du capteur
  if (WiFi.status() == WL_CONNECTED) {
    gestionTemperature();
    gestionHumidite();
    delay(30000);
  }

}

void gestionTemperature(){

    float t = dht.readTemperature();
    //Lis la température en degré celsius

    if (!isnan(t)) {
      Serial.print("Temperature: ");
      Serial.print(t);
      Serial.println("°C");
      // Transmet la température dans le moniteur série

      StaticJsonDocument<200> doc;
      doc["id"] = "1";
      doc["value"] = t;

      String json;
      serializeJson(doc, json);

      mqttClient.connect("ESP32"); // Connexion au broker MQTT
      mqttClient.publish("temperature", json.c_str()); // Envoie des données MQTT
      Serial.println("Envoi temperature sur MQTT");
      mqttClient.disconnect(); // Déconnexion du broker MQTT
    }
}

void gestionHumidite(){

    float h = dht.readHumidity();
    //Lis le taux d'humidite en %

    if (!isnan(h)) {
      Serial.print("Humidité: ");
      Serial.print(h);
      Serial.println("%");
      // Transmet le taux d'humidité dans le moniteur série

      StaticJsonDocument<200> doc;
      doc["id"] = "2";
      doc["value"] = h;

      String json;
      serializeJson(doc, json);

      mqttClient.connect("ESP32"); // Connexion au broker MQTT
      mqttClient.publish("humidite", json.c_str()); // Envoie des données MQTT
      Serial.println("Envoi humidite sur MQTT");
      mqttClient.disconnect(); // Déconnexion du broker MQTT
    }
}