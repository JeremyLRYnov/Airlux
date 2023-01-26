const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    url: 'redis://redis:6379',
});

client.connect();
client.on('connect', () => {
    console.log('Redis connected');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send(`Number of visits is ${visits}`);
        client.set('visits', parseInt(visits) + 1);
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App successfully started on http://localhost:${PORT}`);
});
