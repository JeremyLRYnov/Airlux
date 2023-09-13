const Sensor = require('../models/sensor.model.js');

// Create and Save a new Sensor
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Sensor
  const sensor = new Sensor({
    id: req.body.id,
    sensorId: req.body.sensorId,
    name: req.body.name,
    roomId: req.body.roomId,
    value: req.body.value,
    unit: req.body.unit
  });

  try {
    const data = await Sensor.create(sensor);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Sensor."
    });
  }
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = async (req, res) => {
  const name = req.query.name;
  
  try {
    const data = await Sensor.getAll(name);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving sensors."
    });
  }
};

exports.findAllByRoom = async (req, res) => {
  try {
      const data = await Sensor.findAllByRoomId(req.params.roomId);
      res.send(data);
  } catch (err) {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving sensors."
      });
  }
};

// Find a single Sensor with a id
exports.findOne = async (req, res) => {
  try {
    const data = await Sensor.findById(req.params.id);
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Sensor with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Sensor with id " + req.params.id
      });
    }
  }
};

// Update a Sensor identified by the id in the request
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {
    const data = await Sensor.updateById(req.params.id, new Sensor(req.body));
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Sensor with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error updating Sensor with id " + req.params.id
      });
    }
  }
};

// Delete a Sensor with the specified id in the request
exports.delete = async (req, res) => {
  try {
    await Sensor.remove(req.params.id);
    res.send({ message: `Sensor was deleted successfully!` });
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Sensor with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete Sensor with id " + req.params.id
      });
    }
  }
};

// Delete all Sensors from the database.
exports.deleteAll = async (req, res) => {
  try {
    await Sensor.removeAll();
    res.send({ message: `All sensors were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all sensors."
    });
  }
};

exports.deleteAllByRoom = async (req, res) => {
  try {
      await Sensor.removeAllByRoomId(req.params.roomId);
      res.send({ message: `All sensors were deleted successfully from room ${req.params.roomId}!` });
  } catch (err) {
      res.status(500).send({
          message: err.message || "Some error occurred while removing all sensors."
      });
  }
};



