import request from "request-promise";
import "now-env";
import { genImageQueries, imageSizes } from "../images";
import { posts } from "../posts";
import time from "../time";

const imageRoute = "images/";
let postsWithData = [];

/**
 * Post
 * @constructor
 * @param {date} date
 * @param {string} description
 * @param {string} id source + id
 * @param {object} [images]
 * @param {string} [images] `[url] [px width]w, [url] [px width]w...`
 * @param {number} [likes]
 * @param {string} [linkPrimary]
 * @param {string} [linkPrimaryText]
 * @param {string} [linkSecondary]
 * @param {string} [linkSecondaryText]
 * @param {string} type blog|project|talk
 * @param {string} timeSince time(item.date)
 * @param {string} title
 * @param {string} [video]
 */

const getPosts = () => {
  return Promise.all([
    // GitHub
    ...posts.github.map(function (repo) {
      return request({
        uri: `https://api.github.com/repos/${repo.repo}?access_token=${
          process.env.github
          }`,
        json: true,
        headers: {
          "user-agent": "node.js"
        }
      }).then(repoData => {
        const date = Date.parse(repoData.pushed_at);

        return {
          date,
          description: repoData.description,
          id: `github${repoData.id}`,
          images: genImageQueries(imageRoute, imageSizes, repo.image),
          likes: repoData.stargazers_count,
          linkPrimary: repoData.homepage
            ? repoData.homepage
            : repoData.html_url,
          linkPrimaryText: "Visit",
          linkSecondary: repoData.homepage ? repoData.html_url : undefined,
          linkSecondaryText: repoData.homepage ? "Code" : undefined,
          timeSince: time(date),
          title: repo.title,
          type: "project"
        };
      });
    }),
    // Medium
    request({
      uri: `https://medium.com/@${process.env.username}/latest`,
      json: true
    }).then(function (medium) {
      return Object.values(
        JSON.parse(medium.split("</x>").pop()).payload.references.Post
      ).map(blog => {
        const source = "medium";

        return {
          date: blog.firstPublishedAt,
          description: blog.virtuals.subtitle,
          id: source + blog.id,
          images: [
            {
              size: 60,
              url: `https://cdn-images-1.medium.com/fit/t/60/60/${
                blog.virtuals.previewImage.imageId
                }`
            },
            {
              size: 120,
              url: `https://cdn-images-1.medium.com/fit/t/120/120/${
                blog.virtuals.previewImage.imageId
                }`
            },
            {
              size: 240,
              url: `https://cdn-images-1.medium.com/fit/t/240/240/${
                blog.virtuals.previewImage.imageId
                }`
            },
            {
              size: 480,
              url: `https://cdn-images-1.medium.com/fit/t/480/480/${
                blog.virtuals.previewImage.imageId
                }`
            },
            {
              size: 960,
              url: `https://cdn-images-1.medium.com/fit/t/960/960/${
                blog.virtuals.previewImage.imageId
                }`
            },
            {
              size: 1920,
              url: `https://cdn-images-1.medium.com/fit/t/1920/1920/${
                blog.virtuals.previewImage.imageId
                }`
            }
          ],
          likes: blog.virtuals.totalClapCount,
          linkPrimary: `https://medium.com/@seejamescode/${blog.uniqueSlug}`,
          linkPrimaryText: "Read",
          timeSince: time(blog.firstPublishedAt),
          title: blog.title,
          type: "blog"
        };
      });
    }),
    // Vimeo
    request({
      uri: `https://api.vimeo.com/me/videos?filter_playable=true&access_token=${
        process.env.vimeo
        }`,
      json: true
    }).then(function (videos) {
      return videos.data
        .filter(video => video.privacy.view === "anybody")
        .map(function (video) {
          const date = Date.parse(video.created_time);
          const source = "vimeo";

          return {
            date,
            description: video.description,
            id: source + video.uri.replace(/\//g, "-"),
            images: video.pictures.sizes
              .sort((a, b) => a.height - b.height)
              .filter(
                (obj, pos, arr) =>
                  arr.map(mapObj => mapObj["height"]).indexOf(obj["height"]) ===
                  pos
              )
              .map((image, index, array) => {
                return {
                  size: index < array.length - 1 ? image.height - 1 : undefined,
                  url: image.link
                };
              }),
            likes: video.metadata.connections.likes.total,
            linkPrimary: video.link,
            linkPrimaryText: "Watch",
            timeSince: time(date),
            title: video.name,
            type: "talk"
          };
        });
    }),
    // Youtube
    request({
      uri: `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${posts.youtube
        .map(video => video.id)
        .join(",")}&key=${process.env.youtube}`,
      json: true,
      headers: {
        "user-agent": "node.js"
      }
    }).then(videosData => {
      return videosData.items.map(function (video, index) {
        const date = new Date(video.snippet.publishedAt).getTime();
        let description =
          video.snippet.description.indexOf("---") > -1
            ? video.snippet.description.substring(
              video.snippet.description.indexOf("---") + 3
            )
            : video.snippet.description;
        const source = "youtube";
        if (description.length > 140) {
          description = description.substring(0, 137) + "...";
        }
        const imageFilename = posts.youtube.filter(
          youtubeVideo => youtubeVideo.id === video.id
        )[0].image;

        return {
          date,
          description,
          id: source + video.id,
          images: genImageQueries(imageRoute, imageSizes, imageFilename),
          likes: parseInt(video.statistics.likeCount),
          linkPrimary: `https://www.youtube.com/watch?v=${video.id}`,
          linkPrimaryText: "Watch",
          timeSince: time(date),
          title: video.snippet.title,
          type: "talk"
        };
      });
    })
  ])
    .then(results => {
      // Misc sources
      const misc = posts.misc.map(function (item, index) {
        const info = item;
        info.id = "local" + index;
        info.images = genImageQueries(imageRoute, imageSizes, item.image);
        info.timeSince = time(item.date);
        info.video = item.video ? `/images/${item.video}` : undefined;
        return info;
      });

      postsWithData = results
        .reduce((acc, val) => acc.concat(val), [])
        .concat(misc)
        .sort((a, b) => b.date - a.date)
        .filter(post => post.images);
    })
    .catch(function (error) {
      console.error(error);
    });
};

getPosts();
// Update posts every five minutes
setInterval(() => {
  getPosts();
}, 60000 * 5);

module.exports = app => {
  app.get("/v1/posts", (req, res) => {
    res.send(postsWithData);
  });
};
