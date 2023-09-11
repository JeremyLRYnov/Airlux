module.exports = app => {
    const buildingUsers = require("../controllers/buildingUser.controller.js");
    var router = require("express").Router();
  
    // Assign a user to a building
    router.post("/", buildingUsers.assignUserToBuilding);
  
    // Find users by building ID
    router.get("/:buildingId", buildingUsers.findUsersByBuildingId);
  
    app.use('/api/buildingUsers', router);
  };
  