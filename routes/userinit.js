var express = require('express');
var router = express.Router();

var Profile = require('../models/profile');

// Create profile if none exists
router.post('/', function(req, res, next) {
    console.log('got request');
    Profile.findOne({user_id: req.body.user_id}, function(p_err, profile) {
        console.log('profile:::');
        if (p_err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if (profile) console.log('User already exists: '+profile.user_id);
        if (!profile) {
            var profile = new Profile({
                user_id: req.body.user_id,
                bio: 'new bio',
                firstName: req.body.given_name,
                lastName: req.body.family_name,
                followers: [],
                following: [],
                lines: [],
                posts: []
            });
            console.log('profile: '+profile.toString());
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
        }
    });
});

module.exports = router;