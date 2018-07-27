const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const keys = require('./keys');

passport.use(
    new GoogleStrategy({
        // options for the google strat
        callbackURL: '/',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, 
    (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired');
        console.log(profile);
    })
)