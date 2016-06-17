export function githubPersonalRepos(callback) {
  fetch(`/api/github/users/yepnamesjames/repos`, {
    credentials: 'same-origin'
  })
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    callback(data);
  }).catch(function(err) {
    console.log('Error ', err);
  });
};

export function mediumLatestPosts(callback) {
  fetch('/api/medium/@medium/latest')
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    callback(data.payload);
  }).catch(function(err) {
    console.log('Error ', err);
  });
};

export function twitterLatestTweets(callback) {
  fetch('/api/twitter/statuses/user_timeline')
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    callback(data);
  }).catch(function(err) {
    console.log('Error ', err);
  });
};
