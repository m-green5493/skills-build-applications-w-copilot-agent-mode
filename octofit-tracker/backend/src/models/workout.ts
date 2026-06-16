import mongoose, { Document } from 'mongoose';

export interface IWorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  type: 'strength' | 'cardio' | 'mobility' | 'core';
}

export interface IWorkout extends Document {
  name: string;
  focus: string;
  difficulty: 'easy' | 'medium' | 'hard';
  durationMinutes: number;
  exercises: IWorkoutExercise[];
  recommendedFor: string[];
  createdAt: Date;
}

const workoutSchema = new mongoose.Schema<IWorkout>({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
  durationMinutes: { type: Number, required: true },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: String, required: true },
      type: { type: String, required: true, enum: ['strength', 'cardio', 'mobility', 'core'] }
    }
  ],
  recommendedFor: [{ type: String }],
  createdAt: { type: Date, default: () => new Date() }
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
