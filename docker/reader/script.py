import mysql.connector

# mysql Authentification
mydb = mysql.connector.connect(
    host="mysql",
    port="3306",
    user="root",
    database="db")
    
# mysql Channel
mycursor = mydb.cursor()
mycursor.execute("CREATE TABLE IF NOT EXISTS temperature (id INT AUTO_INCREMENT PRIMARY KEY, value INT)")
mycursor.execute("CREATE TABLE IF NOT EXISTS humidity (id INT AUTO_INCREMENT PRIMARY KEY, value INT)")
mydb.close()