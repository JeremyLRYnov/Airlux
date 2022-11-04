import script

def filter_temp(temperature):

    if isinstance(temperature, int) and temperature >= 0 and temperature<= 40 :
        return True

    else:
        return False

def filter_humid(humidity):

    if isinstance(humidity, int) and humidity >= 0 and humidity <= 100:
        return True
        
    else:
        return False