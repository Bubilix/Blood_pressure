const inputTextParser = require('./inputTextParser');
const calcAvgArray = require('./calcAvgArray');

module.exports = function meanOfAllInputss(input_array) {
    let Avg = [];
    //assign average upper and lower value to the Avg array
    Avg[0] = calcAvgArray(inputTextParser(input_array).upperValue);
    Avg[1] = calcAvgArray(inputTextParser(input_array).lowerValue);
    return Avg;
}