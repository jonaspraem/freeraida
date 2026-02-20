import { ObjectId } from 'mongodb';
import { getDb } from '../../db';
import { ILocation } from '../types/documents';

const COLLECTION = 'locations';

export async function findById(id: ObjectId): Promise<ILocation | null> {
  return getDb().collection<ILocation>(COLLECTION).findOne({ _id: id });
}

export async function findByIds(ids: ObjectId[]): Promise<ILocation[]> {
  if (ids.length === 0) return [];
  return getDb()
    .collection<ILocation>(COLLECTION)
    .find({ _id: { $in: ids } })
    .toArray();
}

export async function createLocation(data: Omit<ILocation, '_id'>): Promise<ILocation> {
  const result = await getDb().collection<ILocation>(COLLECTION).insertOne(data as any);
  return { ...data, _id: result.insertedId };
}

export async function createLocations(data: Omit<ILocation, '_id'>[]): Promise<ILocation[]> {
  if (data.length === 0) return [];
  const result = await getDb().collection<ILocation>(COLLECTION).insertMany(data as any);
  return data.map((d, i) => ({ ...d, _id: result.insertedIds[i] }));
}

export async function deleteMany(ids: ObjectId[]): Promise<void> {
  if (ids.length > 0) {
    await getDb().collection(COLLECTION).deleteMany({ _id: { $in: ids } });
  }
}
