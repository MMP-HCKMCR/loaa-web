var Missing = require('../../app/models/missingPerson');

exports.seen = function (req, res) {
    Missing.findById(req.params.id, function (err, missing) {
        if (!missing || err) {
            console.log(err + ': no person found');
            res.json({ message: 'Could not find missing person'});
        }
        else {
            var lastSeen = {};
            
            lastSeen.date = req.body.date
            lastSeen.longitude = req.body.longitude
            lastSeen.latitude = req.body.latitude
            lastSeen.guid = req.body.guid
            lastSeen.description = req.body.description

            console.log(lastSeen);
            
            missing.lastSeen.push(lastSeen)

            missing.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({ message: 'Error: ' + err });
                }
                else {
                    res.json(missing);
                }
            });
        }
    });
}