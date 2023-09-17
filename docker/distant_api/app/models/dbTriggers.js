const mysql = require('mysql2/promise');
const dbConfig = require("../config/db.config.js");

async function createUserTriggers(connection) {
  try {
    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Users_After_Insert
      AFTER INSERT ON Users
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, NewValue)
      VALUES ('Users', 'INSERT', JSON_OBJECT('id', NEW.id, 'name', NEW.name, 'email', NEW.email, 'password', NEW.password, 'admin', NEW.admin));
    `);

    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Users_After_Update
      AFTER UPDATE ON Users
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, OldValue, NewValue)
      VALUES ('Users', 'UPDATE', JSON_OBJECT('id', OLD.id, 'name', OLD.name, 'email', OLD.email, 'password', OLD.password, 'admin', OLD.admin), JSON_OBJECT('id', NEW.id, 'name', NEW.name, 'email', NEW.email, 'password', NEW.password, 'admin', NEW.admin));
    `);

    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Users_After_Delete
      AFTER DELETE ON Users
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, OldValue)
      VALUES ('Users', 'DELETE', JSON_OBJECT('id', OLD.id, 'name', OLD.name, 'email', OLD.email, 'password', OLD.password, 'admin', OLD.admin));
    `);

    console.log("Create triggers for table Users.");
  } catch (error) {
    console.error('Error creating triggers for Users table: ', error);
  }
}

async function createBuildingTriggers(connection) {
  try {
    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Buildings_After_Insert
      AFTER INSERT ON Buildings
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, NewValue)
      VALUES ('Buildings', 'INSERT', JSON_OBJECT('id', NEW.id, 'name', NEW.name, 'createdBy', NEW.createdBy));
    `);

    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Buildings_After_Update
      AFTER UPDATE ON Buildings
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, OldValue, NewValue)
      VALUES ('Buildings', 'UPDATE', JSON_OBJECT('id', OLD.id, 'name', OLD.name, 'createdBy', OLD.createdBy), JSON_OBJECT('id', NEW.id, 'name', NEW.name, 'createdBy', NEW.createdBy));
    `);

    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Buildings_After_Delete
      AFTER DELETE ON Buildings
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, OldValue)
      VALUES ('Buildings', 'DELETE', JSON_OBJECT('id', OLD.id, 'name', OLD.name, 'createdBy', OLD.createdBy));
    `);

    console.log("Create triggers for table Buildings.");
  } catch (error) {
    console.error('Error creating triggers for Buildings table: ', error);
  }
}

async function createBuildingUsersTriggers(connection) {
  try {
    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS BuildingUsers_After_Insert
      AFTER INSERT ON BuildingUsers
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, NewValue)
      VALUES ('BuildingUsers', 'INSERT', JSON_OBJECT('buildingId', NEW.buildingId, 'userId', NEW.userId));
    `);

    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS BuildingUsers_After_Delete
      AFTER DELETE ON BuildingUsers
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, OldValue)
      VALUES ('BuildingUsers', 'DELETE', JSON_OBJECT('buildingId', OLD.buildingId, 'userId', OLD.userId));
    `);

    console.log("Create triggers for table BuildingUsers.");
  } catch (error) {
    console.error('Error creating triggers for BuildingUsers table: ', error);
  }
}

async function createRoomTriggers(connection) {
  try {
    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Rooms_After_Insert
      AFTER INSERT ON Rooms
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, NewValue)
      VALUES ('Rooms', 'INSERT', JSON_OBJECT('id', NEW.id, 'name', NEW.name, 'buildingId', NEW.buildingId));
    `);

    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Rooms_After_Update
      AFTER UPDATE ON Rooms
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, OldValue, NewValue)
      VALUES ('Rooms', 'UPDATE', JSON_OBJECT('id', OLD.id, 'name', OLD.name, 'buildingId', OLD.buildingId), JSON_OBJECT('id', NEW.id, 'name', NEW.name, 'buildingId', NEW.buildingId));
    `);

    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Rooms_After_Delete
      AFTER DELETE ON Rooms
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, OldValue)
      VALUES ('Rooms', 'DELETE', JSON_OBJECT('id', OLD.id, 'name', OLD.name, 'buildingId', OLD.buildingId));
    `);

    console.log("Create triggers for table Rooms.");
  } catch (error) {
    console.error('Error creating triggers for Rooms table: ', error);
  }
}

async function createSensorTriggers(connection) {
  try {
    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Sensors_After_Insert
      AFTER INSERT ON Sensors
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, NewValue)
      VALUES ('Sensors', 'INSERT', JSON_OBJECT('id', NEW.id, 'sensorId', NEW.sensorId, 'name', NEW.name, 'roomId', NEW.roomId, 'value', NEW.value, 'unit', NEW.unit));
    `);

    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Sensors_After_Update
      AFTER UPDATE ON Sensors
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, OldValue, NewValue)
      VALUES ('Sensors', 'UPDATE', JSON_OBJECT('id', OLD.id, 'sensorId', OLD.sensorId, 'name', OLD.name, 'roomId', OLD.roomId, 'value', OLD.value, 'unit', OLD.unit), JSON_OBJECT('id', NEW.id, 'sensorId', NEW.sensorId, 'name', NEW.name, 'roomId', NEW.roomId, 'value', NEW.value, 'unit', NEW.unit));
    `);

    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Sensors_After_Delete
      AFTER DELETE ON Sensors
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, OldValue)
      VALUES ('Sensors', 'DELETE', JSON_OBJECT('id', OLD.id, 'sensorId', OLD.sensorId, 'name', OLD.name, 'roomId', OLD.roomId, 'value', OLD.value, 'unit', OLD.unit));
    `);

    console.log("Create triggers for table Sensors.");
  } catch (error) {
    console.error('Error creating triggers for Sensors table: ', error);
  }
}

async function createSwitchTriggers(connection) {
  try {
    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Switches_After_Insert
      AFTER INSERT ON Switches
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, NewValue)
      VALUES ('Switches', 'INSERT', JSON_OBJECT('id', NEW.id, 'switchId', NEW.switchId, 'name', NEW.name, 'roomId', NEW.roomId, 'status', NEW.status));
    `);

    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Switches_After_Update
      AFTER UPDATE ON Switches
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, OldValue, NewValue)
      VALUES ('Switches', 'UPDATE', JSON_OBJECT('id', OLD.id, 'switchId', OLD.switchId, 'name', OLD.name, 'roomId', OLD.roomId, 'status', OLD.status), JSON_OBJECT('id', NEW.id, 'switchId', NEW.switchId, 'name', NEW.name, 'roomId', NEW.roomId, 'status', NEW.status));
    `);

    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS Switches_After_Delete
      AFTER DELETE ON Switches
      FOR EACH ROW
      INSERT INTO Journal (TableName, OperationType, OldValue)
      VALUES ('Switches', 'DELETE', JSON_OBJECT('id', OLD.id, 'switchId', OLD.switchId, 'name', OLD.name, 'roomId', OLD.roomId, 'status', OLD.status));
    `);

    console.log("Create triggers for table Switches.");
  } catch (error) {
    console.error('Error creating triggers for Switches table: ', error);
  }
}

module.exports = {
  createUserTriggers,
  createBuildingTriggers,
  createBuildingUsersTriggers,
  createRoomTriggers,
  createSensorTriggers,
  createSwitchTriggers,
};
