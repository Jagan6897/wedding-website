import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { fetchConfig } from './config';

// Render immediately with default config, then update in background
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Fetch dynamic config in background (non-blocking)
fetchConfig().catch(() => {
  console.warn('Using static defaults — API unavailable');
});
