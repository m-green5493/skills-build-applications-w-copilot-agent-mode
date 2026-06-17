import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Track workouts, teams, and performance across your squad.</p>
      <div className="mt-4">
        <Link to="/users" className="btn btn-primary me-2">Users</Link>
        <Link to="/activities" className="btn btn-primary me-2">Activities</Link>
        <Link to="/workouts" className="btn btn-primary me-2">Workouts</Link>
        <Link to="/teams" className="btn btn-primary me-2">Teams</Link>
        <Link to="/leaderboard" className="btn btn-primary">Leaderboard</Link>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="container py-5">
      <h1>About OctoFit</h1>
      <p>Modern fitness tracking with React 19, TypeScript, Vite, and MongoDB.</p>
      <p>This application demonstrates:</p>
      <ul>
        <li>React 19 with TypeScript</li>
        <li>Vite for fast development and builds</li>
        <li>react-router-dom for client-side routing</li>
        <li>Bootstrap for responsive UI</li>
        <li>Environment variables via Vite</li>
      </ul>
      <Link to="/" className="btn btn-secondary">Home</Link>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}
