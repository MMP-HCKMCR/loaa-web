var Missing = require('../../app/models/missingPerson');
var Account = require('../../app/models/account');
var clockwork = require('clockwork')({key: 'dce76bb6130ac3f7c01588489ed8f35b01eaa55a'});


exports.seen = function (req, res) {
    Missing.findById(req.params.id, function (err, missing) {
        if (!missing || err) {
            console.log(err + ': no person found');
            res.json({ message: 'Could not find missing person'});
        }
        else {
            var lastSeen = {};
            
            lastSeen.date = req.body.date
            lastSeen.longitude = req.body.longitude
            lastSeen.latitude = req.body.latitude
            lastSeen.accountId = req.body.accountId
            lastSeen.description = req.body.description

            console.log(lastSeen);
            
            missing.lastSeen.push(lastSeen)

            // text favourited people
            Account.find({ 'favourites': req.params.id }, function(err, accounts) {
                if (!accounts) {
                    console.log('No accounts found for clockwork: ' + req.params.id);
                    return;
                }

                var message = 'Update: ' + missing.forenames + ' ' + missing.surname + ' was last seen on ' + lastSeen.date;

                for (var i = 0; i < accounts.length; i++) {
                    var account = accounts[i];

                    clockwork.sendSms({ To: account.phoneNumber, Content: message}, function(error, resp) {
                        if (error) {
                            console.log('Something went wrong', error);
                        } else {
                            console.log('Message sent to',resp.responses[0].to);
                            console.log('MessageID was',resp.responses[0].id);
                        }
                    });
                }
            });

            missing.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({ message: 'Error: ' + err });
                }
                else {
                    res.json(missing);
                }
            });
        }
    });
}