import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

/**
 * OctoFit Tracker - React 19 Frontend
 * 
 * Configuration:
 * - Environment variables: Define VITE_CODESPACE_NAME in .env.local
 * - See .env.local.example for setup instructions
 */

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
