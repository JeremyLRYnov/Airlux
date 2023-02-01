const redis = require('ioredis');
const redisConfig = require('../config/db.config.js');

//const client = redis.createClient({ redisConfig});

const client = new redis(redisConfig.PORT, redisConfig.HOST);

module.exports = client;