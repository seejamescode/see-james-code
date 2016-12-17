var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      'window.fetch': 'exports?self.fetch!whatwg-fetch'
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '.'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new DashboardPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.(png|woff|woff2|eot|eot.|jpg|jpeg|ttf|svg)$/,
        loader: 'url-loader?limit=1000'
      },
      {
        test: /\.css$/,
        loaders: [
            'style?sourceMap',
            'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      }
    ]
  }
};
