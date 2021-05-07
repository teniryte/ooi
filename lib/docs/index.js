'use strict';

// const regs = require('./regs');
// const File = require('./file');
const path = require('path');
const Project = require('./project');
const generator = require('./generator');

async function generate (dir, filename) {
  console.log(`Generating index...`);

  generator.index();

  console.log(`Index generated!`);
  console.log(`Generating list...`);

  generator.list(dir, filename);

  console.log(`List generated!`);
}

module.exports = {
  generate,
};
