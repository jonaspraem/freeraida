/****
 *          Geometric math functions
 */

import { ICoordinate } from '../models/types/coordinate';

/**
 * Math rad function
 */
const rad = (deg) => {
  return (deg * Math.PI) / 180;
};

/**
 * Returning distance in km
 * using the haversine formula
 */
export const calculateDistanceBetween = (p1: ICoordinate, p2: ICoordinate): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = rad(p2.latitude - p1.latitude);
  const dLon = rad(p2.longitude - p1.longitude);
  const lat1 = rad(p1.latitude);
  const lat2 = rad(p2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
