var express = require('express');
var router = express.Router();
var request = require('request');

var Line = require('../models/schemas/line');
var Marker = require('../models/schemas/marker');
var TrackedLine = require('../models/schemas/tracked-line');
var Location = require('../models/schemas/location');

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

function getLineMarkers(id_list, callback) {
    var object = [];
    Marker.find({'_id': {$in: id_list}}, function (err, markers) {
        if (err) return null;
        if (!markers) return null;
        for (var i = 0; i <markers.length; i++) {
            object.push({lat: markers[i].lat, lng: markers[i].lng})
        }
        callback(object);
    });
}

function getLineLocations(id_list, callback) {
    var object = [];
    Location.find({'_id': {$in: id_list}}, function (err, locations) {
        if (err) return null;
        if (!locations) return null;
        for (var i = 0; i <locations.length; i++) {
            object.push({lat: locations[i].lat, lng: locations[i].lng})
        }
        callback(object);
    });
}

function getLineLocationsWithTime(id_list, callback) {
    console.log('id_list '+id_list);
    var object = [];
    Location.find({'_id': {$in: id_list}}, function (err, locations) {
        if (err) return null;
        if (!locations) return null;
        for (var i = 0; i <locations.length; i++) {
            object.push({time_at: locations[i].time_at, lat: locations[i].lat, lng: locations[i].lng})
        }
        callback(object);
    });
}

// Verify token
router.use('/', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                next();
            } else {
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: {message: 'Not a valid token'}
                });
            }
        }
    );
});

router.get('/height-map/:_id', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                Line.findOne({_id: req.params._id}, function (err, line) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    if (!line) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: {message: 'An error occurred 1'}
                        });
                    }
                    const googleMapsClient = require('@google/maps').createClient({
                        key: 'AIzaSyABj_T1wCMVSfQgskqWFwzHJQKaBFjepko'
                    });
                    getLineMarkers(line.markers, function(result) {
                        console.log('result'+result);
                        googleMapsClient.elevation({
                            locations: result
                        }, function(err, response) {
                            if (!err) {
                                console.log(response.json.results);
                                return res.status(200).json({
                                    message: 'Height map generated',
                                    obj: response.json.results
                                });
                            } else {
                                console.log(err);
                            }
                        });
                    });
                });
            }
        });
});

router.get('/height-map-unregistered/:_id', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                TrackedLine.findOne({_id: req.params._id}, function (err, line) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    if (!line) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: {message: 'An error occurred 1'}
                        });
                    }
                    const googleMapsClient = require('@google/maps').createClient({
                        key: 'AIzaSyABj_T1wCMVSfQgskqWFwzHJQKaBFjepko'
                    });
                    getLineLocations(line.locations, function(result) {
                        console.log('result'+result);
                        googleMapsClient.elevation({
                            locations: result
                        }, function(err, response) {
                            if (!err) {
                                console.log(response.json.results);
                                return res.status(200).json({
                                    message: 'Height map generated',
                                    obj: response.json.results
                                });
                            } else {
                                console.log(err);
                            }
                        });
                    });
                });
            }
        });
});

router.get('/distance/:_id', function(req, res, next) {
    console.log('made it here 0');
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                Line.findOne({_id: req.params._id}, function (err, line) {
                    console.log('made it here 1');
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    if (!line) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: {message: 'An error occurred 1'}
                        });
                    }
                    console.log('made it here 2');
                    getLineMarkers(line.markers, function (result) {
                        var line_profile = [];
                        console.log('made it here 3');
                        line_profile.push({name: result[0].markerName, distance: 0});
                        if (result.length > 1) {
                            for (var i = 1; i < result.length; i++) {
                                line_profile.push({
                                    name: result[i].name, distance: getDistance(
                                        {lat: result[i - 1].lat, lng: result[i - 1].lng},
                                        {lat: result[i].lat, lng: result[i].lng})
                                });
                            }
                        }
                        console.log('made it here 4');
                        console.log(JSON.stringify(line_profile));
                        return res.status(200).json({
                            message: 'Distance calculated',
                            obj: line_profile
                        });
                    });
                });
            }
        });
});

router.get('/distance-unregistered/:_id', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                TrackedLine.findOne({_id: req.params._id}, function (err, line) {
                    console.log('made it here 1');
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    if (!line || line.locations.length <= 0) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: {message: 'An error occurred 1'}
                        });
                    }
                    console.log('result of tracked line: '+line);
                    getLineLocationsWithTime(line.locations, function (result) {
                        console.log('result of locations with time: ' + result);
                        if (!result[0]) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: {message: 'An error occurred 1'}
                            });
                        }
                        var line_profile = [];
                        line_profile.push({time_at: result[0].time_at, distance: 0});
                        if (result.length > 1) {
                            for (var i = 1; i < result.length; i++) {
                                line_profile.push({
                                    time_at: result[i].time_at, distance: getDistance(
                                        {lat: result[i - 1].lat, lng: result[i - 1].lng},
                                        {lat: result[i].lat, lng: result[i].lng})
                                });
                            }
                        }
                        console.log(JSON.stringify(line_profile));
                        return res.status(200).json({
                            message: 'Distance calculated',
                            obj: line_profile
                        });
                    });
                });
            }
        });
});

module.exports = router;