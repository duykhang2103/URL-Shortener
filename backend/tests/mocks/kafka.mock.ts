// export const mockKafkaProducer = {
//   sendMessage: jest.fn().mockResolvedValue(undefined),
//   connect: jest.fn().mockResolvedValue(undefined),
//   disconnect: jest.fn().mockResolvedValue(undefined),
// };

// jest.mock("../../config/queue", () => ({
//   kafkaProducer: mockKafkaProducer,
// }));

// import { Kafka } from 'kafkajs';

export const mockSend = jest.fn();

jest.mock("kafkajs", () => {
  return {
    Kafka: jest.fn().mockImplementation(() => ({
      producer: jest.fn().mockReturnValue({
        connect: jest.fn(),
        send: mockSend,
        disconnect: jest.fn(),
      }),
      consumer: jest.fn().mockReturnValue({
        connect: jest.fn(),
        subscribe: jest.fn(),
        run: jest.fn(),
        disconnect: jest.fn(),
      }),
    })),
  };
});
