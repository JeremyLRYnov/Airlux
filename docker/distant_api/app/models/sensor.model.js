const db = require("./db.js");

class Sensor {
  constructor(sensor) {
    this.name = sensor.name;
    this.roomId = sensor.roomId;
    this.value = sensor.value;
    this.unit = sensor.unit;
  }

  static async create(newSensor) {
    try {
      const [result] = await db.query("INSERT INTO Sensors SET ?", newSensor);
      console.log("created sensor: ", { id: result.insertId, ...newSensor });
      return { id: result.insertId, ...newSensor };
    } catch (error) {
      console.log("grosse erreur: ", error);
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
}

module.exports = Sensor;
