import redis
import random
import asyncio
import time

redis = redis.Redis(
    host= 'redis',
    port= '6379')

async def main():
    temperature = random.randint(0, 40)
    humidity = random.randint(0, 100)
    while(True):
        redis.mset({'temperature' : temperature, 'humidity' : humidity})
        value = redis.get('temperature')
        print(value)
        value = redis.get('humidity')
        print(value)

        temperature = await set_temperature(temperature)
        humidity = await set_humidity(humidity)

        time.sleep(10)

async def set_temperature(value):
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
        
async def set_humidity(value):
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

asyncio.run(main())