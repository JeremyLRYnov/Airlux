const client = require('./db.js');

const Sensor = function(sensor) {
    this.name = sensor.name;
    this.description = sensor.description;
    this.value = sensor.value;
}

Sensor.create = (newSensor, result) => {
    client.set(newSensor.name, newSensor.value, (err, reply) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Created sensor: ", { id: reply.insertId, ...newSensor });
        result(null, { id: reply.insertId, ...newSensor });
    });
}

Sensor.findById = (sensorId, result) => {
    client.get(sensorId, (err, value) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if (value) {
            console.log("Found sensor: ", value);
            result(null, value);
            return;
        }
        result({ kind: "not_found" }, null);
    });
}

Sensor.getAll = result => {
    client.keys('*', (err, keys) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Sensors: ", keys);
        result(null, keys);
    });
}

Sensor.updateById = (id, sensor, result) => {
    client.set(id, sensor.value, (err, reply) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        if (reply === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Updated sensor: ", { id: id, ...sensor });
        result(null, { id: id, ...sensor });
    });
}

Sensor.remove = (id, result) => {
    client.del(id, (err, reply) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        if (reply === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted sensor with id: ", id);
        result(null, reply);
    });
}

Sensor.removeAll = result => {
    client.flushall((err, reply) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log(`Deleted ${reply} sensors`);
        result(null, reply);
    });
}

module.exports = Sensor;