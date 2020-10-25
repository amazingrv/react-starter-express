const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

const DIST_DIR = path.join(__dirname, 'dist');
const SERVER_DIR = path.join(__dirname, 'server');

module.exports = merge(common, {
  mode: 'production',
  entry: ['./src/index.js'],
  output: {
    filename: '[name].[contenthash].js',
  },
  devtool: false,
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          name: 'vendors',
        },
      },
    },
    minimizer: [
      new TerserPlugin({ exclude: /\/server/ }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
  plugins: [
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
