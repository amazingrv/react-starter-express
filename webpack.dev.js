const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin');
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
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: false,
    port: 8080,
    hot: true,
    liveReload: false,
    historyApiFallback: true,
  },
  stats: false,
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      fix: true,
      quiet: true,
      threads: false,
    }),
  ],
});
