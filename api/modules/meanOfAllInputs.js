const inputTextParser = require('./inputTextParser');

module.exports = function meanOfAllInputss(input_array) {
    let Avg = [];
    //assign average upper and lower value to the Avg array
    Avg[0] = calcAvg(inputTextParser(input_array).upperValue);
    Avg[1] = calcAvg(inputTextParser(input_array).lowerValue);
    return Avg;

    //helper function for calculating average of array
    function calcAvg(array) {
        let sum = 0;
        array.forEach((element) => {
            sum += element;
        });
        return Math.round(sum / array.length);
    };
}