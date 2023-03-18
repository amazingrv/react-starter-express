import './styles.css';

import 'core-js/stable';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const mountNode = document.querySelector('#root');
const root = createRoot(mountNode);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
