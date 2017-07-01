/**
 * Created by layton on 6/18/17.
 */

require('dotenv').config();

global.window = {};
let server = null;

if (process.env.NODE_ENV !== 'production') {
//   process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
//   process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));
    // In production, serve the webpacked server file.
//   require('./dist/server.bundle.js');
    // Babel polyfill to convert ES6 code in runtime
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    const register = {
        'plugins': [
            [
                'system-import-transformer',
                'babel-plugin-webpack-loaders',
                {
                    config: './webpack.config.babel.js',
                    verbose: false,
                },
            ],
        ],
    };
    require('babel-register')(register);
    require('babel-polyfill');
    server = require('./src');
}

module.exports = server;