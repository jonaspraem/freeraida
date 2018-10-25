"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
class Application {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        const index = require('./routes/app');
        const authRoutes = require('./routes/authenticate');
        //const postRoutes = require('./routes/posts');
        //const connectRoutes = require('./routes/connect');
        //const userProfileRoutes = require('./routes/user-profile');
        //const lineRoutes = require('./routes/lines');
        //const lineInfoRoutes = require('./routes/lineinfo');
        mongoose.connect('mongodb://test-user:33rdlivgarden1995@ds249355.mlab.com:49355/freeraida-database', {
            useMongoClient: true
        });
        // view engine setup
        this.express.set('views', path.join(__dirname, '../../views'));
        this.express.set('view engine', 'hbs');
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(express.static("public"));
        // this.express.use(cookieParser(keys.session.cookieKey));
        // this.express.use(cookieSession({
        //     maxAge: 24 * 60 * 60 * 1000, // TODO: 1 day
        //     keys: [keys.session.cookieKey]
        // }));
        //
        // this.express.use(session({
        //     secret: keys.session.sessionKey,
        //     resave: true,
        //     saveUninitialized: false
        // }));
        //
        // this.express.use(flash());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(path.join(__dirname, '../../public')));
        // this.express.use(favicon(path.join(__dirname,'images','favicon.ico')));
        this.express.all('*', (req, res, next) => {
            if (req.headers.host == "localhost:3000") {
                next();
            }
            else if (req.headers["x-forwarded-proto"] === "https") {
                next();
            }
            // Force HTTPS redirect on production server
            else
                res.redirect('https://' + req.headers.host + req.url);
        });
        this.express.use((req, res, next) => {
            res.setHeader('Acces-Control-Allow-Origin', '*');
            res.setHeader('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.setHeader('Acces-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
            next();
        });
        this.express.use('/api/authentication', authRoutes);
        // this.express.use('/api/user-profile', userProfileRoutes);
        // this.express.use('/api/post', postRoutes);
        // this.express.use('/api/connect', connectRoutes);
        // this.express.use('/api/lineservice', lineRoutes);
        // this.express.use('/api/line-info', lineInfoRoutes);
        this.express.use('/', index);
        // catch 404 and forward to error handler
        this.express.use((req, res, next) => {
            res.render('index');
        });
        console.log('Freeraida server running... ');
    }
}
exports.default = new Application().express;
//# sourceMappingURL=application.js.map