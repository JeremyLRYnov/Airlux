import redis
import random
import asyncio

redis = redis.Redis(
    host= 'redis',
    port= '6379')

temperature = random.randint(0, 40)
humidity = random.randint(0, 100)

while(True):
    redis.mset({'temperature' : temperature, 'humidity' : humidity})
    value = redis.get('temperature')
    print(value)
    value = redis.get('humidity')
    print(value)

# async def set_temperature(delay, value):
#     await asyncio.sleep(delay)
#     random_value = random.randint(0,1)
#     if random_value == 0 :
#         value = value + 1
#     else:
#         value = value - 1
#     if value > 50:
#         value = 50
#     if value < -10:
#         value = -10
#     return value

#         value = value + 1
#     else:
#         value = value - 1   
#     if value > 100:
#         value = 100
#     if value < 0:
#         value = 0
#     return value
        
# async def set_temperature(delay, value):
#     await asyncio.sleep(delay)
#     random_value = random.randint(0,1)
#     if random_value == 0 :
#         value = value + 1
#     else:
#         value = value - 1
#     if value > 50:
#         value = 50
#     if value < -10:
#         value = -10
#     return value
