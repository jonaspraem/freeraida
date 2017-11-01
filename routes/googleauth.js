var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var CLIENT_ID = '372461699921-uv13me7jddkijchdsll7ttppmu8m5pjq.apps.googleusercontent.com';
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var client = new auth.OAuth2(CLIENT_ID, '', '');

var User = require('../models/user');
var Profile = require('../models/profile');

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


// Register new user
router.post('/', function(req, res, next) {
    console.log("auth received");
    console.log(req.body.token);
    verifyGoogleToken(req.body.token, function(result) {
       console.log(result);
    });
});

module.exports = router;