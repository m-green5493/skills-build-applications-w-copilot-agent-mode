import express, { Request, Response } from 'express';
import { connectDatabase } from './database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = 8000;
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

app.get('/api/users/', async (_req: Request, res: Response) => {
  const users = await User.find().select('name email role team createdAt').populate('team', 'name');
  res.json(users);
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members', 'name email role');
  res.json(teams);
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user', 'name email role');
  res.json(activities);
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find()
    .sort({ rank: 1 })
    .populate('user', 'name')
    .populate('team', 'name');
  res.json(leaderboard);
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json(workouts);
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
