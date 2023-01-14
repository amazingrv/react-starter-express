const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

const DIST_DIR = path.join(__dirname, 'dist');
const SERVER_DIR = path.join(__dirname, 'server');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: false,
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    removeAvailableModules: false,
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({ exclude: /\/server/ }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: 'default',
        },
      }),
    ],
  },
  plugins: [
    new ESLintPlugin({ quiet: true }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.ico',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: SERVER_DIR,
          to: DIST_DIR,
          globOptions: {
            ignore: ['**/server.dev.js', '**/node_modules/**'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  ],
});
