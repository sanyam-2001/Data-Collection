import { kafkaProducer } from "../../../config/KafkaConfig";
import FailedActionsModel from "../../../model/FailedActions";

const collectFailedActions = async (err, response, form, actionId) => {
    const newFailedAction = new FailedActionsModel({
        actionId,
        error: err,
        response
    });
    await newFailedAction.save();
    await kafkaProducer.send({
        topic: process.env.FAILED_ACTION_KAFKA_TOPIC,
        messages: [{ key: newFailedAction._id, value: JSON.stringify(newFailedAction) }]
    });
}
export default collectFailedActions;