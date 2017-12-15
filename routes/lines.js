var express = require('express');
var router = express.Router();
var request = require('request');

var Profile = require('../models/profile');
var Marker = require('../models/marker');
var Line = require('../models/line');

// TODO
function sortList(list, callback) {
    list.sort(function(a, b){
        var keyA = new Date(a.timestamp),
            keyB = new Date(b.timestamp);
        // Compare the 2 dates
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    });
    callback(list);
}

function getLineMarkers(id_list, callback) {
    Marker.find({'_id': {$in: id_list}}, function (err, markers) {
        console.log('markers from db: '+markers);
        if (err) return null;
        if (!markers) return null;
        callback(markers);
    });
}

function getTransformedLine(line, callback) {
    var newLine = line;
    console.log('line.markers: '+line.markers);
    getLineMarkers(line.markers, function (marker_list) {
        console.log('marker_list: '+marker_list);
        newLine.markers = marker_list;
        callback(newLine);
    });
}

function getTransformedLineList(lines, callback) {
    var transformedLines = [];
    var counter = 0;
    for (var i = 0; i < lines.length; i++) {
        getTransformedLine(lines[i], function (line) {
            console.log('getTransformedLine: '+line);
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
            console.log('transformedLineList: '+transformedLineList);
            callback(transformedLineList);
        });
    });
}

function saveMarkerList(marker_list, callback) {
    var counter = 0;
    console.log('marker list to save: '+marker_list);
    for (var i = 0; i < marker_list.length; i++) {
        marker_list[i].save(function (err, result) {
            counter++;
            console.log('marker save: '+result);
            if (counter == marker_list.length) callback(true);
        });
    }
}

router.get('/:username', function (req, res, next) {
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
            console.log("list:"+list);
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
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: {message: 'jwt must be provided'}
                });
            }
        }
    );
});

router.post('/newline/', function(req, res, next) {
    console.log('newline post');
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function (profile_err, user_profile) {
                    console.log('PROFILE FOUND');
                    if (profile_err) {
                        return res.status(500).json({
                            title: 'Error finding user userProfile',
                            error: profile_err
                        });
                    }
                    if (!user_profile) {
                        return res.status(500).json({
                            title: 'Error finding user userProfile',
                            error: {message: 'An error occurred regarding userProfile'}
                        });
                    }
                    var markerlist = [];
                    for (var i = 0; i<req.body.markers.length; i++) {
                        var marker = new Marker({
                            markerName: req.body.markers[i].name,
                            lat: req.body.markers[i].lat,
                            lng: req.body.markers[i].lng
                        });
                        markerlist.push(marker);
                    }

                    var line = new Line({
                        user_id: body.user_id,
                        lineName: req.body.lineName,
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
                                console.log('EVERYTHING SAVED');
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

module.exports = router;