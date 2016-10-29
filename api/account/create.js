var Account = require('../../app/models/account');

exports.create = function (req, res) {
    var phoneNumber = req.body.phoneNumber;
    var foreName = req.body.foreName;
    var sureName = req.body.sureName;

    if (!phoneNumber) {
        console.log('No phone number');
        res.json({ message: 'No phone number supplied' });
        return;
    }

    Account.findOne({ phoneNumber: req.body.phoneNumber }, function(err, account) {
        if (err) {
            console.log(err);
            res.json({ message: 'Error' });
        }
        else if (!account) {
            var _account = new Account();

            if (foreName) {
                _account.foreName = foreName
            }
            if (sureName) {
                _account.sureName = sureName
            }
            
            _account.phoneNumber = phoneNumber
            _account.guid = generateGUID()

            _account.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({ message: 'Error' });
                }
                else {
                    res.json(_account);
                }
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