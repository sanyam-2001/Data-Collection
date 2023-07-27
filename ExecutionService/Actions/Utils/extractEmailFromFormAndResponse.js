const extractEmailFromFormAndResponse = (responses, form) => {
    const questionIndex = form.questions.map((e) => e.prompt).indexOf(form?.actionParameters?.emailExtractPrompt || "EMail");
    return responses.map(res => res.response[questionIndex]);
}
export default extractEmailFromFormAndResponse;