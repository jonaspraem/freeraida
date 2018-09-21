const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/schemas/user');

router.get('/logout', (req, res, next) => {
    res.send('logging out');
});

router.post('/login', (req, res, done) => {
    console.log('logging in: ', req.body);
    User.findOne({username: req.body.username}, (err, user) => {
        console.log('user', user);
        user.validPassword(req.body.password, (err, user) => {
            if (err) {
                // fail
            }
            console.log('valid password');
            const token = jwt.sign({ id: user._id }, keys.token.secret, { expiresIn: 86400 });
            res.status(200).json({
                message: 'Successfully signed in',
                auth: true,
                token: token,
            });
        });
    });
});

router.post('/signup', function (req, res, next) {
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
                // create a token
                const token = jwt.sign({ id: result._id }, keys.token.secret, { expiresIn: 86400 });
                return res.status(201).json({
                    message: 'User created',
                    obj: result,
                    auth: true,
                    token: token
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