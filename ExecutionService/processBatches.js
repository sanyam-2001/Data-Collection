import createBatches from './Actions/Utils/createBatches';
import ActionMap from './ActionMap';
import FormModel from '../model/FormModel';
import ActionLookup from '../config/ActionMap'

const processBatches = async (batch) => {
    const subBatchesGroupedByForm = createBatches(batch.messages);
    for (const formId of Object.keys(subBatchesGroupedByForm)) {
        const responses = subBatchesGroupedByForm[formId];
        const form = await FormModel.findById(formId);
        for (const actionId of form.actionList) {
            const result = await ActionMap[actionId](responses, form);
            if (result) {
                console.log(`${ActionLookup[actionId]} for Form: ${form._id} executed Batched`);
            }
            else {
                console.log(`${ActionLookup[actionId]} for Form: ${form._id} failed Batched`);
            }
        }

    }
}
export default processBatches;