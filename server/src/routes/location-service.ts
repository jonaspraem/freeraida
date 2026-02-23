import * as express from 'express';
import { ILine } from '../models/schemas/line';
import { ILocation } from '../models/schemas/location';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY || '',
});

const rad = (x) => {
  return (x * Math.PI) / 180;
};

const calculateDistance = (p1, p2) => {
  const R = 6371;
  const dLat = rad(p2.lat - p1.lat);
  const dLon = rad(p2.lng - p1.lng);
  const lat1 = rad(p1.lat);
  const lat2 = rad(p2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const calculateLineDistances = async (line: ILocation[]) => {
  // Calculate distance from last
  const analyzedLine = await line.map((loc, index) => {
    let distance = 0;
    if (index !== 0) {
      distance = calculateDistance(
        { lat: line[index - 1].latitude, lng: line[index - 1].longitude },
        { lat: line[index].latitude, lng: line[index].longitude }
      );
    }
    loc.distanceFromLast = distance;
    return loc;
  });
  // Calculate distance from start
  let distanceCounter = 0;
  for (let i = 0; i < analyzedLine.length; i++) {
    distanceCounter += analyzedLine[i].distanceFromLast;
    analyzedLine[i].distanceFromStart = distanceCounter;
  }

  return analyzedLine;
};

// Verify token
router.use('/', async (req, res, next) => {
  try {
    await jwt.verify(req.query.token, keys.token.secret);
  } catch (e) {
    return res.status(401).json({
      title: 'Not Authenticated',
      message: "Token couldn't be identified",
    });
  }
  next();
});

router.post('/', async (req, res, next) => {
  let line: ILocation[] = req.body;
  const locationsToAnalyse = await line.map((location: ILocation) => {
    return {
      lat: location.latitude,
      lng: location.longitude,
    };
  });
  googleMapsClient.elevation(
    {
      locations: locationsToAnalyse,
    },
    async (err, response) => {
      if (err) {
        return res.status(400).json({
          title: 'Bad request',
          message: 'Invalid request body',
        });
      } else {
        line = await line.map((loc, index) => {
          loc.elevation = response.json.results[index].elevation;
          return loc;
        });
        line = await calculateLineDistances(line);
        return res.status(200).json({
          message: 'Line analyzed',
          obj: line,
        });
      }
    }
  );
});

module.exports = router;
