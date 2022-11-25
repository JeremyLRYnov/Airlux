import redis

#Initialisation de l'instance
r = redis.Redis(
    host=redis,
    port=6379,
    decode_responses=True # <-- this will ensure that binary data is decoded
)

# Publication d'un message sur le canal "temperature"
message = "This is a test message"
r.publish('temperature', message)

