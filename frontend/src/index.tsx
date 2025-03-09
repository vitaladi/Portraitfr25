import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ Gestion des erreurs globales pour éviter un crash en production
window.addEventListener("error", (event) => {
  console.error("Erreur détectée :", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Rejection non gérée :", event.reason);
});
