import webpack from 'webpack';

export default {
  output: {
    publicPath: '/',
    module: true,
    library: {
      type: 'module', // Crucial for ES module output
    },
  },
  experiments: {
    outputModule: true, // Enables the generation of ES module output
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
