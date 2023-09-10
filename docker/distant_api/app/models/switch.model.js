const sql = require("./db.js");

const Switch = function(switchEntity) {
  this.name = switchEntity.name;
  this.roomId = switchEntity.roomId;
  this.status = switchEntity.status;
};

Switch.create = (newSwitch, result) => {
  sql.query("INSERT INTO Switches SET ?", newSwitch, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("Switch créé: ", { id: res.insertId, ...newSwitch });
    result(null, { id: res.insertId, ...newSwitch });
  });
};

Switch.findById = (id, result) => {
  sql.query(`SELECT * FROM Switches WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found switch: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Switch with the id
    result({ kind: "not_found" }, null);
  });
};

Switch.getAll = (name, result) => {
  let query = "SELECT * FROM Switches";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log("switches: ", res);
    result(null, res);
  });
};

Switch.updateById = (id, switchEntity, result) => {
  sql.query(
    "UPDATE Switches SET name = ?, roomId = ?, status = ? WHERE id = ?",
    [switchEntity.name, switchEntity.roomId, switchEntity.status, id],
    (err, res) => {
      if (err) {
        console.log("erreur: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Switch with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated switch: ", { id: id, ...switchEntity });
      result(null, { id: id, ...switchEntity });
    }
  );
};

Switch.remove = (id, result) => {
  sql.query("DELETE FROM Switches WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Switch with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted switch with id: ", id);
    result(null, res);
  });
};

Switch.removeAll = result => {
  sql.query("DELETE FROM Switches", (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} switches`);
    result(null, res);
  });
};

module.exports = Switch;
