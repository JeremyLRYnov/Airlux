#include "DHT.h"

#define DHTPIN 14
#define DHTTYPE DHT11


DHT dht(DHTPIN, DHTTYPE); // constructeur pour déclarer notre capteur

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  delay(1000);
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
}