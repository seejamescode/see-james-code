export function githubPersonalRepos(callback) {
  fetch('/api/github/users/yepnamesjames/repos', {
    credentials: 'same-origin',
  })
  .then(response => response.json())
  .then(data => {
    callback(data);
  })
  .catch(err => {
    console.log('Error ', err);
  });
}

export function mediumLatestPosts(callback) {
  fetch('/api/medium/@pnowelldesign/latest')
  .then(response => response.json())
  .then(data => {
    callback(data.payload);
  })
  .catch(err => {
    console.log('Error ', err);
  });
}

export function twitterLatestTweets(callback) {
  fetch('/api/twitter/statuses/user_timeline')
  .then(response => response.json())
  .then(data => {
    callback(data);
  })
  .catch(err => {
    console.log('Error ', err);
  });
}
