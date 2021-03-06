const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const coreConfig = require('./webpack.core.config.js');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = merge(coreConfig, {
  devtool: false,
  mode: 'production',
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
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png)$/,
        use: [{ loader: 'file-loader' }]
      }
    ]
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  output: {
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new StyleLintPlugin({
      files: ['**/*.{vue,scss}']
    }),
    new VueLoaderPlugin(),
    new webpack.SourceMapDevToolPlugin({
      exclude: /vendor/,
      filename: '[name].js.map'
    })
  ]
});
