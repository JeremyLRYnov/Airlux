const db = require("./db.js");

// constructor
class Building {
  constructor(building) {
    this.name = building.name;
    this.createdBy = building.createdBy;
  }

  static async create(newBuilding) {
    try {
      const [result] = await db.query("INSERT INTO Buildings SET ?", newBuilding);
      console.log("created building: ", { id: result.insertId, ...newBuilding });
      return { id: result.insertId, ...newBuilding };
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [results] = await db.query("SELECT * FROM Buildings WHERE id = ?", [id]);
      
      if (results.length) {
        console.log("found building: ", results[0]);
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
      let query = "SELECT * FROM Buildings";

      if (name) {
        query += " WHERE name LIKE ?";
      }

      const [results] = await db.query(query, [`%${name}%`]);
      console.log("buildings: ", results);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async updateById(id, building) {
    try {
      const [result] = await db.query("UPDATE Buildings SET name = ?, createdBy = ? WHERE id = ?", [building.name, building.createdBy, id]);
      
      if (result.affectedRows == 0) {
        throw { kind: "not_found" };
      } else {
        console.log("updated building: ", { id: id, ...building });
        return { id: id, ...building };
      }
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async remove(id) {
    try {
      const [result] = await db.query("DELETE FROM Buildings WHERE id = ?", [id]);
      
      if (result.affectedRows == 0) {
        throw { kind: "not_found" };
      } else {
        console.log("deleted building with id: ", id);
        return result;
      }
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async removeAll() {
    try {
      const [result] = await db.query("DELETE FROM Buildings");
      console.log(`deleted ${result.affectedRows} buildings`);
      return result;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }
}

module.exports = Building;
