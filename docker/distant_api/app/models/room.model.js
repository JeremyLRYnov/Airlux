const sql = require("./db.js");

const Room = function(room) {
  this.name = room.name;
  this.buildingId = room.buildingId;
};

Room.create = (newRoom, result) => {
  sql.query("INSERT INTO Rooms SET ?", newRoom, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("Room créée: ", { id: res.insertId, ...newRoom });
    result(null, { id: res.insertId, ...newRoom });
  });
};

Room.findById = (id, result) => {
  sql.query(`SELECT * FROM Rooms WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found room: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Room with the id
    result({ kind: "not_found" }, null);
  });
};

Room.getAll = (name, result) => {
  let query = "SELECT * FROM Rooms";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log("rooms: ", res);
    result(null, res);
  });
};

Room.updateById = (id, room, result) => {
  sql.query(
    "UPDATE Rooms SET name = ?, buildingId = ? WHERE id = ?",
    [room.name, room.buildingId, id],
    (err, res) => {
      if (err) {
        console.log("erreur: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Room with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated room: ", { id: id, ...room });
      result(null, { id: id, ...room });
    }
  );
};

Room.remove = (id, result) => {
  sql.query("DELETE FROM Rooms WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Room with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted room with id: ", id);
    result(null, res);
  });
};

Room.removeAll = result => {
  sql.query("DELETE FROM Rooms", (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} rooms`);
    result(null, res);
  });
};

module.exports = Room;
