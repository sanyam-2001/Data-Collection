const extractEmailFromFormAndResponse = (response, form) => {
    const questionIndex = form.questions.map((e) => e.prompt).indexOf(form?.actionParameters?.emailExtractPrompt || "EMail");
    return response.response[questionIndex];
}
export default extractEmailFromFormAndResponse;