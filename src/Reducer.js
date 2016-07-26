import {
  GET_GITHUB_REPOS_DONE,
  GET_GITHUB_REPOS_PENDING,
  GET_MEDIUM_POSTS_DONE,
  GET_MEDIUM_POSTS_PENDING,
  GET_TWITTER_TWEETS_DONE,
  GET_TWITTER_TWEETS_PENDING,
} from './ActionTypes';
const moment = require('moment');

const initialState = {
  posts: [],
  postsStatus: '',
  repos: [],
  reposStatus: '',
  tweets: [],
  tweetsStatus: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_GITHUB_REPOS_DONE: {
      const repos = action.repos.map((item) => {
        const formattedRepo = { ...item };
        formattedRepo.date = moment(item.updated_at).valueOf();
        formattedRepo.dateContext = 'Updated';
        formattedRepo.title = item.name;
        return formattedRepo;
      });
      return {
        ...state,
        repos,
        reposStatus: 'done',
      };
    }
    case GET_GITHUB_REPOS_PENDING:
      return {
        ...state,
        reposStatus: 'searching',
      };
    case GET_MEDIUM_POSTS_DONE: {
      const posts = action.posts.map((item) => {
        const formattedPost = { ...item };
        formattedPost.date = item.firstPublishedAt;
        formattedPost.dateContext = 'Updated';
        formattedPost.description = item.virtuals.snippet;
        return formattedPost;
      });
      return {
        ...state,
        posts,
        postsStatus: 'done',
      };
    }
    case GET_MEDIUM_POSTS_PENDING:
      return {
        ...state,
        postsStatus: 'searching',
      };
    case GET_TWITTER_TWEETS_DONE: {
      const tweets = action.tweets.map((item) => {
        const formattedTweet = { ...item };
        formattedTweet.date = moment(new Date(item.created_at)).valueOf();
        formattedTweet.dateContext = 'Tweeted';
        formattedTweet.description = item.text;
        return formattedTweet;
      });
      return {
        ...state,
        tweets,
        tweetsStatus: 'done',
      };
    }
    case GET_TWITTER_TWEETS_PENDING:
      return {
        ...state,
        tweetsStatus: 'searching',
      };
    default:
      return state;
  }
}
