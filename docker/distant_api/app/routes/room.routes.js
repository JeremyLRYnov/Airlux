module.exports = app => {
    const rooms = require("../controllers/room.controller.js");
    var router = require("express").Router();
  
    // Create a new Room
    router.post("/create", rooms.create);

    // Retrieve all Rooms from a specific building
    router.get("/building/:buildingId", rooms.findAllByBuilding);

    // Retrieve all Rooms 
    router.get("/", rooms.findAll);
  
    // Retrieve a single Room with id
    router.get("/:id", rooms.findOne);
  
    // Update a Room with id
    router.put("/:id", rooms.update);
  
    // Delete a Room with id
    router.delete("/:id", rooms.delete);
  
    // Delete all Rooms
    router.delete("/", rooms.deleteAll);

    // Delete all Rooms from a specific building
    router.delete("/building/:buildingId", rooms.deleteAllByBuilding);
  
    app.use('/room', router);
  };
  