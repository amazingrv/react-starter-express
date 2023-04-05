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
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'swc-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
  devtool: false,
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    removeAvailableModules: false,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({ minify: TerserPlugin.swcMinify, exclude: /\/server/ }),
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cssoMinify,
        parallel: false,
      }),
    ],
  },
  plugins: [
    new ESLintPlugin({ extensions: ['js', 'jsx'], quiet: false }),
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
