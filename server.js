import compression from 'compression';
import express from 'express';
import fs from 'fs';
import path from 'path';
import request from 'request';

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

let originalPosts = [
  {
    buttonContext: 'Watch',
    date: 1497538496000,
    dateContext: "Video posted",
    description: "IBM Software Designer James Y. Rauhut shows what a normal work-day is like for FreeCodeCamp.",
    homepage: 'https://www.youtube.com/watch?v=FXfYSn8qaUE',
    html: "<iframe src='https://www.youtube.com/embed/FXfYSn8qaUE' frameborder='0' allowfullscreen></iframe>",
    id: "FXfYSn8qaUE",
    likes: 270,
    source: 'vimeo',
    title: "A Day at IBM with Designer James Rauhut"
  }
]
let newPosts = [];
let posts = [];

const getPosts = () => {
  newPosts = [...originalPosts];

  // Github
  request({
    url: `https://api.github.com/user/repos?affiliation=owner,collaborator&access_token=${keys.github}`,
    headers: {
      'user-agent': 'node.js',
    },
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      let repos = JSON.parse(body).map((item) => {
        return {
          code: item.html_url,
          date: Date.parse(item.pushed_at),
          dateContext: 'Code updated',
          description: item.description,
          homepage: item.homepage,
          id: item.id,
          likes: item.stargazers_count,
          name: item.full_name,
          source: 'github',
          title: item.name.replace(/-/g, ' ').indexOf('js') > -1
            ? item.name.replace(/-/g, ' ').replace(' js', '.js')
            : item.name.replace(/-/g, ' '),
        };
      });

      newPosts = [...newPosts, ...repos];

      // Add repo readme images
      for (let i = 0; i < repos.length; i++) {
        request({
          url: `https://api.github.com/repos/${repos[i].name}/readme?access_token=${keys.github}`,
          headers: {
            'user-agent': 'node.js',
          },
        }, (err, response, body) => {
          if (!err && response.statusCode === 200) {
            let regex = /\]\(([^)]+)\?raw=true\)/;
            let match = regex.exec(new Buffer(JSON.parse(body).content, 'base64'));
            if (match !== null) {
              newPosts[newPosts.findIndex((obj => obj.id == repos[i].id))].image = `https://github.com/${repos[i].name}/blob/master${match[1]}?raw=true`;
            }
          }
        });
      }
    }
  });

  // Medium
  request({
    url: `https://medium.com/@${keys.username}/latest`,
    headers: {
      Accept: 'application/json',
    },
  }, (err, response) => {
    if (!err && response.statusCode === 200) {
      let blogs = Object.values(JSON.parse(response.body.split('</x>').pop()).payload.references.Post)
        .map((item) => {
          return {
            ...item,
            buttonContext: 'Read',
            date: item.firstPublishedAt,
            dateContext: 'Written',
            description: item.virtuals.subtitle,
            homepage: `https://medium.com/@seejamescode/${item.uniqueSlug}`,
            image: `https://cdn-images-1.medium.com/fit/t/500/200/${item.virtuals.previewImage.imageId}`,
            likes: item.virtuals.totalClapCount,
            source: 'medium',
            title: item.title,
          };
        });

      newPosts = [...newPosts, ...blogs];
    }
  });

  // Vimeo
  request(`https://api.vimeo.com/me/videos?filter_playable=true&access_token=${keys.vimeo}`, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      let videos = JSON.parse(body).data
        .map((item) => {
          return {
            buttonContext: 'Watch',
            date: Date.parse(item.created_time),
            dateContext: 'Video posted',
            description: item.description
              ? item.description
              : '',
            homepage: item.link,
            html: item.embed.html,
            id: item.uri.substring(item.uri.indexOf('videos/') + 7).match(/\D/) !== null
              ? Number(item.uri.substring(item.uri.indexOf('videos/') + 7).substring(0, item.uri.substring(item.uri.indexOf('videos/') + 7).match(/\D/).index))
              : Number(item.uri.substring(item.uri.indexOf('videos/') + 7)),
            likes: item.metadata.connections.likes.total,
            privacy: item.privacy.view,
            source: 'vimeo',
            title: item.name,
            homepage: item.link,
          };
        })
        .filter(item => item.privacy === 'anybody');

      newPosts = [...newPosts, ...videos];
    }
  });
};

getPosts();
setTimeout(() => {
  posts = newPosts;
}, 10000);

setInterval(() => {
  posts = newPosts;

  getPosts();
}, 60000 * 5);

app.get('/posts', (req, res) => {
  let latestPosts = posts
    .sort((a, b) => b.date - a.date)

  res.send(latestPosts);
});

app.use((req, res, next) => {
  if (
    req.secure ||
    req.headers.host === `localhost:${port}` ||
    req.url.includes('/.well-known/acme-challenge/')
  ) {
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
