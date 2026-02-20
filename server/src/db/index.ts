import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/freeraida';
let client: MongoClient;
let db: Db;
let connectPromise: Promise<Db> | null = null;

export async function connectDb(): Promise<Db> {
  if (db) return db;
  if (!connectPromise) {
    connectPromise = (async () => {
      client = new MongoClient(mongoUri);
      await client.connect();
      db = client.db();
      await ensureIndexes(db);
      return db;
    })();
  }
  return connectPromise;
}

export function getDb(): Db {
  if (!db) throw new Error('Database not connected. Call connectDb() first.');
  return db;
}

async function ensureIndexes(database: Db): Promise<void> {
  const userCredentials = database.collection('usercredentials');
  await userCredentials.createIndex({ email: 1 }, { unique: true });
  await userCredentials.createIndex({ username: 1 }, { unique: true });

  const userProfiles = database.collection('userprofiles');
  await userProfiles.createIndex({ username: 1 }, { unique: true });
}
