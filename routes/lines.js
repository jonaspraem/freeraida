var express = require('express');
var router = express.Router();
var request = require('request');

var Profile = require('../models/schemas/profile');
var Marker = require('../models/schemas/marker');
var Line = require('../models/schemas/line');
var TrackedLine = require('../models/schemas/tracked-line');
var Location = require('../models/schemas/location');

function sortList(list, callback) {
    list.sort(function(a, b){
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    callback(list);
}

function getTransformedTrackedLine(line, callback) {
    var newTracked = line;
    Location.find({'_id': {$in: line.locations}}, function(err, location_list) {
        newTracked.locations = location_list;
        callback(newTracked);
    });
}

function getTransformedTrackedLineList(lines, callback) {
    var transformedTrackedLines = [];
    var counter = 0;
    for (var i = 0; i < lines.length; i++) {
        getTransformedTrackedLine(lines[i], function (line) {
            counter++;
            if (line) transformedTrackedLines.push(line);
            if (lines.length == counter) callback(transformedTrackedLines);
        });
    }
}

function getMarkerLocation(marker, callback) {
    var newMarker = marker;
    Location.findOne({'_id': marker.location}, function(err, location) {
        newMarker.location = location;
        callback(newMarker);
    });
}

function getTransformedMarkersList(marker_list, callback) {
    var transformedMarkers = [];
    var counter = 0;
    for (var i = 0; i < marker_list.length; i++) {
        getMarkerLocation(marker_list[i], function (marker) {
            counter++;
            if (marker) transformedMarkers.push(marker);
            if (marker_list.length == counter) callback(transformedMarkers);
        });
    }
}

function getLineMarkers(id_list, callback) {
    Marker.find({'_id': {$in: id_list}}, function (err, markers) {
        if (err) return null;
        if (!markers) return null;

        getTransformedMarkersList(markers, function (marker_list) {
            callback(marker_list);
        })
    });
}

function getTransformedLine(line, callback) {
    var newLine = line;
    console.log('made it here2');
    getLineMarkers(line.markers, function (marker_list) {
        newLine.markers = marker_list;
        callback(newLine);
    });
}

function getTransformedLineList(lines, callback) {
    var transformedLines = [];
    var counter = 0;
    for (var i = 0; i < lines.length; i++) {
        getTransformedLine(lines[i], function (line) {
            counter++;
            if (line) transformedLines.push(line);
            if (lines.length == counter) callback(transformedLines);
        });
    }
}

function getUserLines(profile, callback) {
    Line.find({'_id': {$in: profile.lines}}, function (err, user_lines) {
        if (err) return null;
        if (!user_lines) return null;
        getTransformedLineList(user_lines, function(transformedLineList) {
            callback(transformedLineList);
        });
    });
}

function getUserTrackedLines(profile, callback) {
    TrackedLine.find({'_id': {$in: profile.tracked_lines}}, function (err, user_lines) {
        if (err) return null;
        if (!user_lines) return null;
        getTransformedTrackedLineList(user_lines, function(transformedLineList) {
            callback(transformedLineList);
        });
    });
}

function saveMarkerList(marker_list, callback) {
    var counter = 0;
    for (var i = 0; i < marker_list.length; i++) {
        marker_list[i].save(function (err, result) {
            counter++;
            if (counter == marker_list.length) callback(true);
        });
        marker_list[i].location.save(function (err, result) {

        });
    }
}

function saveLocationList(location_list, callback) {
    var counter = 0;
    for (var i = 0; i < location_list.length; i++) {
        location_list[i].save(function (err, result) {
            counter++;
            if (counter == location_list.length) callback(true);
        });
    }
}

router.get('/user/:username', function (req, res, next) {
    Profile.findOne({username: req.params.username}, function (err, user_profile) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user_profile) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'An error occurred 1'}
            });
        }
        getUserLines(user_profile, function(list) {
            sortList(list, function(sortedList) {
                return res.status(201).json({
                    message: 'User lines successfully generated',
                    obj: sortedList
                });
            });
        });
    });
});

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
                    error: {message: 'jwt must be provided'}
                });
            }
        }
    );
});

router.get('/tracked-line/:id', function (req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                TrackedLine.findOne({_id: req.params.id}, function (err, tracked_line) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    if (!tracked_line) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: {message: 'The tracked line couldn\'t be found'}
                        });
                    }
                    // Check whether the tracked line is the user's line
                    if (tracked_line.user_id != body.user_id) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: {message: 'The tracked line is not the user\s line'}
                        });
                    }
                    getTransformedTrackedLine(tracked_line, function (transformedTrackedLine) {
                        return res.status(200).json({
                            message: 'Tracked line successfully generated',
                            obj: transformedTrackedLine
                        });
                    });
                });
            }
        });
});

