import kafkaSubscription from "./KafkaSubscription";
import connectToDB from "../bootstrap/connectToDb";
import { kafkaProducer } from "../config/KafkaConfig";
const bootstrap = async () => {
    await connectToDB();
    await kafkaSubscription();
    await kafkaProducer.connect();
}

export default bootstrap;