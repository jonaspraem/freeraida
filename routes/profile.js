var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Profile = require('../models/profile');

// Get user profile
router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if (!user) {
            return res.status(400).json({
                title: 'No user found',
                error: {message: 'No profile matching the id'}
            });
        }
        Profile.findOne({user: user._id}, function(p_err, profile) {
            if (p_err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            if (!profile) {
                return res.status(400).json({
                    title: 'No profile found',
                    error: {message: 'No profile matching the id'}
                });
            }
            res.status(200).json({
                message: 'Profile successfully received',
                obj: profile
            });
        });
    });
});

// TODO: change secret variable
// Verify token
router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

// Edit bio
router.patch('/:bio', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Profile.findOne({user: req.body.user._id}, function(err, profile) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if (!profile) {
            return res.status(400).json({
                title: 'No profile found',
                error: {message: 'No profile matching the id'}
            });
        }
        profile.bio = req.body.bio;
        profile.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'bio updated',
                obj: result
            });
        });
    });
});

module.exports = router;