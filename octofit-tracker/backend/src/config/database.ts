import mongoose from 'mongoose';

// Database helper for octofit_db using Mongoose
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

mongoose.set('strictQuery', false);

export async function connectDatabase() {
  return mongoose.connect(mongoUri);
}

export async function disconnectDatabase() {
  return mongoose.disconnect();
}

export const DATABASE_URI = mongoUri;
