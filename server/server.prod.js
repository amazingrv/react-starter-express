import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import compression from 'compression';
import handlebars from 'handlebars';
import helmet from 'helmet';
import properties from './properties.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const port = process.env.PORT || '8080';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(DIST_DIR, 'public')));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 100,
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.get('*', (req, res, next) => {
  const buffer = fs.readFileSync(HTML_FILE);
  const template = handlebars.compile(buffer.toString('utf8'));
  console.log(template, properties);
  const htmlString = template(properties);
  res.set('content-type', 'text/html');
  res.send(htmlString);
  res.end();
});

server.listen(port, () => {
  console.log(`App listening to ${port}....`);
  console.log('Press Ctrl+C to quit.');
});
