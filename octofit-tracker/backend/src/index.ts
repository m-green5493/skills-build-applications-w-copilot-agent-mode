import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';
const codespaceName = process.env.CODESPACE_NAME;
const host = codespaceName ? '0.0.0.0' : 'localhost';
const apiUrl = codespaceName
  ? `https://${codespaceName}-${port}.githubpreview.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/api/config/', (_req: Request, res: Response) => {
  res.json({ apiUrl });
});

app.get('/api/users/', (_req: Request, res: Response) => {
  res.json([
    { id: 'u1', name: 'Alex Rivera', role: 'athlete' },
    { id: 'u2', name: 'Mia Chen', role: 'coach' }
  ]);
});

app.get('/api/teams/', (_req: Request, res: Response) => {
  res.json([
    { id: 't1', name: 'OctoFit Runners', members: 12 },
    { id: 't2', name: 'Health Hustle', members: 9 }
  ]);
});

app.get('/api/activities/', (_req: Request, res: Response) => {
  res.json([
    { id: 'a1', userId: 'u1', type: 'running', durationMinutes: 35 },
    { id: 'a2', userId: 'u2', type: 'strength', durationMinutes: 45 }
  ]);
});

app.get('/api/leaderboard/', (_req: Request, res: Response) => {
  res.json([
    { rank: 1, user: 'Mia Chen', score: 980 },
    { rank: 2, user: 'Alex Rivera', score: 870 }
  ]);
});

app.get('/api/workouts/', (_req: Request, res: Response) => {
  res.json([
    { id: 'w1', name: 'Cardio Blast', focus: 'endurance' },
    { id: 'w2', name: 'Strength Builder', focus: 'power' }
  ]);
});

mongoose.set('strictQuery', false);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, host, () => {
      console.log(`Backend running on ${apiUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
