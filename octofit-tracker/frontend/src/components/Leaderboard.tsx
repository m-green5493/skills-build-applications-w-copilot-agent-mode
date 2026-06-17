import { useState, useEffect } from 'react';
import { getApiUrl, parseResponse } from '../utils/api';

interface LeaderboardEntry {
  _id: string;
  userId: string;
  userName: string;
  totalScore: number;
  workoutsCompleted: number;
  rank: number;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const url = getApiUrl('/leaderboard');
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        const parsedEntries = parseResponse<LeaderboardEntry>(data);
        setEntries(parsedEntries);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalEmoji = (rank: number): string => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏅';
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <h1>Leaderboard</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <h1>Leaderboard</h1>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1>🏆 Leaderboard</h1>
      {entries.length === 0 ? (
        <div className="alert alert-info">No leaderboard entries found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Workouts</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id} className={entry.rank <= 3 ? 'table-warning' : ''}>
                  <td>
                    <span className="me-2">{getMedalEmoji(entry.rank)}</span>
                    #{entry.rank}
                  </td>
                  <td>{entry.userName}</td>
                  <td>
                    <strong>{entry.totalScore}</strong>
                  </td>
                  <td>{entry.workoutsCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
