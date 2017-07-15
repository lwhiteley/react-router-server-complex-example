import { DefinePlugin } from 'webpack';
import path from 'path';
import StatsPlugin from 'stats-webpack-plugin';
import fs from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const nodeModules = {};
fs
  .readdirSync(path.join(__dirname, 'node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = `commonjs ${mod}`);

const extractTextPlugin = new ExtractTextPlugin('[name].css');
extractTextPlugin.options.allChunks = true;

const config = server => ({
  entry: {
    app: [
      'babel-polyfill',
      path.join(__dirname, 'src/client', server ? 'app.js' : 'client.js'),
    ],
  },

  output: {
    path: server
      ? path.join(__dirname, 'build', 'server')
      : path.join(__dirname, 'build', 'public'),
    filename: '[name].js',
    chunkFilename: '[id].[hash].js',
    publicPath: '/',
    libraryTarget: server ? 'commonjs2' : 'var',
  },

  externals: server ? nodeModules : {},

  devtool: 'source-map',

  ...(server ? { target: 'node' } : {}),

  resolve: {
    modules: [
      'node_modules', 
      path.resolve('.', 'node_modules')
    ],
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      './client-logger': path.resolve('.', 'src/client/helpers/logger')
    }
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        loader: extractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'less-loader']}),
      },
      { test: /\.css$/, loader: extractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test: /\.(gif|png|jpg)$/, loader: 'file-loader' },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url-loader',
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'BASE_URL': JSON.stringify(process.env.BASE_URL),
          'ADMIN_EMAIL': JSON.stringify(process.env.ADMIN_EMAIL),
          'RUNTIME_ENV': JSON.stringify(server ? 'server': 'client'),
      },
    }),
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules/],
    }),
    extractTextPlugin,
  ],
});

module.exports = [config(true), config(false)];
