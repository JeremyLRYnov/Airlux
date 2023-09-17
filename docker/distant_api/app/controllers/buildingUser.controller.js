const BuildingUser = require("../models/buildingUser.model.js");
const User = require("../models/user.model.js");
const buildingController = require("./building.controller");

// Logique pour gérer les messages WebSocket pour la lier des bâtiments à des utilisateurs
exports.handleWebSocketMessageBuildingUsers = async (message) => {
  if (message.action === 'create' || message.action === 'update') {

    // Récupération des IDs des utilisateurs basés sur leurs mails
    const userIdPromises = message.data.users.map(email => 
      exports.findUserIdByEmail({ params: { email } }, null)
    );
    const userIdResponses = await Promise.all(userIdPromises);
    const userIds = userIdResponses.filter(Boolean);
    
    // Assigner chaque utilisateur au bâtiment
    await exports.removeUsersFromBuilding({ params: { buildingId: message.data.id } }, null);
    for (let userId of userIds) {
      await exports.assignUserToBuilding({ body: { buildingId: message.data.id, userId } });
    }   
  } 

  if (message.action === 'delete') {
    await exports.removeUsersFromBuilding({ params: { buildingId: message.data.id } }, null);
    await buildingController.delete({ params: { id: message.data.id } }, null);
  }
};


// Assign a user to a building
exports.assignUserToBuilding = async (req, res) => {
  if (!req.body) {
    if (res) {
      res.status(400).send({
        message: "Le contenu ne peut pas être vide !"
      });
    }
    console.error("Le contenu ne peut pas être vide !");
    return;
  }

  const buildingUser = new BuildingUser({
    buildingId: req.body.buildingId,
    userId: req.body.userId
  });

  try {
    const data = await BuildingUser.assignUserToBuilding(buildingUser);
    if (res) {
      res.send(data);
    } else {
      console.log("User assigned to building: ", data);
    }
  } catch (err) {
    if (res) {
      res.status(500).send({
        message: err.message || "Une erreur est survenue lors de l'assignation de l'utilisateur au bâtiment."
      });
    }
    console.error("Une erreur est survenue lors de l'assignation de l'utilisateur au bâtiment: ", err.message);
  }
};


// Find users by building ID
exports.findUsersByBuildingId = async (req, res) => {
  try {
    const data = await BuildingUser.findUsersByBuildingId(req.params.buildingId);
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Users with buildingId ${req.params.buildingId}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Users with buildingId " + req.params.buildingId
      });
    }
  }
};

// Delete all links between users and building ID
exports.removeUsersFromBuilding = async (req, res) => {
  try {
    const data = await BuildingUser.removeUsersFromBuilding(req.params.buildingId);
    if(res) {
      res.send({ message: `Users for building id ${req.params.buildingId} were deleted successfully!` });
    } else {
      console.log(`Users for building id ${req.params.buildingId} were deleted successfully!`)
    }
  } catch (err) {
    if(res) {
      res.status(500).send({
        message: "Error removing users for building id " + req.params.buildingId
      });
    } else {
      console.error("Une erreur est survenue lors de la suppression de la liaison entre les utilisateurs et le bâtiment: ", err.message);
    }
  }
};

// Find buildings by user ID
exports.findBuildingsByUserId = async (req, res) => {
  try {
    const data = await BuildingUser.findBuildingsByUserId(req.params.userId);
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Buildings with userId ${req.params.userId}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Buildings with userId " + req.params.userId
      });
    }
  }
};

exports.findUserIdByEmail = async (req, res) => {
  try {
    const userId = await User.findUserIdByEmail(req.params.email);
    if (res) {
      res.send(userId); 
    } else {
      console.log("User found: ", userId); // Log seulement ici
      return userId;
    }
  } catch (err) {
    if (res) {
      res.status(500).send({
        message: err.message || "Une erreur est survenue lors de la recherche de l'utilisateur par e-mail."
      });
    }
    console.error("Une erreur est survenue lors de la recherche de l'utilisateur par e-mail: ", err.message);
  }
};


exports.removeBuildingsByUserId = async (req, res) => {
  try {
    const data = await BuildingUser.removeBuildingsByUserId(req.params.userId);
    res.send({ message: `Buildings for user id ${req.params.userId} were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: "Error removing Buildings for user id " + req.params.userId
    });
  }
};



