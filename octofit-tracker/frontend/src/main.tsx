import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

/**
 * OctoFit Tracker - React 19 Frontend
 *
 * Configuration:
 * - Define `VITE_CODESPACE_NAME` in `.env.local` when running in Codespaces.
 *   Example: VITE_CODESPACE_NAME=your-codespace-name
 * - If `VITE_CODESPACE_NAME` is unset the app will fall back to
 *   `http://localhost:8000` to avoid constructing malformed URLs.
 * - See `.env.local.example` at the project root for a quick template.
 */

if (!import.meta.env.VITE_CODESPACE_NAME) {
  // Helpful console hint during development
  // eslint-disable-next-line no-console
  console.info('VITE_CODESPACE_NAME is not set; using local API fallback (http://localhost:8000)');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
