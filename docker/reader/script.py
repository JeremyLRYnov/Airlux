import mysql.connector


mydb = mysql.connector.connect(
    host="mysql",
    user="user",
    database="db",
    port=3306)
    
mycursor = mydb.cursor()
mycursor.execute("CREATE TABLE IF NOT EXISTS temperature (id INT AUTO_INCREMENT PRIMARY KEY, value INT)")
mycursor.execute("CREATE TABLE IF NOT EXISTS humidity (id INT AUTO_INCREMENT PRIMARY KEY, value INT)")
