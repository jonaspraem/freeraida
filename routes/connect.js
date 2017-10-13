var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
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
    });
});

// Follow another user
router.post('/follow/:username', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, followee) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'An error occured'}
            });
        }
        if (!followee) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'No user found'}
            });
        }
        Profile.findOne({username: followee.username}, function(profile_err, followee_profile) {
            if (profile_err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'An error occured'}
                });
            }
            if (!followee_profile) {
                return res.status(500).json({
                    title: 'No user found',
                    error: {message: 'No user found'}
                });
            }

            var isAlreadyFollowing = (followee_profile.following.indexOf(req.params.username) > -1);
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
                        error: {message: 'An error occured'}
                    });
                }
                if (!userToFollow) {
                    return res.status(500).json({
                        title: 'No user found',
                        error: {message: 'No user found'}
                    });
                }
                followee_profile.following.push(req.params.username);
                userToFollow.followers.push(followee.username);
                followee_profile.save(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: {message: 'An error occured'}
                        });
                    }
                });
                userToFollow.save(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: {message: 'An error occured'}
                        });
                    }
                    return res.status(201).json({
                        message: 'User successfully followed',
                        obj: result
                    });
                });
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
                error: {message: 'An error occured'}
            });
        }
        if (!followee) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'No user found'}
            });
        }
        Profile.findOne({username: followee.username}, function(profile_err, followee_profile) {
            if (profile_err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'An error occured'}
                });
            }
            if (!followee_profile) {
                return res.status(500).json({
                    title: 'No user found',
                    error: {message: 'No user found'}
                });
            }


            var isAlreadyFollowing = (followee_profile.following.indexOf(req.params.username) > -1);
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
                        error: {message: 'An error occured'}
                    });
                }
                if (!userToUnFollow) {
                    return res.status(500).json({
                        title: 'No user found',
                        error: {message: 'No user found'}
                    });
                }
                followee_profile.following.splice(followee_profile.following.indexOf(req.params.username), 1);
                userToUnFollow.followers.splice(userToUnFollow.followers.indexOf(followee.username), 1);
                followee_profile.save(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: {message: 'An error occured'}
                        });
                    }
                });
                userToUnFollow.save(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: {message: 'An error occured'}
                        });
                    }
                    return res.status(201).json({
                        message: 'User successfully un-followed',
                        obj: result
                    });
                });
            });

        });


    });
});

module.exports = router;

