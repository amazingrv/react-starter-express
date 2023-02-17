const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ejs = require('ejs');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../webpack.dev');
const properties = require('./properties');

const HTML_FILE = path.join(__dirname, '..', 'src', 'index.html');
const buffer = fs.readFileSync(HTML_FILE);
const htmlString = ejs.render(buffer.toString('utf8'), properties);

const htmlPlugin = new HtmlWebpackPlugin({
  templateContent: htmlString,
  filename: 'index.html',
  favicon: './src/assets/favicon.ico',
});
config.plugins.push(htmlPlugin);

const compiler = webpack(config);
const server = new WebpackDevServer(config.devServer, compiler);
server.start();
