import GoogleSheet from './GoogleSheet';
const googleSheet = new GoogleSheet();
import FormModel from '../../../model/FormModel';
import collectFailedActions from '../Utils/collectFailedActions';
const saveToGoogleSheet = async (response, form) => {
    const actionId = 1;
    try {
        //Create Sheet if First Response
        let iscreatedRecentlyFlag = false;
        if (!form?.actionParameters?.googleSheetLink) {
            const { url, id } = await googleSheet.createSpreadsheet(`Spreadsheet for form id: ${response.formId}`);
            const headerRow = form.questions.map((e) => e.prompt);
            await googleSheet.addRowsToSheet(id, headerRow);
            await FormModel.findByIdAndUpdate(response.formId, {
                actionParameters: {
                    ...form?.actionParameters,
                    googleSheetLink: url,
                    googleSheetId: id
                }
            });
            iscreatedRecentlyFlag = true;
        }
        if (iscreatedRecentlyFlag) {
            const { actionParameters: { googleSheetId } } = await FormModel.findById(response.formId);
            await googleSheet.addRowsToSheet(googleSheetId, response.response);
        } else {
            await googleSheet.addRowsToSheet(form.actionParameters.googleSheetId, response.response);
        }
        return true;
    }
    catch (err) {
        await collectFailedActions(err, response, form, actionId);
        return false;
    }
}

export default saveToGoogleSheet;