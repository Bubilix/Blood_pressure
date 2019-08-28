const browserSupport = require('./browserSupport');

function handlefileSelect(event) {
    if (browserSupport) {
        //capture files after event is triggered
        const files = event.target.files;
    }
}

module.exports = handleFileSelect;