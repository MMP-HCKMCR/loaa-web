module.exports = function(routes){

    routes.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });   
    });

    routes.get('/ListOfMissingPeople', function(req, res) {
        res.json({ message: 'hooray! welcome to our ListOfMissingPeople!' });   
    });

    routes.post('/MissingPersonSeen', function(req, res) {
        res.json({ message: 'hooray! welcome to our MissingPersonSeen!' });   
    });

    routes.post('/CreateAccount', function(req, res) {
        res.json({ message: 'hooray! welcome to our CreateAccount!' });   
    });

    routes.delete('/DeleteAccount', function(req, res) {
        res.json({ message: 'hooray! welcome to our DeleteAccount!' });   
    });

    routes.post('/Login', function(req, res) {
        res.json({ message: 'hooray! welcome to our Login!' });   
    });
}