const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['react-refresh/babel'],
        },
      },
    ],
  },
  devtool: 'eval-cheap-source-map',
  devServer: {
    static: false,
    port: 8080,
    hot: true,
    liveReload: false,
    historyApiFallback: true,
  },
  stats: {
    modules: false,
    entrypoints: false,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new ESLintPlugin({ fix: true, quiet: true }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
});
