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
                error: {message: 'jwt must be provided'}
            });
        }
        next();
    })
});

// Follow another user
router.post('/follow/:username', function(req, res, next) {
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
                title: 'No user found',
                error: {message: 'No user found'}
            });
        }

        var isAlreadyFollowing = (followee.profile.following.indexOf(req.params.username) > -1);
        if (isAlreadyFollowing) {
            return res.status(500).json({
                title: 'User is already followed',
                error: {message: 'You are already following this user'}
            });
        }
        Profile.findOne({username: req.params.username}, function(p_err, userToFollow) {
            if (p_err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            if (!userToFollow) {
                return res.status(500).json({
                    title: 'No user found',
                    error: {message: 'No user found'}
                });
            }
            followee.profile.following.push(req.params.username);
            userToFollow.followers.push(followee.username);
            followee.profile.save(function (err, result) {
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
            return res.status(201).json({
                message: 'User successfully followed'
            });
        });
    });
});

// Un-follow user
router.post('/unfollow/:username', function(req, res, next) {
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
                title: 'No user found',
                error: {message: 'No user found'}
            });
        }
        var isAlreadyFollowing = (followee.profile.following.indexOf(req.params.username) > -1);
        if (!isAlreadyFollowing) {
            return res.status(500).json({
                title: 'User not followed',
                error: {message: 'User is not being followed by you'}
            });
        }
        Profile.findOne({username: req.params.username}, function(p_err, userToUnFollow) {
            if (p_err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            if (!userToUnFollow) {
                return res.status(500).json({
                    title: 'No user found',
                    error: {message: 'No user found'}
                });
            }
            followee.profile.following.splice(followee.profile.following.indexOf(req.params.username), 1);
            userToUnFollow.followers.splice(userToUnFollow.followers.indexOf(followee.username), 1);
            followee.profile.save(function (err, result) {
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
            return res.status(201).json({
                message: 'User successfully un-followed'
            });
        });
    });
});

module.exports = router;

