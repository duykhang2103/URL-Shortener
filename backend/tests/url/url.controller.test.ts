import request from "supertest";
import app from "../../app";
import { mockKafkaProducer } from "../mocks/kafka.mock";

describe("URL Controller", () => {
  describe("POST /urls", () => {
    it("should create new URL", async () => {
      const response = await request(app)
        .post("/urls")
        .send({ url: "https://example.com" });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("shortCode");
      expect(response.body.data.original).toBe("https://example.com");
      expect(mockKafkaProducer.sendMessage).toHaveBeenCalled();
    });

    it("should return 400 for invalid URL", async () => {
      const response = await request(app)
        .post("/urls")
        .send({ url: "not-a-url" });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /urls", () => {
    it("should list URLs", async () => {
      // Create a URL first
      await request(app).post("/urls").send({ url: "https://example.com" });

      const response = await request(app).get("/urls");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("DELETE /urls/:code", () => {
    it("should delete URL", async () => {
      // Create a URL first
      const createResponse = await request(app)
        .post("/urls")
        .send({ url: "https://example.com" });

      const shortCode = createResponse.body.data.shortCode;

      const deleteResponse = await request(app).delete(`/urls/${shortCode}`);
      expect(deleteResponse.status).toBe(200);
      expect(mockKafkaProducer.sendMessage).toHaveBeenCalled();
    });

    it("should return 404 for non-existent URL", async () => {
      const response = await request(app).delete("/urls/nonexistent");
      expect(response.status).toBe(404);
    });
  });
});
