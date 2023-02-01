const express = require('express');
const redis = require('ioredis');
const Promise = require('bluebird');

const redisConfig = require('./app/config/db.config.js');

const app = express();
//const client = Promise.promisifyAll(redis.createClient({ redisConfig}));

const client = new redis(redisConfig.PORT, redisConfig.HOST);


client.hset('utilisateurs:admin:batiments:maison:pieces:salon:capteurs:1',
  "type", "temperature", "valeur", "20", "unite", "°C", "date", "2020-01-01 12:00:00"
), function (err, reply) {
  console.log(reply); // OK
};

client.hset('utilisateurs:admin:info', "prenom", "admin", "admin", "1", "unite", "bool"
), function (err, reply) {
  console.log(reply); // OK
};

client.hset('utilisateurs:admin:batiments:maison:info', "nom", "maison"
), function (err, reply) {
  console.log(reply); // OK
};

client.hset('utilisateurs:admin:batiments:maison:pieces:salon:info', "nom", "salon"
), function (err, reply) {
  console.log(reply); // OK
};

client.hset('utilisateurs:admin:batiments:maison:pieces:salon:capteurs:2', "type", "interrupteur", "valeur", "0", "unite", "bool", "date", "2020-01-01 12:00:00"
), function (err, reply) {
  console.log(reply); // OK
};

app.get('/sensors', (req, res) => {
  client.hgetall('utilisateurs:admin:batiments:maison:pieces:salon:capteurs:2', (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

function MHGETALL(keys, cb) {

  client.multi({pipeline: false});

  keys.forEach(function(key, index){
    client.hgetall(key);
  });

  client.exec(function(err, result){
      cb(err, result);
  });
}

app.get('/scanData', (req, res) => {
  const stream = client.scanStream({
    match: 'utilisateurs:admin:batiments:maison:pieces:salon:capteurs:*',
    count: 10
  });
  let keysArray = [];
  stream.on('data', (resultKeys = []) => {
    let key;
    for (key of resultKeys) {
      if (!keysArray.includes(key)) {
        keysArray.push(key);
      }
    }
  });

  stream.on('end', () => {
    MHGETALL(keysArray, function(err, result){
      if (err) {
        return res.status(500).send(err);
      }
      res.send(result);
    });
  });
});


require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App successfully started on http://localhost:${PORT}`);
});