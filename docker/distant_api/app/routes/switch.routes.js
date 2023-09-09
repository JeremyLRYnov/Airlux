module.exports = app => {
    const switches = require("../controllers/switch.controller.js");
    var router = require("express").Router();
  
    // Create a new Switch
    router.post("/", switches.create);
  
    // Retrieve all Switches (avec condition optionnelle)
    router.get("/", switches.findAll);
  
    // Retrieve a single Switch with id
    router.get("/:id", switches.findOne);
  
    // Update a Switch with id
    router.put("/:id", switches.update);
  
    // Delete a Switch with id
    router.delete("/:id", switches.delete);
  
    // Delete all Switches
    router.delete("/", switches.deleteAll);
  
    app.use('/api/switches', router);
  };
  