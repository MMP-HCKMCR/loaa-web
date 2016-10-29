var Missing = require('../../app/models/missingPerson');

exports.seen = function (req, res) {
    Missing.findById(req.params.id, function (err, missing) {
        if (!missing)
            return next(new Error('Could not load Document'));
        else {
            var lastSeen = {};
            if (req.body.date) {
                lastSeen.date = req.body.date
            }
            if (req.body.longitude) {
                lastSeen.longitude = req.body.longitude
            }
            if (req.body.latitude) {
                lastSeen.latitude = req.body.latitude
            }
            if (req.body.reporter) {
                lastSeen.reporter = req.body.reporter
            }

            missing.lastSeen.push(lastSeen)

            missing.save(function (err) {
                if (err)
                    res.json({ message: 'Error: ' + err });
                else
                    res.json(missing);
            });
        }
    });
}