const webpack = require('webpack');

module.exports = {
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(svg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
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
    extensions: ['.js', '.jsx'],
    fallback: { fs: false },
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.ProgressPlugin({
      activeModules: true,
    }),
  ],
};
