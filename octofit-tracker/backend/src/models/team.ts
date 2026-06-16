import mongoose, { Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new mongoose.Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
