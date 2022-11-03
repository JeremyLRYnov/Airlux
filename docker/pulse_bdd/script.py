import redis
import random
import asyncio

redis = redis.Redis(
    host= 'redis',
    port= '6379')

async def main():
    temperature = random.randint(0, 40)
    humidity = random.randint(0, 100)
    while(True):
        redis.set('temperature', temperature)
        value = redis.get('temperature')
        
        print(value)
        redis.set('humidity', humidity)
        value = redis.get('humidity')
        print(value)

        temperature = await set_humidity(5000,temperature)
        humidity = await set_temperature(5000,humidity)

async def set_humidity(delay, value):
    await asyncio.sleep(delay)
    random_value = random.randint(0,1)
    if random_value == 0 :
        value = value + 1
    else:
        value = value - 1
    if value > 100:
        value = 100
    if value < 0:
        value = 0
    return value
        
async def set_temperature(delay, value):
    await asyncio.sleep(delay)
    random_value = random.randint(0,1)
    if random_value == 0 :
        value = value + 1
    else:
        value = value - 1
    if value > 50:
        value = 50
    if value < -10:
        value = -10
    return value
