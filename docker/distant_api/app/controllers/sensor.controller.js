const Sensor = require('../models/sensor.model.js');

 // Logique pour gérer les messages WebSocket pour les capteurs
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

  if (message.action === 'updateStatus') {
    await exports.updateValueBySensorId({ body: message.data }, null);
    console.log("données mises à jour sur mysql");
  }
};

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
    if(res) {
      res.send(data);
    } else {
      console.log("Le capteur a bien été créé");
    }
  } catch (err) {
    if(res) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Sensor."
      });
    }
    console.error("User is not authorized to create a sensor");
    return;
  }
};

exports.updateValueBySensorId = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {
    const data = await Sensor.updateBySensorId(req.body.sensorId, new Sensor(req.body)); 
    if(res){
      res.send(data);
    }
  } catch (err) {
    if (err.kind === "not_found") {
      if(res) {
        res.status(404).send({
          message: err.message || `Not found sensor with sensorId ${req.body.sensorId}.`  
        });
      }
      console.error(err.message || "Error updating sensor with sensorId " + req.body.sensorId); 
    }
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
    if(res){
      res.send(data);
    }
  } catch (err) {
    if (err.kind === "not_found") {
      if(res) {
        res.status(500).send({
          message: err.message || `Not found senor with id ${req.params.id}.`
        });
      }
      console.error(err.message || "Error updating sensor with id " + req.params.id);
    }
  }
};

// Delete a Sensor with the specified id in the request
exports.delete = async (req, res) => {
  try {
    await Sensor.remove(req.params.id);
    if(res) {
      res.send({ message: `Sensor was deleted successfully!` });
    }
    console.log("Sensor was deleted successfully")
  } catch (err) {
    if (err.kind === "not_found") {
      if (res) {
        res.status(404).send({
          message: `Capteur non trouvé avec l'id ${req.params.id}.`
        });
      } else {
        console.error(`Capteur non trouvé avec l'id ${req.params.id}.`);
      }
    } else {
      if (res) {
        res.status(500).send({
          message: "Impossible de supprimer le capteur avec l'id " + req.params.id
        });
      } else {
        console.error("Impossible de supprimer le capteur avec l'id " + req.params.id);
      }
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



