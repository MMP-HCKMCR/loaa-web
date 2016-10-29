var Account = require('../../app/models/account');


exports.retrieve = function (req, res) {
    //get all accounts 

    Account.find(function (err, accounts) {
        //console.log(accounts);
        if (err) {
            res.send(err);
        }

        res.json({
            "accounts": accounts
        });
    });
};