var MissingPerson = require('../../app/models/missingPerson');
var geolib = require('geolib');
var request = {}

var request2 = require('request');

function getLatLong(person, callback) {
    var myResponse = {};
    if (!person.latitude) {
        request2.post(
            'http://tasks.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer/project?inSR=27700&outSR=4326&geometries={%0D%0A"geometryType"+%3A+"esriGeometryPoint"%2C%0D%0A"geometries"+%3A+[%0D%0A+{"x"+%3A+' + person.posX27700 + '%2C+"y"+%3A+' + person.posY27700 + '}%0D%0A]%0D%0A}&transformation=&transformForward=true&f=pjson',
            { json: { key: 'value' } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    myResponse.longitude = body.geometries[0].x
                    myResponse.latitude = body.geometries[0].y
                    callback(myResponse);
                }
            }
        );
    } else {
        myResponse.latitude = person.latitude
        myResponse.longitude = person.longitude
        callback(myResponse);
    }
}

var length = 0;
var count = 0;

function loooooooop(allMissingPersons, callback) {
    length = allMissingPersons.length;

    count = 0;

    for (i = 0; i < allMissingPersons.length; i++) {
        (function (i) {
            getLatLong(allMissingPersons[i], function (value) {
                if (request.body.latitude && request.body.longitude && value.longitude && value.latitude) {
                    allMissingPersons[i].longitude = value.longitude
                    allMissingPersons[i].latitude = value.latitude
                    allMissingPersons[i].distance = geolib.getDistance(
                        { latitude: request.body.latitude, longitude: request.body.longitude },
                        { latitude: value.latitude, longitude: value.longitude }
                    );
                }
                count++;
                if (count === length) {
                    callback("done");
                }
            });
        })(i)
    }
}

exports.list = function (req, res) {
    // get the list of all missing people from the database
    // needs to be post, latitude, longitude
    // add guid verify
    request = req;

    MissingPerson.find({ status: "Missing" }, function (err, allMissingPersons) {
        if (err) {
            res.json(err);
        }

        loooooooop(allMissingPersons, function (val) {
            var lessThan = []
            for (i = 0; i < allMissingPersons.length; i++) {
                if (allMissingPersons[i].distance < 4000) {
                    lessThan.push(allMissingPersons[i]);
                }
            }

            lessThan.sort(function (a, b) {
                var keyA = a.distance,
                    keyB = b.distance;

                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            // limit to < 4000 distance
            res.json({ missing: lessThan });
        });
    });
};