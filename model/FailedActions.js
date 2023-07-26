import mongoose from 'mongoose';
import { ResponseSchema } from './ResponseModel';
export const FailedActionsSchema = mongoose.Schema({
    actionId: Number,
    error: Object,
    response: ResponseSchema
});


const FailedActionsModel = new mongoose.model("failedActions", FailedActionsSchema);

export default FailedActionsModel;