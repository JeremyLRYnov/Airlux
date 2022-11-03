import redis
import random

redis = redis.Redis(
    host= 'redis',
    port= '6379')
while(True):
    redis.set('temperature', random.randint(0, 40))
    value = redis.get('temperature')
    print(value)
