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
    console.log('enlisting user..', req.body);
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.password_confirmation &&
        req.body.firstname &&
        req.body.surname &&
        req.body.country
    ) {
        if (req.body.password === req.body.password_confirmation) {
            console.log('password matches');
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                firstname: req.body.firstname,
                surname: req.body.surname,
                password: req.body.password,
                country: req.body.country
            });

            user.save(function (err, result) {
                if (err) {
                    console.log('hmhm', err);
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
    } else {
        return res.status(500).json({
            title: 'Wrong body format',
            message: 'Please provide all the required body attributes'
        });
    }
});

module.exports = router;