var Account = require('../../app/models/account');

exports.create = function (req, res) {

    Account.findOne({ phoneNumber: req.body.phoneNumber }, function(err, account) {
        if (!account) {
            var _account = new Account();

            if (req.body.foreName) {
                _account.foreName = req.body.foreName
            }
            if (req.body.sureName) {
                _account.sureName = req.body.sureName
            }
            if (req.body.phoneNumber) {
                _account.phoneNumber = req.body.phoneNumber
            }

            _account.guid = generateGUID()

            _account.save(function (err) {
                if (err)
                    res.json({ message: 'Error' });
                else
                    res.json(_account);
            });
        }
        else {
            res.json(account);
        }
    });
    
}

generateGUID = function() {
    var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var str = '';
    var count = 20;

    for (var i = 0; i < count; i++) {
        str += _sym[parseInt(Math.random() * (_sym.length))];
    }
    return str;
}