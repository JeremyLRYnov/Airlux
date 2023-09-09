const Room = require('../models/room.model.js');

// Create and Save a new Room
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Room
  const room = new Room({
    name: req.body.name,
    buildingId: req.body.buildingId
  });

  // Save Room in the database
  Room.create(room, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Room."
      });
    else res.send(data);
  });
};

// Retrieve all Rooms from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Room.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rooms."
      });
    else res.send(data);
  });
};

// Find a single Room with a roomId
exports.findOne = (req, res) => {
  Room.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Room with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Room with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Room identified by the roomId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Room.updateById(
    req.params.id,
    new Room(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Room with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Room with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Room with the specified roomId in the request
exports.delete = (req, res) => {
  Room.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Room with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Room with id " + req.params.id
        });
      }
    } else res.send({ message: `Room was deleted successfully!` });
  });
};

// Delete all Rooms from the database.
exports.deleteAll = (req, res) => {
  Room.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all rooms."
      });
    else res.send({ message: `All Rooms were deleted successfully!` });
  });
};
