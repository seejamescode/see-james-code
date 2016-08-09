var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxy = require('http-proxy-middleware');
var request = require('request');
var Twitter = require('twitter');
var webpack = require("webpack");
var WebpackDevServer = require('webpack-dev-server');

var port = process.env.VCAP_APP_PORT || 3001;
var NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

app.get('/api/github/*', (req, res) => {
  var query = req.originalUrl.replace('/api/github/','');
  request({
      url: `https://api.github.com/users/${keys.username}/${query}?access_token=${keys.github}`,
      headers: {
        'user-agent': 'node.js'
      }
    }, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      res.send(body);
    }
  });
})

app.get('/api/medium/*', (req, res) => {
  var query = req.originalUrl.replace('/api/medium/','');
  request({
      url: `https://medium.com/@${keys.username}/${query}`,
      headers: {
        'Accept': 'application/json'
      }
    }, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      res.send(response.body.split('</x>').pop());
    }
  });
})

app.get('/api/twitter/*', (req, res) => {
  var query = req.originalUrl.replace('/api/twitter/','');

  new Twitter(keys.twitter).get(query,
    {
      screen_name: keys.username
    }, function(error, tweets, response){
    if (!error) {
      res.send(tweets);
    }
  });
})

if (NODE_ENV === 'production') {
  var config = require('./webpack.config.prod');
  var keys = JSON.parse(process.env.VCAP_SERVICES)['user-provided'][0].credentials;

  app.use(require('webpack-dev-middleware')(webpack(config), {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use('/dist', express.static('dist'));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
} else {
  var portDev = process.env.VCAP_APP_PORT + 1 || 3000;
  var config = require('./webpack.config.dev');
  var keys = require('./.env');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
      colors: true
    },
    proxy: {
      '/api/*' : 'http://localhost:' + port,
    }
  }).listen(portDev, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }

    console.log('Dev server listening at localhost:' + portDev);
  });
};

app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('App and API is live at http://localhost:' + port);
});
