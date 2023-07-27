import { Router } from 'express';
import FormModel from '../model/FormModel';
import ResponseModel from '../model/ResponseModel';
import { kafkaProducer } from '../config/KafkaConfig';
import ActionLookup from '../config/ActionMap';
const router = Router();

router.post("/create", async (req, res) => {
    const { title, questions } = req.body;
    const newForm = new FormModel({
        title,
        questions
    });
    await newForm.save();
    return res.json({ success: true, code: 200, data: newForm, err: null })
});

router.post("/submit", async (req, res) => {
    const newResponse = new ResponseModel(req.body);
    await newResponse.save();
    await kafkaProducer.send({
        topic: process.env.EXECUTION_KAFKA_TOPIC,
        messages: [{ key: newResponse._id.toString(), value: JSON.stringify(newResponse) }]
    })
    return res.json(newResponse);
});
router.put("/actionList/add", async (req, res) => {
    try {
        const { formId, actionIds } = req.body;
        const form = await FormModel.findById(formId);
        if (!form) {
            throw "Invalid Form ID"
        }
        const { actionList } = form;
        actionIds.forEach((actionId) => {
            if (actionList.indexOf(actionId) == -1 && ActionLookup[actionId]) {
                actionList.push(actionId);
            }
        });
        const updatedForm = await FormModel.findByIdAndUpdate(formId, { actionList }, { new: true });
        return res.json({ success: true, code: 200, data: updatedForm, err: null });
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, code: 400, data: null, err: err })
    }

});

router.put("/actionParameters/add", async (req, res) => {
    try {
        const { formId, params } = req.body;
        const form = await FormModel.findById(formId);
        if (!form) {
            throw "Invalid Form ID"
        }
        const updatedForm = await FormModel.findByIdAndUpdate(formId, {
            actionParameters: {
                ...form.actionParameters,
                ...params
            }
        }, { new: true });

        return res.json({ success: true, code: 200, data: updatedForm, err: null });
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, code: 400, data: null, err: err })
    }
})


export default router;