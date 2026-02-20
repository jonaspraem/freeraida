import * as express from 'express';
import { ObjectId } from 'mongodb';
import * as userProfile from '../models/collections/user-profile';
import * as location from '../models/collections/location';
import * as line from '../models/collections/line';
import { ILine, ILocation } from '../models/types/documents';

const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

router.get('/get/:id', async (req, res) => {
  try {
    const lineDoc = await line.findById(new ObjectId(req.params.id));
    if (!lineDoc) return res.status(404).json({});

    const locationDocs = await location.findByIds(lineDoc.locations);
    const result: any = {
      ...lineDoc,
      locations: locationDocs,
      startLocation: locationDocs[0],
      endLocation: locationDocs[locationDocs.length - 1],
    };
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({});
  }
});

router.get('/user/:username', async (req, res) => {
  const userProfileDoc = await userProfile.findOne({ username: req.params.username });
  if (!userProfileDoc) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could not find the user profile',
    });
  }
  try {
    const lineIds = userProfileDoc.lines || [];
    const lines = await line.findByIds(lineIds);
    const linesWithLocations = await Promise.all(
      lines.map(async (l) => {
        const locs = await location.findByIds(l.locations);
        return { ...l, locations: locs };
      })
    );
    return res.status(200).json(linesWithLocations);
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error loading the lines',
    });
  }
});

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

router.post('/new/', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  const profile = decoded?.id ? await userProfile.findById(new ObjectId(decoded.id)) : null;

  if (!profile) return res.status(404).json({});

  let highestElevation = 0;
  let highestSlope = 0;
  const locationDataList: Omit<ILocation, '_id'>[] = [];

  try {
    for (let index = 0; index < req.body.locations.length; index++) {
      const loc: ILocation = req.body.locations[index];
      if (loc.elevation > highestElevation) highestElevation = loc.elevation;
      const slope = loc.elevation / (loc.distanceFromLast || 1);
      if (slope > highestSlope) highestSlope = slope;
      locationDataList.push({
        latitude: loc.latitude,
        longitude: loc.longitude,
        elevation: loc.elevation,
        lineIndex: index,
        distanceFromStart: loc.distanceFromStart,
        distanceFromLast: loc.distanceFromLast,
      });
    }
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error processing locations',
    });
  }

  let locationList: ILocation[];
  try {
    locationList = await location.createLocations(locationDataList);
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the locations',
    });
  }

  const lineData = {
    locations: locationList.map((l) => l._id!),
    name: req.body.name,
    username: profile.username,
    sport: req.body.sport,
    discipline: req.body.discipline,
    timestamp: new Date(),
    peak: highestElevation,
    slope: highestSlope,
  };

  try {
    const newLine = await line.createLine(lineData);
    await userProfile.pushToArray(profile._id!, 'lines', newLine._id!);
    return res.status(201).json({
      message: 'Line saved',
      obj: newLine,
    });
  } catch (e) {
    await location.deleteMany(locationList.map((l) => l._id!));
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the line',
    });
  }
});

router.patch('/:id', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  const profile = decoded?.id ? await userProfile.findById(new ObjectId(decoded.id)) : null;
  const lineDoc = await line.findById(new ObjectId(req.params.id));

  if (!profile || !lineDoc) return res.status(404).json({});

  const lineIds = (profile.lines || []).map((id) => (typeof id === 'string' ? id : id.toString()));
  const lineFromProfile = lineIds.indexOf(req.params.id) > -1;
  if (!lineFromProfile) return res.status(403).json({});

  const newLine: ILine = req.body;
  try {
    const updated = await line.updateLine(lineDoc._id!, {
      name: newLine.name,
      discipline: newLine.discipline,
    });
    return res.status(200).json(updated);
  } catch (e) {
    return res.status(500).json({});
  }
});

module.exports = router;
