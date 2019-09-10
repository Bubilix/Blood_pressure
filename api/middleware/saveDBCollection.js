module.exports = function saveDBCollection(req, res, next) {
    const db = res.locals.db;
    const inputs = res.locals.input;
    const collectionName = res.locals.collectionName;
    db.collection(collectionName).findOne({}, function(err, result) {
        if (err) {
            res.status(400).send('Nista nije pronadeno na ovoj stranici.');
        } else {
            for (let input of inputs) {
                db.collection(collectionName).insertOne(input, function(err, db) {
                    if (err) throw err;
                });
            }
        };
    })
    res.redirect('/');
}
