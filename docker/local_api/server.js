const express = require('express');
const redis = require('ioredis');

const redisConfig = require('./app/config/db.config');

const app = express();
const client = redis.createClient({ redisConfig});

client.connect();
client.on('connect', () => {
    console.log('Redis connected');
});

//get all keys in redis
app.get('/keys', (req, res) => {
    client.keys('*', (err, keys) => {
        res.send(keys);
    });
});

//get value of a key
app.get('/key/:key', (req, res) => {
    client.get(req.params.key, (err, value) => {
        res.send(value);
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App successfully started on http://localhost:${PORT}`);
});
