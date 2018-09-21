const express = require('express');
const router = express.Router();
const request = require('request');

const Profile = require('../models/schemas/profile');

// Verify token
router.use('/', (req, res, next) => {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                next();
            } else {
                console.log(response);
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: {message: 'Not a valid token'}
                });
            }
        }
    );
});

// Follow another user
router.post('/follow/:user_address', (req, res, next) => {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        (error, response, body) => {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, (profile_err, own_profile) => {
                    if (profile_err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: {message: 'An error occured'}
                        });
                    }
                    if (!own_profile) {
                        return res.status(500).json({
                            title: 'No user found',
                            error: {message: 'No user found'}
                        });
                    }

                    const isAlreadyFollowing = (own_profile.following.indexOf(req.params.user_address) > -1);
                    if (isAlreadyFollowing) {
                        return res.status(500).json({
                            title: 'User is already followed',
                            error: {message: 'You are already following this user'}
                        });
                    }
                    Profile.findOne({user_address: req.params.user_address}, (p_err, profile_toFollow) => {
                        if (p_err) {
                            return res.status(500).json({
                                title: 'An error occured',
                                error: {message: 'An error occured'}
                            });
                        }
                        if (!profile_toFollow) {
                            return res.status(500).json({
                                title: 'No user found',
                                error: {message: 'No user found'}
                            });
                        }
                        own_profile.following.push(req.params.user_address);
                        profile_toFollow.followers.push(own_profile.user_address);
                        own_profile.save((err, result_ownProfile) => {
                            if (err) {
                                return res.status(500).json({
                                    title: 'An error occured',
                                    error: {message: 'An error occured'}
                                });
                            }
                            profile_toFollow.save((err, result) => {
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
            }
        });
});

// Un-follow user
router.post('/unfollow/:user_address', (req, res, next) => {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        (error, response, body) => {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, (profile_err, own_profile) => {
                    if (profile_err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: {message: 'An error occured'}
                        });
                    }
                    if (!own_profile) {
                        return res.status(500).json({
                            title: 'No user found',
                            error: {message: 'No user found'}
                        });
                    }
                    const isAlreadyFollowing = (own_profile.following.indexOf(req.params.user_address) > -1);
                    if (!isAlreadyFollowing) {
                        return res.status(500).json({
                            title: 'User not followed',
                            error: {message: 'User is not being followed by you'}
                        });
                    }
                    Profile.findOne({user_address: req.params.user_address}, (p_err, profile_toUnfollow) => {
                        if (p_err) {
                            return res.status(500).json({
                                title: 'An error occured',
                                error: {message: 'An error occured'}
                            });
                        }
                        if (!profile_toUnfollow) {
                            return res.status(500).json({
                                title: 'No user found',
                                error: {message: 'No user found'}
                            });
                        }
                        own_profile.following.splice(own_profile.following.indexOf(req.params.user_address), 1);
                        profile_toUnfollow.followers.splice(profile_toUnfollow.followers.indexOf(own_profile.user_address), 1);
                        own_profile.save((err, result_ownProfile) => {
                            if (err) {
                                return res.status(500).json({
                                    title: 'An error occured',
                                    error: {message: 'An error occured'}
                                });
                            }
                            profile_toUnfollow.save((err, result) => {
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
            }
        });
});

module.exports = router;

