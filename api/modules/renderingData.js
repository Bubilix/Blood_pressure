function renderingData(inputs) {
    let = outputString = [];
    for (input of inputs) {
        const day = (input.time.getDate() < 10) ? ("0" + input.time.getDate()) : input.time.getDate();
        const month = (input.time.getMonth() < 9) ? ("0" + (input.time.getMonth() + 1)) : (input.time.getMonth() + 1);
        const year = input.time.getFullYear();
        outputString.push({
            upperValue: input.upperValue,
            lowerValue: input.lowerValue,
            time: day + "." + month + "." + year + "."});
    }
    return outputString;
};

module.exports = renderingData;