import * as api from './Api';

export function getGithubRepos() {
  return (dispatch) => {
    dispatch({
      type: 'GET_GITHUB_REPOS_PENDING',
    });

    api.githubPersonalRepos((data) => {
      dispatch({
        type: 'GET_GITHUB_REPOS_DONE',
        repos: data
      });
    });
  };
}

export function getMediumPosts() {
  return (dispatch) => {
    dispatch({
      type: 'GET_MEDIUM_POSTS_PENDING',
    });

    api.mediumLatestPosts((data) => {
      dispatch({
        type: 'GET_MEDIUM_POSTS_DONE',
        posts: data.posts
      });
    });
  };
}

export function getTwitterTweets() {
  return (dispatch) => {
    dispatch({
      type: 'GET_TWITTER_TWEETS_PENDING',
    });

    api.twitterLatestTweets((data) => {
      dispatch({
        type: 'GET_TWITTER_TWEETS_DONE',
        tweets: data
      });
    });
  };
}