import createBatches from './Actions/Utils/createBatches';
import ActionMap from './ActionMap';
import FormModel from '../model/FormModel';
import ActionLookup from '../config/ActionMap'

const processBatches = async (batch) => {
    try {
        const subBatchesGroupedByForm = createBatches(batch.messages);
        for (const formId of Object.keys(subBatchesGroupedByForm)) {
            const responses = subBatchesGroupedByForm[formId];
            const form = await FormModel.findById(formId);
            if (!form) {
                console.log("FORM ID Not Found");
                return;
            }
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
    catch (err) {
        console.log("ERROR While Processing Batches")
        console.log(err);
    }
}
export default processBatches;