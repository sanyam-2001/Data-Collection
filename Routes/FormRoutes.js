import { Router } from 'express';
import FormModel from '../model/FormModel';
import ResponseModel from '../model/ResponseModel';
import ActionMap from '../config/ActionMap';
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
    return res.json(newResponse);
});
router.put("/actionList/add", async (req, res) => {
    const { formId, actionIds } = req.body;
    const { actionList } = await FormModel.findById(formId);
    actionIds.forEach((actionId) => {
        if (actionList.indexOf(actionId) == -1 && ActionMap[actionId]) {
            actionList.push(actionId);
        }
    });
    const updatedForm = await FormModel.findByIdAndUpdate(formId, { actionList }, { new: true });
    return res.json({ success: true, code: 200, data: updatedForm, err: null });

});


export default router;