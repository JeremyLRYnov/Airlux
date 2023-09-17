const Switch = require("../models/switch.model.js");

 // Logique pour gérer les messages WebSocket pour les capteurs
 exports.handleWebSocketMessage = async (message) => {
  if (message.action === 'create') {
    await exports.create({ body: message.data });
  } 

  if (message.action === 'delete') {
    await exports.delete({ params: { id: message.data.id } }, null);
  }

  if (message.action === 'update') {
    await exports.update({ params: { id: message.data.id }, body: message.data }, null);
  }

  if (message.action === 'updateStatus') {
    await exports.updateStatusBySwitchId({ body: message.data }, null);
  }

};

// Create and Save a new Switch
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    if(res) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log("Content can not be empty!")
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
    if(res) {
      res.send(data);
    } else {
      console.log("Le switch a bien été créé");
    }
  } catch (err) {
    if(res) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Switch."
      });
    }
    console.error("User is not authorized to create a switch");
    return;
  }
};

//Update Switch status boolean 
exports.updateStatusBySwitchId = async (req, res) => {
  // Validate Request
  if (!req.body.switchId || req.body.status === undefined) {
    if(res) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log("Content can not be empty!")
    return;
  }

  try {
    const data = await Switch.updateBySwitchId(req.body.switchId, req.body.status);
    if(res){
      res.send(data);
    }
  } catch (err) {
    if (err.kind === "not_found") {
      if(res) {
        res.status(404).send({
          message: `Not found switch with switchId ${req.body.switchId}.`
        });
      }
      console.error(`Not found switch with switchId ${req.body.switchId}.`);
    } else {
      if(res) {
        res.status(500).send({
          message: err.message || "Some error occurred while updating the switch."
        });
      }
      console.error(err.message || "Some error occurred while updating the switch.");
    }
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
    if(res){
      res.send(data);
    }
  } catch (err) {
    if (err.kind === "not_found") {
      if(res) {
        res.status(500).send({
          message: err.message || `Not found switch with id ${req.params.id}.`
        });
      }
      console.error(err.message || "Error updating switch with id " + req.params.id);
    }
  }
};

// Delete a Switch with the specified switchId in the request
exports.delete = async (req, res) => {
  try {
    await Switch.remove(req.params.id);
    if(res) {
      res.send({ message: `Switch was deleted successfully!` });
    }
  } catch (err) {
    if (err.kind === "not_found") {
      if (res) {
        res.status(404).send({
          message: `Switch non trouvé avec l'id ${req.params.id}.`
        });
      } else {
        console.error(`Switch non trouvé avec l'id ${req.params.id}.`);
      }
    } else {
      if (res) {
        res.status(500).send({
          message: "Impossible de supprimer le switch avec l'id " + req.params.id
        });
      } else {
        console.error("Impossible de supprimer le switch avec l'id " + req.params.id);
      }
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
