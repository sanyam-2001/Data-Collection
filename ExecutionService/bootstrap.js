import kafkaSubscription from "./KafkaSubscription";
import connectToDB from "../bootstrap/connectToDb";
const bootstrap = async () => {
    await connectToDB();
    await kafkaSubscription();
}

export default bootstrap;