var express = require('express');
var router = express.Router();
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

var User = require('../models/schemas/user');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/landing-page',
        failureFlash: true
    });
});

router.post('/sign-up', function (req, res, next) {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.password_confirmation) {
        if (req.body.password === req.body.password_confirmation) {

            var user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            user.save(function (err, result) {
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
    }
});