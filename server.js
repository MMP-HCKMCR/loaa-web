// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
//var express = require('../..');
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose     = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connect('mongodb://admin:H4ck.All.N1ght@ds013569.mlab.com:13569/loaa', function() {
    console.log('Mongo connected');

    // API variables 
    var seen     = require('./api/missing/seen');
    var list     = require('./api/missing/list');
    var accountCreate = require('./api/account/create');
    var accountRetrieve = require('./api/account/retrieve');
    var accountUpdate = require('./api/account/update');
    var accountDelete = require('./api/account/delete');
    var accountLogin = require('./api/account/login');

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    var port = process.env.PORT || 8080;        // set our port

    module.exports = app;

    app.get('/api/missing', list.list);
    app.put('/api/missing/:id', seen.seen);
    app.get('/api/account/:id', accountRetrieve.retrieve);
    app.post('/api/account', accountCreate.create);
    app.put('/api/account/:id', accountUpdate.update);
    app.delete('/api/account/:id', accountDelete.delete);
    app.put('/api/account/:id/login', accountLogin.login);

    // START THE SERVER
    // =============================================================================
    app.listen(port);
    console.log('Magic happens on port ' + port);
});
