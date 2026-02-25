import * as express from 'express';
import UserProfile, { IUserProfile } from '../models/schemas/user-profile';
import Location from '../models/schemas/location';
import { ILocation } from '../models/schemas/location';
import Line, { ILine } from '../models/schemas/line';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

router.get('/get/:id', async (req, res, next) => {
  let line: ILine | null;
  try {
    // TODO Move to function
    line = await Line.findById(req.params.id);
    if (!line) return res.status(404);
    line.locations = (await Location.find({ _id: { $in: line.locations } })) as any;
    const result = line.toObject() as any; // To make the line mutable
    result.startLocation = result.locations[0];
    result.endLocation = result.locations[result.locations.length - 1];
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404);
  }
});

router.get('/user/:username', async (req, res, next) => {
  let userProfile: IUserProfile;
  let lines: ILine[];
  try {
    userProfile = await UserProfile.findOne({ username: req.params.username });
  } catch (e) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could find the user profile',
    });
  }
  try {
    lines = await Line.find({ _id: { $in: userProfile.lines } });
    const promises = await lines.map(async (line: ILine) => {
      line.locations = await Location.find({ _id: { $in: line.locations } });
      return line;
    });
    await Promise.all(promises).then((transformedLines) => {
      lines = transformedLines;
    });
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the line',
    });
  }
  return res.status(201).json(lines);
});

router.get('/explore', async (req, res, next) => {
  const parseInteger = (value: any, fallback: number, min: number, max: number): number => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      return fallback;
    }
    return Math.min(Math.max(parsed, min), max);
  };
  const parseFloatOrUndefined = (value: any): number | undefined => {
    const parsed = Number(value);
    return isNaN(parsed) ? undefined : parsed;
  };

  const limit = parseInteger(req.query.limit, 500, 1, 2000);
  const offset = parseInteger(req.query.offset, 0, 0, 1000000);
  const north = parseFloatOrUndefined(req.query.north);
  const south = parseFloatOrUndefined(req.query.south);
  const east = parseFloatOrUndefined(req.query.east);
  const west = parseFloatOrUndefined(req.query.west);

  const hasBoundingBox = [north, south, east, west].every((value) => typeof value === 'number');
  const boundingBoxFilter = hasBoundingBox
    ? {
        'startLocation.latitude': { $gte: south, $lte: north },
        'startLocation.longitude': { $gte: west, $lte: east },
      }
    : {};

  try {
    const lines = await Line.aggregate([
      {
        $project: {
          name: 1,
          sport: 1,
          username: 1,
          timestamp: 1,
          firstLocationId: { $arrayElemAt: ['$locations', 0] },
        },
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'firstLocationId',
          foreignField: '_id',
          as: 'startLocation',
        },
      },
      { $unwind: '$startLocation' },
      { $match: boundingBoxFilter },
      { $sort: { timestamp: -1, _id: -1 } },
      { $skip: offset },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          sport: 1,
          username: 1,
          timestamp: 1,
          startLocation: {
            latitude: '$startLocation.latitude',
            longitude: '$startLocation.longitude',
            elevation: '$startLocation.elevation',
          },
        },
      },
    ]);

    return res.status(200).json(lines);
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error fetching explore lines',
    });
  }
});

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

router.post('/new/', async (req, res, next) => {
  console.log('new line request', req.body);
  const decoded = jwt.decode(req.query.token);
  let userProfile;
  let locationList = [];
  let highestElevation = 0;
  let highestSlope = 0;
  try {
    userProfile = await UserProfile.findById(decoded.id);
  } catch (e) {
    return res.status(404);
  }
  try {
    const promises = await req.body.locations.map(async (loc: ILocation, index: number) => {
      let tempLoc = new Location({
        latitude: loc.latitude,
        longitude: loc.longitude,
        elevation: loc.elevation,
        lineIndex: index,
        distanceFromStart: loc.distanceFromStart,
        distanceFromLast: loc.distanceFromLast,
      });
      if (tempLoc.elevation > highestElevation) {
        highestElevation = tempLoc.elevation;
      }
      if (tempLoc.distanceFromLast > 0) {
        const slope = tempLoc.elevation / tempLoc.distanceFromLast;
        if (slope > highestSlope) {
          highestSlope = slope;
        }
      }
      tempLoc = await tempLoc.save();
      return tempLoc;
    });
    await Promise.all(promises).then((list) => (locationList = list));
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the locations',
    });
  }
  console.log('locations saved', locationList);
  let line = new Line({
    locations: locationList,
    name: req.body.name,
    username: userProfile.username,
    sport: req.body.sport,
    discipline: req.body.discipline,
    timestamp: new Date(),
    peak: highestElevation,
    slope: highestSlope,
  });
  try {
    line = await line.save();
    userProfile.lines.push(line); // TODO Hook post save
    await userProfile.save();
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the line',
    });
  }
  return res.status(201).json({
    message: 'Line saved',
    obj: line,
  });
});

router.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  let line: ILine;
  const decoded = jwt.decode(req.query.token);
  let userProfile;
  try {
    userProfile = await UserProfile.findById(decoded.id);
    line = await Line.findById(id);
  } catch (e) {
    return res.status(404);
  }
  const lineFromProfile = userProfile.lines.indexOf(id) > -1;
  if (!lineFromProfile) {
    // not owned by requester
    return res.status(403);
  }
  const newLine: ILine = req.body;
  // Only override allowed properties
  line.name = newLine.name;
  line.discipline = newLine.discipline;

  await line.save();
  return res.status(200).json(line);
});

module.exports = router;
