import { kafkaClient } from "../../config/KafkaConfig";

export const KafkaConsumer = kafkaClient.consumer({ groupId: "fbhfhdoy-executionService" });