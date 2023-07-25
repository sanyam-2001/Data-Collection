import { KafkaConsumer } from "./Config/KafkaConfig"
import processConsumedMessage from "./processConsumedMessage";
const kafkaSubscription = async () => {
    await KafkaConsumer.connect();
    await KafkaConsumer.subscribe({ topics: [process.env.EXECUTION_KAFKA_TOPIC], fromBeginning: true });
    await KafkaConsumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            await processConsumedMessage(message);
        },
    })
}

export default kafkaSubscription;