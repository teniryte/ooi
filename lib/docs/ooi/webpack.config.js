const _ = {
  path: require('./path'),
};
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

let context = path.resolve(__dirname, '..');

const CONFIG = {

  mode: 'development',
  // mode: 'production',
  // mode: 'none',

  context: context,

  entry:{

  },

  output: {
    path: path.resolve(context, 'dist'),
    filename: '[name].ooi.js',
    // library: 'ooi',
    // libraryTarget: 'var',
    // libraryExport: 'default',
  },

};

module.exports = CONFIG;
