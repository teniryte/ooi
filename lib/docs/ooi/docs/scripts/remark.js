const _ = require('ooi');
const fs  = require('fs');
const path  = require('path');
const remark = require('remark');
const recommended = require('remark-preset-lint-recommended');
const html = require('remark-html');
const report = require('vfile-reporter');
const util = require('./util');

let mdFilename = path.resolve(__dirname, '../../README.md'),
  htmlDir = path.resolve(__dirname, '../html/remark'),
  htmlFiles = fs.readdirSync(htmlDir),
  htmlFilename = path.resolve(__dirname, `../html/remark/index-${htmlFiles.length + 1}.html`),
  mdCode = fs.readFileSync(mdFilename, 'utf-8');

remark()
  .use(recommended)
  .use(html)
  .process(mdCode, (err, file) => {
    fs.writeFileSync(htmlFilename, util.html(file + ''));
    console.info(`File «${htmlFilename}» created successfully!`);
  });
