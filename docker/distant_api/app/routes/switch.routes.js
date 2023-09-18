module.exports = app => {
    const switches = require("../controllers/switch.controller.js");
    var router = require("express").Router();
  
    // Create a new Switch
    router.post("/create", switches.create);
  
    // Retrieve all Switches 
    router.get("/", switches.findAll);

    // Retrieve all Switches from a room
    router.get("/room/:roomId", switches.findAllByRoom);
  
    // Retrieve a single Switch with id
    router.get("/:id", switches.findOne);

    // Update Switch status with switchId 
    router.put('/updateStatus', switches.updateStatusBySwitchId);

    // Update a Switch with id
    router.put("/:id", switches.update);
  
    // Delete a Switch with id
    router.delete("/:id", switches.delete);
  
    // Delete all Switches
    router.delete("/", switches.deleteAll);

    // Delete all Switches from a room
    router.delete("/room/:roomId", switches.deleteAllByRoom);
  
    app.use('/switch', router);
  };
  