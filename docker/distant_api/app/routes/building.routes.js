module.exports = app => {
    const buildings = require("../controllers/building.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Building
    router.post("/create", buildings.create);
  
    // Retrieve all Buildings
    router.get("/", buildings.findAll);
  
    // Retrieve a single Building with id
    router.get("/:id", buildings.findOne);
  
    // Update a Building with id
    router.put("/:id", buildings.update);
  
    // Delete a Building with id
    router.delete("/:id", buildings.delete);
  
    // Delete all Buildings
    router.delete("/", buildings.deleteAll);
  
    app.use('/building', router);
  };
  