const BuildingUser = require("../models/buildingUser.model.js");

// Assign a user to a building
exports.assignUserToBuilding = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const buildingUser = new BuildingUser({
    buildingId: req.body.buildingId,
    userId: req.body.userId
  });

  try {
    const data = await BuildingUser.assignUserToBuilding(buildingUser);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while assigning the User to the Building."
    });
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



