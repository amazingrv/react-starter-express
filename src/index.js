import './styles.css';

import 'core-js/stable';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const mountNode = document.querySelector('#app');
const root = createRoot(mountNode);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading ...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
