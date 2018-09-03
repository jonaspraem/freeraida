const express = require('express');
const router = express.Router();
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

const User = require('../models/schemas/user');

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
        scope: ['profile', 'email']
    })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
    console.log('made it hgere');
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