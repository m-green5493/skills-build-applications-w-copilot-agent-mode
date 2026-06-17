import { useState, useEffect } from 'react';
import { getApiUrl, parseResponse } from '../utils/api';

interface Workout {
  _id: string;
  userId: string;
  type: string;
  intensity: string;
  duration: number;
  date: string;
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const url = getApiUrl('/workouts');
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        const parsedWorkouts = parseResponse<Workout>(data);
        setWorkouts(parsedWorkouts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch workouts');
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <h1>Workouts</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <h1>Workouts</h1>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1>Workouts</h1>
      {workouts.length === 0 ? (
        <div className="alert alert-info">No workouts found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>User ID</th>
                <th>Type</th>
                <th>Intensity</th>
                <th>Duration (min)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id}>
                  <td>{workout.userId}</td>
                  <td>{workout.type}</td>
                  <td>
                    <span className={`badge bg-${
                      workout.intensity === 'high' ? 'danger' :
                      workout.intensity === 'medium' ? 'warning' :
                      'success'
                    }`}>
                      {workout.intensity}
                    </span>
                  </td>
                  <td>{workout.duration}</td>
                  <td>{new Date(workout.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
