const path = require('path');
const http = require('http');
const express = require('express');
const compression = require('compression');
const ejs = require('ejs');
const properties = require('./properties');

const app = express();
const server = http.createServer(app);
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const port = process.env.PORT || '9060';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(path.join(DIST_DIR, 'static')));

app.get('*', (req, res, next) => {
  ejs.renderFile(
    HTML_FILE,
    properties,
    // eslint-disable-next-line consistent-return
    (err, htmlString) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(htmlString);
      res.end();
    }
  );
});

server.listen(port, () => {
  console.log(`App listening to ${port}....`);
  console.log('Press Ctrl+C to quit.');
});
