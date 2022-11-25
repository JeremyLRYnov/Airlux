const sql = require('./db.js');

const Sensor = function(sensor) {
  this.name = sensor.name;
  this.description = sensor.description;
  this.status = sensor.status;
  this.created_at = sensor.created_at;
  this.updated_at = sensor.updated_at;
}

Sensor.create = (newSensor, result) => {
  sql.query("INSERT INTO sensors SET ?", newSensor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created sensor: ", { id: res.insertId, ...newSensor });
    result(null, { id: res.insertId, ...newSensor });
  });
}

Sensor.findById = (sensorId, result) => {
  sql.query(`SELECT * FROM sensors WHERE id = ${sensorId}`, (err, res) => {
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
}

Sensor.getAll = result => {
  sql.query("SELECT * FROM sensors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sensors: ", res);
    result(null, res);
  });
}

Sensor.updateById = (id, sensor, result) => {
  sql.query(
    "UPDATE sensors SET name = ?, description = ?, status = ?, created_at = ?, updated_at = ? WHERE id = ?",
    [sensor.name, sensor.description, sensor.status, sensor.created_at, sensor.updated_at, id],
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
}

Sensor.remove = (id, result) => {
  sql.query("DELETE FROM sensors WHERE id = ?", id, (err, res) => {
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
}

Sensor.removeAll = result => {
  sql.query("DELETE FROM sensors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} sensors`);
    result(null, res);
  });
}

module.exports = Sensor;