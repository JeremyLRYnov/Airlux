const Building = require('../models/building.model.js');
const User = require('../models/user.model.js');

// Create and Save a new Building
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  try {
    // Check if the user is an admin
    const user = await User.findById(req.body.createdBy);
    if (!user.admin) {
      return res.status(403).send({
        message: "User is not authorized to create a building"
      });
    }

    // Create a Building
    const building = new Building({
      id: req.body.id,
      name: req.body.name,
      createdBy: req.body.createdBy
    });

    const data = await Building.create(building);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Building."
    });
  }
};

// Retrieve all Buildings from the database (with condition).
exports.findAll = async (req, res) => {
  const name = req.query.name;
  
  try {
    const data = await Building.getAll(name);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving buildings."
    });
  }
};

// Find a single Building with an id
exports.findOne = async (req, res) => {
  try {
    const data = await Building.findById(req.params.id);
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Building with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Building with id " + req.params.id
      });
    }
  }
};

// Update a Building identified by the id in the request
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {
    const data = await Building.updateById(req.params.id, new Building(req.body));
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Building with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error updating Building with id " + req.params.id
      });
    }
  }
};

// Delete a Building with the specified id in the request
exports.delete = async (req, res) => {
  try {
    await Building.remove(req.params.id);
    res.send({ message: `Building was deleted successfully!` });
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Building with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete Building with id " + req.params.id
      });
    }
  }
};

// Delete all Buildings from the database.
exports.deleteAll = async (req, res) => {
  try {
    await Building.removeAll();
    res.send({ message: `All Buildings were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all buildings."
    });
  }
};
