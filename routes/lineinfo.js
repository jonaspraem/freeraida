var express = require('express');
var router = express.Router();
var request = require('request');

var rad = function(x) {
    return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d/1000;
};

// Verify token
router.use('/', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                next();
            } else {
                console.log(response);
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: {message: 'Not a valid token'}
                });
            }
        }
    );
});

router.post('/height-map/', function(req, res, next) {
    console.log('height-map post'+JSON.stringify(req.body));
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                const googleMapsClient = require('@google/maps').createClient({
                    key: 'AIzaSyABj_T1wCMVSfQgskqWFwzHJQKaBFjepko'
                });
                googleMapsClient.elevation({
                    locations: req.body,
                }, function(err, response) {
                    if (!err) {
                        console.log(response.json.results);
                    } else {
                        console.log(err);
                    }
                });
            }
        });
});

router.post('/distance/', function(req, res, next) {
    console.log('distance post'+JSON.stringify(req.body));
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                var line_profile = [];
                line_profile.push({name: req.body[0].name, distance: 0});
                if (req.body.length > 1) {
                    for (var i = 1; i < req.body.length; i++) {
                        line_profile.push({name: req.body[i].name, distance: getDistance(
                                {lat: req.body[i-1].lat, lng: req.body[i-1].lng},
                                {lat: req.body[i].lat, lng: req.body[i].lng})});
                    }
                }
                console.log(JSON.stringify(line_profile));
            }
        });
});

module.exports = router;