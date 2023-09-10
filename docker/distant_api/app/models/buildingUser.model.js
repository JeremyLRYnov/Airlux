const sql = require("./db.js");

const BuildingUser = function(buildingUser) {
  this.buildingId = buildingUser.buildingId;
  this.userId = buildingUser.userId;
};

BuildingUser.assignUserToBuilding = (newBuildingUser, result) => {
  sql.query("INSERT INTO BuildingUsers SET ?", newBuildingUser, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("User assigned to building: ", { ...newBuildingUser });
    result(null, { ...newBuildingUser });
  });
};

BuildingUser.findUsersByBuildingId = (buildingId, result) => {
  sql.query("SELECT * FROM Users INNER JOIN BuildingUsers ON Users.id = BuildingUsers.userId WHERE BuildingUsers.buildingId = ?", [buildingId], (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("Users found: ", res);
    result(null, res);
  });
};

// Add other necessary methods like removing a user from a building, finding buildings by user ID, etc.

module.exports = BuildingUser;
