const initialState = {
  posts: [],
  postsStatus: '',
  repos: [],
  reposStatus: '',
  tweets: [],
  tweetsStatus: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case 'GET_GITHUB_REPOS_DONE':
    return {
      ...state,
      repos: action.repos,
      reposStatus: 'done'
    };
  case 'GET_GITHUB_REPOS_PENDING':
    return {
      ...state,
      reposStatus: 'searching'
    };
  case 'GET_MEDIUM_POSTS_DONE':
    return {
      ...state,
      posts: action.posts,
      postsStatus: 'done'
    };
  case 'GET_MEDIUM_POSTS_PENDING':
    return {
      ...state,
      postsStatus: 'searching'
    };
  case 'GET_TWITTER_TWEETS_DONE':
    return {
      ...state,
      tweets: action.tweets,
      tweetsStatus: 'done'
    };
  case 'GET_TWITTER_TWEETS_PENDING':
    return {
      ...state,
      tweetsStatus: 'searching'
    };
  default:
    return state;
  }
}
