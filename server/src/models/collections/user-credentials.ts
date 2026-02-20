import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcryptjs';
import { getDb } from '../../db';
import { IUserCredentials } from '../types/documents';

const SALT_WORK_FACTOR = 7;
const COLLECTION = 'usercredentials';

export async function findOne(query: { username?: string; email?: string }): Promise<IUserCredentials | null> {
  const doc = await getDb().collection<IUserCredentials>(COLLECTION).findOne(query);
  return doc;
}

export async function findById(id: ObjectId): Promise<IUserCredentials | null> {
  return findOne({ _id: id } as any);
}

export async function createCredentials(data: {
  email: string;
  username: string;
  password: string;
}): Promise<IUserCredentials> {
  const existing = await getDb()
    .collection<IUserCredentials>(COLLECTION)
    .findOne({ $or: [{ email: data.email }, { username: data.username }] });
  if (existing) {
    const err: any = new Error('UserCredentials validation failed');
    err.name = 'ValidationError';
    err.errors = {};
    if (existing.email === data.email) {
      err.errors.email = { kind: 'unique', message: `Error, expected \`email\` to be unique. Value: \`${data.email}\`` };
    }
    if (existing.username === data.username) {
      err.errors.username = {
        kind: 'unique',
        message: `Error, expected \`username\` to be unique. Value: \`${data.username}\``,
      };
    }
    throw err;
  }
  const hash = await bcrypt.hash(data.password, SALT_WORK_FACTOR);
  const doc: IUserCredentials = {
    email: data.email,
    username: data.username,
    password: hash,
  };
  const result = await getDb().collection<IUserCredentials>(COLLECTION).insertOne(doc);
  doc._id = result.insertedId;
  return doc;
}

export async function validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
