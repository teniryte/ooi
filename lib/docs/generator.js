'use strict';

const path = require('path');
const fs = require('fs');
const markdownIt = require('markdown-it');
const styla = require('styla');
const prettier = require('markdown-it-prettier');
const chokidar = require('chokidar');
const Project = require('./project');

async function generateList (dir, filename) {
  let dirname = path.resolve(dir),
    readmeFilename = path.resolve(dirname, filename),
    project = new Project(dirname);
  project.files.readmeFilename = readmeFilename;
  project.makeReadme();
  let source = fs.readFileSync(readmeFilename, 'utf-8');
  // let md = markdownIt('commonmark', {
  //   html: true,
  //   linkify: false,
  //   typographer: false,
  //   breaks: true,
  //   langPrefix: 'language-',
  // });
  // md.use(prettier, { singleQuote: false, tabWidth: 2 });
  // let code = md
  //     .render(source)
  //     .split(/\n/mgi)
  //     .map(line => `        ${line}`)
  //     .join('\n')
  //     .trim();
  let outputFilename = path.resolve(__dirname, '../../docs/list.html'),
    html = [
      `<!doctype html>`,
      `<html>`,
      `  <head>`,
      `    <title>ooi — JavaScript Utility & Tools Library</title>`,
      `    <link rel="icon" type="image/png" href="https://cdn.sencort.com/icons/sencort/logo.png" />`,
      `    <link rel="stylesheet" href="./markdown.css" />`,
      `    <link rel="stylesheet" href="./list.css" />`,
      `  </head>`,
      `  <body>`,
      `    <div class="markdown-body">`,
      `      <div class="forum-teniryte">`,
      `        ${source}`,
      `      </div>`,
      `    </div>`,
      `  </body>`,
      `</html>`,
    ].join('\n');
  fs.writeFileSync(outputFilename, html);
  await renderListStyles();
}

async function renderListStyles () {
  let filename = path.resolve(__dirname, '../../docs/list.styl'),
    css = styla.renderFile(filename),
    outputFilename = path.resolve(__dirname, '../../docs/list.css');
  fs.writeFileSync(outputFilename, css);
}

async function getStyles () {
  let markdownFilename = path.resolve(__dirname, '../../docs/source/markdown.css'),
    stylesFilename = path.resolve(__dirname, '../../docs/source/styles.styl'),
    markdownCss = fs.readFileSync(markdownFilename, 'utf-8'),
    stylesCss = styla.renderFile(stylesFilename);
  return { markdown: markdownCss, styles: stylesCss };
}

async function renderHTML() {
  let md = markdownIt('commonmark', {
    html: true,
    linkify: false,
    typographer: false,
    breaks: true,
    langPrefix: 'language-',
  });
  md.use(prettier, { singleQuote: false, tabWidth: 2 });
  let filename = path.resolve(__dirname, '../../docs/source/index.md'),
    source = fs.readFileSync(filename, 'utf-8'),
    code = md
      .render(source)
      .split(/\n/mgi)
      .map(line => `        ${line}`)
      .join('\n')
      .trim(),
    styles = await getStyles(),
    markdownCss = styles.markdown
      .split(/\n/mgi)
      .map(line => `          ${line}`)
      .join('\n')
      .trim(),
    stylesCss = styles.styles
      .split(/\n/mgi)
      .map(line => `          ${line}`)
      .join('\n')
      .trim(),
    css = {
      links: `
        <link
          rel="stylesheet"
          type="text/css"
          media="all"
          href="./markdown.css" />
        <link
          rel="stylesheet"
          type="text/css"
          media="all"
          href="./styles.css" />
      `,
      code: `
        <style>
          ${markdownCss}
        </style>
        <style>
          ${stylesCss}
        </style>
      `,
    },
    marker = ['⏹️'][0],
    stylesCode = [css.links, css.code],
    favicon = (source.split('<!-- favicon: ')[1] || '').split(' -->')[0] || '',
    result = code
      .replace(/\sdata-a="([a-zA-Z0-9-_$]+)">/mgi, `> <a name="$1"></a>`)
      .replace(/\{\{marker\}\}/mgi, marker),
    html = [
      `<!doctype html>`,
      `<html>`,
      `  <head>`,
      `    <title>ooi — JavaScript Utility & Tools Library</title>`,
      `    <link rel="icon" type="image/png" href="${favicon}" />`,
      `    {{STYLES}}`,
      `  </head>`,
      `  <body>`,
      `    <div class="markdown-body">`,
      `      <div class="forum-teniryte">`,
      `        ${result}`,
      `      </div>`,
      `    </div>`,
      `  </body>`,
      `</html>`,
    ].join('\n'),
    linksHTML = html.replace('{{STYLES}}', stylesCode[0]),
    codeHTML = html.replace('{{STYLES}}', stylesCode[1]),
    outputLinks = path.resolve(__dirname, '../../docs/index.html'),
    outputCode = path.resolve(__dirname, '../../docs/compiled.html');
  fs.writeFileSync(outputLinks, linksHTML);
  fs.writeFileSync(outputCode, codeHTML);
}

async function renderStyles() {
  let filename = path.resolve(__dirname, '../../docs/source/styles.styl'),
    css = styla.renderFile(filename),
    outputFilename = path.resolve(__dirname, '../../docs/styles.css');
  fs.writeFileSync(outputFilename, css);
}

async function generateIndex() {
  await renderHTML();
  await renderStyles();
}

module.exports = {
  index: generateIndex,
  list: generateList,
};
