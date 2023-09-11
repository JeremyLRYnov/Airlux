const Building = require('../models/building.model.js');

// Create and Save a new Building
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Building
  const building = new Building({
    name: req.body.name,
    createdBy: req.body.createdBy
  });

  // Save Building in the database
  Building.create(building, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Building."
      });
    else res.send(data);
  });
};

// Retrieve all Buildings from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Building.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving buildings."
      });
    else res.send(data);
  });
};

// Find a single Building with an id
exports.findOne = (req, res) => {
  Building.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Building with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Building with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Building identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Building.updateById(
    req.params.id,
    new Building(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Building with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Building with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Building with the specified id in the request
exports.delete = (req, res) => {
  Building.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Building with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Building with id " + req.params.id
        });
      }
    } else res.send({ message: `Building was deleted successfully!` });
  });
};

// Delete all Buildings from the database.
exports.deleteAll = (req, res) => {
  Building.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all buildings."
      });
    else res.send({ message: `All Buildings were deleted successfully!` });
  });
};
