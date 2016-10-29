// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/ListOfMissingPeople', function(req, res) {
    res.json({ message: 'hooray! welcome to our ListOfMissingPeople!' });   
});

router.post('/MissingPersonSeen', function(req, res) {
    res.json({ message: 'hooray! welcome to our MissingPersonSeen!' });   
});

router.post('/CreateAccount', function(req, res) {
    res.json({ message: 'hooray! welcome to our CreateAccount!' });   
});

router.delete('/DeleteAccount', function(req, res) {
    res.json({ message: 'hooray! welcome to our DeleteAccount!' });   
});

router.post('/Login', function(req, res) {
    res.json({ message: 'hooray! welcome to our Login!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);