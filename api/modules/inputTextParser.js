function inputTextParser(input) {
    let dates = [];
    let input_values = {upperValue: [], lowerValue: []};
    input = input.split((/\r\n/g)||(/\n/g));
    for (i = 0; i < input.length; i++) {
        dates.push(input[i].slice(0, input[i].indexOf(",")));
        let values = input[i].slice(input[i].indexOf(",") + 1);
        values = values.split(",");
        let temp_upper = [];
        let temp_lower = [];
        for(input_number = 0; input_number < values.length; input_number++) {
            temp_upper.push(parseInt(values[input_number].slice(0, values[input_number].indexOf("/"))));
            temp_lower.push(parseInt(values[input_number].slice(values[input_number].indexOf("/") + 1)));
        };
        input_values.upperValue.push(calcAvg(temp_upper));
        input_values.lowerValue.push(calcAvg(temp_lower));
    };
    return input_values;
}

function calcAvg(array) {
    let sum = 0;
    array.forEach((element) => {
        sum += element;
    });
    return (sum / array.length);
};

module.exports = inputTextParser;
