import { connectDatabase, disconnectDatabase } from '../database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  try {
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({})
    ]);

    const users = await User.create([
      {
        name: 'Alex Rivera',
        email: 'alex.rivera@octofit.com',
        role: 'athlete'
      },
      {
        name: 'Mia Chen',
        email: 'mia.chen@octofit.com',
        role: 'coach'
      },
      {
        name: 'Jordan Hayes',
        email: 'jordan.hayes@octofit.com',
        role: 'athlete'
      },
      {
        name: 'Priya Nair',
        email: 'priya.nair@octofit.com',
        role: 'athlete'
      }
    ]);

    const [alex, mia, jordan, priya] = users;

    const teams = await Team.create([
      {
        name: 'OctoFit Runners',
        description: 'Community of runners training for weekly distance goals.',
        members: [alex._id, jordan._id]
      },
      {
        name: 'Health Hustle',
        description: 'Strength and recovery team focused on balanced workouts.',
        members: [priya._id]
      }
    ]);

    alex.team = teams[0]._id;
    jordan.team = teams[0]._id;
    priya.team = teams[1]._id;
    await Promise.all([alex.save(), jordan.save(), priya.save()]);

    const activities = await Activity.create([
      {
        user: alex._id,
        type: 'Morning Run',
        category: 'cardio',
        durationMinutes: 38,
        distanceKm: 7.2,
        caloriesBurned: 520,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24),
        notes: 'Steady pace with negative splits.'
      },
      {
        user: jordan._id,
        type: 'Hill Intervals',
        category: 'cardio',
        durationMinutes: 45,
        distanceKm: 6.0,
        caloriesBurned: 610,
        date: new Date(Date.now() - 1000 * 60 * 60 * 48),
        notes: 'Strengthened legs and endurance.'
      },
      {
        user: priya._id,
        type: 'Full Body Strength',
        category: 'strength',
        durationMinutes: 52,
        caloriesBurned: 660,
        date: new Date(Date.now() - 1000 * 60 * 60 * 72),
        notes: 'Solid form on compound lifts.'
      },
      {
        user: mia._id,
        type: 'Recovery Yoga',
        category: 'mobility',
        durationMinutes: 30,
        caloriesBurned: 180,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        notes: 'Focused on breath and joint mobility.'
      }
    ]);

    const workouts = await Workout.create([
      {
        name: 'Cardio Blast',
        focus: 'endurance',
        difficulty: 'medium',
        durationMinutes: 35,
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: '10 min', type: 'cardio' },
          { name: 'Tempo run', sets: 1, reps: '20 min', type: 'cardio' },
          { name: 'Cool down walk', sets: 1, reps: '5 min', type: 'mobility' }
        ],
        recommendedFor: ['distance runners', 'fitness enthusiasts']
      },
      {
        name: 'Strength Builder',
        focus: 'power',
        difficulty: 'hard',
        durationMinutes: 50,
        exercises: [
          { name: 'Squat', sets: 4, reps: '8-10', type: 'strength' },
          { name: 'Deadlift', sets: 3, reps: '6-8', type: 'strength' },
          { name: 'Plank hold', sets: 3, reps: '60 sec', type: 'core' }
        ],
        recommendedFor: ['athletes', 'strength seekers']
      },
      {
        name: 'Recovery Flow',
        focus: 'mobility',
        difficulty: 'easy',
        durationMinutes: 25,
        exercises: [
          { name: 'Foam rolling', sets: 1, reps: '10 min', type: 'mobility' },
          { name: 'Yoga stretch', sets: 1, reps: '15 min', type: 'mobility' },
          { name: 'Breathing drills', sets: 1, reps: '5 min', type: 'mobility' }
        ],
        recommendedFor: ['all levels', 'recovery days']
      }
    ]);

    await LeaderboardEntry.create([
      { rank: 1, user: mia._id, score: 980, team: teams[0]._id },
      { rank: 2, user: alex._id, score: 870, team: teams[0]._id },
      { rank: 3, user: jordan._id, score: 820, team: teams[0]._id },
      { rank: 4, user: priya._id, score: 760, team: teams[1]._id }
    ]);

    console.log('Seed completed:');
    console.log(`  users: ${users.length}`);
    console.log(`  teams: ${teams.length}`);
    console.log(`  activities: ${activities.length}`);
    console.log(`  workouts: ${workouts.length}`);
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await disconnectDatabase();
  }
}

seedDatabase().catch((error) => {
  console.error('Seed script error:', error);
  process.exit(1);
});
