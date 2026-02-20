import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { connectDb } from './db';
import * as dotenv from "dotenv";

class Application {
  public express;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    dotenv.config();
    const router = express.Router(); // @TODO can delete?

    const index = require('./routes/app');
    const authRoutes = require('./routes/authenticate');
    const postRoutes = require('./routes/posts');
    const socialRoutes = require('./routes/social');
    const userProfileRoutes = require('./routes/user-profile');
    const lineRoutes = require('./routes/lines');
    const locationServiceRoutes = require('./routes/location-service');

    // Carabiner
    const carabinerRoutes = require('./routes/carabiner/carabiner');

    connectDb()
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.error('MongoDB connection error:', err));

    this.express.use(async (_req, _res, next) => {
      try {
        await connectDb();
        next();
      } catch (err) {
        next(err);
      }
    });

    // view engine setup
    this.express.set('views', path.join(__dirname, '../views'));
    this.express.set('view engine', 'hbs');

    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(express.static('public'));

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
    this.express.use(express.static(path.join(__dirname, '../public')));
    // this.express.use(favicon(path.join(__dirname,'images','favicon.ico')));

    this.express.all('*', (req, res, next) => {
      if (req.headers.host == 'localhost:3000') {
        next();
      } else if (req.headers['x-forwarded-proto'] === 'https') {
        next();
      }
      // Force HTTPS redirect on production server
      else res.redirect('https://' + req.headers.host + req.url);
    });

    this.express.use((req, res, next) => {
      res.setHeader('Acces-Control-Allow-Origin', '*');
      res.setHeader('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.setHeader('Acces-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
      next();
    });

    // Web app
    this.express.use('/api/authentication', authRoutes);
    this.express.use('/api/user-profile', userProfileRoutes);
    this.express.use('/api/post', postRoutes);
    this.express.use('/api/social', socialRoutes);
    this.express.use('/api/line', lineRoutes);
    this.express.use('/api/location-service', locationServiceRoutes);

    // Carabiner
    this.express.use('/api/carabiner', carabinerRoutes);

    this.express.use('/', index);

    // catch 404 and forward to error handler
    this.express.use((req, res, next) => {
      res.render('index');
    });

    console.log('Freeraida server running... ');
    console.log("DB: ", process.env.MONGODB_URI);
  }
}

export default new Application().express;
