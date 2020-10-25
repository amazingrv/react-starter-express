const path = require('path');
const express = require('express');
const http = require('http');
const webpack = require('webpack');
const ejs = require('ejs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.dev.js');
const properties = require('./properties');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || '9060';
const compiler = webpack(config);
const HTML_FILE = path.join(compiler.outputPath, '..', 'index.html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  webpackDevMiddleware(compiler, {
    index: false,
    publicPath: config.output.publicPath,
    logLevel: 'silent',
  })
);

app.use(
  webpackHotMiddleware(compiler, {
    publicPath: config.output.publicPath,
    log: false,
  })
);

app.use('*', (req, res, next) => {
  // eslint-disable-next-line consistent-return
  compiler.outputFileSystem.readFile(HTML_FILE, (err, buffer) => {
    if (err) {
      return next(err);
    }

    const htmlString = ejs.render(buffer.toString('utf8'), properties);
    res.set('content-type', 'text/html');
    res.send(htmlString);
    res.end();
  });
});

server.listen(port, () => {
  console.log(`App listening to ${port}....`);
  console.log('Press Ctrl+C to quit.');
});
