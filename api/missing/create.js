var MissingPerson = require('../../app/models/missingPerson');

exports.create = function (req, res) {
    var firstname = req.body.firstname;
    var surname = req.body.surname;

    var missingPerson = new MissingPerson();

    if (firstname) {
        missingPerson.firstname = firstname
    }
    if (surname) {
        missingPerson.surname = surname
    }

    missingPerson.birthYear = req.body.birthYear
    missingPerson.borough = req.body.town

    missingPerson.latitude = req.body.latitude
    missingPerson.longitude = req.body.longitude

    missingPerson.wentMissing = new Date();
    missingPerson.created = new Date();
    missingPerson.updated = new Date();

    missingPerson.status = "Missing"

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
