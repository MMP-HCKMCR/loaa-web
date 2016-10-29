// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
//var express = require('../..');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var missing     = require('./missing');
var account     = require('./account');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

module.exports = app;

app.get('/missing', missing.list);
app.put('/missing/:id', missing.seen);
app.get('/account/:id', account.retrieve);
app.post('/account', account.create);
app.put('/account/:id', account.update);
app.delete('/account/:id', account.delete);
app.put('/account/:id/login', account.login);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);