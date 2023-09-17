const mysql = require('mysql2/promise');
const dbConfig = require("../config/db.config.js");
const { createUserTriggers, createBuildingTriggers, createBuildingUsersTriggers, createRoomTriggers, createSensorTriggers, createSwitchTriggers } = require('./dbTriggers');

const db = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,
});

async function createTables() {
  try {

    const connection = await db.getConnection();

    await connection.execute("CREATE TABLE IF NOT EXISTS Users (id VARCHAR(36) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), admin BOOL);");
    console.log("Create table Users.");

    await connection.execute("CREATE TABLE IF NOT EXISTS Buildings (id VARCHAR(36) PRIMARY KEY, name VARCHAR(255), createdBy VARCHAR(36), FOREIGN KEY (createdBy) REFERENCES Users(id) ON DELETE CASCADE );");
    console.log("Create table Buildings.");

    await connection.execute("CREATE TABLE IF NOT EXISTS Rooms (id VARCHAR(36) PRIMARY KEY, name VARCHAR(255), buildingId VARCHAR(36), FOREIGN KEY (buildingId) REFERENCES Buildings(id) ON DELETE CASCADE );");
    console.log("Create table Rooms.");

    await connection.execute("CREATE TABLE IF NOT EXISTS Sensors (id VARCHAR(36) PRIMARY KEY, sensorId VARCHAR(36), name VARCHAR(255), roomId VARCHAR(36), value INT, unit VARCHAR(255), FOREIGN KEY (roomId) REFERENCES Rooms(id) ON DELETE CASCADE );");
    console.log("Create table Sensors.");

    await connection.execute("CREATE TABLE IF NOT EXISTS BuildingUsers (buildingId VARCHAR(36), userId VARCHAR(36), FOREIGN KEY (buildingId) REFERENCES Buildings(id) ON DELETE CASCADE , FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE );");
    console.log("Create table BuildingUsers.");

    await connection.execute("CREATE TABLE IF NOT EXISTS Switches (id VARCHAR(36) PRIMARY KEY, switchId VARCHAR(36), name VARCHAR(255), roomId VARCHAR(36), status BOOL, FOREIGN KEY (roomId) REFERENCES Rooms(id) ON DELETE CASCADE );");
    console.log("Create table Switches.");

    await connection.execute(`CREATE TABLE IF NOT EXISTS Journal (ID INT AUTO_INCREMENT PRIMARY KEY, TableName VARCHAR(255), OperationType VARCHAR(255), OldValue JSON, NewValue JSON, ChangeDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP );`);
    console.log("Create table Journal.");

    await createUserTriggers(connection);
    await createBuildingTriggers(connection);
    await createBuildingUsersTriggers(connection);
    await createRoomTriggers(connection);
    await createSensorTriggers(connection);
    await createSwitchTriggers(connection);

    console.log("Successfully connected to the database.");
   
  } catch (error) {
    console.error('Error creating tables: ', error);
  }
}

module.exports = {
  db,  
  createTables,
};