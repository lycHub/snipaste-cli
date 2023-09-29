import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

const container = document.getElementById('host');
if (container) {
  ReactDOM.createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}