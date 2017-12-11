var express = require('express');
var router = express.Router();

var Profile = require('../models/profile');

function findAvailableUserAddress(name, callback) {
    name = name.toLowerCase();
    // check preferred user address
    Profile.findOne({user_address: name}, function(p_err, profile) {
       if (!profile) {
           callback(name);
       }
       // else give a number on the end of the address. Addresses can be changed manually by the user if so desired.
       else if (profile) {
           for (var i = 0; i<100; i++) {
               Profile.findOne({user_address: name+i}, function(p_err, profile) {
                  if (!profile) callback(name+i);
               });
           }
       }
    });
}

// Create profile if none exists
router.post('/', function(req, res, next) {
    Profile.findOne({user_id: req.body.user_id}, function(p_err, profile) {
        if (p_err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        // Profile doesn't exist
        if (!profile) {
            findAvailableUserAddress(req.body.given_name+req.body.family_name, function(user_address) {
                var profile_model = new Profile({
                    user_id: req.body.user_id,
                    user_address: user_address,
                    bio: 'new bio',
                    firstName: req.body.given_name,
                    lastName: req.body.family_name,
                    followers: [],
                    following: [],
                    lines: [],
                    posts: [],
                });
                profile_model.save(function (err, result) {
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