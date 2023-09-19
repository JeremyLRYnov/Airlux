const Building = require('../models/building.model.js');
const User = require('../models/user.model.js');

// Logique pour gérer les messages WebSocket pour les bâtiments
exports.handleWebSocketMessageBuilding = async (message) => {
  if (message.action === 'create') {
    await exports.create({ body: message.data }, null);
  } 

  if(message.action === "update") {
    await exports.update({ params: { id: message.data.id }, body: message.data }, null);
  }
};

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    if(res) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.error("Content can not be empty!");
    return;
  }

  try {

    // Create a Building
    const building = new Building({
      id: req.body.id,
      name: req.body.name,
      createdBy: req.body.createdBy
    });

    const data = await Building.create(building);
    if(res) {
      res.send(data);
    }
  } catch (err) {
    if(res) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Building."
      });
    }
    console.error(err.message || "Some error occurred while creating the Building.");
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
    if(res) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.error("Content can not be empty!");
    return;
  }

  try {
    const data = await Building.updateById(req.params.id, new Building(req.body));
    if(res){
      res.send(data);
    }    
  } catch (err) {
    if(res) {
      res.status(500).send({
        message: err.message || `Not found Building with id ${req.params.id}.`
      });
    }
    console.error(err.message || "Error updating Building with id " + req.params.id);
  }
};

// Delete a Building with the specified id in the request
exports.delete = async (req, res) => {
  try {
    await Building.remove(req.params.id);
    if (res) {
      res.send({ message: `Building was deleted successfully!` });
    } else {
      console.log(`Building was deleted successfully!`);
    }
  } catch (err) {
    if (err.kind === "not_found") {
      if (res) {
        res.status(404).send({
          message: `Bâtiment non trouvé avec l'id ${req.params.id}.`
        });
      } else {
        console.error(`Bâtiment non trouvé avec l'id ${req.params.id}.`);
      }
    } else {
      if (res) {
        res.status(500).send({
          message: "Impossible de supprimer le bâtiment avec l'id " + req.params.id
        });
      } else {
        console.error("Impossible de supprimer le bâtiment avec l'id " + req.params.id);
      }
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
