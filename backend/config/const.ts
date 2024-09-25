import dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const MONGO_URI = process.env.MONGO_URI as string;

export const keys = {
  NODE_ENV,
  MONGO_URI,
};
