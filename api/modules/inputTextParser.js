function inputTextParser(input) {
    //if dates wanted return them as a separate array or integrate in the output
    // let dates = [];
    //put input values in temproary object and then assign average values to a Avg array
    let input_values = {dates: [], upperValue: [], lowerValue: []};
    //let Avg = [];
    //split input text in array of input values on date basis under assumption inputs are written in the form:
    //DD.MM.YYYY.,UP1/LO1(,UP2/LO2,UP3/LO3), UPx and LOx are upper and lower values of 1. and eventaully
    //second and third input
    input = input.split((/\r\n/g)||(/\n/g));
    for (i = 0; i < input.length; i++) {
        //if dates output wanted integrate to the output returned
        loc = 0;
        if (input[i].indexOf(",") > input[i].indexOf("-")) {
            loc = input[i].indexOf(",");
        } else {
            loc = input[i].indexOf("-");
        }
        const dateSlice = input[i].slice(0, loc);
        input_values.dates.push(dateSlice);

        //tako values of one input and slice from DD.MM.YYYY., part away
        let values = input[i].slice(loc + 1);
        //convert string to a array
        values = values.split(",");
        let temp_upper = [];    //temproary upper values array
        let temp_lower = [];    //temproary lower values array
        for(input_number = 0; input_number < values.length; input_number++) {
            temp_upper.push(parseInt(values[input_number].slice(0, values[input_number].indexOf("/"))));    //collect all upper values from one input line
            temp_lower.push(parseInt(values[input_number].slice(values[input_number].indexOf("/") + 1)));   //collect all lower values from one input line
        };
        //calculate average of all input upper and lower values
        input_values.upperValue.push(calcAvg(temp_upper));
        input_values.lowerValue.push(calcAvg(temp_lower));
    };
    return input_values;
}
//helper function for calculating average of array
function calcAvg(array) {
    let sum = 0;
    array.forEach((element) => {
        sum += element;
    });
    return Math.round(sum / array.length);
};

module.exports = inputTextParser;
