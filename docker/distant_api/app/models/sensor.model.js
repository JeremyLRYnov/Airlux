const { db } = require("./db.js");
const { v4: uuidv4 } = require('uuid');

class Sensor {
  constructor(sensor) {
    this.id = sensor.id,
    this.sensorId = sensor.sensorId,
    this.name = sensor.name;
    this.roomId = sensor.roomId;
    this.value = sensor.value;
    this.unit = sensor.unit;
  }

  static async create(newSensor) {
    try {
      if(!newSensor.id) {
        newSensor.id = uuidv4();  // Génére un UUID si aucun ID n'est fourni
      }
      const [result] = await db.query("INSERT INTO Sensors SET ?", newSensor);
      console.log("created sensor: ", { id: newSensor.id, ...newSensor });
      return { id: newSensor.id, ...newSensor };
    } catch (error) {
      console.log("grosse erreur: ", error);
      throw error;
    }
  }

  static async updateBySensorId(sensorId, sensor) {  
    try {
      const [results] = await db.query("UPDATE Sensors SET value = ? WHERE sensorId = ?", [sensor.value, sensorId]); 
      if (results.affectedRows == 0) {
        throw { kind: "not_found" };
      } else {
        console.log("updated sensor: ", { sensorId: sensorId, ...sensor }); 
        return { sensorId: sensorId, ...sensor }; 
      }
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }  
  
  static async findById(id) {
    try {
      const [results] = await db.query(`SELECT * FROM Sensors WHERE id = ?`, [id]);
      if (results.length) {
        console.log("found sensor: ", results[0]);
        return results[0];
      } else {
        throw { kind: "not_found" };
      }
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }

  static async getAll(name) {
    try {
      let query = "SELECT * FROM Sensors";
      if (name) {
        query += ` WHERE name LIKE ?`;
      }
      const [results] = await db.query(query, [`%${name}%`]);
      console.log("sensors: ", results);
      return results;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }

  static async findAllByRoomId(roomId) {
    try {
        const [results] = await db.query("SELECT * FROM Sensors WHERE roomId = ?", [roomId]);
        console.log("Sensors found: ", results);
        return results;
    } catch (error) {
        console.log("error: ", error);
        throw error;
    }
  }

  static async updateById(id, sensor) {
    try {
      const [results] = await db.query("UPDATE Sensors SET name = ?, roomId = ?, value = ?, unit = ? WHERE id = ?", [sensor.name, sensor.roomId, sensor.value, sensor.unit, id]);
      if (results.affectedRows == 0) {
        throw { kind: "not_found" };
      } else {
        console.log("updated sensor: ", { id: id, ...sensor });
        return { id: id, ...sensor };
      }
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }

  static async remove(id) {
    try {
      const [results] = await db.query("DELETE FROM Sensors WHERE id = ?", [id]);
      if (results.affectedRows == 0) {
        throw { kind: "not_found" };
      } else {
        console.log("deleted sensor with id: ", id);
        return results;
      }
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }

  static async removeAll() {
    try {
      const [results] = await db.query("DELETE FROM Sensors");
      console.log(`deleted ${results.affectedRows} sensors`);
      return results;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }

  static async removeAllByRoomId(roomId) {
    try {
        const [results] = await db.query("DELETE FROM Sensors WHERE roomId = ?", [roomId]);
        console.log(`Deleted ${results.affectedRows} sensors`);
        return results;
    } catch (error) {
        console.log("error: ", error);
        throw error;
    }
  }
}

module.exports = Sensor;
