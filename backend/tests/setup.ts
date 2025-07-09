import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { redis } from "../config/redis";

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
  await redis.flushall();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
  await redis.quit();
});
