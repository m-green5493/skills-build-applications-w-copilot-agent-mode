import express, { Request, Response } from 'express';
import { connectDatabase } from './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const host = codespaceName ? '0.0.0.0' : 'localhost';
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for local development and Codespaces
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

if (codespaceName) {
  allowedOrigins.push(`https://${codespaceName}-5173.app.github.dev`);
}

app.use((req, res, next) => {
  const origin = req.get('origin');
  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.app.github.dev'))) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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

connectDatabase()
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
