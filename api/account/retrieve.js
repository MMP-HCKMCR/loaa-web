var Account = require('../../app/models/account');

// Retive the account by phone number
exports.retrieve = function (req, res) {
    var phoneNumber = req.params.phoneNumber;

    Account.find({ "phoneNumber": phoneNumber }, function (err, account) {
        if (err) {
            res.send(err);
        }

        res.json(account);
    });
};