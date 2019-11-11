import * as express from 'express';
import { IProblem } from "../../models/carabiner-schemas/problem";
import { ICoordinate } from "../../models/types/coordinate";
import { calculateDistanceBetween } from "../../core/location-calculations";
const router = express.Router();

const savedLocation: IProblem[] = [
    {
        id: 'ic01',
        latitude: 37.7340673,
        longitude: -119.6397086,
        rawGrade: 7,
    },
    {
        id: 'ic02',
        latitude: 37.730942,
        longitude:  -119.633964,
        rawGrade: 6,
    },
    {
        id: 'ic03',
        latitude: 37.731694,
        longitude: -119.640278,
        rawGrade: 27,
    },
    {
        id: 'ic04',
        latitude: 37.734545,
        longitude:  -119.641812,
        rawGrade: 25,
    },
    {
        id: 'ic05',
        latitude: 37.730012,
        longitude:  -119.638239,
        rawGrade: 24
    },
    {
        id: 'ic06',
        latitude: 37.730880,
        longitude: -119.632914,
        rawGrade: 17
    },
    {
        id: 'ic07',
        latitude: 37.729170,
        longitude: -119.627435,
        rawGrade: 15,
    },
    {
        id: 'ic08',
        latitude: 37.731135,
        longitude:  -119.639949,
        rawGrade: 16,
    },
    {
        id: 'ic09',
        latitude: 37.229170,
        longitude: -112.627435,
        rawGrade: 18
    },
    {
        id: 'ic10',
        latitude: 35.731135,
        longitude:  -112.639949,
        rawGrade: 20
    },
];

router.get('/', async (req, res, next) => {
    return res.status(200).json(savedLocation);
});

router.get('/from-location/', async (req, res, next) => {
    // get query parameters
    const { latitude, longitude, gradeSystem } = req.query;

    const myLocation: ICoordinate = {
        latitude,
        longitude
    };

    const acceptedLocation: IProblem[] = [];
    
    const searchRadius = 2; // km
    // for alle savedLocations
    await savedLocation.forEach(item => {
        const distance = calculateDistanceBetween(item, myLocation);
        if (distance < searchRadius) {
            acceptedLocation.push(item);
        }
    });

    return res.status(200).json(acceptedLocation);
});

module.exports = router;
