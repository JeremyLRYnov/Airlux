const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config.js");

let connection;

async function initializeDatabase() {
  try {
    connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      database: dbConfig.DATABASE,
    });

    await connection.query("CREATE TABLE IF NOT EXISTS Users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), admin BOOL)");
    console.log("Create table Users.");

    await connection.query("CREATE TABLE IF NOT EXISTS Buildings (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), createdBy VARCHAR(255));");
    console.log("Create table Buildings.");

    await connection.query("CREATE TABLE IF NOT EXISTS Rooms (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), buildingId INT, FOREIGN KEY (buildingId) REFERENCES Buildings(id));");
    console.log("Create table Rooms.");

    await connection.query("CREATE TABLE IF NOT EXISTS Sensors (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), roomId INT, value INT, unit VARCHAR(255), FOREIGN KEY (roomId) REFERENCES Rooms(id));");
    console.log("Create table Sensors.");
  
  /*connection.query("CREATE TABLE IF NOT EXISTS Actuators (id INT, name CHAR(4), state BOOL);", function (err, result){
    if (err) throw err;
    console.log("Create table Actuators.");
  });*/

  /*connection.query("CREATE TABLE IF NOT EXISTS Credentials (id INT, ssid CHAR(4), password CHAR(4));", function (err, result){
    if (err) throw err;
    console.log("Create table Credentials.");
  });*/

    await connection.query("CREATE TABLE IF NOT EXISTS BuildingUsers (buildingId INT, userId INT, FOREIGN KEY (buildingId) REFERENCES Buildings(id), FOREIGN KEY (userId) REFERENCES Users(id));");
    console.log("Create table BuildingUsers.");

    await connection.query("CREATE TABLE IF NOT EXISTS Switches (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), roomId INT, status BOOL, FOREIGN KEY (roomId) REFERENCES Rooms(id));");
    console.log("Create table Switches.");

    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
}

initializeDatabase();

module.exports = connection;