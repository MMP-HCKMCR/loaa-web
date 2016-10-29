var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema   = new Schema({
    phoneNumber: String,
    foreName: String,
    sureName: String,
    guid: String
});

module.exports = mongoose.model('account', AccountSchema);