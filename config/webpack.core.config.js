const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        test: /\.(js|vue)$/,
        use: [
          { loader: 'eslint-loader' }
        ]
      },
      {
        exclude: /node_modules/,
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
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
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  plugins: [
    new CopyPlugin([
      { from: 'assets', to: 'assets' }
    ]),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      inject: false
    }),
    new SimpleProgressWebpackPlugin({
      format: 'minimal'
    }),
    new StyleLintPlugin({
      files: ['**/*.{vue,scss}']
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.vue']
  },
  stats: 'none',
  target: 'web'
};
