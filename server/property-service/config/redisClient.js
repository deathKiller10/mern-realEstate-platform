const redis = require("redis");

// Connect to Upstash (Cloud) or Localhost
const redisClient = redis.createClient({
  url: process.env.REDIS_URI || "redis://localhost:6379"
});

redisClient.on("error", (error) => {
  console.error("❌ Redis Connection Error:", error.message || error);
});
redisClient.on("connect", () => console.log("🟢 Redis Connected Successfully"));

// Connect the client
redisClient.connect();

module.exports = redisClient;