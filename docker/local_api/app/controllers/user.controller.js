const User = require("../models/user.model.js");

// Create and Save a new user
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    // Create a user
    const user = new User({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });
    
    // Save user in the database
    User.create(user, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the user."
        });
        else res.send(data);
    });
};

// Retrieve one user from the database.
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found user with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating user with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete user with id " + req.params.id
                });
            }
        } else res.send({ message: `user was deleted successfully!` });
    });
};

