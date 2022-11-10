import redis
import time

redis = redis.Redis(
    host= 'redis',
    port= '6379')

def filter(temperature, humidity):

        if filter_temp(temperature) and filter_humid(humidity):
            redis.mset({'temperature' : temperature, 'humidity' : humidity})
            value = redis.get('temperature')
            print(value)
            value = redis.get('humidity')
            print(value)

            time.sleep(10)
        else:
            print('Erreur de données')
            time.sleep(10)


def filter_temp(temperature):

    if isinstance(temperature, int) and temperature >= -10 and temperature<= 50 :
        return True

    else:
        return False

def filter_humid(humidity):

    if isinstance(humidity, int) and humidity >= 0 and humidity <= 100:
        return True
        
    else:
        return False