var express = require('express');
var webpack = require('webpack');
var request = require('request');
var Twitter = require('twitter');

var port = process.env.PORT + 1 || 3001;
var NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'production') {
  // var keys = JSON.parse(process.env.VCAP_SERVICES)['user-provided'][0].credentials;
  var keys = require('./.env');
} else {
  var keys = require('./.env');
};

var app = express();

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

app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('API is live at http://localhost:' + port);
});