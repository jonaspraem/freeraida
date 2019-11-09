import * as express from 'express';
import { IProblem } from "../models/carabiner-schemas/problem";
const router = express.Router();

const rad = (x) => {
    return x * Math.PI / 180;
};

const calculateDistance = (p1, p2) => {
    const R = 6371; // km
    const dLat = rad(p2.latitude - p1.latitude);
    const dLon = rad(p2.longitude - p1.longitude);
    const lat1 = rad(p1.latitude);
    const lat2 = rad(p2.latitude);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

router.get('/', async (req, res, next) => {
    const temp: IProblem[] = [
        {
            latitude: 37.7340673,
            longitude: -119.6397086,
        },
        {
            latitude: 37.730942,
            longitude:  -119.633964,
        },
        {
            latitude: 37.731694,
            longitude: -119.640278,
        },
        {
            latitude: 37.734545,
            longitude:  -119.641812,
        },
        {
            latitude: 37.730012,
            longitude:  -119.638239,
        },
        {
            latitude: 37.730880,
            longitude: -119.632914,
        },
        {
            latitude: 37.729170,
            longitude: -119.627435,
        },
        {
            latitude: 37.731135,
            longitude:  -119.639949,
        },
    ];
    return res.status(200).json(temp);
});

router.get('/from-location/', async (req, res, next) => {
    const myLocation: IProblem = {
        latitude: 37.729264,
        longitude:  -119.640230
    };
    const savedLocation: IProblem[] = [
        {
            latitude: 37.7340673,
            longitude: -119.6397086,
        },
        {
            latitude: 27.795849,
            longitude: -103.963623,
        },
        {
            latitude: 37.730942,
            longitude:  -119.633964,
        },
        {
            latitude: 37.731694,
            longitude: -119.640278,
        },
        {
            latitude: 37.734545,
            longitude:  -119.641812,
        },
        {
            latitude: 37.730012,
            longitude:  -119.638239,
        },
        {
            latitude: 37.730880,
            longitude: -119.632914,
        },
        {
            latitude: 37.729170,
            longitude: -119.627435,
        },
        {
            latitude: 37.731135,
            longitude:  -119.639949,
        },
    ];

    const acceptedLocation: IProblem[] = [];
    
    const searchRadius = 2; // km
    // for alle savedLocations
    await savedLocation.forEach(item => {
        const distance = calculateDistance(item, myLocation);
        if (distance < searchRadius) {
            acceptedLocation.push(item);
        }
    });

    return res.status(200).json(acceptedLocation);
});

module.exports = router;
