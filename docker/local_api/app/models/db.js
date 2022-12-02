const app = express();
const client = redis.createClient({
    port: 6379,
    host: 'localhost',
});

const port = process.env.PORT || 5050;

client.auth(process.env.REDIS_AUTH, (err, response) => {
    if (err) throw err;
})
