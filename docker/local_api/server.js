const Redis = require('ioredis');
const redis = new Redis({
    host: 'redis',
    port: 6379
});

const express = require('express');
const app = express();
const port = 3000;

redis.on('connect', () => {
    console.log('Connected to Redis');
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

app.get('/', (req, res) => {
    redis.incr('counter', (err, counter) => {
        res.send('Counter: ' + counter);
    });
});
