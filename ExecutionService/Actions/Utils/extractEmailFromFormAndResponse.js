const extractEmailFromFormAndResponse = (response, form) => {
    const questionIndex = form.questions.map((e) => e.prompt).indexOf("E-Mail");
    return response.response[questionIndex];
}
export default extractEmailFromFormAndResponse;