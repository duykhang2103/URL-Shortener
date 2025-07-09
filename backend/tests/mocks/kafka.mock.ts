export const mockKafkaProducer = {
  sendMessage: jest.fn().mockResolvedValue(undefined),
  connect: jest.fn().mockResolvedValue(undefined),
  disconnect: jest.fn().mockResolvedValue(undefined),
};

jest.mock("../../config/queue", () => ({
  kafkaProducer: mockKafkaProducer,
}));
