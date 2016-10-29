var Account = require('../../app/models/account');

exports.delete = function(req, res){
    Account.findById(req.params.id).remove().exec();
}