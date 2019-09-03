module.exports = function date_converter(date) {
    let date_array = date.split(".");
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date_array[0];
    const month = months[date_array[1] - 1];
    const year = date_array[2];
    return (month + " " + day + ", " + year + " 08:00:00 GMT");
}