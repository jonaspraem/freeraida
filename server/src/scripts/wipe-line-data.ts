import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import Line from '../models/schemas/line';
import Location from '../models/schemas/location';
import UserProfile from '../models/schemas/user-profile';

async function run(): Promise<void> {
  dotenv.config();
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/freeraida';
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);

  const lineIds = (await Line.find({}).select('_id').lean()).map((line: any) => line._id);
  await Location.deleteMany({});
  await Line.deleteMany({});
  await UserProfile.updateMany({}, { $pull: { lines: { $in: lineIds } } });

  console.log(`[wipe-line-data] removed lines=${lineIds.length}`);
}

run()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('[wipe-line-data] failed', error);
    await mongoose.disconnect();
    process.exit(1);
  });
