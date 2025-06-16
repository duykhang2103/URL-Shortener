import Redis from "ioredis";
import { keys } from "./const";

export const redis = new Redis({
  port: keys.REDIS_PORT,
  host: keys.REDIS_HOST,
  retryStrategy: (times) => {
    const delay = Math.min(times * 1000, 20000); // Exponential backoff with a max delay of 30 seconds
    return delay;
  },
});
