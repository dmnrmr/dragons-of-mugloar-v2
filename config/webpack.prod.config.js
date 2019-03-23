const coreConfig = require('./webpack.core.config.js');
const merge = require('webpack-merge');

module.exports = merge(coreConfig, {
  devtool: 'source-map',
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js'
  }
});
