var Account = require('../../app/models/account');

exports.create = function (req, res) {

    var account = new Account();

    if (req.body.foreName) {
        account.foreName = req.body.foreName
    }
    if (req.body.sureName) {
        account.sureName = req.body.sureName
    }
    if (req.body.phoneNumber) {
        account.phoneNumber = req.body.phoneNumber
    }

    account.guid = generateGUID()

    account.save(function (err) {
        if (err)
            res.json({ message: 'Error' });
        else
            res.json(account);
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