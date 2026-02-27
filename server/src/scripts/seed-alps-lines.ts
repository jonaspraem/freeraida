import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import Line from '../models/schemas/line';
import Location from '../models/schemas/location';
import UserProfile from '../models/schemas/user-profile';
import { ALPS_BBOX, fetchOverpassRoutes, ImportedRoute, RoutePoint } from './lib/route-import';

interface CliOptions {
  write: boolean;
  limit: number;
  maxPoints: number;
  minPoints: number;
  previewJson: boolean;
  previewLocations: number;
}

interface BuiltLocation {
  latitude: number;
  longitude: number;
  elevation: number;
  lineIndex: number;
  distanceFromStart: number;
  distanceFromLast: number;
}

async function run() {
  dotenv.config();
  const dns = require('node:dns');
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  const options = parseArgs(process.argv.slice(2));

  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    printHelp();
    return;
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/freeraida';
  const allowInvalidCerts = ['1', 'true', 'yes', 'on'].includes(
    (process.env.MONGODB_TLS_ALLOW_INVALID_CERTS || '').trim().toLowerCase()
  );
  const mongoUriWithTlsOption = allowInvalidCerts
    ? `${mongoUri}${mongoUri.includes('?') ? '&' : '?'}tlsAllowInvalidCertificates=true`
    : mongoUri;

  await mongoose.connect(mongoUriWithTlsOption, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);

  console.log(`[seed-alps-lines] mode=${options.write ? 'write' : 'dry-run'} limit=${options.limit}`);
  console.log(
    `[seed-alps-lines] bbox=south:${ALPS_BBOX.south},west:${ALPS_BBOX.west},north:${ALPS_BBOX.north},east:${ALPS_BBOX.east}`
  );

  const imported = await fetchOverpassRoutes(ALPS_BBOX, Math.max(options.limit * 5, 120));
  console.log(`[seed-alps-lines] fetched ${imported.length} candidate routes from Overpass`);

  const officialProfile = await upsertOfficialProfile(options.write);

  const shuffled = stableSortBySource(imported);
  const candidates = shuffled.slice(0, Math.max(options.limit * 3, options.limit));

  let created = 0;
  let skippedExisting = 0;
  let skippedInvalid = 0;
  let linked = 0;
  const rejected: string[] = [];

  for (const route of candidates) {
    if (created >= options.limit) break;
    const lineName = buildLineName(route);
    const sourceMarker = `[${route.sourceKey}]`;

    const exists = await Line.findOne({
      username: 'official',
      name: { $regex: escapeRegExp(sourceMarker) + '$', $options: 'i' },
    })
      .select('_id')
      .lean();
    if (exists) {
      skippedExisting += 1;
      continue;
    }

    const boundedPoints = capRoutePoints(route.points, options.maxPoints);
    if (boundedPoints.length < options.minPoints) {
      skippedInvalid += 1;
      rejected.push(`${route.sourceKey}: too few points (${boundedPoints.length})`);
      continue;
    }
    if (!allPointsInsideAlps(boundedPoints)) {
      skippedInvalid += 1;
      rejected.push(`${route.sourceKey}: points outside Alps bounding box`);
      continue;
    }

    const builtLocations = buildLocationsFromPoints(route.sourceId, route.discipline, boundedPoints);
    if (builtLocations.length < options.minPoints) {
      skippedInvalid += 1;
      rejected.push(`${route.sourceKey}: failed to build enough locations`);
      continue;
    }

    const peak = Math.max(...builtLocations.map((loc) => loc.elevation));
    const slope = maxSlope(builtLocations);
    const timestamp = seededTimestamp(route.sourceId);
    const linePayload = {
      name: lineName,
      username: 'official',
      sport: route.sport,
      discipline: route.discipline,
      timestamp,
      peak,
      slope,
      segments: [
        {
          type: 'FREERIDE',
          locations: builtLocations,
        },
      ],
    };

    if (options.previewJson) {
      printPreviewJson(route.sourceKey, linePayload, options.previewLocations);
    }

    if (!options.write) {
      created += 1;
      console.log(
        `[dry-run] ${lineName} | sport=${route.sport} discipline=${route.discipline} points=${builtLocations.length} peak=${peak}`
      );
      continue;
    }

    const persistedSegments = await Promise.all(
      linePayload.segments.map(async (segment) => {
        const persistedLocations = await Location.insertMany(segment.locations);
        return {
          type: segment.type,
          locations: persistedLocations.map((loc) => loc._id),
        };
      })
    );

    const line = await new Line({
      name: linePayload.name,
      username: linePayload.username,
      sport: linePayload.sport,
      discipline: linePayload.discipline,
      segments: persistedSegments,
      timestamp: linePayload.timestamp,
      peak: linePayload.peak,
      slope: linePayload.slope,
    }).save();

    const hasLine = officialProfile.lines.some((lineId) => String(lineId) === String(line._id));
    if (!hasLine) {
      officialProfile.lines.push(line._id as any);
      linked += 1;
    }
    created += 1;
  }

  if (options.write) {
    await officialProfile.save();
  }

  console.log('--- seed summary ---');
  console.log(`created=${created}`);
  console.log(`skippedExisting=${skippedExisting}`);
  console.log(`skippedInvalid=${skippedInvalid}`);
  console.log(`linkedToOfficial=${linked}`);
  if (rejected.length > 0) {
    console.log('rejectedSamples:');
    for (const item of rejected.slice(0, 10)) {
      console.log(`- ${item}`);
    }
  }
}

