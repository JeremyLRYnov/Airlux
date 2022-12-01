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

  connection.query("CREATE TABLE IF NOT EXISTS Temperature (id INT, value INT);", function (err, result){
    if (err) throw err;
    console.log("Create table Temperature.");
  });
  
  connection.query("CREATE TABLE IF NOT EXISTS Humidity (id INT, value INT);", function (err, result){
    if (err) throw err;
    console.log("Create table Humidity.");
  });

  console.log("Successfully connected to the database.");
});

module.exports = connection;
