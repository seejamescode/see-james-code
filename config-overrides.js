const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = function override(config, env) {
  if (env === "production") {
    config.plugins = [
      ...config.plugins.filter(
        plugin => plugin.constructor.name !== "SWPrecacheWebpackPlugin"
      ),
      new SWPrecacheWebpackPlugin({
        ...config.plugins.filter(
          plugin => plugin.constructor.name === "SWPrecacheWebpackPlugin"
        )[0].options,
        staticFileGlobs: [
          './build/index.html',
          './build/manifest.json',
          './build/service-worker.js',
          './build/*.ico',
          './build/*.png',
          './build/images/**/*.*',
          './build/static/**/*.*',
        ],
        stripPrefix: './build',
        runtimeCaching: [{
          urlPattern: new RegExp('(^https://i\.vimeocdn\.com\/|^https://cdn-images-1\.medium\.com/)'),
          handler: 'cacheFirst'
        }]
      })
    ];
  }
  return config;
};
