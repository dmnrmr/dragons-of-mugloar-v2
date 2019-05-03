const coreConfig = require('./webpack.core.config.js');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = merge(coreConfig, {
  devtool: 'inline-cheap-module-source-map',
  externals: [nodeExternals()],
  mode: 'none',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              optimizeSSR: false
            }
          }
        ]
      },
      {
        test: /\.(s?)css$/,
        use: [{ loader: 'null-loader' }]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  target: 'node'
});
