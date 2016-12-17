module.exports = {
  stripPrefix: 'dist/',
  staticFileGlobs: [
    'dist/**.*',
    'public/**.*',
    '/*.html'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'dist/service-worker.js'
};
