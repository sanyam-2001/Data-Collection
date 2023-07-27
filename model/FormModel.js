import mongoose from 'mongoose';
import { QuestionSchema } from './QuestionModel'
export const FormSchema = mongoose.Schema({
    title: String,
    questions: [QuestionSchema],
    actionList: [Number],
    actionParameters: {
        type: Object,
        default: {
            actionObjectCreated: true
        }
    }
});


const FormModel = new mongoose.model("formModel", FormSchema);

export default FormModel;