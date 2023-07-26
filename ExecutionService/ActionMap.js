import saveToGoogleSheet from './Actions/GoogleSheetAction/saveToGoogleSheet';
import sendMailReceiptToParticipant from './Actions/ReceiptMailAction/sendMailReceiptToParticipant';
const ActionMap = {
    1: saveToGoogleSheet,
    2: sendMailReceiptToParticipant
}
export default ActionMap;