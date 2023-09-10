const db = require("./db.js");

class Room {
  constructor(room) {
    this.name = room.name;
    this.buildingId = room.buildingId;
  }

  static async create(newRoom) {
    try {
      const [result] = await db.query("INSERT INTO Rooms SET ?", newRoom);
      console.log("Room créée: ", { id: result.insertId, ...newRoom });
      return { id: result.insertId, ...newRoom };
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
