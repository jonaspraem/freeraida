var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var passport = require('passport');
var session = require("express-session");

// const passportSetup = require('./config/passport-setup');

var index = require('./routes/app');
var authRoutes = require('./routes/authenticate');
var postRoutes = require('./routes/posts');
var connectRoutes = require('./routes/connect');
var profileRoutes = require('./routes/profile');
var lineRoutes = require('./routes/lines');
var lineInfoRoutes = require('./routes/lineinfo');

var app = express();
mongoose.connect('mongodb://test-user:33rdlivgarden1995@ds249355.mlab.com:49355/freeraida-database', {
    useMongoClient: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
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
