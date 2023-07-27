import GoogleSheet from './GoogleSheet';
const googleSheet = new GoogleSheet();
import FormModel from '../../../model/FormModel';
import collectFailedActions from '../Utils/collectFailedActions';
const saveToGoogleSheet = async (responses, form) => {
    const actionId = 1;
    const extractedResponses = responses.map(res => res.response);
    try {
        //Create Sheet if First Response
        let iscreatedRecentlyFlag = false;
        if (!form?.actionParameters?.googleSheetLink) {
            const { url, id } = await googleSheet.createSpreadsheet(`Spreadsheet for form id: ${form._id}`);
            const headerRow = form.questions.map((e) => e.prompt);
            await googleSheet.addRowsToSheet(id, [headerRow]);
            await FormModel.findByIdAndUpdate(form._id, {
                actionParameters: {
                    ...form?.actionParameters,
                    googleSheetLink: url,
                    googleSheetId: id
                }
            });
            iscreatedRecentlyFlag = true;
        }
        if (iscreatedRecentlyFlag) {
            const { actionParameters: { googleSheetId } } = await FormModel.findById(form._id);
            await googleSheet.addRowsToSheet(googleSheetId, extractedResponses);
        } else {
            await googleSheet.addRowsToSheet(form.actionParameters.googleSheetId, extractedResponses);
        }
        return true;
    }
    catch (err) {
        await collectFailedActions(err, responses, form, actionId);
        return false;
    }
}

export default saveToGoogleSheet;