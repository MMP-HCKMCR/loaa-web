var MissingPerson = require('../../app/models/missingPerson');
var geolib = require('geolib');
var request = {}

exports.list = function (req, res) {
    // get the list of all missing people from the database
    // needs to be post, latitude, longitude
    // add guid verify
    console.log(req)
    request = req;
    console.log(request.body)

    MissingPerson.find({ status: "Missing" }, function (err, allMissingPersons) {
        if (err) {
            res.json(err);
        }

        for (i = 0; i < allMissingPersons.length; i++) {
            if (!allMissingPersons[i].latitude) {
                allMissingPersons[i].latitude = "53"
                allMissingPersons[i].longitude = "-2"
            }
            console.log(request.body)
            console.log(request.body.latitude)

            allMissingPersons[i].distance = 0

            /*allMissingPersons[i].distance = geolib.getDistance(
                { latitude: request.body.latitude, longitude: 7.49347 },
                { latitude: 51.5103, longitude: 7.49347 }
            );*/

            /*allMissingPersons[i].distance = geolib.getDistance(
                { latitude: request.body.latitude, longitude: request.body.longitude },
                { latitude: allMissingPersons[i].latitude, longitude: allMissingPersons[i].longitude }
            );*/

            //allMissingPersons[i].distance = "0"
        }

        res.json({ missing: allMissingPersons });
    });
};