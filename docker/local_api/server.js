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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App successfully started on http://localhost:${PORT}`);
});
