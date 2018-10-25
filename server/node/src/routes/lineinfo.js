const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');

const MODEL_PATH = '../models/schemas/';
const Line = require(MODEL_PATH + 'line');
const Marker = require(MODEL_PATH + 'marker');
const TrackedLine = require(MODEL_PATH + 'tracked-line');
const Location = require(MODEL_PATH + 'location');

/*
        Mathematical functions for distance calculations

        rad
        getDistance
 */
rad = (x) => {
    return x * Math.PI / 180;
};

calculateDistance = (p1, p2) => {
    const R = 6371; // km
    const dLat = rad(p2.lat - p1.lat);
    const dLon = rad(p2.lng-p1.lng);
    const lat1 = rad(p1.lat);
    const lat2 = rad(p2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

/*
        Database lookup methods
 */

getLineMarkers = (id_list, callback) => {
    const object = [];
    Marker.find({'_id': {$in: id_list}}, (err, markers) => {
        if (err) return null;
        if (!markers) return null;
        for (let i = 0; i <markers.length; i++) {
            object.push({lat: markers[i].lat, lng: markers[i].lng})
        }
        callback(object);
    });
};

getLineLocations = (id_list, callback) => {
    const object = [];
    Location.find({'_id': {$in: id_list}}, (err, locations) => {
        if (err) return null;
        if (!locations) return null;
        for (let i = 0; i <locations.length; i++) {
            object.push({lat: locations[i].lat, lng: locations[i].lng})
        }
        callback(object);
    });
};

getLineLocationsWithTime = (id_list, callback) => {
    const object = [];
    Location.find({'_id': {$in: id_list}}, (err, locations) => {
        if (err) return null;
        if (!locations) return null;
        for (let i = 0; i <locations.length; i++) {
            object.push({time_at: locations[i].time_at, lat: locations[i].lat, lng: locations[i].lng})
        }
        callback(object);
    });
};

router.post('/calculate-distance/', (req, res, next) => {
    if (req.body.length < 1) {
        return res.status(500).json({
            title: 'An error occurred',
            error: {message: 'An error occurred'}
        });
    }
    const line_profile = [];
    line_profile.push({name: req.body[0].name, distance: 0});
    if (req.body.length > 1) {
        for (let i = 1; i < req.body.length; i++) {
            line_profile.push({
                name: req.body[i].name, distance: calculateDistance(
                    {lat: req.body[i - 1].location.lat, lng: req.body[i - 1].location.lng},
                    {lat: req.body[i].location.lat, lng: req.body[i].location.lng})
            });
        }
    }
    return res.status(200).json({
        message: 'Distance calculated',
        obj: line_profile
    });
});

// Verify token
router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, keys.token.secret, function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                message: 'Token couldn\'t be identified'
            });
        }
        next();
    });
});

router.post('/height-map/', (req, res, next) => {
    const locations = [];
    for (let i = 0; i < req.body.length; i++) {
        locations.push({lat: req.body[i].location.lat, lng: req.body[i].location.lng});
    }
    const googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyABj_T1wCMVSfQgskqWFwzHJQKaBFjepko'
    });
    googleMapsClient.elevation({
        locations: locations
    }, (err, response) => {
        if (!err) {
            return res.status(200).json({
                message: 'Height map generated',
                obj: response.json.results
            });
        } else {
            console.log(err);
        }
    });
});

/*
        Deprecated methods
 */

router.get('/height-map/:_id', (req, res, next) => {
    Line.findOne({_id: req.params._id}, (err, line) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: 'Error on line lookup'
            });
        }
        if (!line) {
            return res.status(404).json({
                title: 'No line found',
                message: 'No line matching the id'
            });
        }
        const googleMapsClient = require('@google/maps').createClient({
            key: 'AIzaSyABj_T1wCMVSfQgskqWFwzHJQKaBFjepko'
        });
        getLineMarkers(line.markers, (result) => {
            googleMapsClient.elevation({
                locations: result
            }, (err, response) => {
                if (!err) {
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
});

router.get('/height-map-unregistered/:_id', (req, res, next) => {
    TrackedLine.findOne({_id: req.params._id}, (err, line) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: 'Error on line lookup'
            });
        }
        if (!line) {
            return res.status(404).json({
                title: 'No line found',
                message: 'No line matching the id'
            });
        }
        const googleMapsClient = require('@google/maps').createClient({
            key: 'AIzaSyABj_T1wCMVSfQgskqWFwzHJQKaBFjepko'
        });
        getLineLocations(line.locations, (result) => {
            googleMapsClient.elevation({
                locations: result
            }, (err, response) => {
                if (!err) {
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
});

router.get('/distance/:_id', (req, res, next) => {
    Line.findOne({_id: req.params._id}, (err, line) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: 'Error on line lookup'
            });
        }
        if (!line) {
            return res.status(404).json({
                title: 'No line found',
                message: 'No line matching the id'
            });
        }
        getLineMarkers(line.markers, (result) => {
            const line_profile = [];
            line_profile.push({name: result[0].markerName, distance: 0});
            if (result.length > 1) {
                for (let i = 1; i < result.length; i++) {
                    line_profile.push({
                        name: result[i].name, distance: calculateDistance(
                            {lat: result[i - 1].lat, lng: result[i - 1].lng},
                            {lat: result[i].lat, lng: result[i].lng})
                    });
                }
            }
            return res.status(200).json({
                message: 'Distance calculated',
                obj: line_profile
            });
        });
    });
});

router.get('/distance-unregistered/:_id', (req, res, next) => {
    TrackedLine.findOne({_id: req.params._id}, (err, line) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: 'Error on line lookup'
            });
        }
        if (!line || line.locations.length <= 0) {
            return res.status(404).json({
                title: 'An error occurred',
                message: 'No line matching the id'
            });
        }
        getLineLocationsWithTime(line.locations, (result) => {
            if (!result[0]) {
                return res.status(500).json({
                    title: 'An error occurred',
                    message: 'Error looking up locations'
                });
            }
            const line_profile = [];
            line_profile.push({time_at: result[0].time_at, distance: 0});
            if (result.length > 1) {
                for (let i = 1; i < result.length; i++) {
                    line_profile.push({
                        time_at: result[i].time_at, distance: calculateDistance(
                            {lat: result[i - 1].lat, lng: result[i - 1].lng},
                            {lat: result[i].lat, lng: result[i].lng})
                    });
                }
            }
            return res.status(200).json({
                message: 'Distance calculated',
                obj: line_profile
            });
        });
    });
});

module.exports = router;