function sortingData(data) {
    let inputs = [];
    for (input of data) {
        inputs.push(input);
        inputs.sort(function(a, b) {return b.time-a.time});
    };
    return inputs;
};

module.exports = sortingData;