const browserSupport = require('./browserSupport');

function handleFileSelect(event) {
    if (browserSupport) {
        //capture files after event is triggered
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.onload();
        console.log(reader.readAsText(file));
        return reader.readAsText(file);
    }
}

module.exports = handleFileSelect;