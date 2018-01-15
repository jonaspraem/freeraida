var express = require('express');
var router = express.Router();
var request = require('request');

var Profile = require('../models/schemas/profile');

// Get user profile
router.get('/user/:address', function (req, res, next) {
    Profile.findOne({user_address: req.params.address}, function(p_err, profile) {
        if (p_err) {
            return res.status(500).json({
                title: 'An error occured',
                error: p_err
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

// Verify token
router.use('/', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error && response.statusCode >= 200) {
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

// Check availability of user address
router.get('/user-address/:address', function (req, res, next) {
    Profile.findOne({user_address: req.params.address}, function(p_err, profile) {
        if (p_err) {
            return res.status(500).json({
                title: 'An error occured',
                error: p_err
            });
        }
        if (!profile) {
            // The address is unused
            return res.status(200).json({
                message: 'User address is unused',
                obj: 'true'
            });
        } else {
            return res.status(400).json({
                title: 'Address is taken',
                error: new Error('Address is in use')
            });
        }
    });
});

// Create new profile
router.post('/new', function (req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        {json: {id_token: req.query.token}},
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function(p_err, profile) {
                    if (p_err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: p_err
                        });
                    }
                    if (!profile) {
                        console.log('profile created: '+req.body.social_twitter);
                        // If none exists, create new
                        var profile_schema = new Profile({
                            user_id: body.user_id,
                            user_address: req.body.user_address,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            bio: req.body.bio,
                            representation: req.body.representation,
                            social_twitter: req.body.social_twitter,
                            social_instagram: req.body.social_instagram,
                            followers: [],
                            following: [],
                            lines: [],
                            posts: []
                        });

                        profile_schema.save(function (err, result) {
                            if (err) {
                                return res.status(500).json({
                                    title: 'An error occured',
                                    error: err
                                });
                            }
                            return res.status(201).json({
                                message: 'User created',
                                obj: result
                            });
                        });
                    }
                });
            }
        });
});

// Get user profile with token
router.get('/user-info', function (req, res, next) {
    console.log('user request at user-info');
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        {json: {id_token: req.query.token}},
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function(p_err, profile) {
                    if (p_err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: p_err
                        });
                    }
                    if (!profile) {
                        return res.status(400).json({
                            title: 'No profile found',
                            error: {message: 'No profile matching the id'}
                        });
                    }
                    return res.status(201).json({
                        message: 'Profile successfully received',
                        obj: profile
                    });
                });
            }
        });
});

// Edit profile
router.patch('/edit-profile', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        {json: {id_token: req.query.token}},
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function(err, profile) {
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
                    // Edit variables
                    profile.representation = req.body.representation;
                    profile.bio = req.body.bio;
                    profile.social_twitter = req.body.social_twitter;
                    profile.social_instagram = req.body.social_instagram;

                    profile.save(function (err, result) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occured',
                                error: err
                            });
                        }
                        return res.status(201).json({
                            message: 'User created',
                            obj: result
                        });
                    });
                });
            }
        });
});

module.exports = router;