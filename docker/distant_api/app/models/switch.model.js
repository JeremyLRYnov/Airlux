const { db } = require("./db.js");
const { v4: uuidv4 } = require('uuid');

class Switch {
  constructor(switchEntity) {
    this.id = switchEntity.id;
    this.switchId = switchEntity.switchId;
    this.name = switchEntity.name;
    this.roomId = switchEntity.roomId;
    this.status = switchEntity.status;
  }

  static async create(newSwitch) {
    try {
      if(!newSwitch.id) {
        newSwitch.id = uuidv4();  // Génére un UUID si aucun ID n'est fourni
      }
      const [result] = await db.query("INSERT INTO Switches SET ?", newSwitch);
      console.log("Switch créé: ", { id: newSwitch.id, ...newSwitch });
      return { id: newSwitch.id, ...newSwitch };
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [results] = await db.query(`SELECT * FROM Switches WHERE id = ?`, [id]);
      if (results.length) {
        console.log("found switch: ", results[0]);
        return results[0];
      } else {
        throw { kind: "not_found" };
      }
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async getAll(name) {
    try {
      let query = "SELECT * FROM Switches";
      if (name) {
        query += ` WHERE name LIKE ?`;
      }
      const [results] = await db.query(query, [`%${name}%`]);
      console.log("switches: ", results);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async findAllByRoomId(roomId) {
    try {
      const [results] = await db.query("SELECT * FROM Switches WHERE roomId = ?", [roomId]);
      console.log("switches: ", results);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async updateBySwitchId(switchId, status) {
    try {
      const [results] = await db.query("UPDATE Switches SET status = ? WHERE switchId = ?", [status, switchId]);
      if (results.affectedRows == 0) {
        throw { kind: "not_found" };
      } else {
        console.log("updated switch: ", { switchId, status });
        return { switchId, status };
      }
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }
  
  static async updateById(id, switchEntity) {
    try {
      const [results] = await db.query("UPDATE Switches SET name = ?, roomId = ?, status = ? WHERE id = ?", [switchEntity.name, switchEntity.roomId, switchEntity.status, id]);
      if (results.affectedRows == 0) {
        throw { kind: "not_found" };
      } else {
        console.log("updated switch: ", { id: id, ...switchEntity });
        return { id: id, ...switchEntity };
      }
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async remove(id) {
    try {
      const [results] = await db.query("DELETE FROM Switches WHERE id = ?", [id]);
      if (results.affectedRows == 0) {
        throw { kind: "not_found" };
      } else {
        console.log("deleted switch with id: ", id);
        return results;
      }
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async removeAll() {
    try {
      const [results] = await db.query("DELETE FROM Switches");
      console.log(`deleted ${results.affectedRows} switches`);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async removeAllByRoomId(roomId) {
    try {
      const [results] = await db.query("DELETE FROM Switches WHERE roomId = ?", [roomId]);
      console.log(`deleted ${results.affectedRows} switches`);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }
}

module.exports = Switch;
