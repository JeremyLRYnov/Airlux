module.exports = app => {
    const rooms = require("../controllers/room.controller.js");
    var router = require("express").Router();
  
    // Create a new Room
    router.post("/", rooms.create);
  
    // Retrieve all Rooms (avec condition optionnelle)
    router.get("/", rooms.findAll);
  
    // Retrieve a single Room with id
    router.get("/:id", rooms.findOne);
  
    // Update a Room with id
    router.put("/:id", rooms.update);
  
    // Delete a Room with id
    router.delete("/:id", rooms.delete);
  
    // Delete all Rooms
    router.delete("/", rooms.deleteAll);
  
    app.use('/api/rooms', router);
  };
  