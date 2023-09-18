#include <WiFiManager.h>
#include <DHT.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "WifiConnexion.h"


#define DHTPIN 14
#define DHTTYPE DHT11
#define LEDPIN 16

DHT dht(DHTPIN, DHTTYPE);

WiFiServer server(80);
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

const char* ipbroker = SECRET_IP_MQTT;
int portbroker = 1883;

bool lightState = false;
bool wifiConnected = false;
bool AccessPointOn = true;

String ssid_wifi;
String password_wifi;


void setup() {
  Serial.begin(115200);
  pointAcces();
  server.begin();
  pinMode(LEDPIN, OUTPUT);
  dht.begin();
  etatLumiere();
}



void loop() {
  if (!wifiConnected) {
    connectionWifi();
    delay(10000);
  } else {
    if (mqttClient.connected()) {
      gestionConnectedObjects();
      mqttClient.loop();
    } else {
      reconnecterMQTT();
    }
  }
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrivé sur le topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  //si on recoit un message sur le topic switchLight alors changement de l'état de la lumière
  if (String(topic) == "switchLight") {
    Serial.print("Changement de l'état de la lumière");
    lightState = !lightState;
    gestionLumiere();
  }
}

void pointAcces() {
  WiFi.mode(WIFI_AP);
  WiFi.softAP(SECRET_SSID_POINT_ACCESS);
  Serial.println();
  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());
}


void connecterMQTT() {
  mqttClient.setServer(ipbroker, portbroker);
  mqttClient.setCallback(callback);
  if (mqttClient.connect("ESP32")) {
    Serial.println("Connecté au broker MQTT!");
    mqttClient.subscribe("switchLight");
  }
}

void reconnecterMQTT() {
  while (!mqttClient.connected()) {
    Serial.println("Tentative de reconnexion au broker MQTT...");
    connecterMQTT();
    delay(5000);
  }
}

void connectionWifi() {
  Serial.println("Ajouter un ssid et un mot de passe sur l'application mobile");
  wifiClient = server.available();
  if (wifiClient) {
    ssid_wifi = wifiClient.readStringUntil('\n');
    password_wifi = wifiClient.readStringUntil('\n');
    while (ssid_wifi.isEmpty()) {
      
      delay(5000);
      ssid_wifi = wifiClient.readStringUntil('\n');
      password_wifi = wifiClient.readStringUntil('\n');
    }

    ssid_wifi.trim();
    password_wifi.trim();

    WiFi.begin(ssid_wifi.c_str(), password_wifi.c_str());
    while (WiFi.status() != WL_CONNECTED) {
      Serial.println("Connexion au wifi en attente");
      delay(5000);
    }

    wifiConnected = true;
    Serial.print("Connecté au Wi-Fi ");
    Serial.println(ssid_wifi);
    Serial.print("Adresse IP : ");
    Serial.println(WiFi.localIP());
    WiFi.softAPdisconnect(true);
    Serial.print("Point d'accès arrêté : ");
    AccessPointOn = false;
  }
}

void gestionConnectedObjects(){
      gestionSensors();
      gestionSwitchs();
      delay(3000);
}

void gestionSensors(){

    gestionTemperature();
    gestionHumidite();

}

void gestionSwitchs(){
    gestionLumiere();
}

void etatLumiere(){
  digitalWrite(LEDPIN, lightState ? HIGH : LOW); // Allume la lumière si lightState est vrai (true) & Éteint la lumière si lightState est faux (false)
}

void gestionLumiere(){

  etatLumiere();
  Serial.print("Lumiere: ");
  Serial.println(lightState);

  StaticJsonDocument<200> doc;
  doc["id"] = "3";
  doc["name"] = "lumiere";
  doc["status"] = lightState;

  String json;
  serializeJson(doc, json);

  mqttClient.connect("ESP32"); // Connexion au broker MQTT
  mqttClient.publish("lumiere", json.c_str()); // Envoie des données MQTT
  Serial.println("Envoi etat lumiere sur MQTT");
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
      doc["name"] = "temperature";
      doc["value"] = t;
      doc["unit"] = "°C";

      String json;
      serializeJson(doc, json);

      if (mqttClient.connected()) {
      mqttClient.publish("temperature", json.c_str());
      Serial.println("Envoi temperature sur MQTT"); // Envoie des données MQTT
      }
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
      doc["name"] = "humidite";
      doc["value"] = h;
      doc["unit"] = "%";

      String json;
      serializeJson(doc, json);

      if (mqttClient.connected()) {
      mqttClient.publish("humidite", json.c_str());
      Serial.println("Envoi humidite sur MQTT"); // Envoie des données MQTT
      }
    }
}