router.get('/user-lines/', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function (profile_err, user_profile) {
                    if (profile_err) {
                        return res.status(500).json({
                            title: 'Error finding user profile',
                            error: profile_err
                        });
                    }
                    if (!user_profile) {
                        return res.status(500).json({
                            title: 'Error finding user profile',
                            error: {message: 'An error occurred regarding profile'}
                        });
                    }
                    getUserLines(user_profile, function(list) {
                        sortList(list, function (sortedList) {
                            return res.status(201).json({
                                message: 'User registered lines received',
                                obj: sortedList
                            });
                        });
                    });
                });
            }
        });
});

router.get('/unregistered-lines/', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function (profile_err, user_profile) {
                    if (profile_err) {
                        return res.status(500).json({
                            title: 'Error finding user profile',
                            error: profile_err
                        });
                    }
                    if (!user_profile) {
                        return res.status(500).json({
                            title: 'Error finding user profile',
                            error: {message: 'An error occurred regarding profile'}
                        });
                    }
                    getUserTrackedLines(user_profile, function(list) {
                        return res.status(201).json({
                            message: 'User unregistered lines received',
                            obj: list
                        });
                    });
                });
            }
        });
});

router.post('/newline/', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function (profile_err, user_profile) {
                    if (profile_err) {
                        return res.status(500).json({
                            title: 'Error finding user profile',
                            error: profile_err
                        });
                    }
                    if (!user_profile) {
                        return res.status(500).json({
                            title: 'Error finding user profile',
                            error: {message: 'An error occurred regarding profile'}
                        });
                    }
                    var markerlist = [];
                    for (var i = 0; i<req.body.markers.length; i++) {
                        var location = new Location({
                            lat: req.body.markers[i].location.lat,
                            lng: req.body.markers[i].location.lng,
                            elevation: req.body.markers[i].location.elevation,
                            resolution: req.body.markers[i].location.resolution
                        });
                        var marker = new Marker({
                            name: req.body.markers[i].name,
                            index: req.body.markers[i].index,
                            location: location,
                            distance_from_start: req.body.markers[i].distance_from_start
                        });
                        markerlist.push(marker);
                    }

                    var line = new Line({
                        user_id: body.user_id,
                        name: req.body.name,
                        line_type: req.body.line_type,
                        markers: markerlist,
                        timestamp: new Date(),
                        danger_level: req.body.danger_level,
                        tree_level: req.body.tree_level,
                        rock_level: req.body.rock_level,
                        cliff_level: req.body.cliff_level
                    });

                    line.save(function (err, result) {
                        if (err) {
                            return res.status(500).json({
                                title: 'Couldn\'t save line',
                                error: err
                            });
                        }
                        user_profile.lines.push(result);
                        saveMarkerList(markerlist, function(save_success) {
                            if (!save_success) {
                                return res.status(500).json({
                                    title: 'An error occurred',
                                    error: {message: 'An error occurred saving the map markers'}
                                });
                            }
                            user_profile.save(function (err, profile_result) {
                                if (err) {
                                    return res.status(500).json({
                                        title: 'An error occurred',
                                        error: err
                                    });
                                }
                                return res.status(201).json({
                                    message: 'Line saved',
                                    obj: result
                                });
                            });
                        });
                    });
                });
            }
        }
    );
});

router.post('/new-tracked-line/', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function (profile_err, user_profile) {
                    if (profile_err) {
                        return res.status(500).json({
                            title: 'Error finding user profile',
                            error: profile_err
                        });
                    }
                    if (!user_profile) {
                        return res.status(500).json({
                            title: 'Error finding user profile',
                            error: {message: 'An error occurred regarding profile'}
                        });
                    }
                    var locations = [];
                    for (var i = 0; i<req.body.locations.length; i++) {
                        var location = new Location({
                            lat: req.body.locations[i].lat,
                            lng: req.body.locations[i].lng
                        });
                        locations.push(location);
                    }

                    var tracked_line = new TrackedLine({
                        user_id: body.user_id,
                        duration: req.body.duration,
                        locations: locations,
                        timestamp: new Date()
                    });

                    tracked_line.save(function (err, result) {
                        if (err) {
                            return res.status(500).json({
                                title: 'Couldn\'t save line',
                                error: err
                            });
                        }
                        user_profile.tracked_lines.push(result);
                        saveLocationList(locations, function(save_success) {
                            if (!save_success) {
                                return res.status(500).json({
                                    title: 'An error occured',
                                    error: err
                                });
                            }
                            user_profile.save(function (err, profile_result) {
                                if (err) {
                                    return res.status(500).json({
                                        title: 'An error occured',
                                        error: err
                                    });
                                }
                                return res.status(201).json({
                                    message: 'Line saved',
                                    obj: result
                                });
                            });
                        });
                    });
                });
            }
        }
    );
});

