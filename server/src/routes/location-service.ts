import * as express from 'express';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const rad = (x) => {
    return x * Math.PI / 180;
};

const calculateDistance = (p1, p2) => {
    const R = 6371; // km
    const dLat = rad(p2.lat - p1.lat);
    const dLon = rad(p2.lng-p1.lng);
    const lat1 = rad(p1.lat);
    const lat2 = rad(p2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

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
// Get user live-feed
router.post('/line-info', async (req, res, next) => {
    console.log('line-info', req);
    const line = req.body;
});