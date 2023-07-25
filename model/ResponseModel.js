import mongoose from 'mongoose';
export const ResponseSchema = mongoose.Schema({
    formId: mongoose.Schema.ObjectId,
    response: [String]
});


const ResponseModel = new mongoose.model("responseModel", ResponseSchema);

export default ResponseModel;