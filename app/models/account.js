var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema   = new Schema({
    foreName: String,
    sureName: String,
    phoneNumber: String
});

module.exports = mongoose.model('account', AccountSchema);