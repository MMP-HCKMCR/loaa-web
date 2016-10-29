var Account = require('../../app/models/account');

exports.update = function (req, res) {
    Account.findById(req.params.id, function (err, account) {
        if (!account)
            res.json('Could not load Document');
        else {
            if (req.body.foreName) {
                account.foreName = req.body.foreName
            }
            if (req.body.sureName) {
                account.sureName = req.body.sureName
            }
            if (req.body.phoneNumber) {
                account.phoneNumber = req.body.phoneNumber
            }

            account.save(function (err) {
                if (err)
                    res.json({ message: 'Error' });
                else
                    res.json(account);
            });
        }
    });
}