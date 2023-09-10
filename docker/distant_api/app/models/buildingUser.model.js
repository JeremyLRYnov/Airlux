const db = require("./db.js");

class BuildingUser {
  constructor(buildingUser) {
    this.buildingId = buildingUser.buildingId;
    this.userId = buildingUser.userId;
  }

  static async assignUserToBuilding(newBuildingUser) {
    try {
      const [result] = await db.query("INSERT INTO BuildingUsers SET ?", newBuildingUser);
      console.log("User assigned to building: ", { ...newBuildingUser });
      return { ...newBuildingUser };
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async findUsersByBuildingId(buildingId) {
    try {
      const [results] = await db.query("SELECT * FROM Users INNER JOIN BuildingUsers ON Users.id = BuildingUsers.userId WHERE BuildingUsers.buildingId = ?", [buildingId]);
      console.log("Users found: ", results);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

}

module.exports = BuildingUser;
