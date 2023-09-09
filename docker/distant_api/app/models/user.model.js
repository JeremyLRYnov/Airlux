
const sql = require("./db.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.admin = user.admin;
};

User.create = async (newUser, result) => {
    try {
      newUser.password = await bcrypt.hash(newUser.password, 12);
  
      sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
        if (err) {
          console.log("erreur: ", err);
          result(err, null);
          return;
        }
        console.log("Utilisateur créé: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
      });
    } catch (error) {
      console.log("erreur: ", error);
      result(error, null);
    }
  };

  User.authenticate = async (email, password, result) => {
    try {
      sql.query(`SELECT * FROM Users WHERE email = ?`, [email], async (err, res) => {
        if (err) {
          console.log("erreur: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          const user = res[0];
  
          // Utilisation de bcrypt pour comparer les mots de passe
          const isPasswordCorrect = await bcrypt.compare(password, user.password);
          if (isPasswordCorrect) {
  
            // Génération d'un token JWT avec une clé secrète et une durée d'expiration
            const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_TOKEN_SECRET, {
              expiresIn: process.env.JWT_EXPIRE,
            });
            
            result(null, { user, token });
          } else {
            result({ kind: "invalid_credentials" }, null);
          }
          return;
        }
  
        // Gestion d'une erreur si l'utilisateur n'est pas trouvé
        result({ kind: "not_found" }, null);
      });
    } catch (error) {
      console.log("erreur: ", error);
      result(error, null);
    }
  };

User.findById = (id, result) => {
  sql.query(`SELECT * FROM Users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (params, result) => {
  let query = "SELECT * FROM Users";

  if (params.name) {
    query += ` WHERE name LIKE '%${params.name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = async (id, user, result) => {
    try {
      user.password = await bcrypt.hash(user.password, 12);
  
      sql.query(
        "UPDATE Users SET name = ?, email = ?, password = ?, admin = ? WHERE id = ?",
        [user.name, user.email, user.password, user.admin, id],
        (err, res) => {
          // ...
        }
      );
    } catch (error) {
      console.log("erreur: ", error);
      result(error, null);
    }
};
  

User.remove = (id, result) => {
  sql.query("DELETE FROM Users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM Users", (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
