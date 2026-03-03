import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import './styles/responsive.css';

/**
 * MAYAVERSE - Main Entry Point
 * 
 * This is where the React application starts.
 * It renders the root App component into the DOM.
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);