import { kafkaProducer } from "../config/KafkaConfig";
import connectToDB from "./connectToDb"
import registerGlobalMiddlewares from "./registerGlobalMiddlewares";

const bootstrap = async (app) => {
    registerGlobalMiddlewares(app)
    await connectToDB();
    await kafkaProducer.connect();
}

export default bootstrap;