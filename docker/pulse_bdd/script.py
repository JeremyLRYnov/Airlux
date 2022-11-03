import redis

redis = redis.Redis(
    host= 'localhost',
    port= '6379')

redis.set('temperature', 23)
redis.set('humidity', 20)
value = redis.get('temperature', 'humidity')
print(value)

