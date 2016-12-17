module.exports = {
  stripPrefix: 'dist/',
  staticFileGlobs: [
    'dist/*.html',
    'dist/**/!(*map*)',
    'public/manifest.json',
    'public/icon.png'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'dist/service-worker.js'
};
