import time
import paho.mqtt.client as mqtt

IPADRESSE = "mosquitto"
MQTT_HOST = IPADRESSE
MQTT_PORT = 1883
MQTT_KEEPALIVE_INTERNAL = 60

def connect_mqtt():
    print('host', MQTT_HOST)
    print('port', MQTT_PORT)
    client = mqtt.Client()
    client.on_publish= on_publish
    client.connect(MQTT_HOST, MQTT_PORT, MQTT_KEEPALIVE_INTERNAL)

def on_publish(client,data,result):
    print("Device 1: Data published")
    pass


client = connect_mqtt()


#Filter function who sends the data to Redis database if they are correct
def filter(temperature, humidity):

        #If datas are correct
        if filter_temp(temperature) and filter_humid(humidity):

            client.publish("/temperature",temperature)
            client.publish("/humidity",humidity)

            print(temperature)
            print(humidity)
            #10 second pause
            time.sleep(10)

        #If datas are not correct
        else:

            #Print error message in the logs 
            print('Erreur de données')
            #10 second pause
            time.sleep(10)

#Function that checks that the temperature data is correct
def filter_temp(temperature):

    #If temperature data is int and between -10 and 50
    if isinstance(temperature, int) and temperature >= -10 and temperature<= 50 :
        #OK
        return True

    #Else
    else:
        #Fail
        return False

#Function that checks that the humidity data is correct
def filter_humid(humidity):

    #If humidity data is int and between 0 and 100
    if isinstance(humidity, int) and humidity >= 0 and humidity <= 100:   
        #OK
        return True
    #Else
    else:
        #Fail
        return False