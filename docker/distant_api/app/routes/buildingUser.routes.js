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

    // Delete all links between users and a building 
    router.delete("/:buildingId", buildingUsers.removeUsersFromBuilding);

    // Find User Id from email
    router.get("/", buildingUsers.findUserIdByEmail);

    app.use('/buildingUsers', router);
  };
  