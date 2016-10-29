var MissingPerson = require('../../app/models/missingPerson');

exports.list = function(req, res){
    // get the list of all missing people from the database
    MissingPerson.find(function(err, allMissingPersons) {
        if(err) {
            res.json(err);
        }

        res.json(allMissingPersons);
    });
};