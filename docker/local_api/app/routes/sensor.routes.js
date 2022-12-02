module.exports = app => {
  const sensors = require("../controllers/sensor.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", sensors.create);

  // Retrieve all Tutorials
  router.get("/", sensors.findAll);

  // Retrieve all published Tutorials
  router.get("/published", sensors.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", sensors.findOne);

  // Update a Tutorial with id
  router.put("/:id", sensors.update);

  // Delete a Tutorial with id
  router.delete("/:id", sensors.delete);

  // Delete all Tutorials
  router.delete("/", sensors.deleteAll);

  app.use('/api/sensors', router);
};