export function github(repos, callback) {
  const formatted = repos.map((item) => {
    const formattedRepo = { ...item };
    formattedRepo.date = Date.parse(item.pushed_at);
    formattedRepo.dateContext = 'Code updated';
    formattedRepo.source = 'github';
    formattedRepo.title = item.name.replace(/-/g, ' ');
    if (formattedRepo.title.indexOf('js') > -1) {
      formattedRepo.title = formattedRepo.title.replace(' js', '.js');
    }
    formattedRepo.code = item.html_url;
    return formattedRepo;
  });

  callback(formatted);
}

export function medium(posts, callback) {
  const formatted = posts.map((item) => {
    const formattedPost = { ...item };
    const image = item.virtuals.previewImage.imageId;
    formattedPost.buttonContext = 'Read';
    formattedPost.date = item.firstPublishedAt;
    formattedPost.dateContext = 'Blogged';
    formattedPost.description = item.virtuals.subtitle;
    formattedPost.homepage =
      `https://medium.com/@seejamescode/${item.uniqueSlug}`;
    formattedPost
      .image = `https://cdn-images-1.medium.com/fit/t/500/200/${image}`;
    formattedPost.likes = item.virtuals.recommends;
    formattedPost.likesContext = 'Recommendations';
    formattedPost.source = 'medium';
    return formattedPost;
  });

  callback(formatted);
}

export function twitter(tweets, callback) {
  const formatted = tweets.map((item) => {
    const formattedTweet = { ...item };
    formattedTweet.date = Date.parse(item.created_at);
    formattedTweet.dateContext = 'Tweeted';
    formattedTweet.description = item.text;
    formattedTweet.homepage =
      `https://twitter.com/seejamescode/status/${item.id_str}`;
    if (item.entities.media) {
      formattedTweet.image = item.entities.media[0].media_url_https;
    } else if (item.quoted_status &&
      item.quoted_status.entities &&
      item.quoted_status.entities.media) {
      formattedTweet.image = item.quoted_status.entities
        .media[0].media_url_https;
    }
    if (item.extended_entities &&
      item.extended_entities.media &&
      item.extended_entities.media[0].type === 'video') {
      const tweetVideos = item.extended_entities.media[0].video_info.variants
        .filter(video => video.content_type === 'video/mp4');
      formattedTweet.video = tweetVideos[0].url;
    } else if (item.quoted_status &&
      item.quoted_status.extended_entities &&
      item.quoted_status.extended_entities.media &&
      item.quoted_status.extended_entities.media[0].type === 'video') {
      formattedTweet.video =
        item.quoted_status.extended_entities
          .media[0].video_info.variants[0].url;
    }
    formattedTweet.popularity = (item.retweet_count * 2) + item.favorite_count;
    formattedTweet.source = 'twitter';
    return formattedTweet;
  }).filter(tweet => !tweet.retweeted);

  callback(formatted);
}

export function vimeo(videos, callback) {
  const formatted = videos.data.map((item) => {
    let formattedVideo = {};
    formattedVideo = { ...item };
    formattedVideo.date = Date.parse(item.created_time);
    formattedVideo.dateContext = 'Video posted';
    if (!formattedVideo.description) {
      formattedVideo.description = '';
    }
    formattedVideo.html = item.embed.html;
    formattedVideo.id = item.uri.substring(item.uri.indexOf('videos/') + 7);
    if (formattedVideo.id.match(/\D/) !== null) {
      formattedVideo.id = formattedVideo.id
        .substring(0, formattedVideo.id.match(/\D/).index);
    }
    formattedVideo.id = Number(formattedVideo.id);
    formattedVideo.source = 'vimeo';
    formattedVideo.title = item.name;
    formattedVideo.homepage = item.link;
    return formattedVideo;
  }).filter(item => item.privacy.view === 'anybody');

  callback(formatted);
}
