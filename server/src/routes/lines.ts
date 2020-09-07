import * as express from 'express';
import UserProfile, { IUserProfile } from '../models/schemas/user-profile';
import Location from '../models/schemas/location';
import { ILocation } from '../models/schemas/location';
import Line, { ILine } from '../models/schemas/line';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

router.get('/get/:id', async (req, res, next) => {
  let line: ILine;
  try {
    // TODO Move to function
    line = await Line.findById(req.params.id);
    line.locations = await Location.find({ _id: { $in: line.locations } });
    line = line.toObject(); // To make the line mutable
    line.startLocation = line.locations[0];
    line.endLocation = line.locations[line.locations.length - 1];
  } catch (e) {
    return res.status(404);
  }
  return res.status(200).json(line);
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
      console.log(transformedLines);
      lines = transformedLines;
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the line',
    });
  }
  return res.status(201).json(lines);
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
      const slope = tempLoc.elevation / tempLoc.distanceFromLast;
      if (slope > highestSlope) {
        highestSlope = slope;
      }
      tempLoc = await tempLoc.save();
      return tempLoc;
    });
    await Promise.all(promises).then((list) => (locationList = list));
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the locations',
    });
  }
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
