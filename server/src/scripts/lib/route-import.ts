import * as https from 'https';

export interface AlpsBbox {
  south: number;
  west: number;
  north: number;
  east: number;
}

export interface RoutePoint {
  latitude: number;
  longitude: number;
}

interface OverpassRelationMember {
  type: string;
  role: string;
  geometry?: Array<{ lat: number; lon: number }>;
}

interface OverpassRelationElement {
  type: string;
  id: number;
  tags?: Record<string, string>;
  members?: OverpassRelationMember[];
}

interface OverpassResponse {
  elements: OverpassRelationElement[];
  remark?: string;
}

export interface ImportedRoute {
  sourceId: number;
  sourceKey: string;
  sourceType: string;
  routeTag: string;
  name: string;
  sport: string;
  discipline: string;
  points: RoutePoint[];
}

export const ALPS_BBOX: AlpsBbox = {
  south: 44.0,
  west: 5.0,
  north: 48.5,
  east: 15.8,
};

export function buildOverpassQuery(bbox: AlpsBbox): string {
  const bboxTuple = `${bbox.south},${bbox.west},${bbox.north},${bbox.east}`;
  return `[out:json][timeout:40];
(
  relation["type"="route"]["route"="hiking"](${bboxTuple});
  relation["type"="route"]["route"="foot"](${bboxTuple});
);
out body geom;`;
}

function buildOverpassSkiQuery(bbox: AlpsBbox): string {
  const bboxTuple = `${bbox.south},${bbox.west},${bbox.north},${bbox.east}`;
  return `[out:json][timeout:40];
(
  relation["type"="route"]["route"="ski"](${bboxTuple});
  relation["type"="route"]["route"="piste"](${bboxTuple});
  relation["type"="route"]["piste:type"](${bboxTuple});
);
out body geom;`;
}

export async function fetchOverpassRoutes(bbox: AlpsBbox, targetCount: number = 160): Promise<ImportedRoute[]> {
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'http://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'http://overpass.kumi.systems/api/interpreter',
  ];
  const tiles = tileBBox(bbox, 5, 6);
  const queryBuilders = [buildOverpassQuery, buildOverpassSkiQuery];
  const allRoutes: ImportedRoute[] = [];
  for (const tile of tiles) {
    for (const buildQuery of queryBuilders) {
      const query = buildQuery(tile);
      let tilePayload: OverpassResponse | null = null;
      let lastError: Error | null = null;
      for (const endpoint of endpoints) {
        try {
          tilePayload = await overpassRequest(endpoint, query, 25000);
          if (tilePayload.remark) {
            throw new Error(`Overpass remark from ${endpoint}: ${tilePayload.remark}`);
          }
          break;
        } catch (err) {
          lastError = err as Error;
        }
      }
      if (!tilePayload) {
        continue;
      }
      allRoutes.push(...normalizeOverpassRoutes(tilePayload.elements || []));
      const dedupedCount = dedupeRoutesBySource(allRoutes).length;
      if (dedupedCount >= targetCount) {
        return dedupeRoutesBySource(allRoutes);
      }
    }
  }
  return dedupeRoutesBySource(allRoutes);
}

function overpassRequest(endpoint: string, query: string, timeoutMs: number): Promise<OverpassResponse> {
  return new Promise((resolve, reject) => {
    const encoded = `data=${encodeURIComponent(query)}`;
    const req = https.request(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(encoded),
        'User-Agent': 'freeraida-seed-script/1.0',
      },
    });

    req.on('response', (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (!res.statusCode || res.statusCode < 200 || res.statusCode > 299) {
          reject(new Error(`Overpass request failed (${res.statusCode || 0}): ${data.slice(0, 300)}`));
          return;
        }
        try {
          resolve(JSON.parse(data) as OverpassResponse);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error(`Overpass request timeout after ${timeoutMs}ms`));
    });
    req.write(encoded);
    req.end();
  });
}

function normalizeOverpassRoutes(elements: OverpassRelationElement[]): ImportedRoute[] {
  const routes: ImportedRoute[] = [];
  for (const element of elements) {
    if (element.type !== 'relation') continue;
    const tags = element.tags || {};
    const routeTag = (tags.route || '').toLowerCase();
    const mapping = mapRouteTag(routeTag, tags);
    if (!mapping) continue;
    const points = collectRelationPoints(element);
    if (points.length < 2) continue;

    const rawName = tags.name || tags.ref || `Route ${element.id}`;
    routes.push({
      sourceId: element.id,
      sourceKey: `osm:${element.id}`,
      sourceType: 'osm-overpass',
      routeTag,
      name: sanitizeName(rawName),
      sport: mapping.sport,
      discipline: mapping.discipline,
      points,
    });
  }
  return routes;
}

function collectRelationPoints(element: OverpassRelationElement): RoutePoint[] {
  const points: RoutePoint[] = [];
  const members = element.members || [];
  for (const member of members) {
    if (member.type !== 'way' || !member.geometry || member.geometry.length === 0) continue;
    for (const coordinate of member.geometry) {
      const latitude = Number(coordinate.lat);
      const longitude = Number(coordinate.lon);
      if (Number.isNaN(latitude) || Number.isNaN(longitude)) continue;
      points.push({ latitude, longitude });
    }
  }
  return dedupeConsecutivePoints(points);
}

function dedupeConsecutivePoints(points: RoutePoint[]): RoutePoint[] {
  const normalized: RoutePoint[] = [];
  for (const point of points) {
    const prev = normalized[normalized.length - 1];
    if (!prev || prev.latitude !== point.latitude || prev.longitude !== point.longitude) {
      normalized.push(point);
    }
  }
  return normalized;
}

function mapRouteTag(
  routeTag: string,
  tags: Record<string, string>
): { sport: string; discipline: string } | undefined {
  if (routeTag === 'hiking' || routeTag === 'foot') {
    if ((tags.name || '').toLowerCase().includes('via ferrata')) {
      return { sport: 'Mountaineering', discipline: 'Trip' };
    }
    return { sport: 'Hiking', discipline: 'Trip' };
  }
  if (routeTag === 'ski_tour') {
    return { sport: 'Skiing', discipline: 'Backcountry' };
  }
  if (routeTag === 'ski') {
    return { sport: 'Skiing', discipline: 'Trip' };
  }
  if (routeTag === 'piste') {
    return { sport: 'Skiing', discipline: 'Trip' };
  }
  if (tags['piste:type']) {
    return { sport: 'Skiing', discipline: 'Trip' };
  }
  return undefined;
}

function sanitizeName(input: string): string {
  return input.replace(/\s+/g, ' ').trim().slice(0, 120);
}

function dedupeRoutesBySource(routes: ImportedRoute[]): ImportedRoute[] {
  const seen = new Set<string>();
  const deduped: ImportedRoute[] = [];
  for (const route of routes) {
    if (seen.has(route.sourceKey)) continue;
    seen.add(route.sourceKey);
    deduped.push(route);
  }
  return deduped;
}

function tileBBox(bbox: AlpsBbox, rows: number, cols: number): AlpsBbox[] {
  const tiles: AlpsBbox[] = [];
  const latSpan = (bbox.north - bbox.south) / rows;
  const lonSpan = (bbox.east - bbox.west) / cols;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const south = bbox.south + row * latSpan;
      const north = row === rows - 1 ? bbox.north : south + latSpan;
      const west = bbox.west + col * lonSpan;
      const east = col === cols - 1 ? bbox.east : west + lonSpan;
      tiles.push({ south, west, north, east });
    }
  }
  return tiles;
}
