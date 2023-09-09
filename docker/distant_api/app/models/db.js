const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,  
});

// open the MySQL connection
connection.getConnection(error => {
  if (error) throw error;

  connection.query("CREATE TABLE IF NOT EXISTS Users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), admin BOOL);", function (err, result){
    if (err) throw err;
    console.log("Create table Users.");
  });

  connection.query("CREATE TABLE IF NOT EXISTS Buildings (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), createdBy VARCHAR(255));", function (err, result){
    if (err) throw err;
    console.log("Create table Buildings.");
  });

  connection.query("CREATE TABLE IF NOT EXISTS Rooms (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), buildingId INT, FOREIGN KEY (buildingId) REFERENCES Buildings(id));", function (err, result){
    if (err) throw err;
    console.log("Create table Rooms.");
  });

  connection.query("CREATE TABLE IF NOT EXISTS Sensors (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), roomId INT, value INT, unit VARCHAR(255), FOREIGN KEY (roomId) REFERENCES Rooms(id));", function (err, result){
    if (err) throw err;
    console.log("Create table Sensors.");
  });
  
  /*connection.query("CREATE TABLE IF NOT EXISTS Actuators (id INT, name CHAR(4), state BOOL);", function (err, result){
    if (err) throw err;
    console.log("Create table Actuators.");
  });*/

  /*connection.query("CREATE TABLE IF NOT EXISTS Credentials (id INT, ssid CHAR(4), password CHAR(4));", function (err, result){
    if (err) throw err;
    console.log("Create table Credentials.");
  });*/

  connection.query("CREATE TABLE IF NOT EXISTS BuildingUsers (buildingId INT, userId INT, FOREIGN KEY (buildingId) REFERENCES Buildings(id), FOREIGN KEY (userId) REFERENCES Users(id));", function (err, result) {
    if (err) throw err;
    console.log("Create table BuildingUsers.");
  });

  connection.query("CREATE TABLE IF NOT EXISTS Switches (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), roomId INT, status BOOL, FOREIGN KEY (roomId) REFERENCES Rooms(id));", function (err, result){
    if (err) throw err;
    console.log("Create table Switches.");
  });

  console.log("Successfully connected to the database.");
});

module.exports = connection;
