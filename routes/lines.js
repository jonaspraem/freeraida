const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const Profile = require('../models/schemas/profile');
const Marker = require('../models/schemas/marker');
const Line = require('../models/schemas/line');
const TrackedLine = require('../models/schemas/tracked-line');
const Location = require('../models/schemas/location');

sortList = (list, callback) => {
    list.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    callback(list);
};

getTransformedTrackedLine = (line, callback) => {
    const newTracked = line;
    Location.find({'_id': {$in: line.locations}}, (err, location_list) => {
        newTracked.locations = location_list;
        callback(newTracked);
    });
};

getTransformedTrackedLineList = (lines, callback) => {
    const transformedTrackedLines = [];
    let counter = 0;
    for (let i = 0; i < lines.length; i++) {
        getTransformedTrackedLine(lines[i], (line) => {
            counter++;
            if (line) transformedTrackedLines.push(line);
            if (lines.length === counter) callback(transformedTrackedLines);
        });
    }
};

getMarkerLocation = (marker, callback) => {
    const newMarker = marker;
    Location.findOne({'_id': marker.location}, (err, location) => {
        newMarker.location = location;
        callback(newMarker);
    });
};

getTransformedMarkersList = (marker_list, callback) => {
    const transformedMarkers = [];
    let counter = 0;
    for (let i = 0; i < marker_list.length; i++) {
        getMarkerLocation(marker_list[i], (marker) => {
            counter++;
            if (marker) transformedMarkers.push(marker);
            if (marker_list.length === counter) callback(transformedMarkers);
        });
    }
};

getLineMarkers = (id_list, callback) => {
    Marker.find({'_id': {$in: id_list}}, (err, markers) => {
        if (err) return null;
        if (!markers) return null;

        getTransformedMarkersList(markers, (marker_list) => {
            callback(marker_list);
        })
    });
};

getTransformedLine = (line, callback) => {
    const newLine = line;
    console.log('made it here2');
    getLineMarkers(line.markers, (marker_list) => {
        newLine.markers = marker_list;
        callback(newLine);
    });
};

getTransformedLineList = (lines, callback) => {
    const transformedLines = [];
    let counter = 0;
    for (let i = 0; i < lines.length; i++) {
        getTransformedLine(lines[i], (line) => {
            counter++;
            if (line) transformedLines.push(line);
            if (lines.length === counter) callback(transformedLines);
        });
    }
};

getUserLines = (profile, callback) => {
    Line.find({'_id': {$in: profile.lines}}, (err, user_lines) => {
        if (err) return null;
        if (!user_lines) return null;
        getTransformedLineList(user_lines, (transformedLineList) => {
            callback(transformedLineList);
        });
    });
};

getUserTrackedLines = (profile, callback) => {
    TrackedLine.find({'_id': {$in: profile.tracked_lines}}, (err, user_lines) => {
        if (err) return null;
        if (!user_lines) return null;
        getTransformedTrackedLineList(user_lines, (transformedLineList) => {
            callback(transformedLineList);
        });
    });
};

saveMarkerList = (marker_list, callback) => {
    let counter = 0;
    for (let i = 0; i < marker_list.length; i++) {
        marker_list[i].save((err, result) => {
            counter++;
            if (counter === marker_list.length) callback(true);
        });
        marker_list[i].location.save((err, result) => {});
    }
};

saveLocationList = (location_list, callback) => {
    let counter = 0;
    for (let i = 0; i < location_list.length; i++) {
        location_list[i].save((err, result) => {
            counter++;
            if (counter === location_list.length) callback(true);
        });
    }
};

router.get('/user/:username', (req, res, next) => {
    Profile.findOne({username: req.params.username}, (err, user_profile) => {
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
        getUserLines(user_profile, (list) => {
            sortList(list, (sortedList) => {
                return res.status(201).json({
                    message: 'User lines successfully generated',
                    obj: sortedList
                });
            });
        });
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

router.get('/tracked-line/:id', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    TrackedLine.findOne({_id: req.params.id}, (err, tracked_line) => {
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
        if (tracked_line.user_id !== decoded.user._id) {
            return res.status(500).json({
                title: 'An error occurred',
                message: 'The tracked line is not the user\s line'
            });
        }
        getTransformedTrackedLine(tracked_line, (transformedTrackedLine) => {
            return res.status(200).json({
                message: 'Tracked line successfully generated',
                obj: transformedTrackedLine
            });
        });
    });
});

router.get('/user-lines/', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, user_profile) => {
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
        getUserLines(user_profile, (list) => {
            sortList(list, (sortedList) => {
                return res.status(201).json({
                    message: 'User registered lines received',
                    obj: sortedList
                });
            });
        });
    });
});

