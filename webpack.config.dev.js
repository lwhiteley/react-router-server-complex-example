var webpack = require('webpack');
const path = require('path');
const StatsPlugin = require('stats-webpack-plugin');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeModules = {};
fs.readdirSync(path.join(__dirname, 'node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = `commonjs ${mod}`);

const extractTextPlugin = new ExtractTextPlugin('[name].css');
extractTextPlugin.options.allChunks = true;

const config = server => ({
  entry: {
    app: [
      'eventsource-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack-dev-server/client?http://localhost:3001',
      'webpack/hot/dev-server',
      path.join(__dirname, 'src/client', (server ? 'app.js' : 'client.js')),
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },

  output:{
    path: server ? path.join(__dirname, 'build', 'server') : path.join(__dirname, 'build', 'public'),
    filename: '[name].js',
    chunkFilename: '[id].[hash].js',
    publicPath: '/',
    libraryTarget: (server ? 'commonjs2' : 'var')
  },

  externals: (server ? nodeModules : {}),

  devtool: 'source-map',

//   ...(server ? {target: 'node'} : {}),

  resolve: {
    extensions: ['.js', '.jsx'],
     modules: [
      'src/client',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      { test: /\.css$/, loader: extractTextPlugin.extract(['css-loader']) },
      { test: /\.(gif|png|jpg)$/, loader: 'file-loader' }
    ]
  },
  devServer: {
    hot: true, // Tell the dev-server we're using HMR
    port: 3001,

    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'build/public'),
    publicPath: '/',
    proxy: {
        '*': 'http://localhost:3000'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
     new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules/]
    }),
    extractTextPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    }),
  ]
});

module.exports = config(false);
