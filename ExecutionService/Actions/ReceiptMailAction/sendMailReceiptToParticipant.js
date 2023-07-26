import transporter from './mailConfig';
import extractEmailFromFormAndResponse from '../Utils/extractEmailFromFormAndResponse';
import collectFailedActions from '../Utils/collectFailedActions';

const sendMailReceiptToParticipant = async (response, form) => {
    const actionId = 2;
    try {
        const email = extractEmailFromFormAndResponse(response, form);
        await transporter.sendMail({
            to: email,
            subject: "Receipt of your Participation",
            text: `Hello, This is a Reciept of your participation in filling the Form titled: ${form.title}. Thanks!`
        });
        return true;
    }
    catch (err) {
        await collectFailedActions(err, response, form, actionId);
        return false;
    }
}

export default sendMailReceiptToParticipant;