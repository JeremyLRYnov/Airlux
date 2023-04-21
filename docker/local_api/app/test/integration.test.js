const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../models/user.models.js');
const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: 'redis',
        port: '6379'
    },
    password: ''
});

client.on('error', err => {
    console.log('Error ' + err);
});

describe('Integration test', () => {
  it('POST USER test database', async () => {
    const hashedPassword = await bcrypt.hash('password', 12);
    const user = await userRepository.createAndSave({ name: 'alice', email : 'alice@orange.fr', password: hashedPassword });
    const token = jwt.sign({ email: user.email, id: user.entityId }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    const { entityId, password, ...rest } = user.toJSON();
    const data = { id: user.entityId, ...rest };
    console.log(data, token);
  });
});