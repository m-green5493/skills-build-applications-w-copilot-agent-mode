import mongoose, { Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  category: 'cardio' | 'strength' | 'recovery' | 'mobility';
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
}

const activitySchema = new mongoose.Schema<IActivity>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  category: { type: String, required: true, enum: ['cardio', 'strength', 'recovery', 'mobility'] },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
