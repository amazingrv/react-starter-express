import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import htmlWebpackPlugin from 'html-webpack-plugin';
import handlebars from 'handlebars';

import config from './webpack.dev.js';
import properties from './server/properties.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HTML_FILE = path.join(__dirname, 'src', 'index.html');
const buffer = fs.readFileSync(HTML_FILE);
const template = handlebars.compile(buffer.toString('utf8'));
const htmlString = template(properties);

const htmlPlugin = new htmlWebpackPlugin({
  templateContent: htmlString,
  filename: 'index.html',
  favicon: './src/assets/favicon.ico',
});
config.plugins.push(htmlPlugin);

const compiler = webpack(config);
const server = new webpackDevServer(config.devServer, compiler);
server.start();
