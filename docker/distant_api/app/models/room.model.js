const { db } = require("./db.js");
const { v4: uuidv4 } = require('uuid');

class Room {
  constructor(room) {
    this.id = room.id;
    this.name = room.name;
    this.buildingId = room.buildingId;
  }

  static async create(newRoom) {
    try {
      if(!newRoom.id) {
        newRoom.id = uuidv4();  // Génére un UUID si aucun ID n'est fourni
      }
      const [result] = await db.query("INSERT INTO Rooms SET ?", newRoom);
      console.log("Room créée: ", { id: newRoom.id, ...newRoom });
      return { id: newRoom.id, ...newRoom };
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }
  
  static async findById(id) {
    try {
      const [results] = await db.query(`SELECT * FROM Rooms WHERE id = ?`, [id]);
      if (results.length) {
        console.log("found room: ", results[0]);
        return results[0];
      } else {
        throw { kind: "not_found" };
      }
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async findAllByBuildingId(buildingId) {
    try {
      const [results] = await db.query(`SELECT * FROM Rooms WHERE buildingId = ?`, [buildingId]);
      console.log(`Rooms found for building ID ${buildingId}:`, results);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async getAll(name) {
    try {
      let query = "SELECT * FROM Rooms";
      if (name) {
        query += ` WHERE name LIKE ?`;
      }
      const [results] = await db.query(query, [`%${name}%`]);
      console.log("rooms: ", results);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async updateById(id, room) {
    try {
      const [results] = await db.query("UPDATE Rooms SET name = ?, buildingId = ? WHERE id = ?", [room.name, room.buildingId, id]);
      if (results.affectedRows == 0) {
        throw { kind: "not_found" };
      } else {
        console.log("updated room: ", { id: id, ...room });
        return { id: id, ...room };
      }
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async remove(id) {
    try {
      const [results] = await db.query("DELETE FROM Rooms WHERE id = ?", [id]);
      if (results.affectedRows == 0) {
        throw { kind: "not_found" };
      } else {
        console.log("deleted room with id: ", id);
        return results;
      }
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async removeAllByBuildingId(buildingId) {
    try {
      const [results] = await db.query(`DELETE FROM Rooms WHERE buildingId = ?`, [buildingId]);
      console.log(`Deleted ${results.affectedRows} rooms from building ID ${buildingId}`);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async removeAll() {
    try {
      const [results] = await db.query("DELETE FROM Rooms");
      console.log(`deleted ${results.affectedRows} rooms`);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }
}

module.exports = Room;
