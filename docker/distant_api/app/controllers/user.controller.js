const User = require('../models/user.model.js');

 // Logique pour gérer les messages WebSocket pour les utilisateurs
exports.handleWebSocketMessage = async (message) => {
  if (message.action === 'create') {
    await exports.addExternalUser({ body: message.data });
  } 

  if(message.action === 'delete') {
    await exports.delete({ params: { id: message.data.id } }, null);
  }

  if(message.action === 'update') {
    await exports.update({ params: { id: message.data.id }, body: message.data }, null);
  }
};

// Créer et enregistrer un nouvel utilisateur
exports.signup = async (req, res) => {
  // Valider la requête
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
    return;
  }

  // Créer un utilisateur
  const user = new User({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin !== undefined ? req.body.admin : true,
  });

  // Enregistrer l'utilisateur dans la base de données
  try {
    const data = await User.signup(user);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Une erreur est survenue lors de la création de l'utilisateur."
    });
  }
};

//Enregistrer un utilisateur déjà créé sur Redis
exports.addExternalUser = async (req, res) => {
  if (!req.body) {
    if (res) {
      res.status(400).send({
        message: "Le contenu ne peut pas être vide !"
      });
    }
    console.error("Le contenu ne peut pas être vide !");
    return;
  }

  const user = new User({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, //mot de passe déjà hashé
    admin: req.body.admin !== undefined ? req.body.admin : true,
  });

  try {
    const data = await User.addExternalUser(user);
    if (res) {
      res.send(data);
    }  
  } catch (err) {
    if(res){
      res.status(500).send({
        message: err.message || "Une erreur est survenue lors de l'ajout de l'utilisateur."
      });
    }
    console.error("Une erreur est survenue lors de l'ajout de l'utilisateur: ", err.message);
  }
};

// Fonction d'authentification
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await User.signin(email, password);
    res.send(data);
  } catch (err) {
    res.status(400).send({
      message: err.message || "Une erreur est survenue lors de l'authentification."
    });
  }
};

// Récupérer tous les utilisateurs de la base de données (avec condition)
exports.findAll = async (req, res) => {
  const name = req.query.name;
  
  try {
    const data = await User.getAll({ name });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Une erreur est survenue lors de la récupération des utilisateurs."
    });
  }
};

// Trouver un utilisateur unique avec un id
exports.findOne = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Utilisateur non trouvé avec l'id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Erreur lors de la récupération de l'utilisateur avec l'id " + req.params.id
      });
    }
  }
};

exports.findUserIdByEmail = async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(400).send({
        message: "L'email est requis"
      });
      return;
    }

    const userId = await User.findUserIdByEmail(req.body.email);
    res.send({ id: userId });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Une erreur est survenue lors de la récupération de l'ID de l'utilisateur."
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await User.remove(req.params.id);
    if (res) {
      res.send({ message: `L'utilisateur a été supprimé avec succès !` });
    } else {
      console.log(`L'utilisateur avec l'id ${req.params.id} a été supprimé avec succès !`);
    }
  } catch (err) {
    if (err.kind === "not_found") {
      if (res) {
        res.status(404).send({
          message: `Utilisateur non trouvé avec l'id ${req.params.id}.`
        });
      } else {
        console.error(`Utilisateur non trouvé avec l'id ${req.params.id}.`);
      }
    } else {
      if (res) {
        res.status(500).send({
          message: "Impossible de supprimer l'utilisateur avec l'id " + req.params.id
        });
      } else {
        console.error("Impossible de supprimer l'utilisateur avec l'id " + req.params.id);
      }
    }
  }
};


// Supprimer tous les utilisateurs de la base de données
exports.deleteAll = async (req, res) => {
  try {
    const data = await User.removeAll();
    res.send({ message: `Tous les utilisateurs ont été supprimés avec succès !` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Une erreur est survenue lors de la suppression de tous les utilisateurs."
    });
  }
};

// Mettre à jour un utilisateur identifié par l'id dans la demande
exports.update = async (req, res) => {
  // Valider la demande
  if (!req.body) {
    if (res) {
      res.status(400).send({
        message: "Le contenu ne peut pas être vide !"
      });
    }
    console.error("Le contenu ne peut pas être vide !");
    return;
  }

  try {
    const data = await User.updateById(req.params.id, new User(req.body));
    if (res) {
      res.send(data);
    } else {
      console.log(`Utilisateur avec l'id ${req.params.id} a été mis à jour avec succès.`);
    }
  } catch (err) {
    if (res) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur non trouvé avec l'id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la mise à jour de l'utilisateur avec l'id " + req.params.id
        });
      }
    }
    console.error("Erreur lors de la mise à jour de l'utilisateur: ", err.message);
  }
};



