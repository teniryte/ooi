'use strict';

const path = require('path');
const webpack = require('webpack');

const CONFIG = {
  mode: 'development',

  context: __dirname,

  entry: {
    app: [path.resolve(__dirname, 'src/index.js')],
  },

  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'ooi.test.js',
  },

  resolve: {
    alias: {
      __dirname,
      src: path.resolve(__dirname, './src/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('styla-loader'),
            options: {
              paths: [],
              imports: [path.resolve(__dirname, './src/components/theme.styl')],
            },
          },
        ],
      },
      {
        test: /\.yaml$/,
        use: [
          {
            loader: 'xyaml-loader',
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.css/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
          },
        ],
      },
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['@babel/react'],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties'],
          ],
          cacheDirectory: true,
        },
      },
    ],
  },

  plugins: [],

  devtool: 'eval-source-map',
};

module.exports = CONFIG;
