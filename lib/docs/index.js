'use strict';

// const regs = require('./regs');
// const File = require('./file');
const path = require('path');
const fs = require('fs');
const Project = require('./project');
const generator = require('./generator');
const chokidar = require('chokidar');
const files = [
  path.resolve(__dirname, '../../docs/source/index.md'),
  path.resolve(__dirname, '../../docs/source/markdown.css'),
  path.resolve(__dirname, '../../docs/source/styles.styl'),
  path.resolve(__dirname, '../../docs/source/variables.styl'),
  path.resolve(__dirname, '../../docs/list.html'),
  path.resolve(__dirname, '../../docs/list.styl'),
  path.resolve(__dirname, '../../docs/filter.js'),
];

const state = {
  source: '',
};

async function generate(dir, filename) {
  chokidar
    .watch(files)
    .on('all', () => {
      if (!isFilesChanged()) return;
      console.log('Updating index...');
      generator.index();
      generator.list(dir, filename);
      console.log('Index updated.');
    });
}

module.exports = {
  generate,
};

function isFilesChanged() {
  let source = '';
  files.forEach(filename => {
    source += fs.readFileSync(filename, 'utf-8');
  });
  if (source === state.source) {
    state.source = source;
    return false;
  } else {
    state.source = source;
    return true;
  }
}
