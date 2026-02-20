import { ObjectId } from 'mongodb';
import { getDb } from '../../db';
import { IPost } from '../types/documents';

const COLLECTION = 'posts';

export async function findById(id: ObjectId): Promise<IPost | null> {
  return getDb().collection<IPost>(COLLECTION).findOne({ _id: id });
}

export async function findByIds(ids: ObjectId[]): Promise<IPost[]> {
  if (ids.length === 0) return [];
  const posts = await getDb()
    .collection<IPost>(COLLECTION)
    .find({ _id: { $in: ids } })
    .sort({ timestamp: -1 })
    .toArray();
  return posts;
}

export async function createPost(data: Omit<IPost, '_id'>): Promise<IPost> {
  const result = await getDb().collection<IPost>(COLLECTION).insertOne(data as any);
  return { ...data, _id: result.insertedId };
}

export async function updatePost(id: ObjectId, update: Partial<IPost>): Promise<IPost | null> {
  const result = await getDb()
    .collection<IPost>(COLLECTION)
    .findOneAndUpdate({ _id: id }, { $set: update }, { returnDocument: 'after' });
  return result;
}

export async function deletePost(id: ObjectId): Promise<void> {
  await getDb().collection(COLLECTION).deleteOne({ _id: id });
}
