const coreConfig = require('./webpack.core.config.js');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(coreConfig, {
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    port: 3000,
    quiet: true
  },
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  output: {
    filename: 'bundle.[hash].js'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
