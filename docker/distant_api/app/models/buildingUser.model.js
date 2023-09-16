const { db } = require("./db.js");

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
      const [results] = await db.query("SELECT Users.id, Users.name, Users.email, Users.password, Users.admin FROM Users INNER JOIN BuildingUsers ON Users.id = BuildingUsers.userId WHERE BuildingUsers.buildingId = ?", [buildingId]);
      console.log("Users found: ", results);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async removeUsersFromBuilding(buildingId) {
    try {
      const [results] = await db.query("DELETE FROM BuildingUsers WHERE buildingId = ?", [buildingId]);
      console.log(`Deleted users from building id: ${buildingId}`);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }  

  static async findBuildingsByUserId(userId) {
    try {
      const [results] = await db.query("SELECT Buildings.* FROM Buildings INNER JOIN BuildingUsers ON Buildings.id = BuildingUsers.buildingId WHERE BuildingUsers.userId = ?", [userId]);
      console.log("Buildings found: ", results);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async removeBuildingsByUserId(userId) {
    try {
      const [results] = await db.query("DELETE FROM BuildingUsers WHERE userId = ?", [userId]);
      console.log(`Deleted buildings for user id: ${userId}`);
      return results;
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }
  
  

}

module.exports = BuildingUser;
