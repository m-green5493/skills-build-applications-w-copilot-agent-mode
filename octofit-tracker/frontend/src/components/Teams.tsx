import { useState, useEffect } from 'react';
import { getApiUrl, parseResponse } from '../utils/api';

interface Team {
  _id: string;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const url = getApiUrl('/teams');
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        const parsedTeams = parseResponse<Team>(data);
        setTeams(parsedTeams);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch teams');
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <h1>Teams</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <h1>Teams</h1>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1>Teams</h1>
      {teams.length === 0 ? (
        <div className="alert alert-info">No teams found</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Members: {team.memberCount}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Created: {new Date(team.createdAt).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
