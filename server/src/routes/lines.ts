import * as express from 'express';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');