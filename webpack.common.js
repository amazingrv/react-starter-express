const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const DIST_DIR = path.join(__dirname, 'dist');

module.exports = {
  output: {
    path: path.join(DIST_DIR, 'static'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'lodash-es': 'lodash',
    },
    extensions: ['.js', '.jsx', '.json'],
    fallback: { fs: false },
  },
  performance: {
    hints: false,
  },
  stats: {
    colors: true,
  },
  plugins: [
    new ESLintPlugin({ extensions: ['js', 'jsx'], fix: true, quiet: true, threads: true }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: path.join(DIST_DIR, 'index.html'),
      favicon: './src/assets/favicon.ico',
    }),
    new MomentLocalesPlugin(),
    new LodashModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
  ],
};
