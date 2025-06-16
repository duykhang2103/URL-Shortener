import Redis from "ioredis";
import { keys } from "./const";

export const startRedis = () => {
  const redis = new Redis({
    host: keys.REDIS_HOST,
    port: keys.REDIS_PORT,
    username: keys.REDIS_USERNAME,
    password: keys.REDIS_PASSWORD,
    tls: keys.NODE_ENV === "development" ? {} : undefined,
  });
  redis.on("ready", () => {
    console.log("Connected to Redis");
  });

  redis.on("error", (err) => {
    console.error("Redis error:", err);
  });

  redis.on("end", () => {
    console.log("Redis connection closed");
  });

  return redis;
};
export const redis = startRedis();
export const redisClient = redis; // Exporting the redis client for use in other modules
