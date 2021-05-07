const _ = require('ooi');
const path = require('path');
const Project = require('./project');
const webpack = require('./webpack');

module.exports = _.extend(docs, {
  create, Project,
  makeReadme, dump,
  webpack,
});

function docs (dirname) {
  return create(dirname);
}

function create (dirname) {
  let project = new Project(dirname);
  return project;
}

function makeReadme (dir, filename) {
  let dirname = path.resolve(dir),
    readmeFilename = path.resolve(dirname, filename),
    project = create(dirname);
  project.files.readmeFilename = readmeFilename;
  return project.makeReadme();
}

function dump (dir, filename) {
  let dirname = path.resolve(dir),
    dumpFilename = path.resolve(dirname, filename),
    project = create(dirname);
  return project.dump(dumpFilename);
}
