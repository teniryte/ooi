'use strict';

// const regs = require('./regs');
// const File = require('./file');
const path = require('path');
const Project = require('./project');

async function generateDocs (dir, filename) {
  let dirname = path.resolve(dir),
    readmeFilename = path.resolve(dirname, filename),
    project = new Project(dirname);
  project.files.readmeFilename = readmeFilename;
  return project.makeReadme();
}

module.exports = {
  generate: generateDocs,
};