function parseArgs(args: string[]): CliOptions {
  const write = args.includes('--write');
  const previewJson = args.includes('--preview-json');
  const limitArg = args.find((arg) => arg.startsWith('--limit='));
  const maxPointsArg = args.find((arg) => arg.startsWith('--max-points='));
  const minPointsArg = args.find((arg) => arg.startsWith('--min-points='));
  const previewLocationsArg = args.find((arg) => arg.startsWith('--preview-locations='));
  const limit = clampInt(limitArg ? parseInt(limitArg.split('=')[1], 10) : 40, 1, 40);
  const maxPoints = clampInt(maxPointsArg ? parseInt(maxPointsArg.split('=')[1], 10) : 220, 30, 1000);
  const minPoints = clampInt(minPointsArg ? parseInt(minPointsArg.split('=')[1], 10) : 12, 2, 200);
  const previewLocations = clampInt(previewLocationsArg ? parseInt(previewLocationsArg.split('=')[1], 10) : 12, 1, 200);
  return { write, limit, maxPoints, minPoints, previewJson, previewLocations };
}

function printHelp() {
  console.log('Seed Alpine test routes from OSM Overpass.');
  console.log(
    'Usage: node ./server/dist/scripts/seed-alps-lines.js [--write] [--limit=40] [--max-points=220] [--preview-json]'
  );
  console.log('Defaults to dry-run. Add --write to persist data.');
  console.log('With --preview-json, dry-run prints model payloads including locations.');
}

async function upsertOfficialProfile(write: boolean) {
  let profile = await UserProfile.findOne({ username: 'official' });
  if (profile) return profile;

  profile = new UserProfile({
    username: 'official',
    firstname: 'Official',
    surname: 'Routes',
    fullname: 'Official Routes',
    country: 'Alps',
    bio: 'System-curated test lines from open route datasets.',
    lines: [],
    posts: [],
    tracked_lines: [],
    following: [],
    followers: [],
  });

  if (write) {
    await profile.save();
    console.log('[seed-alps-lines] created official profile');
  } else {
    console.log('[dry-run] would create official profile');
  }
  return profile;
}

function stableSortBySource(routes: ImportedRoute[]): ImportedRoute[] {
  return routes.slice().sort((a, b) => {
    if (a.routeTag !== b.routeTag) return a.routeTag.localeCompare(b.routeTag);
    return a.sourceId - b.sourceId;
  });
}

function buildLineName(route: ImportedRoute): string {
  return `${route.name} [${route.sourceKey}]`.slice(0, 150);
}

function capRoutePoints(points: RoutePoint[], maxPoints: number): RoutePoint[] {
  if (points.length <= maxPoints) return points;
  const reduced: RoutePoint[] = [];
  const step = (points.length - 1) / (maxPoints - 1);
  for (let i = 0; i < maxPoints; i++) {
    reduced.push(points[Math.round(i * step)]);
  }
  return reduced;
}

