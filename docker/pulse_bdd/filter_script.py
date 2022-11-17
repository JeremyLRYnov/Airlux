import redis
import time

#Redis database connection
redis = redis.Redis(
    host= 'redis',
    port= '6379')

#Filter function who sends the data to Redis database if they are correct
def filter(temperature, humidity):

        #If datas are correct
        if filter_temp(temperature) and filter_humid(humidity):

            #Send datas to Redis Database
            redis.mset({'temperature' : temperature, 'humidity' : humidity})

            #check that the data is present on the Redis database
            value = redis.get('temperature')
            print(value)
            value = redis.get('humidity')
            print(value)

            #10 second pause
            time.sleep(10)

        #If datas are not correct
        else:

            #Print error message in the logs 
            print('Erreur de données')
            #10 second pause
            time.sleep(10)

#Function that checks that the temperature data is correct
def filter_temp(temperature):

    #If temperature data is int and between -10 and 50
    if isinstance(temperature, int) and temperature >= -10 and temperature<= 50 :
        #OK
        return True

    #Else
    else:
        #Fail
        return False

#Function that checks that the humidity data is correct
def filter_humid(humidity):

    #If humidity data is int and between 0 and 100
    if isinstance(humidity, int) and humidity >= 0 and humidity <= 100:   
        #OK
        return True
    #Else
    else:
        #Fail
        return False