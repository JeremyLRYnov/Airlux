const User = require('../models/user.model.js');

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
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin,
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
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
    return;
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, //mot de passe déjà hashé
    admin: req.body.admin,
  });

  try {
    const data = await User.addExternalUser(user);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Une erreur est survenue lors de l'ajout de l'utilisateur."
    });
  }
};


// Fonction d'authentification
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await User.signin(email, password);
    res.send(data);
  } catch (err) {
    res.status(500).send({
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

// Supprimer un utilisateur avec l'id spécifié dans la demande
exports.delete = async (req, res) => {
  try {
    const data = await User.remove(req.params.id);
    res.send({ message: `L'utilisateur a été supprimé avec succès !` });
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Utilisateur non trouvé avec l'id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Impossible de supprimer l'utilisateur avec l'id " + req.params.id
      });
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
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
    return;
  }

  try {
    const data = await User.updateById(req.params.id, new User(req.body));
    res.send(data);
  } catch (err) {
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
};


