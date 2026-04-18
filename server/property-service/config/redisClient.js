// const redis = require("redis");

// // Connect to Upstash (Cloud) or Localhost
// const redisClient = redis.createClient({
//   url: process.env.REDIS_URI || "redis://localhost:6379"
// });

// redisClient.on("error", (error) => {
//   console.error("❌ Redis Connection Error:", error.message || error);
// });
// redisClient.on("connect", () => console.log("🟢 Redis Connected Successfully"));

// // Connect the client
// redisClient.connect();

// module.exports = redisClient;


const redis = require("redis");

const redisClient = redis.createClient({
  // Make sure your GCP environment variable is named exactly REDIS_URI
  url: process.env.REDIS_URI || "redis://localhost:6379",
  // CRITICAL FIXES BELOW:
  socket: {
    connectTimeout: 10000 // Timeout after 10 seconds, not 5 minutes
  },
  disableOfflineQueue: true // If disconnected, throw an error instantly instead of queuing/hanging
});

redisClient.on("error", (error) => {
  console.error("❌ Redis Connection Error:", error.message || error);
});
redisClient.on("connect", () => console.log("🟢 Redis Connected Successfully"));

redisClient.connect().catch(console.error);

module.exports = redisClient;