import ActionLookup from '../config/ActionMap';
import FormModel from '../model/FormModel'
import ActionMap from './ActionMap';
const executeActions = async (actionId, consumedPayload, form) => {
    const result = await ActionMap[actionId]([consumedPayload], form);
    if (result) {
        console.log(`${ActionLookup[actionId]} for Form: ${form._id} executed`);
    }
    else {
        console.log(`${ActionLookup[actionId]} for Form: ${form._id} failed`);
    }
}

const processConsumedMessage = async (message) => {
    const consumedPayload = JSON.parse(message.value.toString());
    const form = await FormModel.findById(consumedPayload.formId);
    if (!form) {
        console.log("FORM ID Not Found");
        return;
    }
    if (consumedPayload.actionId) {
        console.log("Processing a preciously failed message");
        await executeActions(consumedPayload.actionId, consumedPayload, form);
    }
    else {
        for (const actionId of form.actionList) {
            await executeActions(actionId, consumedPayload, form);
        }
    }
}

export default processConsumedMessage;