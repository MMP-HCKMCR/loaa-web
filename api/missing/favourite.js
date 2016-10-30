var Missing = require('../../app/models/missingPerson');
var Account = require('../../app/models/account');

exports.favourite = function (req, res) {
    Missing.findById(req.params.id, function (err, missing) {
        if (err) {
            console.log(err + ': no person found');
            res.json({ message: 'Could not find missing person'});
            return;
        }

        Account.findById(req.body.accountId, function(err, account) {
            if (err) {
                console.log(err);
                res.json({ message: 'Could not find account' });
                return;
            }

            account.favourites.push(missing._id);
            account.save(function(err) {
                if (err) {
                    console.log(err);
                    res.json({ message: 'Error: ' + err });
                }
                else {
                    res.json(account);
                }
            })
        });
    });
}