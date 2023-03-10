#include <WiFi.h>

const char* ssid     = "JeremyPointAcces";
const char* password = "ewhj5675";

const long interval = 8000;

//MQTT Information

const char ipbroker[] = "mosquitto";
int portbroker = 1883;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(10);

    // We start by connecting to a WiFi network

    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    Serial.println();
      
    // Attempt to connect to the defined Wi-Fi network
    Serial.print("- Attempting to connect to the MQTT broker: ");
    Serial.println(broker);


}

void loop() {
  // put your main code here, to run repeatedly:

}
