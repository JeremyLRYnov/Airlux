import redis
import paho.mqtt.client as mqtt

broker="mosquitto"

port=1883

timelive=60

#Initialisation de l'instance
r = redis.Redis(
    host=redis,
    port=6379,
    decode_responses=True # <-- this will ensure that binary data is decoded
)

def on_connect(client, userdata, flags, rc):
  print("Connected with result code "+str(rc))
  client.subscribe("/temperature")
  
def on_message(client, userdata, msg):
    print(msg.payload.decode())
    redis.mset({'temperature' : msg.payload.decode()})

            #check that the data is present on the Redis database
    value = redis.get('temperature')
    print(value)
    
client = mqtt.Client()
client.connect(broker,port,timelive)
client.on_connect = on_connect
client.on_message = on_message
client.loop_forever()



# Publication d'un message sur le canal "temperature"
message = "This is a test message"
r.publish('temperature', message)

