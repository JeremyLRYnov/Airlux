const redis = require("redis");
const dbConfig = require("../config/db.config.js");

const router = redis.createClient({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  password: dbConfig.PASSWORD,
  db: dbConfig.DB,
});

router.on("error", function (error) {
  console.error(error);
});

module.exports = router;