router.get('/unregistered-lines/', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, user_profile) => {
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
        getUserTrackedLines(user_profile, (list) => {
            return res.status(201).json({
                message: 'User unregistered lines received',
                obj: list
            });
        });
    });
});

router.post('/newline/', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, user_profile) => {
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
        const markerlist = [];
        for (let i = 0; i<req.body.markers.length; i++) {
            const location = new Location({
                lat: req.body.markers[i].location.lat,
                lng: req.body.markers[i].location.lng,
                elevation: req.body.markers[i].location.elevation,
                resolution: req.body.markers[i].location.resolution
            });
            const marker = new Marker({
                name: req.body.markers[i].name,
                index: req.body.markers[i].index,
                location: location,
                distance_from_start: req.body.markers[i].distance_from_start
            });
            markerlist.push(marker);
        }

        const line = new Line({
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

        line.save((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'Couldn\'t save line',
                    error: err
                });
            }
            user_profile.lines.push(result);
            saveMarkerList(markerlist, (save_success) => {
                if (!save_success) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: {message: 'An error occurred saving the map markers'}
                    });
                }
                user_profile.save((err, profile_result) => {
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
});

router.post('/new-tracked-line/', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, user_profile) => {
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
        const locations = [];
        for (let i = 0; i<req.body.locations.length; i++) {
            const location = new Location({
                lat: req.body.locations[i].lat,
                lng: req.body.locations[i].lng
            });
            locations.push(location);
        }

        const tracked_line = new TrackedLine({
            user_id: body.user_id,
            duration: req.body.duration,
            locations: locations,
            timestamp: new Date()
        });

        tracked_line.save((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'Couldn\'t save line',
                    error: err
                });
            }
            user_profile.tracked_lines.push(result);
            saveLocationList(locations, (save_success) => {
                if (!save_success) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }
                user_profile.save((err, profile_result) => {
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
});

router.post('/confirm-line/:id', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, user_profile) => {
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
        TrackedLine.findOne({_id: req.params.id}, (err, tracked_line) => {
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
            if (tracked_line.user_id !== body.user_id) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: {message: 'The tracked line is not the user\s line'}
                });
            }
            getTransformedTrackedLine(tracked_line, (transformedTrackedLine) => {
                // Create markers
                const markers = [];
                for (let i = 0; i < req.body.markers.length; i++) {
                    const location = new Location({
                        lat: req.body.markers[i].location.lat,
                        lng: req.body.markers[i].location.lng,
                        elevation: req.body.markers[i].location.elevation,
                        resolution: req.body.markers[i].location.resolution
                    });

                    markers.push(new Marker({
                        index: req.body.markers[i].index,
                        name: req.body.markers[i].name,
                        location: location,
                        distance_from_start: req.body.markers[i].distance_from_start
                    }));
                }

                // Create line
                const newLine = new Line({
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
                newLine.save((err, line_result) => {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: err
                        });
                    }
                    user_profile.lines.push(line_result);
                    user_profile.save((err, profile_result) => {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        }
                        saveMarkerList(markers, (save_success) => {
                            if (!save_success) {
                                return res.status(500).json({
                                    title: 'An error occurred',
                                    error: {message: 'An error occurred saving the map markers'}
                                });
                            }
                            transformedTrackedLine.remove((err, result) => {
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
});

router.delete('/remove-tracked-line/:id', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    TrackedLine.findById(req.params.id, (err, line) => {
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
        if (line.user_id !== decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Not the user\'s tracked line'}
            });
        }
        line.remove((err, result) => {
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
});

router.delete('/remove-line/:id', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Line.findById(req.params.id, (err, line) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!line) {
            return res.status(500).json({
                title: 'No tracked line found',
                error: { message: 'Post not found'}
            });
        }
        if (line.user_id !== body.user_id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Not the user\'s tracked line'}
            });
        }
        line.remove((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'tracked line deleted',
                obj: result
            });
        });
    });
});

module.exports = router;