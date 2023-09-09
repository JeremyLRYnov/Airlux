const sql = require("./db.js");

// constructor
const Sensor = function(sensor) {
  this.name = sensor.name;
  this.roomId = sensor.roomId;
  this.value = sensor.value;
  this.unit = sensor.unit
};

Sensor.create = (newSensor, result) => {
  sql.query("INSERT INTO Sensors SET ?", newSensor, (err, res) => {
    if (err) {
      console.log("grosse erreur: ", err);
      result(err, null);
      return;
    }
    console.log("created sensor: ", { id: res.insertId, ...newSensor });
    result(null, { id: res.insertId, ...newSensor });
  });
};

Sensor.findById = (id, result) => {
  sql.query(`SELECT * FROM Sensors WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found sensor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Sensor with the id
    result({ kind: "not_found" }, null);
  });
};

Sensor.getAll = (name, result) => {
  let query = "SELECT * FROM Sensors";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sensors: ", res);
    result(null, res);
  });
};

Sensor.updateById = (id, sensor, result) => {
  sql.query(
    "UPDATE Sensors SET name = ?, roomId = ?, value = ?, unit = ? WHERE id = ?",
    [sensor.name, sensor.roomId, sensor.value, sensor.unit, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Sensor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated sensor: ", { id: id, ...sensor });
      result(null, { id: id, ...sensor });
    }
  );
};

Sensor.remove = (id, result) => {
  sql.query("DELETE FROM Sensors WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Sensor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted sensor with id: ", id);
    result(null, res);
  });
};

Sensor.removeAll = result => {
  sql.query("DELETE FROM Sensors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} sensors`);
    result(null, res);
  });
};

module.exports = Sensor;
