const path = require('path');

const docs = require('../lib');

let dirname = path.resolve(__dirname, '../..'),
  readmeFilename = path.resolve(dirname, 'README.md');

console.log('DIRNAME', dirname);

console.info(`Make README.md started...`);

docs.makeReadme(dirname, readmeFilename);

console.info('README.md created successfully!');
