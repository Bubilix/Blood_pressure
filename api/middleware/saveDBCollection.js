module.exports = function saveDBCollection(req, res, next) {
    const db = res.locals.db;
    const input = res.locals.input;
    const collectionName = res.locals.collectionName;
    db.collection(collectionName).findOne({}, function(err, result) {
        if (err) {
            db.createCollection(collectionName);
            db.collection(collectionName).insertOne(input, function(err, db) {
                if (err) throw err;
            });
        } else {
            db.collection(collectionName).insertOne(input, function(err, db) {
                if (err) throw err;
                console.log(input);
            });
        };
    })
    res.redirect('/');
}
