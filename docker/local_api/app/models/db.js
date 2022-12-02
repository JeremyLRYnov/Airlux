require('dotenv').config();

const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
});

const port = process.env.PORT || 5050;

client.auth(process.env.REDIS_AUTH, (err, response) => {
    if (err) throw err;
    else console.log('Redis connected');
})
