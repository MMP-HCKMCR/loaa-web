var MissingPerson = require('../../app/models/missingPerson');
var Account = require('../../app/models/account');
var geolib = require('geolib');
var request = {}

var request2 = require('request');

var firstnames = [
    'John',
    'Andrew',
    'Fiona',
    'Alex',
    'Sarah',
    'Daniel',
    'Jessica',
    'Sheldon',
    'Charlotte',
    'Emily'
];

var surnames = [
    'Smith',
    'Matthews',
    'Cooper',
    'Harris',
    'Jones'
];

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

                    MissingPerson.findById(person._id, function (err, missing) {
                        if (!missing)
                            console.log("Error")
                        else {
                            missing.longitude = body.geometries[0].x
                            missing.latitude = body.geometries[0].y
                            missing.save(function (err) {
                                console.log("Saved")
                            });
                        }
                    });

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
                else {
                    allMissingPersons[i].longitude = 99999999999999999
                    allMissingPersons[i].latitude = 99999999999999999
                    allMissingPersons[i].distance = 99999999999999999
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
    var accountId = req.body.accountId;

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

            //update name
            for (var i = 0; i < lessThan.length; i++) {
                var person = lessThan[i];
                if ((new RegExp(/\d$/)).test(person.forenames)) {
                    person.forenames = firstnames[parseInt(Math.random * firstnames.length)];
                    person.surname = surnames[parseInt(Math.random * surnames.length)];
                    person.save(function(err) { });
                }
            }

            // limit to < 4000 distance
            if (accountId) {
                Account.findById(accountId, function(err, account) {
                    if (err) {
                        console.log(err);
                        res.json({ message: 'Error: ' + err });
                    }
                    else {
                        res.json({ missing: lessThan, favourites: account.favourites });
                    }
                });
            }
            else {
                res.json({ missing: lessThan });
            }            
        });
    });
};