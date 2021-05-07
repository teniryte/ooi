'use strict';

const path = require('path');
const fs = require('fs');
const markdownIt = require('markdown-it');
const styla = require('styla');
const prettier = require('markdown-it-prettier');
const chokidar = require('chokidar');
const Project = require('./project');
const util = require('util');
const Handlebars = require('handlebars');

function getSections (project) {
  let sections = project.getSections(),
    list = [];
  sections.forEach(section => {
    let sec = {
      name: section.name,
      lowerName: section.name.toLowerCase(),
      docs: section.docs.map(doc => ({
        name: doc.name,
        dashedName: doc.dashed,
        type: doc.type,
        desc: doc.desc,
        code: doc.code,
        lang: doc.lang,
        file: doc.item.file,
        tags: doc.tags,
        deps: doc.item.deps,
        section: doc.section,
        content: '',
        call: `${doc.name}(${doc.args.map(arg => `${arg}`).join(', ')}) <span style="color: #666;">=></span> <span style="color: #0087e0;">${doc.result}</span>`,
      })),
    };
    list.push(sec);
  });
  return list;
}

function loadSectionContent (sections) {
  let template = Handlebars.compile(
    fs.readFileSync(
      path.resolve(__dirname, 'templates/section.html'),
      'utf-8'
    )
  );
  sections.forEach(section => {
    let content = template({ section });
    section.content = content;
  });
}

function loadDocsContent (sections) {
  let template = Handlebars.compile(
    fs.readFileSync(
      path.resolve(__dirname, 'templates/doc.html'),
      'utf-8'
    )
  );
  sections.forEach(section => {
    section.docs.forEach(doc => {
      let content = template({ doc });
      doc.content = content;
    });
  });
}

function getBoilerplate () {
  let filename = path.resolve(__dirname, '../../docs/index.html'),
    source = fs.readFileSync(filename, 'utf-8');
  while (source.includes('<!-- {{DEL_START}} -->')) {
    let start = source.indexOf('<!-- {{DEL_START}} -->'),
      end = source.indexOf('<!-- {{DEL_END}} -->') + 22,
      code = source.slice(start,end);
    source = source.replace(code, '');
  }
  return source;
}

function renderContents (sections) {
  let template = Handlebars.compile(
      fs.readFileSync(
        path.resolve(__dirname, 'templates/contents.html'),
        'utf-8'
      )
    ),
    code = template({ sections });
  return code;
}

function renderSections (sections) {
  return sections.map(section => section.content).join('\n\n');
}

async function generateList (dir, filename) {
  let dirname = path.resolve(dir),
    readmeFilename = path.resolve(dirname, filename),
    project = new Project(dirname);
  project.files.readmeFilename = readmeFilename;
  project.makeReadme();
  let source = fs.readFileSync(readmeFilename, 'utf-8'),
    sections = getSections(project);
  loadDocsContent(sections);
  loadSectionContent(sections);
  let contentsCode = renderContents(sections),
    sectionsCode = renderSections(sections),
    template = Handlebars.compile(
      fs.readFileSync(
        path.resolve(__dirname, 'templates/document.html'),
        'utf-8'
      )
    ),
    code = template({ contentsCode, sectionsCode }),
    outputFilename = path.resolve(__dirname, '../../docs/list.html'),
    boilerplate = getBoilerplate(),
    result = boilerplate.replace('<!-- {{CODE}} -->', code);
  fs.writeFileSync(outputFilename, result);
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
        <link
          rel="stylesheet"
          type="text/css"
          media="all"
          href="./list.css" />
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
