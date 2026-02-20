import { ObjectId } from 'mongodb';
import { getDb } from '../../db';
import { ILine } from '../types/documents';

const COLLECTION = 'lines';

export async function findById(id: ObjectId): Promise<ILine | null> {
  return getDb().collection<ILine>(COLLECTION).findOne({ _id: id });
}

export async function findByIds(ids: ObjectId[]): Promise<ILine[]> {
  if (ids.length === 0) return [];
  return getDb()
    .collection<ILine>(COLLECTION)
    .find({ _id: { $in: ids } })
    .toArray();
}

export async function createLine(data: Omit<ILine, '_id'>): Promise<ILine> {
  const result = await getDb().collection<ILine>(COLLECTION).insertOne(data as any);
  return { ...data, _id: result.insertedId };
}

export async function updateLine(id: ObjectId, update: Partial<ILine>): Promise<ILine | null> {
  const result = await getDb()
    .collection<ILine>(COLLECTION)
    .findOneAndUpdate({ _id: id }, { $set: update }, { returnDocument: 'after' });
  return result.value;
}

export async function deleteLine(id: ObjectId): Promise<void> {
  await getDb().collection(COLLECTION).deleteOne({ _id: id });
}
