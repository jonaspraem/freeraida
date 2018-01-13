var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');

var index = require('./routes/app');
var postRoutes = require('./routes/posts');
var connectRoutes = require('./routes/connect');
var profileRoutes = require('./routes/profile');
var lineRoutes = require('./routes/lines');

var app = express();
mongoose.connect('test-user:33rdlivgarden1995@ds249355.mlab.com:49355/freeraida-database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'images','favicon.ico')));

app.use(function(req, res, next){
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Acces-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/post', postRoutes);
app.use('/connect', connectRoutes);
app.use('/profile', profileRoutes);
app.use('/lineservice', lineRoutes);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render('index');
});

module.exports = app;
