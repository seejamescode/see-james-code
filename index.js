import compression from 'compression';
import express from 'express';
import fs from 'fs';
import path from 'path';
import request from 'request';
import Twitter from 'twitter';

const app = express();
const port = process.env.PORT || 8080;
app.use(compression());
app.enable('trust proxy');

let keys;
if (fs.existsSync(path.join(__dirname, '/keys.json'))) {
  keys = require(path.join(__dirname, '/keys.json'));
} else if (fs.existsSync(path.join(__dirname, '../keys.json'))) {
  keys = require(path.join(__dirname, '../keys.json'));
} else {
  keys = JSON.parse(process.env.VCAP_SERVICES)['user-provided'][0].credentials;
}

app.get('/api/github', (req, res) => {
  request({
    url: `https://api.github.com/user/repos?affiliation=owner,collaborator&access_token=${keys.github}`,
    headers: {
      'user-agent': 'node.js',
    },
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      res.send(body);
    }
  });
});

app.get('/api/medium', (req, res) => {
  request({
    url: `https://medium.com/@${keys.username}/latest`,
    headers: {
      Accept: 'application/json',
    },
  }, (err, response) => {
    if (!err && response.statusCode === 200) {
      res.send(response.body.split('</x>').pop());
    }
  });
});

app.get('/api/twitter', (req, res) => {
  new Twitter({
    consumer_key: keys.twitter_consumer_key,
    consumer_secret: keys.twitter_consumer_secret,
    access_token_key: keys.twitter_access_token_key,
    access_token_secret: keys.twitter_access_token_secret,
  }).get('statuses/user_timeline/',
    {
      count: 200,
      screen_name: keys.username,
    }, (error, tweets) => {
      if (!error) {
        res.send(tweets);
      }
    });
});

app.get('/api/vimeo', (req, res) => {
  request(`https://api.vimeo.com/me/videos?filter_playable=true&access_token=${keys.vimeo}`, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      res.send(body);
    }
  });
});

app.use((req, res, next) => {
  if (req.secure || req.headers.host === `localhost:${port}`) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

app.get(`/.well-known/acme-challenge/${process.env.LETS_ENCRYPT_ROUTE}`,
  (req, res) => {
    res.send(process.env.LETS_ENCRYPT_VERIFICATION);
  },
);

app.use(express.static('./build'));

app.listen(port, (err) => {
  if (err) {
    console.log(err); 
    return;
  }
  console.log(`App and API is live at http://localhost:${port}`);
});
