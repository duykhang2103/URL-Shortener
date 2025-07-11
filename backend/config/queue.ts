import { Kafka } from "kafkajs";
import { KafkaConsumerService } from "../common/kafka/consumer.service";
import { KafkaProducerService } from "../common/kafka/producer.service";

const kafka = new Kafka({
  clientId: "url-shortener",
  brokers: ["localhost:9092"],
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
  connectionTimeout: 3000,
});

export const kafkaConsumer = new KafkaConsumerService(kafka);
export const kafkaProducer = new KafkaProducerService(kafka);
