var MissingPerson = require('../../app/models/missingPerson');

exports.top = function (req, res) {
    MissingPerson.find({ status: "Missing" }, function (err, allMissingPersons) {
        if (err) {
            res.json(err);
        }

        temp = [];

        for (i = 0; i < allMissingPersons.length; i++){
            if (allMissingPersons[i].lastSeen.length > 0){
                temp.push(allMissingPersons[i])
            }
        }

        temp.sort(function (a, b) {
            var keyA = a.lastSeen.length,
                keyB = b.lastSeen.length;

            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        res.json({ missing: temp.reverse() });
    });
}