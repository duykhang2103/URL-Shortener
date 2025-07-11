import request from "supertest";
import app from "../../app";
import { setupMongo, teardownMongo } from "../mocks/mongodb.mock";
import { mockSend } from "../mocks/kafka.mock";
import Redis from "ioredis";

describe("URL Controller", () => {
  beforeAll(async () => {
    await setupMongo();
  });

  afterAll(async () => {
    await teardownMongo();
  });

  it("should create a url, cache in Redis, and publish Kafka message", async () => {
    const urlData = {
      url: "https://example.com",
    };
    const response = await request(app).post("/urls").send(urlData);
    console.log("Response body:", response.body);

    expect(response.status).toBe(201);

    // Mongo check
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.original).toBe(urlData.url);

    // Kafka check
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        topic: "url-created",
        messages: [
          expect.objectContaining({
            value: expect.stringContaining(urlData.url),
          }),
        ],
      })
    );

    // Redis check
    // Since Redis is mocked with ioredis-mock, you can directly test Redis logic if needed.
    // For example, connect to redis mock and `get()` the user.
    const redis = new Redis();
    const userInCache = await redis.get(`url:${response.body.data.shortCode}`);
    expect(userInCache).toContain(response.body.data.email);
  });

  // describe("POST /urls", () => {
  //   it("should create new URL", async () => {
  //     const response = await request(app)
  //       .post("/urls")
  //       .send({ url: "https://example.com" });

  //     expect(response.status).toBe(201);
  //     expect(response.body.data).toHaveProperty("shortCode");
  //     expect(response.body.data.original).toBe("https://example.com");
  //     expect(mockKafkaProducer.sendMessage).toHaveBeenCalled();
  //   });

  //   it("should return 400 for invalid URL", async () => {
  //     const response = await request(app)
  //       .post("/urls")
  //       .send({ url: "not-a-url" });

  //     expect(response.status).toBe(400);
  //   });
  // });

  // describe("GET /urls", () => {
  //   it("should list URLs", async () => {
  //     // Create a URL first
  //     await request(app).post("/urls").send({ url: "https://example.com" });

  //     const response = await request(app).get("/urls");
  //     expect(response.status).toBe(200);
  //     expect(Array.isArray(response.body.data)).toBe(true);
  //     expect(response.body.data.length).toBeGreaterThan(0);
  //   });
  // });

  // describe("DELETE /urls/:code", () => {
  //   it("should delete URL", async () => {
  //     // Create a URL first
  //     const createResponse = await request(app)
  //       .post("/urls")
  //       .send({ url: "https://example.com" });

  //     const shortCode = createResponse.body.data.shortCode;

  //     const deleteResponse = await request(app).delete(`/urls/${shortCode}`);
  //     expect(deleteResponse.status).toBe(200);
  //     expect(mockKafkaProducer.sendMessage).toHaveBeenCalled();
  //   });

  //   it("should return 404 for non-existent URL", async () => {
  //     const response = await request(app).delete("/urls/nonexistent");
  //     expect(response.status).toBe(404);
  //   });
  // });
});
