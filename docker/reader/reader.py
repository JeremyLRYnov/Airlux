import redis
import asyncio

redis = redis.Redis(
    host='redis', 
    port=6379)

async def main():
    p = redis.pubsub()
    p.subscribe('temperature')
    p.subscribe('humidity')
    while True:
        message = p.get_message()
        if message:
            print(message)

asyncio.run(main())
