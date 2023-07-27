import transporter from './mailConfig';
import extractEmailFromFormAndResponse from '../Utils/extractEmailFromFormAndResponse';
import collectFailedActions from '../Utils/collectFailedActions';

const sendMailReceiptToParticipant = async (responses, form) => {
    const actionId = 2;
    try {
        const emails = extractEmailFromFormAndResponse(responses, form);
        const promises = emails.map(email => {
            return transporter.sendMail({
                to: email,
                subject: "Receipt of your Participation",
                text: `Hello ${email}, This is a Reciept of your participation in filling the Form titled: ${form.title}. Thanks!`
            });
        });
        const x = await Promise.allSettled(promises);
        return true;
    }
    catch (err) {
        await collectFailedActions(err, responses, form, actionId);
        return false;
    }
}

export default sendMailReceiptToParticipant;