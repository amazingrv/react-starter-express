const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    main: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client?reload=true&quiet=true',
      './src/index.js',
    ],
  },
  output: {
    filename: 'js/[name].js',
  },
  stats: 'none',
  infrastructureLogging: {
    level: 'none',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
