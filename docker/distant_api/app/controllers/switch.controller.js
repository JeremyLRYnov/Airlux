const Switch = require("../models/switch.model.js");

// Create and Save a new Switch
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Switch
  const switchEntity = new Switch({
    id: req.body.id,
    switchId: req.body.switchId,
    name: req.body.name,
    roomId: req.body.roomId,
    status: req.body.status
  });

  try {
    const data = await Switch.create(switchEntity);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Switch."
    });
  }
};

// Retrieve all Switches from the database (with condition).
exports.findAll = async (req, res) => {
  const name = req.query.name;

  try {
    const data = await Switch.getAll(name);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving switches."
    });
  }
};

exports.findAllByRoom = async (req, res) => {
  const roomId = req.query.roomId;

  try {
    const data = await Switch.findAllByRoomId(roomId);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving switches."
    });
  }
};

// Find a single Switch with a switchId
exports.findOne = async (req, res) => {
  try {
    const data = await Switch.findById(req.params.id);
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Switch with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Switch with id " + req.params.id
      });
    }
  }
};

// Update a Switch identified by the switchId in the request
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {
    const data = await Switch.updateById(req.params.id, new Switch(req.body));
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Switch with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error updating Switch with id " + req.params.id
      });
    }
  }
};

// Delete a Switch with the specified switchId in the request
exports.delete = async (req, res) => {
  try {
    await Switch.remove(req.params.id);
    res.send({ message: `Switch was deleted successfully!` });
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Switch with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete Switch with id " + req.params.id
      });
    }
  }
};

// Delete all Switches from the database.
exports.deleteAll = async (req, res) => {
  try {
    await Switch.removeAll();
    res.send({ message: `All Switches were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all switches."
    });
  }
};

exports.deleteAllByRoom = async (req, res) => {
  const roomId = req.query.roomId;
  
  try {
    await Switch.removeAllByRoomId(roomId);
    res.send({ message: `All switches were deleted successfully from room with ID ${roomId}!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all switches."
    });
  }
};
