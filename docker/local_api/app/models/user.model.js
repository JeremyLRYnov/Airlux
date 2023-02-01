const client = require('./db.js');

const User = function(user) {
    this.name = user.name;
    this.admin = user.admin;
    this.unite = user.unite;
}

User.create = (newUser, result) => {
    client.hset('user:'+ newUser.name +':info',
    "prenom", newUser.name, "admin", newUser.admin, "unite", newUser.unite 
    ), (err, reply) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        };
        console.log("Created user: ", { id: reply.insertId, ...newUser });
        result(null, { id: reply.insertId, ...newUser.name });
    };
};

User.findById = (userId, result) => {
    client.hgetall('user:'+ userId +':info', (err, value) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        };
        if (value) {
            console.log("Found user: ", value);
            result(null, value);
            return;
        };
        result({ kind: "not_found" }, null);
    });
};

User.updateById = (id, user, result) => {
    client.hset('user:'+ id +':info', "prenom", user.name, "admin", user.admin, "unite", user.unite, (err, reply) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        };
        if (reply === 0) {
            result({ kind: "not_found" }, null);
            return;
        };
        console.log("Updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
    });
};

User.remove = (id, result) => {
    client.del('user:'+ id + ':', (err, reply) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        };
        if (reply === 0) {
            result({ kind: "not_found" }, null);
            return;
        };
        console.log("Deleted user with id: ", id);
        result(null, reply);
    });
};