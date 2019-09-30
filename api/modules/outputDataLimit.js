function outputDataLimit(data, limit) {
    let output = []; let i = 0;
    if((limit <= 0) || (limit >= 10) || (typeof limit !== "number")) {
        limit = 10;
    }
    if (data.length < limit) {
        limit = data.length;
    }
    while (i < limit) {
        output.push(data[i]);
        i++;
    }
    return output;
};

module.exports = outputDataLimit;