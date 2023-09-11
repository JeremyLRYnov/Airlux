const BuildingUser = require("../models/buildingUser.model.js");

// Assign a user to a building
exports.assignUserToBuilding = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const buildingUser = new BuildingUser({
    buildingId: req.body.buildingId,
    userId: req.body.userId
  });

  BuildingUser.assignUserToBuilding(buildingUser, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while assigning the User to the Building."
      });
    } else {
      res.send(data);
    }
  });
};

// Find users by building ID
exports.findUsersByBuildingId = (req, res) => {
  BuildingUser.findUsersByBuildingId(req.params.buildingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Users with buildingId ${req.params.buildingId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Users with buildingId " + req.params.buildingId
        });
      }
    } else {
      res.send(data);
    }
  });
};

module.exports = {
    assignUserToBuilding: BuildingUser.assignUserToBuilding,
    findUsersByBuildingId: BuildingUser.findUsersByBuildingId
  };
  


