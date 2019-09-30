//helper function for calculating average of array
module.exports = function calcAvg(array) {
    let sum = 0;
    array.forEach((element) => {
        sum += element;
    });
    return Math.round(sum / array.length);
};