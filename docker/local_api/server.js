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