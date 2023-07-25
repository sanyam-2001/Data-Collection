import mongoose from 'mongoose';

export const QuestionSchema = mongoose.Schema({
    prompt: String,
    //Empty options list indicates that question demands a subjective response
    options: {
        type: [String],
        default: []
    }
});


const QuestionModel = new mongoose.model("questionModel", QuestionSchema);

export default QuestionModel;