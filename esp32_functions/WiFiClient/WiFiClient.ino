#include <WiFiManager.h>
#include <DHT.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "WifiConnexion.h"


#define DHTPIN 14
#define DHTTYPE DHT11
#define LEDPIN 16

DHT dht(DHTPIN, DHTTYPE);

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

//mettre l'adresse ip (ipconfig) de la carte wifi connecté au point d'acces de l'ordinateur avec le docker mosquitto lancé
const char* ipbroker = "ip";
int portbroker = 1883;

bool lightState; 

bool AccessPointOn = true;

unsigned long lastUpdate = 0;
const unsigned long updateInterval = 30000;


void setup() {

  lightState = false;

  Serial.begin(115200);
  pointAccesWifi();
  connecterMQTT();
  mqttClient.setCallback(callback);

  pinMode (LEDPIN, OUTPUT);
  dht.begin();
  etatLumiere();
  

  
}


void loop() {
  connectionWifi();
  if (!AccessPointOn) {
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

  // Feel free to add more if statements to control more GPIOs with MQTT

  // If a message is received on the topic esp32/output, you check if the message is either "on" or "off". 
  // Changes the output state according to the message
  if (String(topic) == "switchLight") {

    Serial.print("Changement de l'état de la lumière");
    lightState = !lightState;
    gestionLumiere();

  }
}

void pointAccesWifi(){
  WiFiManager wifiManager;
  wifiManager.resetSettings();
  wifiManager.autoConnect(SECRET_SSID_POINT_ACCESS);
  Serial.println("ESP connecté au réseau de la maison");
  Serial.print("Adresse IP : ");
  Serial.println(WiFi.localIP());
  AccessPointOn = false;
}

void connecterMQTT(){
  mqttClient.setServer(ipbroker, portbroker);
  if (mqttClient.connect("ESP32")) {
    Serial.println("Connecté au broker MQTT!");
  }

}

void reconnecterMQTT() {
  while (!mqttClient.connected()) {
    Serial.println("Tentative de reconnexion au broker MQTT...");
    if (mqttClient.connect("ESP32")) {
      Serial.println("Connecté au broker MQTT!");
      mqttClient.subscribe("switchLight");
    } else {
      delay(5000);
    }
  }
}

void connectionWifi() {
  if (WiFi.status() != WL_CONNECTED) {
    AccessPointOn = true;
    Serial.println("Déconnecté du Wi-Fi. Redémarrage du point d'accès.");
    WiFi.disconnect(true);
    ESP.restart();
  }
}

void gestionConnectedObjects(){
      gestionSensors();
      gestionSwitchs();
      delay(5000);
}

void gestionSensors(){

    gestionTemperature();
    gestionHumidite();

}

void gestionSwitchs(){

    gestionLumiere();
}

void etatLumiere(){
    if (lightState) {
    digitalWrite(LEDPIN, HIGH);  // Allume la lumière si lightState est vrai (true)
  } else {
    digitalWrite(LEDPIN, LOW);   // Éteint la lumière si lightState est faux (false)
  }
}

void gestionLumiere(){

  etatLumiere();
  Serial.print("Lumiere: ");
  Serial.println(lightState);

  StaticJsonDocument<200> doc;
  doc["id"] = "3";
  doc["value"] = lightState;

  String json;
  serializeJson(doc, json);

  mqttClient.connect("ESP32"); // Connexion au broker MQTT
  mqttClient.publish("lumiere", json.c_str()); // Envoie des données MQTT
  Serial.println("Envoi etat lumiere sur MQTT");
}

void EtatLumiereLancement(){
  Serial.print("Lumiere: ");
  Serial.println(lightState);

  StaticJsonDocument<200> doc;
  doc["id"] = "3";
  doc["value"] = lightState;

  String json;
  serializeJson(doc, json);

  mqttClient.connect("ESP32"); // Connexion au broker MQTT
  mqttClient.publish("lumiere", json.c_str()); // Envoie des données MQTT
  Serial.println("Envoi état initial de la lumière sur MQTT");
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
    }
}