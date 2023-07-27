const createBatches = (messages) => {
    const formIdMap = {};
    messages.forEach((message) => {
        const consumedPayload = JSON.parse(message.value.toString());
        if (Object.keys(formIdMap).indexOf(consumedPayload.formId) === -1) {
            formIdMap[consumedPayload.formId] = [consumedPayload];
        }
        else {
            formIdMap[consumedPayload.formId].push(consumedPayload);
        }
    });
    return formIdMap;
}

export default createBatches;