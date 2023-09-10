const Sensor = require('../models/sensor.model.js');

// Create and Save a new Sensor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Sensor
  const sensor = new Sensor({
    name: req.body.name,
    roomId: req.body.roomId,
    value: req.body.value ,
    unit: req.body.unit
  });

  // Save Sensor in the database
  Sensor.create(sensor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sensor."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Sensor.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sensors."
      });
    else res.send(data);
  });
};

// Find a single Sensor with a id
exports.findOne = (req, res) => {
  Sensor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Sensor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Sensor with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Sensor identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Sensor.updateById(
    req.params.id,
    new Sensor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Sensor with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Sensor with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Sensor with the specified id in the request
exports.delete = (req, res) => {
  Sensor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Sensor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Sensor with id " + req.params.id
        });
      }
    } else res.send({ message: `Sensor was deleted successfully!` });
  });
};

// Delete all Sensors from the database.
exports.deleteAll = (req, res) => {
  Sensor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};

