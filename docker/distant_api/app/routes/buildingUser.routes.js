module.exports = app => {
    const buildingUsers = require("../controllers/buildingUser.controller.js");
    
    var router = require("express").Router();
  
    // Assign a user to a building
    router.post("/", buildingUsers.assignUserToBuilding);
  
    // Find all users by building ID
    router.get("/:buildingId", buildingUsers.findUsersByBuildingId);

    // Find all buildings by user ID
    router.get("/users/:userId", buildingUsers.findBuildingsByUserId);

    // Delete all buildings by user ID
    router.delete("/users/:userId", buildingUsers.removeBuildingsByUserId);

    app.use('/api/buildingUsers', router);
  };
  