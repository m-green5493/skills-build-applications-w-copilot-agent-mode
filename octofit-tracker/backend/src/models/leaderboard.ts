import mongoose, { Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  user: mongoose.Types.ObjectId;
  score: number;
  team?: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const leaderboardSchema = new mongoose.Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  updatedAt: { type: Date, default: () => new Date() }
});

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
