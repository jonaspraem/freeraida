var express = require('express');
var router = express.Router();

var lorem_ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
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
                  if (!profile) {
                      callback(name+i);
                      break;
                  }
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
                    bio: lorem_ipsum,
                    firstName: req.body.given_name,
                    lastName: req.body.family_name,
                    followers: [],
                    following: [],
                    lines: [],
                    posts: []
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