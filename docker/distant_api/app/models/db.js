const mysql = require('mysql2/promise');
const dbConfig = require("../config/db.config.js");

const db = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,
});

async function createTables() {
  try {

    const connection = await db.getConnection();

    await connection.execute("CREATE TABLE IF NOT EXISTS Users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), admin BOOL)");
    console.log("Create table Users.");

    await connection.execute("CREATE TABLE IF NOT EXISTS Buildings (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), createdBy INT, FOREIGN KEY (createdBy) REFERENCES Users(id));");
    console.log("Create table Buildings.");

    await connection.execute("CREATE TABLE IF NOT EXISTS Rooms (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), buildingId INT, FOREIGN KEY (buildingId) REFERENCES Buildings(id));");
    console.log("Create table Rooms.");

    await connection.execute("CREATE TABLE IF NOT EXISTS Sensors (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), roomId INT, value INT, unit VARCHAR(255), FOREIGN KEY (roomId) REFERENCES Rooms(id));");
    console.log("Create table Sensors.");

    await connection.execute("CREATE TABLE IF NOT EXISTS BuildingUsers (buildingId INT, userId INT, FOREIGN KEY (buildingId) REFERENCES Buildings(id), FOREIGN KEY (userId) REFERENCES Users(id));");
    console.log("Create table BuildingUsers.");

    await connection.execute("CREATE TABLE IF NOT EXISTS Switches (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), roomId INT, status BOOL, FOREIGN KEY (roomId) REFERENCES Rooms(id));");
    console.log("Create table Switches.");

    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error('Error creating tables: ', error);
  }
}

module.exports = {
  db,  
  createTables,
};