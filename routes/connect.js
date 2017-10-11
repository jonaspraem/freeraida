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
                error: err
            });
        }
        next();
    })
});

// Follow another user
router.post('/follow', function(req, res, next) {
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
                title: 'No user found found',
                error: {message: 'No user found'}
            });
        }
        User.findOne({_id: req.body.userid}, function (err, userToFollow) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            followee.following.push(userToFollow._id);
            userToFollow.followers.push(followee._id);
            followee.save(function (err, result) {
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

            // Success
            res.status(201).json({
                message: 'User successfully followed'
            });
        });

    });
});

module.exports = router;

