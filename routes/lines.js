var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Profile = require('../models/profile');
var Marker = require('../models/marker');
var Line = require('../models/line');

// TODO: change secret variable
// Verify token
router.use('/', function(req, res, next) {
    console.log(req.body);
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    });
});

router.post('/newline', function(req, res, next) {
    console.log('newline');
    var decoded = jwt.decode(req.query.token);
    console.log(req.body);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'Error finding user',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'An error occurred regarding user'}
            });
        }
        Profile.findOne({username: user.username}, function (profile_err, user_profile) {
            if (profile_err) {
                return res.status(500).json({
                    title: 'Error finding user profile',
                    error: profile_err
                });
            }
            if (!user_profile) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: {message: 'An error occurred regarding profile'}
                });
            }
            var markerlist = [];
            for (var i = 0; i<req.body.markers.length; i++) {
                markerlist.push(new Marker({
                  markerName: req.body.markers[i].markerName,
                  lat: req.body.markers[i].lat,
                  lng: req.body.markers[i].lng
                }));
            }

            var line = new Line({
                username: user_profile.username,
                lineName: req.body.lineName,
                markers: markerlist,
                danger_level: req.body.danger_level,
                tree_level: req.body.tree_level,
                rock_level: req.body.rock_level,
                cliff_level: req.body.cliff_level
            });

            line.save(function (err, result) {
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

module.exports = router;