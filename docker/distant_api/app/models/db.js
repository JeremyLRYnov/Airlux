const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
});

// open the MySQL connection
connection.getConnection(error => {
  if (error) throw error;
  connection.query("CREATE DATABASE IF NOT EXISTS distantdb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  connection.query("USE distantdb", function (err, result) {
    if (err) throw err;
    console.log("USE distantdb");
  });

  console.log("Successfully connected to the database.");

});


module.exports = connection;
