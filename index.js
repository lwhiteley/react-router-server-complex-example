/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {
//   process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
//   process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));
  // In production, serve the webpacked server file.
//   require('./dist/server.bundle.js');
} else {
  // Babel polyfill to convert ES6 code in runtime
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  const register = {
    "plugins": [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./webpack.config.babel.js",
          "verbose": false
        }
      ]
    ]
  }
  require('babel-register')(register);
  require('babel-polyfill');

  require('./src/server');
}
