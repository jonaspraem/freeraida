const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const Profile = require('../models/schemas/user-profile');

// Get user profile
router.get('/user/:address', (req, res, next) => {
    Profile.findOne({user_address: req.params.address}, (p_err, profile) => {
        if (p_err) {
            return res.status(500).json({
                title: 'An error occurred',
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

// Get user addresses
router.get('/user-list/', (req, res, next) => {
    Profile.find({}, 'user_address', (err, users) => {
        console.log(users);
        return res.status(200).json({
            message: 'User list successfully generated',
            obj: users
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

// Check availability of user address TODO move to unprotected
router.get('/user-address/:address', (req, res, next) => {
    Profile.findOne({user_address: req.params.address}, (p_err, profile) => {
        if (p_err) {
            return res.status(500).json({
                title: 'An error occurred',
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
router.post('/new', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (p_err, profile) => {
        if (p_err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: p_err
            });
        }
        if (!profile) {
            // If none exists, create new
            const profile_schema = new Profile({
                user_id: body.user_id,
                user_address: req.body.user_address,
                firstname: req.body.firstname,
                surname: req.body.surname,
                bio: req.body.bio,
                representation: req.body.representation,
                social_twitter: req.body.social_twitter,
                social_instagram: req.body.social_instagram,
                followers: [],
                following: [],
                lines: [],
                posts: []
            });

            profile_schema.save((err, result) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
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
});

// Get user profile with token
router.get('/user-info', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (p_err, profile) => {
        if (p_err) {
            return res.status(500).json({
                title: 'An error occurred',
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
});

// Edit profile
router.patch('/edit-profile', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (err, profile) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
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

        profile.save((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            return res.status(201).json({
                message: 'User created',
                obj: result
            });
        });
    });
});

module.exports = router;