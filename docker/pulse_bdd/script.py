import redis
import random
import asyncio
import time
import filter_script

# Redis Authentication
redis = redis.Redis(
    host= 'redis',
    port= '6379')

# Pulsor
async def main():
    temperature = random.randint(-10, 50)
    humidity = random.randint(0, 100)
    boucle = True
    while(boucle):

        #Call of the filter function
        filter_script.filter(temperature, humidity)
        #Change the value of temperature and humidity
        temperature = await set_temperature(temperature)
        humidity = await set_humidity(humidity) 

# Temperature Controller
async def set_temperature(value):
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
        
# Humidity Controller
async def set_humidity(value):
    random_value = random.randint(0,2)
    if random_value == 0 :
        value = value + 1
    if random_value == 1:
        value = value - 1
    if random_value == 2:
        value = value
    
    if value > 100:
        value = 100
    if value < 0:
        value = 0
        
    return value

asyncio.run(main())