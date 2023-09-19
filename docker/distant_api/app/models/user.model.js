
const { db } = require("./db.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.admin = user.admin;
  }

  static async signup(newUser) {
    try {
      if (!newUser.id) {
        newUser.id = uuidv4();  // Génère un ID unique si aucun ID n'est fourni
      }
      newUser.password = await bcrypt.hash(newUser.password, 12);
      console.log('Inserting user:', newUser);
      const [res] = await db.query("INSERT INTO Users SET ?", newUser);
      console.log("Utilisateur créé: ", { id: newUser.id, ...newUser});

      return { id: newUser.id, ...newUser };
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async addExternalUser(newUser) {
    // Vérifiez si un utilisateur avec cet ID existe déjà
    if (newUser.id) {
      const [existingUser] = await db.query("SELECT * FROM Users WHERE id = ?", [newUser.id]);
      if (existingUser.length) {
        throw { kind: "duplicate_id", message: "An user with this ID already exists" };
      }
    } else {
      newUser.id = uuidv4();  // Génère un ID unique si aucun ID n'est fourni
    }
    try {
      let query = "INSERT INTO Users SET ?";
      const [res] = await db.query(query, newUser);
      console.log("Utilisateur externe ajouté: ", { id: newUser.id, ...newUser });
      return { id: newUser.id, ...newUser };
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }

  static async signin(email, password) {
    if (!email || !password) {
      throw { kind: "invalid_input" };
    }

    try {
      const [res] = await db.query(`SELECT * FROM Users WHERE email = ?`, [email]);
      if (res.length) {
        const user = res[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (isPasswordCorrect) {
          delete user.password;
          const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_TOKEN_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
          });
          return { result: user, token };
        } else {
          throw { kind: "invalid_credentials", message: "Invalid password" };
        }
      }
      
      throw { kind: "not_found", message: "No user found with this email" };
    } catch (error) {
      console.log("erreur: ", error);
      throw { kind: "unexpected_error", message: error.message };
    }
  }

  static async findUserIdByEmail(email) {
    try {
      const [results] = await db.query("SELECT id FROM Users WHERE email = ?", [email]);
      if (results.length) {
        return results[0].id;
      } else {
        throw { kind: "not_found", message: "No user found with this email" };
      }
    } catch (error) {
      console.log("erreur: ", error);
      throw error;
    }
  }  
  
};

User.findById = async (id) => {
  try {
    const [res] = await db.query(`SELECT * FROM Users WHERE id = ?`, [id]);

    if (res.length) {
      console.log("found user: ", res[0]);
      return res[0];
    } else {
      throw { kind: "not_found" };
    }
  } catch (err) {
    console.log("erreur: ", err);
    throw err;
  }
};

User.getAll = async (params) => {
  try {
    let query = "SELECT * FROM Users";

    if (params && params.name) {
      query += " WHERE name LIKE ?";
    }

    const [res] = await db.query(query, params ? [`%${params.name}%`] : []);
    console.log("users: ", res);
    return res;
  } catch (err) {
    console.log("erreur: ", err);
    throw err;
  }
};

User.updateById = async (id, user) => {
  try {
    user.password = await bcrypt.hash(user.password, 12);

    const [res] = await db.query(
      "UPDATE Users SET name = ?, email = ?, password = ?, admin = ? WHERE id = ?",
      [user.name, user.email, user.password, user.admin, id]
    );
    
    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("updated user: ", { id: id, ...user });
    return { id: id, ...user };
  } catch (error) {
    console.log("erreur: ", error);
    throw error;
  }
};

User.remove = async (id) => {
  try {
    const [res] = await db.query("DELETE FROM Users WHERE id = ?", [id]);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("deleted user with id: ", id);
    return res;
  } catch (err) {
    console.log("erreur: ", err);
    throw err;
  }
};

User.removeAll = async () => {
  try {
    const [res] = await db.query("DELETE FROM Users");

    console.log(`deleted ${res.affectedRows} users`);
    return res;
  } catch (err) {
    console.log("erreur: ", err);
    throw err;
  }
};

module.exports = User;