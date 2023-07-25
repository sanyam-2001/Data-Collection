import mongoose from 'mongoose';
import { QuestionSchema } from './QuestionModel'
export const FormSchema = mongoose.Schema({
    title: String,
    questions: [QuestionSchema],
    actionList: [Number],
    googleSheetLink: String,
    googleSheetId: String
});


const FormModel = new mongoose.model("formModel", FormSchema);

export default FormModel;