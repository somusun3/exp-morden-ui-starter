const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
    templateContent: templateContent(),
  })
];

module.exports = require('./webpack.shared.config')({
  debug: true,
  devtool: 'eval',
  // Add hot reloading in development
  entry: [
    'webpack-hot-middleware/client',
    path.join(process.cwd(), 'app/index.tsx'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  resolve: {
    modules: ['app', 'node_modules']
  },

  plugins: plugins,

  babelQuery: {
    presets: ['react-hmre'],
  },

  devtool: 'cheap-module-eval-source-map',

});

function templateContent() {
  return fs.readFileSync(
    path.resolve(process.cwd(), 'index.html')
  ).toString();
}
