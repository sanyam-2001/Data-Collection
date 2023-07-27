import { kafkaProducer } from "../../../config/KafkaConfig";
import FailedActionsModel from "../../../model/FailedActions";

const collectFailedActions = async (err, responses, form, actionId) => {
    const newFailedActions = responses.map(res => new FailedActionsModel({
        actionId,
        error: err,
        response: res
    }));
    const kafkaPayloadForNewFailedActions = newFailedActions.map(failedRes => {
        return {
            key: failedRes._id.toString(),
            value: JSON.stringify(failedRes)
        }
    })
    await FailedActionsModel.insertMany(newFailedActions);
    await kafkaProducer.send({
        topic: process.env.FAILED_ACTION_KAFKA_TOPIC,
        messages: [kafkaPayloadForNewFailedActions]
    });
}
export default collectFailedActions;