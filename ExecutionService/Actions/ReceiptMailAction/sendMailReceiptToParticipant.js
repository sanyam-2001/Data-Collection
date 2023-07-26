import transporter from './mailConfig';
import extractEmailFromFormAndResponse from '../Utils/extractEmailFromFormAndResponse';

const sendMailReceiptToParticipant = async (response, form) => {
    const email = extractEmailFromFormAndResponse(response, form);
    await transporter.sendMail({
        to: email,
        subject: "Receipt of your Participation",
        text: `Hello, This is a Reciept of your participation in filling the Form titled: ${form.title}. Thanks!`
    });
}

export default sendMailReceiptToParticipant;