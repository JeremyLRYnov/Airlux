const Room = require('../models/room.model.js');

 // Logique pour gérer les messages WebSocket pour les pièces
 exports.handleWebSocketMessage = async (message) => {
  if (message.action === 'create') {
    await exports.create({ body: message.data });
    console.log("données stockées sur mysql");
  } 

  if(message.action === 'delete') {
    await exports.delete({ params: { id: message.data.id } }, null);
    console.log("données supprimées sur mysql");
  }

  if(message.action === 'update') {
    await exports.update({ params: { id: message.data.id }, body: message.data }, null);
    console.log("données mises à jour sur mysql");
  }
};

// Create and Save a new Room
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Room
  const room = new Room({
    id: req.body.id,
    name: req.body.name,
    buildingId: req.body.buildingId
  });

  try {
    const data = await Room.create(room);
    if(res){
      res.send(data);
    } else {
      console.log("La pièce à bien été créée");
      return;
    }
  } catch (err) {
    if(res) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Room."
      });
    }
    console.error("User is not authorized to create a room");
    return;
  }
};

exports.findAllByBuilding = async (req, res) => {
  try {
    const data = await Room.findAllByBuildingId(req.params.buildingId);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving rooms."
    });
  }
};

// Retrieve all Rooms from the database 
exports.findAll = async (req, res) => {
  const name = req.query.name;
  
  try {
    const data = await Room.getAll(name);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving rooms."
    });
  }
};

// Find a single Room with a roomId
exports.findOne = async (req, res) => {
  try {
    const data = await Room.findById(req.params.id);
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Room with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Room with id " + req.params.id
      });
    }
  }
};

// Update a Room identified by the roomId in the request
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {
    const data = await Room.updateById(req.params.id, new Room(req.body));
    if(res){
      res.send(data);
    }
  } catch (err) {
    if(res) {
      res.status(500).send({
        message: err.message || `Not found room with id ${req.params.id}.`
      });
    }
    console.error(err.message || "Error updating room with id " + req.params.id);
  }
};

// Delete a Room with the specified roomId in the request
exports.delete = async (req, res) => {
  try {
    await Room.remove(req.params.id);
    if(res) {
      res.send({ message: `Room was deleted successfully!` });
    }
    console.log("Room was deleted successfully")
  } catch (err) {
    if (err.kind === "not_found") {
      if (res) {
        res.status(404).send({
          message: `Pièce non trouvée avec l'id ${req.params.id}.`
        });
      } else {
        console.error(`Pièce non trouvée avec l'id ${req.params.id}.`);
      }
    } else {
      if (res) {
        res.status(500).send({
          message: "Impossible de supprimer la pièce avec l'id " + req.params.id
        });
      } else {
        console.error("Impossible de supprimer la pièece avec l'id " + req.params.id);
      }
    }
  }
};

exports.deleteAllByBuilding = async (req, res) => {
  try {
    await Room.removeAllByBuildingId(req.params.buildingId);
    res.send({ message: `All rooms were deleted successfully from building ID ${req.params.buildingId}!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all rooms."
    });
  }
};

// Delete all Rooms from the database.
exports.deleteAll = async (req, res) => {
  try {
    await Room.removeAll();
    res.send({ message: `All Rooms were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all rooms."
    });
  }
};
