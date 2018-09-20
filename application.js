const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const passport = require('passport');
const session = require("express-session");
const flash = require("connect-flash");
const keys = require('./config/keys');
require('./config/passport-setup');

const index = require('./routes/app');
const authRoutes = require('./routes/authenticate');
const postRoutes = require('./routes/posts');
const connectRoutes = require('./routes/connect');
const profileRoutes = require('./routes/profile');
const lineRoutes = require('./routes/lines');
const lineInfoRoutes = require('./routes/lineinfo');

const app = express();
mongoose.connect('mongodb://test-user:33rdlivgarden1995@ds249355.mlab.com:49355/freeraida-database', {
    useMongoClient: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(cookieParser(keys.session.cookieKey));
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // TODO: 1 day
    keys: [keys.session.cookieKey]
}));

app.use(session({
    secret: keys.session.sessionKey,
    resave: true,
    saveUninitialized: false
}));

app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'images','favicon.ico')));

app.all('*', function(req, res, next) {
    if (req.headers.host == "localhost:3000") {
        next();
    }
    else if (req.headers["x-forwarded-proto"] === "https") {
        next();
    }
    // Force HTTPS redirect on production server
    else res.redirect('https://' + req.headers.host + req.url);
});

app.use(function(req, res, next){
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Acces-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/authentication', authRoutes);
app.use('/post', postRoutes);
app.use('/connect', connectRoutes);
app.use('/profile', profileRoutes);
app.use('/lineservice', lineRoutes);
app.use('/line-info', lineInfoRoutes);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render('index');
});

console.log('Freeraida server running... ');

module.exports = app;
