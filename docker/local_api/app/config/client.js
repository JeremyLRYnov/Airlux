import { Client } from 'redis-om';

const url = process.env.REDIS_URL || 'redis://redis:6379';
let client;

try {
    client = new Client();
    await client.open(url);

} catch (error) {
    console.log(error);

}

export default client;