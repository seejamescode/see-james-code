export function github(callback) {
  fetch('/api/github', {
    credentials: 'same-origin',
  })
  .then(response => response.json())
  .then((data) => {
    callback(data);
  })
  .catch((err) => {
    console.error('Error ', err);
  });
}

export function medium(callback) {
  fetch('/api/medium')
  .then(response => response.json())
  .then((data) => {
    const posts = Object.keys(data.payload.references.Post)
      .map(k => data.payload.references.Post[k]);

    callback(posts);
  })
  .catch((err) => {
    console.error('Error ', err);
  });
}

export function twitter(callback) {
  fetch('/api/twitter')
  .then(response => response.json())
  .then((data) => {
    callback(data);
  })
  .catch((err) => {
    console.error('Error ', err);
  });
}

export function vimeo(callback) {
  fetch('/api/vimeo')
  .then(response => response.json())
  .then((data) => {
    callback(data);
  })
  .catch((err) => {
    console.error('Error ', err);
  });
}