router.post('/confirm-line/:id', function (req, res, next) {
    console.log('confirming line: '+req.params.id);
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function(profile_err, user_profile) {
                    if (profile_err) {
                        return res.status(500).json({
                            title: 'Error finding user profile',
                            error: profile_err
                        });
                    }
                    if (!user_profile) {
                        return res.status(500).json({
                            title: 'Error finding user profile',
                            error: {message: 'An error occurred regarding profile'}
                        });
                    }
                    TrackedLine.findOne({_id: req.params.id}, function (err, tracked_line) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        }
                        if (!tracked_line) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: {message: 'The tracked line couldn\'t be found'}
                            });
                        }
                        // Check whether the tracked line is the user's line
                        if (tracked_line.user_id != body.user_id) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: {message: 'The tracked line is not the user\s line'}
                            });
                        }
                        console.log('line found');
                        getTransformedTrackedLine(tracked_line, function(transformedTrackedLine) {
                            console.log('line transformed');
                            // Create markers
                            var markers = [];
                            for (var i = 0; i < req.body.markers.length; i++) {
                                console.log('location properties: ' + req.body.markers[i].location.lat + ', '
                                    +req.body.markers[i].location.lng+', '+req.body.markers[i].location.elevation+', '+req.body.markers[i].location.resolution);

                                var location = new Location({
                                    lat: req.body.markers[i].location.lat,
                                    lng: req.body.markers[i].location.lng,
                                    elevation: req.body.markers[i].location.elevation,
                                    resolution: req.body.markers[i].location.resolution});

                                console.log('location '+location);

                                markers.push(new Marker({
                                    index: req.body.markers[i].index,
                                    name: req.body.markers[i].name,
                                    location: location,
                                    distance_from_start: req.body.markers[i].distance_from_start
                                }));
                                console.log('marker '+markers);
                            }

                            // Create line
                            var newLine = new Line({
                                name: req.body.name,
                                line_type: req.body.line_type,
                                markers: markers,
                                timestamp: new Date(),
                                danger_level: req.body.danger_level,
                                tree_level: req.body.tree_level,
                                rock_level: req.body.rock_level,
                                cliff_level: req.body.cliff_level,
                                user_id: body.user_id,
                                confirmed: true
                            });
                            newLine.save(function (err, line_result) {
                                if (err) {
                                    return res.status(500).json({
                                        title: 'An error occured',
                                        error: err
                                    });
                                }
                                user_profile.lines.push(line_result);
                                user_profile.save(function (err, profile_result) {
                                    if (err) {
                                        return res.status(500).json({
                                            title: 'An error occurred',
                                            error: err
                                        });
                                    }
                                    saveMarkerList(markers, function(save_success) {
                                        if (!save_success) {
                                            return res.status(500).json({
                                                title: 'An error occurred',
                                                error: {message: 'An error occurred saving the map markers'}
                                            });
                                        }
                                        transformedTrackedLine.remove(function(err, result) {
                                            if (err) {
                                                return res.status(500).json({
                                                    title: 'An error occured',
                                                    error: err
                                                });
                                            }
                                            return res.status(201).json({
                                                message: 'Line successfully confirmed',
                                                obj: line_result
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        });
});

router.delete('/remove-tracked-line/:id', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        {json: {id_token: req.query.token}},
        function (error, response, body) {
            if (!error) {
                TrackedLine.findById(req.params.id, function(err, line) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: err
                        });
                    }
                    if (!line) {
                        return res.status(500).json({
                            title: 'No tracked line found',
                            error: { message: 'Post not found'}
                        });
                    }
                    if (line.user_id != body.user_id) {
                        return res.status(401).json({
                            title: 'Not Authenticated',
                            error: {message: 'Not the user\'s tracked line'}
                        });
                    }
                    line.remove(function(err, result) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occured',
                                error: err
                            });
                        }
                        res.status(200).json({
                            message: 'tracked line deleted',
                            obj: result
                        });
                    });
                });
            }
        })
});

router.delete('/remove-line/:id', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        {json: {id_token: req.query.token}},
        function (error, response, body) {
            if (!error) {
                Line.findById(req.params.id, function(err, line) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: err
                        });
                    }
                    if (!line) {
                        return res.status(500).json({
                            title: 'No tracked line found',
                            error: { message: 'Post not found'}
                        });
                    }
                    if (line.user_id != body.user_id) {
                        return res.status(401).json({
                            title: 'Not Authenticated',
                            error: {message: 'Not the user\'s tracked line'}
                        });
                    }
                    line.remove(function(err, result) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occured',
                                error: err
                            });
                        }
                        res.status(200).json({
                            message: 'tracked line deleted',
                            obj: result
                        });
                    });
                });
            }
        })
});

module.exports = router;