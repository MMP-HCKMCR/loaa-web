var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MissingPeopleSchema   = new Schema({
    id: String,
    surname: String,
    forenames: String,
    gender: String,
    birthYear: Number,
    status: String,
    statusPriorToDormant: String,
    category: String,
    accomodationType: String,
    borough: String,
    outputArea: String,
    posX27700: Number,
    posY27700: Number,
    wentMissing: String,
    created: String,
    updated: String,
    lastSeen: String,
    statusChangedToUnconfirmed: String
});

module.exports = mongoose.model('missing_persons', MissingPeopleSchema);