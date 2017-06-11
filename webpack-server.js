var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
  hot: true,
  publicPath: config.output.publicPath
}).listen(3001, 'localhost');