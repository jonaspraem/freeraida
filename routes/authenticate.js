const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/schemas/user');

router.post('/login', (req, res, done) => {
    console.log('logging in: ', req.body);
    if (req.body.username) {
        console.log('logging in with username');
        User.findOne({username: req.body.username}, (err, user) => {
            console.log('user', user);
            user.validPassword(req.body.password, (err, isMatch) => {
                console.log('isMatch', isMatch);
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }
                if (!isMatch) {
                    return res.status(401).json({
                        title: 'Failed to login',
                        message: 'Username & password didn\'t match'
                    });
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
    }
    else if (req.body.email) {
        console.log('logging in with email');
        User.findOne({email: req.body.email}, (err, user) => {
            user.validPassword(req.body.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }
                if (!isMatch) {
                    return res.status(401).json({
                        title: 'Failed to login',
                        message: 'Username & password didn\'t match'
                    });
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
    } else {
        return res.status(400).json({
            title: 'Incorrect request format',
            message: 'please provide an email or username'
        });
    }
});

router.post('/signup', function (req, res, next) {
    console.log('enlisting user..', req.body.username);
    // Required properties
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.password_confirmation &&
        req.body.firstname &&
        req.body.surname &&
        req.body.country
    ) {
        if (req.body.password === req.body.password_confirmation) {
            const user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                firstname: req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.toLowerCase().slice(1),
                surname: req.body.surname.charAt(0).toUpperCase() + req.body.surname.toLowerCase().slice(1),
                password: req.body.password,
                country: req.body.country
            });

            user.save(function (err, result) {
                if (err) {
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
            return res.status(401).json({
                title: 'Failed to signup',
                message: 'passwords didn\'t match'
            });
        } 
    } else {
        return res.status(500).json({
            title: 'Wrong body format',
            message: 'Please provide all the required body attributes'
        });
    }
});

module.exports = router;