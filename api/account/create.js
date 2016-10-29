var Bear = require('../../app/models/bear');

exports.create = function (req, res) {

    var bear = new Bear();      // create a new instance of the Bear model
    bear.name = req.body.name;  // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'Bear created!' });
    });
    // create a new account in the database
    //res.json({ message: 'hooray! welcome to our ListOfMissingPeople!' });
}