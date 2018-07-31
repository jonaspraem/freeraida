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

router.get('/logout', (req, res, next) => {
    res.send('logging out');
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/landing-page',
                                   failureFlash: true })
);

router.get('/google', 
    passport.authenticate('google', {
        scope: ['profile']
    })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
    res.send('you reached the google callback URI');
    // redirect to root
});

router.post('/sign-up', function (req, res, next) {
    console.log('enlisting user..');
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.password_confirmation) {
        if (req.body.password === req.body.password_confirmation) {
            console.log('password matches');
            var user = new User({
                email: req.body.email,
                username: req.body.username,
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
        } else {
            // Password doesn't match
            console.log('password don\'t match');
        } 
    }
});

module.exports = router;