import * as express from 'express';
import UserProfile, { IUserProfile } from '../models/schemas/user-profile';
import Location from '../models/schemas/location';
import { ILocation } from '../models/schemas/location';
import Line, { ILine } from '../models/schemas/line';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

interface ILineSegmentPayload {
  type: string;
  locations: ILocation[];
}

const ALLOWED_SEGMENT_TYPES = ['FREERIDE', 'SKINNING', 'BOOT_SECTION'];

const flattenLineLocations = (segments: any[]): any[] => {
  if (!Array.isArray(segments)) {
    return [];
  }
  return segments.reduce((acc: any[], segment: any) => {
    if (Array.isArray(segment?.locations)) {
      return acc.concat(segment.locations);
    }
    return acc;
  }, []);
};

const hydrateLineSegments = async (line: ILine): Promise<any> => {
  const rawSegments = Array.isArray((line as any)?.segments) ? ((line as any).segments as any[]) : [];
  const locationIds = flattenLineLocations(rawSegments).map((loc: any) => String(loc));
  const locations = await Location.find({ _id: { $in: locationIds } });
  const locationMap = new Map<string, any>();
  for (const location of locations) {
    locationMap.set(String(location._id), location);
  }
  const segments = rawSegments.map((segment) => ({
    type: segment.type,
    locations: (Array.isArray(segment.locations) ? segment.locations : [])
      .map((locationId: any) => locationMap.get(String(locationId)))
      .filter((location: any) => !!location),
  }));

  const result = line.toObject() as any;
  result.segments = segments;
  const flattenedLocations = flattenLineLocations(segments);
  result.startLocation = flattenedLocations[0];
  result.endLocation = flattenedLocations[flattenedLocations.length - 1];
  return result;
};

router.get('/get/:id', async (req, res, next) => {
  let line: ILine | null;
  try {
    line = await Line.findById(req.params.id);
    if (!line) return res.status(404).end();
    const result = await hydrateLineSegments(line);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).end();
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
    const transformedLines = await Promise.all(lines.map((line: ILine) => hydrateLineSegments(line)));
    lines = transformedLines as any;
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

  try {
    const lines = await Line.aggregate([
      {
        $project: {
          name: 1,
          sport: 1,
          username: 1,
          timestamp: 1,
          firstSegment: { $arrayElemAt: ['$segments', 0] },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          sport: 1,
          username: 1,
          timestamp: 1,
          firstLocationId: { $arrayElemAt: ['$firstSegment.locations', 0] },
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
      { $unwind: { path: '$startLocation', preserveNullAndEmptyArrays: false } },
      ...(hasBoundingBox
        ? [
            {
              $match: {
                'startLocation.latitude': { $gte: south, $lte: north },
                'startLocation.longitude': { $gte: west, $lte: east },
              },
            },
          ]
        : []),
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
  let lineSegments = [];
  let highestElevation = 0;
  let highestSlope = 0;
  try {
    userProfile = await UserProfile.findById(decoded.id);
  } catch (e) {
    return res.status(404).end();
  }
  try {
    const payloadSegments = Array.isArray(req.body?.segments) ? (req.body.segments as ILineSegmentPayload[]) : [];
    let lineIndex = 0;
    const persistedSegments = await Promise.all(
      payloadSegments.map(async (segment: ILineSegmentPayload) => {
        if (!ALLOWED_SEGMENT_TYPES.includes(segment?.type)) {
          throw new Error('Invalid segment type');
        }
        const locations = Array.isArray(segment?.locations) ? segment.locations : [];
        const persistedLocations = await Promise.all(
          locations.map(async (loc: ILocation, locationIndex: number) => {
            let tempLoc = new Location({
              latitude: loc.latitude,
              longitude: loc.longitude,
              elevation: loc.elevation,
              lineIndex: lineIndex,
              distanceFromStart: (loc as any).distanceFromStart,
              distanceFromLast: (loc as any).distanceFromLast,
            });
            lineIndex += 1;
            if (tempLoc.elevation > highestElevation) {
              highestElevation = tempLoc.elevation;
            }
            if (locationIndex > 0 && tempLoc.distanceFromLast > 0) {
              const previousLoc = locations[locationIndex - 1] as any;
              const previousElevation = Number(previousLoc?.elevation);
              const slope = Math.abs(tempLoc.elevation - previousElevation) / tempLoc.distanceFromLast;
              if (slope > highestSlope) {
                highestSlope = slope;
              }
            }
            tempLoc = await tempLoc.save();
            return tempLoc;
          })
        );
        return {
          type: segment?.type,
          locations: persistedLocations,
        };
      })
    );
    lineSegments = persistedSegments;
    if (lineSegments.length === 0) {
      return res.status(400).json({
        title: 'Invalid line payload',
        message: 'Line must include at least one segment',
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the locations',
    });
  }
  console.log('segments saved', lineSegments.length);
  let line = new Line({
    segments: lineSegments,
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
    return res.status(404).end();
  }
  const lineFromProfile = userProfile.lines.indexOf(id) > -1;
  if (!lineFromProfile) {
    // not owned by requester
    return res.status(403).end();
  }
  const newLine: ILine = req.body;
  // Only override allowed properties
  line.name = newLine.name;
  line.discipline = newLine.discipline;

  await line.save();
  return res.status(200).json(line);
});

module.exports = router;
