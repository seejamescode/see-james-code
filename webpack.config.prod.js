var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '.'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      'window.fetch': 'exports?self.fetch!whatwg-fetch'
    }),
    new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      minimize: true,
    }),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
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
