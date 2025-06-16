import dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";

const PORT = process.env.PORT || "8321";

const MONGO_URI = process.env.MONGO_URI as string;
const SALT_ROUNDS = process.env.SALT_ROUNDS as string;

const REDIS_PORT = process.env.REDIS_PORT || "6379";
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";

export const keys = {
  NODE_ENV,
  PORT: parseInt(PORT, 10),
  MONGO_URI,
  SALT_ROUNDS,
  REDIS_PORT: parseInt(REDIS_PORT, 10),
  REDIS_HOST,
};
