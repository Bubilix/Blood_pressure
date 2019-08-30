function browserSupport(req, res) {
    // Check for the various File API support.
    if (global.FileReader ) {
        // Great success! All the File APIs are supported. && global.FileReader && global.FileList && global.Blob
        next();
    } else {
        console.log('The File APIs are not fully supported in this browser.');
    }
}

module.exports = browserSupport;
