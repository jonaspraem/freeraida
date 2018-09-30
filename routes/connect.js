const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const MODEL_PATH = '../models/schemas/';
const Profile = require(MODEL_PATH + 'user-profile');

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

// Follow another user
router.post('/follow/:user_address', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, own_profile) => {
        if (profile_err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: 'An error occurred'
            });
        }
        if (!own_profile) {
            return res.status(500).json({
                title: 'No user found',
                message: 'No user found'
            });
        }

        const isAlreadyFollowing = (own_profile.following.indexOf(req.params.user_address) > -1);
        if (isAlreadyFollowing) {
            return res.status(500).json({
                title: 'User is already followed',
                message: 'You are already following this user'
            });
        }
        Profile.findOne({user_address: req.params.user_address}, (p_err, profile_toFollow) => {
            if (p_err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    message: 'An error occurred'
                });
            }
            if (!profile_toFollow) {
                return res.status(500).json({
                    title: 'No user found',
                    message: 'No user found'
                });
            }
            own_profile.following.push(req.params.user_address);
            profile_toFollow.followers.push(own_profile.user_address);
            own_profile.save((err, result_ownProfile) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        message: 'An error occurred'
                    });
                }
                profile_toFollow.save((err, result) => {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            message: 'An error occurred'
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
router.post('/unfollow/:user_address', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, own_profile) => {
        if (profile_err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: 'An error occurred'
            });
        }
        if (!own_profile) {
            return res.status(500).json({
                title: 'No user found',
                message: 'No user found'
            });
        }
        const isAlreadyFollowing = (own_profile.following.indexOf(req.params.user_address) > -1);
        if (!isAlreadyFollowing) {
            return res.status(500).json({
                title: 'User not followed',
                message: 'User is not being followed by you'
            });
        }
        Profile.findOne({user_address: req.params.user_address}, (p_err, profile_toUnfollow) => {
            if (p_err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    message: 'An error occurred'
                });
            }
            if (!profile_toUnfollow) {
                return res.status(500).json({
                    title: 'No user found',
                    message: 'No user found'
                });
            }
            own_profile.following.splice(own_profile.following.indexOf(req.params.user_address), 1);
            profile_toUnfollow.followers.splice(profile_toUnfollow.followers.indexOf(own_profile.user_address), 1);
            own_profile.save((err, result_ownProfile) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        message: 'An error occurred'
                    });
                }
                profile_toUnfollow.save((err, result) => {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            message: 'An error occurred'
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

