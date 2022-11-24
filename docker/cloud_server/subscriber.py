import redis

# Connexion au redis
r = redis.Redis(
    host= 'redis',
    port= '6379',
    decode_responses=True)

mysql = r.pubsub()

# Inscription au canal "temperature"
mysql.subscribe('temperature')

# Obtention du premier message disponible à lire du canal "temperature"
firstMessage = r.get_message()
print(firstMessage)

