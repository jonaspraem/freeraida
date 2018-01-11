     var express = require('express');
var router = express.Router();

var CLIENT_ID = '372461699921-uv13me7jddkijchdsll7ttppmu8m5pjq.apps.googleusercontent.com';
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var client = new auth.OAuth2(CLIENT_ID, '', '');

function verifyGoogleToken(token, callback) {
    client.verifyIdToken(
        token,
        CLIENT_ID,
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
        function(e, login) {
            var payload = login.getPayload();
            var userid = payload['sub'];
            // If request specified a G Suite domain:
            //var domain = payload['hd'];
            callback(payload);
        });
}

router.post('/', function(req, res, next) {
    verifyGoogleToken(req.body.token, function(result) {
        return res.status(200).json({
            message: 'Auth successful',
            obj: result
        });
    });
});

router.get('/sign-out', function(req, res, next) {
    console.log('hello sign out');
});

module.exports = router;