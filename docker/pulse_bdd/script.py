import redis
import random
import asyncio
import time
import filter_script

redis = redis.Redis(
    host= 'redis',
    port= '6379')

async def main():
    temperature = random.randint(0, 40)
    humidity = random.randint(0, 100)
    boucle = True
    while(boucle):

        filter_script.filter(temperature, humidity)
        temperature = await set_temperature(temperature)
        humidity = await set_humidity(humidity)

async def set_temperature(value):
    random_value = random.randint(0,1)
    if random_value == 0 :
        value = value + 1
    if random_value == 1:
        value = value - 1
    if random_value == 2:
        value = value

    if value > 50:
        value = 50
    if value < -10:
        value = -10

    return value
        
async def set_humidity(value):
    random_value = random.randint(0,2)
    if random_value == 0 :
        value = value + 1
    if random_value == 1:
        value = value - 1
    if random_value == 2:
        value = value
    
    if value > 50:
        value = 50
    if value < -10:
        value = -10
        
    return value

asyncio.run(main())