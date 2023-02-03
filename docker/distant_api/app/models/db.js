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

  connection.query("CREATE TABLE IF NOT EXISTS Sensors (id INT, name CHAR(4), value INT);", function (err, result){
    if (err) throw err;
    console.log("Create table Sensors.");
  });
  
  connection.query("CREATE TABLE IF NOT EXISTS Actuators (id INT, name CHAR(4), state BOOL);", function (err, result){
    if (err) throw err;
    console.log("Create table Actuators.");
  });
  
  connection.query("CREATE TABLE IF NOT EXISTS Buldings (id INT, name CHAR(4));", function (err, result){
    if (err) throw err;
    console.log("Create table Buildings.");
  });

  connection.query("CREATE TABLE IF NOT EXISTS Credentials (id INT, ssid CHAR(4), password CHAR(4));", function (err, result){
    if (err) throw err;
    console.log("Create table Credentials.");
  });

  connection.query("CREATE TABLE IF NOT EXISTS Users (id INT, name CHAR(4), admin BOOL);", function (err, result){
    if (err) throw err;
    console.log("Create table Users.");
  });

  connection.query("CREATE TABLE IF NOT EXISTS Rooms (id INT, name CHAR(4));", function (err, result){
    if (err) throw err;
    console.log("Create table Rooms.");
  });

  console.log("Successfully connected to the database.");
});

module.exports = connection;
