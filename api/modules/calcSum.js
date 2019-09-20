module.exports = function(array) {
    sum = 0;
    array.forEach(function(value) {
        sum+= value;
    });
    return sum
};