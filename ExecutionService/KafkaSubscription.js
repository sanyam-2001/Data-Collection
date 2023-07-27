import { KafkaConsumer } from "./Config/KafkaConfig"
import processConsumedMessage from "./processConsumedMessage";
import processBatches from "./processBatches";
const kafkaSubscription = async () => {

    await KafkaConsumer.connect();
    await KafkaConsumer.subscribe({ topics: [process.env.EXECUTION_KAFKA_TOPIC], fromBeginning: true });

    if (process.env.BATCH_PROCESSING == 0) {
        await KafkaConsumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
                await processConsumedMessage(message);
            },
        });
    }
    else {
        await KafkaConsumer.run({
            eachBatchAutoResolve: true,
            eachBatch: async ({
                batch,
                resolveOffset,
                heartbeat
            }) => {
                await processBatches(batch);
                for (let message of batch.messages) {
                    resolveOffset(message.offset);
                }
                await heartbeat();
            },
        })
    }
}

export default kafkaSubscription;