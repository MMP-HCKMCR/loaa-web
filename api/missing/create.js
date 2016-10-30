var MissingPerson = require('../../app/models/missingPerson');

exports.create = function (req, res) {
    var firstname = req.body.firstname;
    var surname = req.body.surname;

    var missingPerson = new MissingPerson();

    if (firstname) {
        missingPerson.forenames = firstname;
    }
    if (surname) {
        missingPerson.surname = surname;
    }

    missingPerson.gender = 'M';
    missingPerson.status = 'Missing';
    missingPerson.category = 'Missing';
    missingPerson.birthYear = req.body.birthYear;
    missingPerson.borough = req.body.town;

    missingPerson.latitude = req.body.latitude;
    missingPerson.longitude = req.body.longitude;

    missingPerson.wentMissing = new Date();
    missingPerson.created = new Date();
    missingPerson.updated = new Date();

    missingPerson.id = generateGUID();

    var lastSeen = {};
    lastSeen.date = new Date();
    lastSeen.longitude = req.body.longitude;
    lastSeen.latitude = req.body.latitude;
    lastSeen.accountId = req.body.accountId;
    lastSeen.description = '';
    missingPerson.lastSeen.push(lastSeen);

    missingPerson.save(function (err) {
        if (err) {
            console.log(err);
            res.json({ message: 'Error' });
        }
        else {
            res.json(missingPerson);
        }
    });
}

generateGUID = function() {
    var _sym = 'ABCDEF1234567890';
    var str = '';
    var count = 20;

    for (var i = 0; i < count; i++) {
        str += _sym[parseInt(Math.random() * (_sym.length))];
    }
    return str;
}
