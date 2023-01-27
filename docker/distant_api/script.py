import pymysql
import time

time.sleep(10)
# Se connecter au conteneur MySQL
connection = pymysql.connect(
    host='mysql',
    user='root',
    password='123456'
)


# Sélectionner la nouvelle base de données
with connection.cursor() as cursor:
    cursor.execute("USE distant_db")

# Créer une table 
with connection.cursor() as cursor:
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS Temperature (id INT AUTO_INCREMENT PRIMARY KEY, value INT)")

# Créer une table 
with connection.cursor() as cursor:
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS Humidity (id INT AUTO_INCREMENT PRIMARY KEY, value INT)")


# Afficher les tables de la base de données sélectionnée
with connection.cursor() as cursor:
    cursor.execute("SHOW TABLES")
    print(cursor.fetchall())

# Se déconnecter du conteneur MySQL
connection.close()