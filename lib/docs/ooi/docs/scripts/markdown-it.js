const _ = require('ooi');
const fs  = require('fs');
const path  = require('path');
const util  = require('./util');
const md = require('markdown-it')();

let htmlFiles = fs.readdirSync(path.resolve(__dirname, '../html/markdown-it')),
  mdFilename = path.resolve(__dirname, `../../README.md`),
  htmlFilename = path.resolve(__dirname, `../html/markdown-it/index-${htmlFiles.length + 1}.html`),
  mdCode = fs.readFileSync(mdFilename, 'utf-8'),
  htmlCode = md.render(mdCode);

fs.writeFileSync(htmlFilename, util.html(htmlCode));

console.info(`File «${htmlFilename}» created successfully!`);
