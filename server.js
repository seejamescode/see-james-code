var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxy = require('http-proxy-middleware');
var request = require('request');
var WebpackDevServer = require('webpack-dev-server');

var port = process.env.PORT || 3000;
var portAPI = process.env.PORT + 1 || 3001;
var NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

if (NODE_ENV === 'production') {
  app.use('/dist', express.static('dist'));

  app.use('/api/*', proxy({target: 'http://localhost:' + portAPI, changeOrigin: true}));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(port, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('App is live at http://localhost:' + port);
  });
} else {
  var config = require('./webpack.config.dev');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    },
    proxy: {
      '/api/*': 'http://localhost:' + portAPI
    }
  }).listen(port, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:' + port);
  });
};