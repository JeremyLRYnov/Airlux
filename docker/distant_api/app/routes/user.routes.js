module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const router = require("express").Router();
  
    // Create a new User
    router.post("/signup", users.signup);

    // Add an external user
    router.post("/addExternalUser", users.addExternalUser);
  
    // Authenticate a User
    router.post("/signin", users.signin);

    // Retrieve all Users
    router.get("/", users.findAll);
  
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id", users.update);
  
    // Delete a User with id
    router.delete("/:id", users.delete);
  
    // Delete all Users
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };
  