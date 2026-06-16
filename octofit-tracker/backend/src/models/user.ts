import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
  team?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['athlete', 'coach', 'admin'] },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  createdAt: { type: Date, default: () => new Date() }
});

export const User = mongoose.model<IUser>('User', userSchema);
