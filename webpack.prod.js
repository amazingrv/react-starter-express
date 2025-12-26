import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const SERVER_DIR = path.join(__dirname, 'server');

export default merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    filename: 'js/[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              configFile: path.join(__dirname, '.swcrc.prod.json'),
            },
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
      chunks: 'all', // Optimize all chunks, including initial and async ones
      minSize: 20000, // Minimum size of a chunk in bytes to be generated (20KB)
      minChunks: 1, // Minimum number of chunks that a module must be shared between
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // Target modules within node_modules
          name: 'vendors', // Name of the vendor chunk
          priority: -10, // Higher priority means it's processed earlier
          reuseExistingChunk: true, // Reuse existing chunks if possible
        },
        common: {
          minChunks: 2, // Modules shared by at least 2 chunks
          priority: -20, // Lower priority than vendors
          reuseExistingChunk: true,
          name: 'common', // Name of the common chunk
        },
      },
    },
    minimizer: [
      new TerserPlugin({ minify: TerserPlugin.swcMinify, exclude: /server/ }),
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
      scriptLoading: 'module',
      minify: false,
      filename: path.join(__dirname, 'dist', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: SERVER_DIR,
          to: DIST_DIR,
          globOptions: {
            ignore: ['**/node_modules/**'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
  ],
});
