const Switch = require('../models/switch.model.js');

// Create and Save a new Switch
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Switch
  const switchEntity = new Switch({
    name: req.body.name,
    roomId: req.body.roomId,
    status: req.body.status
  });

  // Save Switch in the database
  Switch.create(switchEntity, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Switch."
      });
    else res.send(data);
  });
};

// Retrieve all Switches from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;
  
  Switch.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving switches."
      });
    else res.send(data);
  });
};

// Find a single Switch with a switchId
exports.findOne = (req, res) => {
  Switch.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Switch with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Switch with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Switch identified by the switchId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Switch.updateById(
    req.params.id,
    new Switch(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Switch with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Switch with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Switch with the specified switchId in the request
exports.delete = (req, res) => {
  Switch.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Switch with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Switch with id " + req.params.id
        });
      }
    } else res.send({ message: `Switch was deleted successfully!` });
  });
};

// Delete all Switches from the database.
exports.deleteAll = (req, res) => {
  Switch.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all switches."
      });
    else res.send({ message: `All Switches were deleted successfully!` });
  });
};
