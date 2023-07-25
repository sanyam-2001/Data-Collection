import GoogleSheet from './GoogleSheet';
const googleSheet = new GoogleSheet();
import FormModel from '../../../model/FormModel';
const saveToGoogleSheet = async (response, form) => {
    //Create Sheet if First Response
    let iscreatedRecentlyFlag = false;
    if (!form.googleSheetLink) {
        const { url, id } = await googleSheet.createSpreadsheet(`Spreadsheet for form id: ${response.formId}`);
        const headerRow = form.questions.map((e) => e.prompt);
        await googleSheet.addRowsToSheet(id, headerRow);
        await FormModel.findByIdAndUpdate(response.formId, {
            googleSheetLink: url,
            googleSheetId: id
        });
        iscreatedRecentlyFlag = true;
    }
    if (iscreatedRecentlyFlag) {
        const { googleSheetId } = await FormModel.findById(response.formId);
        await googleSheet.addRowsToSheet(googleSheetId, response.response);
    } else {
        await googleSheet.addRowsToSheet(form.googleSheetId, response.response);
    }
}

export default saveToGoogleSheet;