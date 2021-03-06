const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        test: /\.(js|vue)$/,
        use: [{ loader: 'eslint-loader' }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.svg$/,
        use: ['vue-loader', 'svg-to-vue-component/loader']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  plugins: [
    new CopyPlugin([{ from: 'assets', to: 'assets' }]),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      inject: false
    }),
    new SimpleProgressWebpackPlugin({
      format: 'minimal'
    })
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.vue']
  },
  stats: 'none',
  target: 'web'
};
