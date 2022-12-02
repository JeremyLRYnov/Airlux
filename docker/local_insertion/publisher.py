import redis
import paho.mqtt.client as mqtt

r = redis.StrictRedis('redis', 6379, charset="utf-8", decode_responses=True)

#hostname
broker="mosquitto"
#port
port=1883
#time to live
timelive=60



def on_connect(client, userdata, flags, rc):
  print("Connected with result code "+str(rc))
  client.subscribe("/temperature")
def on_message(client, userdata, msg):
    print(msg.payload.decode())
    r.mset({'temperature' : msg.payload.decode()})

    #check that the data is present on the Redis database
    value = r.get('temperature')
    print("test temperature : " + value)
    
client = mqtt.Client()

client.on_connect = on_connect
client.on_message = on_message

client.connect(broker,port,timelive)

client.loop_forever()