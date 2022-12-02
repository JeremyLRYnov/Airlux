const sql = require("./db.js");

// constructor
const Sensor = function(sensor) {
  this.title = sensor.title;
  this.description = sensor.description;
  this.published = sensor.published;
};

// Create and Save a new Sensor redis
exports.create = (req, res) => {
};

Sensor.findById = (id, result) => {

};

Sensor.getAll = (title, result) => {

};

Sensor.getAllPublished = result => {

};

Sensor.updateById = (id, sensor, result) => {

};

Sensor.remove = (id, result) => {

};

Sensor.removeAll = result => {

};

module.exports = Sensor;
