function outputDataLimit(data, limit) {
    let output = []; let i = 0;
    while (i < limit) {
        output.push(data[i]);
        i++;
    }
    return output;
};

module.exports = outputDataLimit;