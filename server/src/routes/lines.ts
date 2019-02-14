import * as express from 'express';
import { ILine } from "../models/schemas/line";
import { ILocation } from "../models/schemas/location";
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyABj_T1wCMVSfQgskqWFwzHJQKaBFjepko'
});

// Verify token
router.use('/', async (req, res, next) => {
    try {
        await jwt.verify(req.query.token, keys.token.secret);
    } catch (e) {
        return res.status(401).json({
            title: 'Not Authenticated',
            message: 'Token couldn\'t be identified'
        });
    }
    next();
});

module.exports = router;