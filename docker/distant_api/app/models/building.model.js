const sql = require("./db.js");

// constructor
const Building = function(building) {
  this.name = building.name;
  this.createdBy = building.createdBy;
};

Building.create = (newBuilding, result) => {
  sql.query("INSERT INTO Buildings SET ?", newBuilding, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("created building: ", { id: res.insertId, ...newBuilding });
    result(null, { id: res.insertId, ...newBuilding });
  });
};

Building.findById = (id, result) => {
  sql.query(`SELECT * FROM Buildings WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found building: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Building with the id
    result({ kind: "not_found" }, null);
  });
};

Building.getAll = (name, result) => {
  let query = "SELECT * FROM Buildings";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log("buildings: ", res);
    result(null, res);
  });
};

Building.updateById = (id, building, result) => {
  sql.query(
    "UPDATE Buildings SET name = ?, createdBy = ? WHERE id = ?",
    [building.name, building.createdBy, id],
    (err, res) => {
      if (err) {
        console.log("erreur: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Building with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated building: ", { id: id, ...building });
      result(null, { id: id, ...building });
    }
  );
};

Building.remove = (id, result) => {
  sql.query("DELETE FROM Buildings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Building with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted building with id: ", id);
    result(null, res);
  });
};

Building.removeAll = result => {
  sql.query("DELETE FROM Buildings", (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} buildings`);
    result(null, res);
  });
};

module.exports = Building;
