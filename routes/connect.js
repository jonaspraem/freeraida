var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Profile = require('../models/profile');

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

// Get followers
router.get('/followers/:username', function (req, res, next) {
    Profile.findOne({username: req.params.username}, function(p_err, profile) {
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
        return res.status(200).json({
            message: 'Profile successfully received',
            obj: profile
        });
    });
});

// Get following users
router.get('/following', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, followee) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if (!followee) {
            return res.status(500).json({
                title: 'No user found found',
                error: {message: 'No user found'}
            });
        }
        var following = followee.following;
        return res.status(201).json({
            message: 'User successfully followed',
            obj: following
        });
    });
});

// Follow another user
router.post('/follow', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, followee) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if (!followee) {
            return res.status(500).json({
                title: 'No user found found',
                error: {message: 'No user found'}
            });
        }
        User.findOne({_id: req.body.userid}, function (err, userToFollow) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            followee.following.push(userToFollow._id);
            userToFollow.followers.push(followee._id);
            followee.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }
            });
            userToFollow.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }
            });

            // Success
            res.status(201).json({
                message: 'User successfully followed'
            });
        });

    });
});

module.exports = router;

