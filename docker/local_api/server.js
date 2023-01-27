const express = require('express');
const redis = require('ioredis');
const Promise = require('bluebird');

const redisConfig = require('./app/config/db.config.js');

const app = express();
//const client = Promise.promisifyAll(redis.createClient({ redisConfig}));

const client = new redis(redisConfig.PORT, redisConfig.HOST);


client.hmset('utilisateur:admin:batiment:maison:pieces:salon:capteurs:1',
 "type", "temperature", "valeur", "20", "unite", "°C", "date", "2020-01-01 12:00:00"
 ), function(err, reply) {
    console.log(reply); // OK
};

// app.get('/utilisateur', function(req, res) {
//     //var redisKey = req.query.redisKey

//     client.hget("utilisateur:/:key", function(err, reply) {
//         if(err){
//             res.status(400).send(err);
//             return;
//         }
//         res.status(200).send(reply);
//     });
// });

app.get('/sensors', (req, res) => {
    client.hgetall('utilisateur:admin:batiment:maison:pieces:salon:capteurs:1', (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(result);
    });
});

//get all utilisateur in redis
// app.get('/utilisateur', async (req, res) => {
//     await client.utilisateur('*', (err, utilisateur) => {
//         res.send(utilisateur);
//     });
// });

//get value of a key
// app.get('/utilisateur/:key', async (req, res) => {
//     await client.get(req.params.utilisateur, (err, value) => {
//         res.send(value);
//     });
// });

//require('./app/routes/sensor.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App successfully started on http://localhost:${PORT}`);
});