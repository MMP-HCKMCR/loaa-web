var MissingPerson = require('../../app/models/missingPerson');

exports.top = function (req, res) {
    MissingPerson.find({ status: "Missing" }, function (err, allMissingPersons) {
        if (err) {
            res.json(err);
        }

        allMissingPersons.sort(function (a, b) {
            var keyA = a.lastSeen.length,
                keyB = b.lastSeen.length;

            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        // limit to < 4000 distance
        res.json({ missing: allMissingPersons.reverse() });
    });
}