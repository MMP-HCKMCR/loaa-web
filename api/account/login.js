var Account = require('../../app/models/account');

exports.login = function(req, res){
    var token = req.body.token;

    Account.findOne({ guid: token }, function(err, account) {
        if (err) {
            res.send(err);
        }

        res.json(account);
    });
}