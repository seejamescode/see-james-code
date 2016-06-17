var cfenv = require('cfenv');
var path = require('path');
var express = require('express');
var router = express.Router();
var webpack = require('webpack');
var request = require('request');
var Twitter = require('twitter');

var port = process.env.PORT || 3000;
var NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'production') {
  var config = require('./webpack.config.prod');
  var keys = JSON.parse(process.env.VCAP_SERVICES)['user-provided'][0].credentials;
} else {
  var config = require('./webpack.config.dev');
  var keys = require('./.env');
};

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

if (NODE_ENV === 'production') {
  app.use('/dist', express.static('dist'));
};

app.get('/api/github/*', (req, res) => {
  var query = req.originalUrl.replace('/api/github/','');
  request({
      url: `https://api.github.com/${query}?access_token=${keys.github}`,
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
      url: `https://medium.com/${query}`,
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
      screen_name: 'seejamescode'
    }, function(error, tweets, response){
    if (!error) {
      res.send(tweets);
    }
  });
})

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