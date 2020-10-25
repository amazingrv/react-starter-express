const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const GhostProgressWebpackPlugin = require('ghost-progress-webpack-plugin')
  .GhostProgressPlugin;

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
        test: /\.css$/,
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
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'postcss-loader',
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(html)$/i,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    fallback: { url: false },
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: false,
  },
  stats: {
    colors: true,
  },
  plugins: [
    new ESLintPlugin({ fix: true, extensions: ['js', 'jsx'] }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: path.join(DIST_DIR, 'index.html'),
      scriptLoading: 'defer',
      favicon: './src/assets/favicon.ico',
      minify: false,
    }),
    new MomentLocalesPlugin(),
    new GhostProgressWebpackPlugin(),
  ],
};
