import { createRoot } from 'react-dom/client';
import App from './app/App';
import './index.css';

const mountNode = document.querySelector('#root');
const root = createRoot(mountNode);

root.render(<App />);
