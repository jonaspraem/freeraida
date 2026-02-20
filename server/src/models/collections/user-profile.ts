import { ObjectId } from 'mongodb';
import { getDb } from '../../db';
import { IUserProfile } from '../types/documents';

const COLLECTION = 'userprofiles';

export async function findOne(query: { username?: string }): Promise<IUserProfile | null> {
  return getDb().collection<IUserProfile>(COLLECTION).findOne(query);
}

export async function findById(id: ObjectId): Promise<IUserProfile | null> {
  return getDb().collection<IUserProfile>(COLLECTION).findOne({ _id: id });
}

export async function createProfile(data: Omit<IUserProfile, '_id'>): Promise<IUserProfile> {
  const existing = await findOne({ username: data.username.toLowerCase() });
  if (existing) {
    const err: any = new Error('UserProfile validation failed');
    err.name = 'ValidationError';
    err.errors = { username: { kind: 'unique' } };
    throw err;
  }
  const doc: IUserProfile = {
    ...data,
    username: data.username.toLowerCase(),
    posts: data.posts ?? [],
    lines: data.lines ?? [],
    tracked_lines: data.tracked_lines ?? [],
    following: data.following ?? [],
    followers: data.followers ?? [],
  };
  const result = await getDb().collection<IUserProfile>(COLLECTION).insertOne(doc as any);
  doc._id = result.insertedId;
  return doc;
}

export async function updateProfile(id: ObjectId, update: Partial<IUserProfile>): Promise<IUserProfile | null> {
  const result = await getDb()
    .collection<IUserProfile>(COLLECTION)
    .findOneAndUpdate({ _id: id }, { $set: update }, { returnDocument: 'after' });
  return result.value;
}

export async function pushToArray(
  id: ObjectId,
  field: 'posts' | 'lines' | 'following' | 'followers',
  value: ObjectId | string
): Promise<void> {
  await getDb().collection(COLLECTION).updateOne({ _id: id }, { $push: { [field]: value } } as any);
}

export async function pullFromArray(
  id: ObjectId,
  field: 'posts' | 'lines' | 'following' | 'followers',
  value: ObjectId | string
): Promise<void> {
  await getDb().collection(COLLECTION).updateOne({ _id: id }, { $pull: { [field]: value } } as any);
}

export async function updateArrays(
  id: ObjectId,
  updates: { following?: string[]; followers?: string[] }
): Promise<void> {
  const $set: any = {};
  if (updates.following !== undefined) $set.following = updates.following;
  if (updates.followers !== undefined) $set.followers = updates.followers;
  if (Object.keys($set).length > 0) {
    await getDb().collection(COLLECTION).updateOne({ _id: id }, { $set });
  }
}
