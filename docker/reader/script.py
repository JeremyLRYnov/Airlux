import mysql.connector

def main():

    mydb = mysql.connector.connect(
        host="mysql",
        user="root",)
    
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABASE IF NOT EXISTS db")
    mycursor.execute("USE db")
    mycursor.execute("CREATE TABLE IF NOT EXISTS temperature (id INT AUTO_INCREMENT PRIMARY KEY, value INT)")
    mycursor.execute("CREATE TABLE IF NOT EXISTS humidity (id INT AUTO_INCREMENT PRIMARY KEY, value INT)")
