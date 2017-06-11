var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
var cssModulesIdentName = '[name]__[local]__[hash:base64:5]';

if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[hash:base64]';
}

const extractTextPlugin = new ExtractTextPlugin('[name].css');
extractTextPlugin.options.allChunks = true;

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: extractTextPlugin.extract(['css-loader']) },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000',
      },
    ],
  },
  plugins: [
    extractTextPlugin,
    // new StatsPlugin('stats.json', {
    //   chunkModules: true,
    //   exclude: [/node_modules/]
    // }),
  ]
  
};
