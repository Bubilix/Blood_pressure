function browserSupport() {
    // Check for the various File API support.
    let isSupported;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
            return isSupported = true;
        } else {
            alert('The File APIs are not fully supported in this browser.');
            return isSupported = false;
        }
}

module.exports = browserSupport;
