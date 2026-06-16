import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p>Track workouts, teams, and performance across your squad.</p>
      <Link to="/about" className="btn btn-primary">About</Link>
    </div>
  );
}

function About() {
  return (
    <div className="container py-5">
      <h1>About OctoFit</h1>
      <p>Modern fitness tracking with React, TypeScript, and MongoDB.</p>
      <Link to="/" className="btn btn-secondary">Home</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