function allPointsInsideAlps(points: RoutePoint[]): boolean {
  return points.every(
    (point) =>
      point.latitude >= ALPS_BBOX.south &&
      point.latitude <= ALPS_BBOX.north &&
      point.longitude >= ALPS_BBOX.west &&
      point.longitude <= ALPS_BBOX.east
  );
}

function buildLocationsFromPoints(sourceId: number, discipline: string, points: RoutePoint[]): BuiltLocation[] {
  const centroid = getCentroid(points);
  const baseElevation = 700 + Math.round(seededUnit(sourceId) * 1200) + Math.round((centroid.latitude - 44) * 100);
  const gainFactor = discipline === 'Backcountry' ? 1300 : 800;
  const gain = 500 + Math.round(seededUnit(sourceId + 17) * gainFactor);

  let cumulativeDistance = 0;
  return points.map((point, index) => {
    const prevPoint = points[index - 1];
    const distanceFromLast = prevPoint ? haversineMeters(prevPoint, point) : 0;
    cumulativeDistance += distanceFromLast;

    const progress = points.length <= 1 ? 0 : index / (points.length - 1);
    const profile = Math.sin(progress * Math.PI);
    const wiggle = (seededUnit(sourceId + index * 7) - 0.5) * 120;
    const elevation = Math.round(clamp(baseElevation + gain * profile + wiggle, 350, 4600));

    return {
      latitude: point.latitude,
      longitude: point.longitude,
      elevation,
      lineIndex: index,
      distanceFromStart: Math.round(cumulativeDistance),
      distanceFromLast: Math.round(distanceFromLast),
    };
  });
}

function maxSlope(locations: BuiltLocation[]): number {
  let highestSlope = 0;
  for (let i = 1; i < locations.length; i++) {
    const previous = locations[i - 1];
    const current = locations[i];
    if (!current.distanceFromLast || current.distanceFromLast <= 0) continue;
    const rise = Math.abs(current.elevation - previous.elevation);
    const slope = rise / current.distanceFromLast;
    if (slope > highestSlope) highestSlope = slope;
  }
  return Number(highestSlope.toFixed(6));
}

function seededTimestamp(seed: number): Date {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const lookbackDays = 90 + Math.floor(seededUnit(seed + 111) * 640);
  return new Date(now - lookbackDays * dayMs);
}

function seededUnit(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function haversineMeters(a: RoutePoint, b: RoutePoint): number {
  const toRad = Math.PI / 180;
  const dLat = (b.latitude - a.latitude) * toRad;
  const dLon = (b.longitude - a.longitude) * toRad;
  const lat1 = a.latitude * toRad;
  const lat2 = b.latitude * toRad;
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  return 6371000 * (2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}

function getCentroid(points: RoutePoint[]): RoutePoint {
  if (points.length === 0) {
    return { latitude: 46.8, longitude: 10.5 };
  }
  const sum = points.reduce(
    (acc, point) => {
      acc.latitude += point.latitude;
      acc.longitude += point.longitude;
      return acc;
    },
    { latitude: 0, longitude: 0 }
  );
  return {
    latitude: sum.latitude / points.length,
    longitude: sum.longitude / points.length,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function clampInt(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.round(clamp(value, min, max));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function printPreviewJson(
  sourceKey: string,
  payload: {
    name: string;
    username: string;
    sport: string;
    discipline: string;
    timestamp: Date;
    peak: number;
    slope: number;
    segments: {
      type: string;
      locations: BuiltLocation[];
    }[];
  },
  previewLocations: number
) {
  const allLocations = payload.segments.reduce((acc, segment) => acc.concat(segment.locations), [] as BuiltLocation[]);
  const total = allLocations.length;
  const head = allLocations.slice(0, previewLocations);
  const tail = total > previewLocations ? allLocations.slice(-Math.min(3, total - previewLocations)) : [];
  const preview = {
    sourceKey,
    line: {
      name: payload.name,
      username: payload.username,
      sport: payload.sport,
      discipline: payload.discipline,
      timestamp: payload.timestamp,
      peak: payload.peak,
      slope: payload.slope,
      locationCount: total,
      segmentCount: payload.segments.length,
    },
    locationsPreview: head,
    locationsTailPreview: tail,
  };
  console.log(`[preview-json] ${JSON.stringify(preview)}`);
}

run()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error('[seed-alps-lines] failed', err);
    await mongoose.disconnect();
    process.exit(1);
  });
