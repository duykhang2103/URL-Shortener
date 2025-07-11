// import { urlService } from "../../app/modules/url/url.service";
// import { redis } from "../../config/redis";
// import ApiError from "../../common/error";
// // import { mockKafkaProducer } from "../mocks/kafka.mock";

// describe("URL Service", () => {
//   describe("create", () => {
//     it("should create a new URL successfully", async () => {
//       const url = "https://example.com";
//       const result = await urlService.create(url);

//       expect(result).toHaveProperty("shortCode");
//       expect(result.original).toBe(url);
//       expect(mockKafkaProducer.sendMessage).toHaveBeenCalled();
//     });

//     it("should create URL with custom code", async () => {
//       const url = "https://example.com";
//       const custom = "custom123";
//       const result = await urlService.create(url, "", "", custom);

//       expect(result.shortCode).toBe(custom);
//       expect(result.original).toBe(url);
//     });

//     it("should throw error for invalid URL", async () => {
//       const invalidUrl = "not-a-url";
//       await expect(urlService.create(invalidUrl)).rejects.toThrow(ApiError);
//     });
//   });

//   describe("redirect", () => {
//     it("should redirect to original URL", async () => {
//       const url = "https://example.com";
//       const created = await urlService.create(url);
//       const result = await urlService.redirect(created.shortCode);

//       expect(result).toBe(url);
//     });

//     it("should throw error for non-existent shortCode", async () => {
//       await expect(urlService.redirect("nonexistent")).rejects.toThrow(
//         ApiError
//       );
//     });

//     it("should use cached URL if available", async () => {
//       const url = "https://example.com";
//       const created = await urlService.create(url);

//       // First call will cache the URL
//       await urlService.redirect(created.shortCode);

//       // Second call should use cache
//       const cachedUrl = await redis.get(`url:${created.shortCode}`);
//       expect(cachedUrl).toBeTruthy();

//       const result = await urlService.redirect(created.shortCode);
//       expect(result).toBe(url);
//     });
//   });

//   describe("delete", () => {
//     it("should delete URL successfully", async () => {
//       const url = "https://example.com";
//       const created = await urlService.create(url);

//       const result = await urlService.deleteUrl(created.shortCode);
//       expect(result.message).toBe("URL deleted successfully");
//       expect(mockKafkaProducer.sendMessage).toHaveBeenCalled();

//       // Verify URL is deleted
//       await expect(urlService.redirect(created.shortCode)).rejects.toThrow(
//         ApiError
//       );
//     });

//     it("should throw error when deleting non-existent URL", async () => {
//       await expect(urlService.deleteUrl("nonexistent")).rejects.toThrow(
//         ApiError
//       );
//     });
//   });
// });
