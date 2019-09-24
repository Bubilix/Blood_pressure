module.exports = function date_converter(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if(date.indexOf(".") !== -1) {
        const date_array = date.split(".");
        const day = date_array[0];
        const month = months[date_array[1] - 1];
        const year = date_array[2];
        //export date string in form "MM DD, YYYY 08:00:00 GMT" 
        return (month + " " + day + ", " + year + " 08:00:00 GMT");
    } else {
        const date_array = date.split("-");
        const day = date_array[2];
        const month = months[date_array[1] - 1];
        const year = date_array[0];
        return (month + " " + day + ", " + year + " 08:00:00 GMT");
    }    
}