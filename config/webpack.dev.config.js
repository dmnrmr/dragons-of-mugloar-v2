const coreConfig = require('./webpack.core.config.js');
const merge = require('webpack-merge');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
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
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.vue$/,
        use: [{ loader: 'vue-loader' }]
      },
      {
        exclude: /node_modules/,
        test: /\.(s?)css$/,
        use: [
          { loader: 'vue-style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },

  output: {
    filename: 'bundle.[hash].js'
  },
  plugins: [
    new StyleLintPlugin({
      files: ['**/*.{vue,scss}']
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
