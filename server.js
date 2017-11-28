import compression from 'compression';
import express from 'express';
import fs from 'fs';
import path from 'path';
import request from 'request';

const app = express();
const keys = require("./keys.json");
const port = process.env.PORT || 8080;
app.use(compression());
app.enable('trust proxy');

let originalPosts = [
  {
    buttonContext: 'View',
    date: 1400547845000,
    dateContext: "Worked on",
    description: "While an intern and contractor for BP3 Global, I designed the onboarding process for this process portal and developed the demo.",
    homepage: 'http://brazos-portal.bp-3cloud.com/?signup=true#',
    id: "1",
    image: "/brazos-portal.png",
    likes: 0,
    source: 'local',
    title: "Brazos Portal"
  },
  {
    buttonContext: 'Example',
    date: 1440032645000,
    dateContext: "Worked on",
    description: "My first outcome at IBM was transforming the IBM Analytics Style Guide into reuseable vanilla JavaScript and React component libraries. The components are now used in more than twelve products.",
    homepage: 'https://datascience.ibm.com/',
    html: "<video src='/analytics-components.mp4' style='width: 100%' autoplay />",    
    id: "2",
    likes: 0,
    source: 'local',
    title: "IBM Analytics Platform Component Library"
  },
  {
    date: 1458435845000,
    dateContext: "Worked on",
    description: "This internal tool provided articles, videos, and podcasts about IBM Design Thinking. I pair-designed, coded, and stuck the team to a rigourous user testing process.",
    id: "3",
    image: "/ibm-design-stories.gif",
    likes: 0,
    source: 'local',
    title: "IBM Design Stories"
  }
]
let newPosts = [];
let posts = originalPosts;

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
            const regex = /\]\(([^)]+)\?raw=true\)/;
            const match = regex.exec(new Buffer(JSON.parse(body).content, 'base64'));
            if (match !== null && !match[1].includes('.gif')) {
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
            id: item.id,
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
            id: item.uri.substring(item.uri.indexOf('videos/') + 7).match(/\D/) !== null
              ? Number(item.uri.substring(item.uri.indexOf('videos/') + 7).substring(0, item.uri.substring(item.uri.indexOf('videos/') + 7).match(/\D/).index))
              : Number(item.uri.substring(item.uri.indexOf('videos/') + 7)),
            image: item.pictures.sizes[3].link,
            likes: item.metadata.connections.likes.total,
            privacy: item.privacy.view,
            source: 'vimeo',
            title: item.name,
          };
        })
        .filter(item => item.privacy === 'anybody');

      newPosts = [...newPosts, ...videos];
    }
  });

  // YouTube
  request({
    url: `https://www.googleapis.com/youtube/v3/playlistItems?part=ContentDetails&playlistId=PLM3sBK4_97xPyLTI4v6aIzapjsGfibUF9&key=${keys.youtube}`,
    headers: {
      'user-agent': 'node.js',
    },
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      let youtubes = JSON.parse(body).items.map((item) => item.contentDetails.videoId).join();

      request({
        url: `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${youtubes}&key=${keys.youtube}`,
        headers: {
          'user-agent': 'node.js',
        },
      }, (err, response, body) => {
        if (!err && response.statusCode === 200) {
          let youtubeVideos = JSON.parse(body).items.map((item) => {
            let description = item.snippet.description.indexOf("---") > -1
              ? item.snippet.description.substring(item.snippet.description.indexOf("---") + 3)
              : item.snippet.description;

            if (description.length > 140) {
              description = description.substring(0, 137) + '...';
            }

            return {
              buttonContext: 'Watch',
              date: new Date(item.snippet.publishedAt).getTime(),
              dateContext: "Video posted",
              description,
              homepage: `https://www.youtube.com/watch?v=${item.id}`,
              image: item.snippet.thumbnails.high.url,
              id: item.id,
              likes: parseInt(item.statistics.likeCount),
              source: 'youtube',
              title: item.snippet.title,
            }
          });

          newPosts = [...newPosts, ...youtubeVideos];
        }
      });
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
    req.headers.host === `localhost:${port}`
  ) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

app.use(express.static('./build'));

app.listen(port, (err) => {
  if (err) {
    console.log(err); 
    return;
  }
  console.log(`App and API is live at http://localhost:${port}`);
});
