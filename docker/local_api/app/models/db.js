const redis = require('ioredis');
const redisConfig = require('../config/db.config.js');

const client = redis.createClient({ redisConfig});

client.connect();
client.on('connect', () => {
    console.log('Redis connected');
});

module.exports = client;