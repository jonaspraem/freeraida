var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Profile = require('../models/profile');

// Register new user
router.post('/', function(req, res, next) {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        var profile = new Profile({
            username: req.body.username,
            bio: 'new bio',
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

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
});

// Log in
router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if (!user) {
            User.findOne({username: req.body.username}, function(err, userByUsername) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }
                // TODO: change message on error
                if (!userByUsername) {
                    return res.status(401).json({
                        title: 'Login failed',
                        error: {message: 'Invalid login username'}
                    });
                }
                // TODO: change message on error
                if (!bcrypt.compareSync(req.body.password, userByUsername.password)) {
                    return res.status(401).json({
                        title: 'Login failed',
                        error: {message: 'Invalid login password : username'}
                    });
                }
                // Create token
                // TODO: change secret string to a more complicated one
                var token = jwt.sign({user: userByUsername}, 'secret', {expiresIn: 7200});
                return res.status(200).json({
                    message: 'Successfully logged in',
                    token: token,
                    username: userByUsername.username
                });
            });
        } else {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                // TODO: change message on error
                return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid login password'}
                });
            }
            // Create token
            // TODO: change secret string to a more complicated one
            var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
            res.status(200).json({
                message: 'Successfully logged in',
                token: token,
                username: user.username
            });
        }
    });
});

module.exports = router;