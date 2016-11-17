const roles = require('./Roles.json');

const initialState = {
  posts: [],
  postsStatus: '',
  repos: [],
  reposStatus: '',
  roles: [],
  rolesStatus: '',
  tweets: [],
  tweetsStatus: '',
  videos: [],
  videosStatus: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_GITHUB_REPOS_DONE': {
      const repos = action.repos.map((item) => {
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
      return {
        ...state,
        repos,
        reposStatus: 'done',
      };
    }
    case 'GET_GITHUB_REPOS_PENDING':
      return {
        ...state,
        reposStatus: 'searching',
      };
    case 'GET_LOCAL_ROLES': {
      const formattedRoles = roles.map((item) => {
        const formattedRole = { ...item };
        if (item.date) {
          formattedRole.date = Date.parse(item.date);
        }
        formattedRole.dateContext = 'Worked';
        formattedRole.id = roles.indexOf(item);
        formattedRole.source = 'resume';
        return formattedRole;
      });
      return {
        ...state,
        roles: formattedRoles,
        rolesStatus: 'done',
      };
    }
    case 'GET_MEDIUM_POSTS_DONE': {
      const posts = action.posts.map((item) => {
        const formattedPost = { ...item };
        formattedPost.buttonContext = 'Read';
        formattedPost.date = item.firstPublishedAt;
        formattedPost.dateContext = 'Blogged';
        formattedPost.description = item.virtuals.snippet;
        formattedPost.homepage = `https://medium.com/@pnowelldesign/${item.uniqueSlug}`;
        formattedPost.image = `https://cdn-images-1.medium.com/fit/t/500/200/${item.virtuals.previewImage.imageId}`;
        formattedPost.likes = item.virtuals.recommends;
        formattedPost.likesContext = 'Recommendations';
        formattedPost.source = 'medium';
        return formattedPost;
      });
      return {
        ...state,
        posts,
        postsStatus: 'done',
      };
    }
    case 'GET_MEDIUM_POSTS_PENDING':
      return {
        ...state,
        postsStatus: 'searching',
      };
    case 'GET_TWITTER_TWEETS_DONE': {
      const tweets = action.tweets.map((item) => {
        const formattedTweet = { ...item };
        formattedTweet.date = Date.parse(item.created_at);
        formattedTweet.dateContext = 'Tweeted';
        const urlLocation = item.text.indexOf('https://t.co');
        if (urlLocation === -1) {
          formattedTweet.description = item.text;
        } else {
          formattedTweet.description = item.text.substring(0, item.text.indexOf('https://t.co'));
        }
        formattedTweet.homepage = `https://twitter.com/seejamescode/status/${item.id_str}`;
        if (item.entities.media) {
          formattedTweet.image = item.entities.media[0].media_url_https;
        } else if (item.quoted_status &&
          item.quoted_status.entities &&
          item.quoted_status.entities.media) {
          formattedTweet.image = item.quoted_status.entities.media[0].media_url_https;
        }
        if (item.extended_entities &&
          item.extended_entities.media &&
          item.extended_entities.media[0].type === 'video') {
          const tweetVideos = item.extended_entities.media[0].video_info.variants
            .filter((video) => video.content_type === 'video/mp4');
          formattedTweet.video = tweetVideos[0].url;
        } else if (item.quoted_status &&
          item.quoted_status.extended_entities &&
          item.quoted_status.extended_entities.media &&
          item.quoted_status.extended_entities.media[0].type === 'video') {
          formattedTweet.video =
            item.quoted_status.extended_entities.media[0].video_info.variants[0].url;
        }
        formattedTweet.popularity = item.retweet_count * 2 + item.favorite_count;
        formattedTweet.source = 'twitter';
        return formattedTweet;
      }).filter((tweet) => !tweet.retweeted);
      return {
        ...state,
        tweets,
        tweetsStatus: 'done',
      };
    }
    case 'GET_TWITTER_TWEETS_PENDING':
      return {
        ...state,
        tweetsStatus: 'searching',
      };
    case 'GET_VIMEO_VIDEOS_DONE': {
      let videos = action.videos.data.map((item) => {
        let formattedVideo = {};
        formattedVideo = { ...item };
        formattedVideo.date = Date.parse(item.created_time);
        formattedVideo.dateContext = 'Video posted';
        if (!formattedVideo.description) {
          formattedVideo.description = '';
        }
        formattedVideo.id = item.uri.substring(item.uri.indexOf('videos/') + 7);
        if (formattedVideo.id.match(/\D/) !== null) {
          formattedVideo.id = formattedVideo.id.substring(0, formattedVideo.id.match(/\D/).index);
        }
        formattedVideo.id = Number(formattedVideo.id);
        formattedVideo.source = 'vimeo';
        formattedVideo.title = item.name;
        formattedVideo.homepage = item.link;
        return formattedVideo;
      });
      videos = videos.filter(item => item.privacy.view === 'anybody');

      return {
        ...state,
        videos,
        videosStatus: 'done',
      };
    }
    case 'GET_VIMEO_VIDEOS_PENDING':
      return {
        ...state,
        videosStatus: 'searching',
      };
    default:
      return state;
  }
}
