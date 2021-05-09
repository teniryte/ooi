'use strict';

const path = require('path');
const fs = require('fs');
const markdownIt = require('markdown-it');
const styla = require('styla');
const prettier = require('markdown-it-prettier');
const Project = require('./project');
const Handlebars = require('handlebars');
const minify = require('html-minifier').minify;

function getSections(project) {
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
        code: doc.code.trim(),
        lang: doc.lang,
        file: doc.item.file,
        tags: doc.tags,
        deps: doc.item.deps,
        depsDisplay: `<code>${doc.item.deps.join('</code>, <code>')}</code>`,
        section: doc.section,
        content: '',
        call: `<strong>${doc.name}</strong> (${doc.args
          .map(arg => `${arg}`)
          .join(
            ', '
          )}) <span style="color: #aaa; font-weight: 600;"> => </span> <code>${
          doc.result
        }</code>`
      }))
    };
    list.push(sec);
  });
  return list;
}

function loadSectionContent(sections) {
  let template = Handlebars.compile(
    fs.readFileSync(path.resolve(__dirname, 'templates/section.html'), 'utf-8')
  );
  sections.forEach(section => {
    let content = template({
      section
    });
    section.content = content;
  });
}

function loadDocsContent(sections) {
  let template = Handlebars.compile(
    fs.readFileSync(path.resolve(__dirname, 'templates/doc.html'), 'utf-8')
  );
  sections.forEach(section => {
    section.docs.forEach(doc => {
      let content = template({
        doc
      });
      doc.content = content;
    });
  });
}

function getBoilerplate() {
  let filename = path.resolve(__dirname, '../../docs/index.html'),
    source = fs.readFileSync(filename, 'utf-8');
  while (source.includes('<!-- {{DEL_START}} -->')) {
    let start = source.indexOf('<!-- {{DEL_START}} -->'),
      end = source.indexOf('<!-- {{DEL_END}} -->') + 22,
      code = source.slice(start, end);
    source = source.replace(code, '');
  }
  return source;
}

function renderContents(sections) {
  let template = Handlebars.compile(
      fs.readFileSync(
        path.resolve(__dirname, 'templates/contents.html'),
        'utf-8'
      )
    ),
    code = template({
      sections
    });
  return code;
}

function renderSections(sections) {
  return sections.map(section => section.content).join('\n\n');
}

function setFilter(code) {
  let filename = path.resolve(__dirname, 'templates/filter.html'),
    source = fs.readFileSync(filename, 'utf-8');
  return code.replace('<!-- SET_FILTER -->', source);
}

function generateList(dir, filename) {
  let dirname = path.resolve(dir),
    readmeFilename = path.resolve(dirname, filename),
    project = new Project(dirname);
  project.files.readmeFilename = readmeFilename;
  project.makeReadme();
  let sections = getSections(project);
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
    code = template({
      contentsCode,
      sectionsCode
    }),
    outputFilename = path.resolve(__dirname, '../../docs/list.html'),
    boilerplate = getBoilerplate(),
    result = boilerplate.replace('<!-- {{CODE}} -->', code);
  fs.writeFileSync(outputFilename, setFilter(result));
  renderListStyles();
}

function renderListStyles() {
  let filename = path.resolve(__dirname, '../../docs/list.styl'),
    css = styla.renderFile(filename),
    outputFilename = path.resolve(__dirname, '../../docs/list.css');
  fs.writeFileSync(outputFilename, css);
}

function getStyles() {
  let markdownFilename = path.resolve(
      __dirname,
      '../../docs/source/markdown.css'
    ),
    stylesFilename = path.resolve(__dirname, '../../docs/source/styles.styl'),
    markdownCss = fs.readFileSync(markdownFilename, 'utf-8'),
    stylesCss = styla.renderFile(stylesFilename);
  return {
    markdown: markdownCss,
    styles: stylesCss
  };
}

function compressContent(source) {
  let code = source.replace(
    /\<pre\>\<code\sclass\=\"language\-([a-zA-Z0-9\-\_\$]+)\"\>([\s\S]+?)\<\/code\>\<\/pre\>/gim,
    (text, lang, source) => {
      let lines = source.split('\n'),
        code =
          lines[0] +
          '\n' +
          lines
            .slice(1)
            .map(line => line.slice(8))
            .join('\n');
      return `<pre><code class="language-${lang}">${code}</code></pre>`;
    }
  );

  return code;
}

function renderHTML() {
  let md = markdownIt('commonmark', {
    html: true,
    linkify: false,
    typographer: false,
    breaks: true,
    langPrefix: 'language-'
  });
  md.use(prettier, {
    singleQuote: false,
    tabWidth: 2
  });
  let filename = path.resolve(__dirname, '../../docs/source/index.md'),
    source = fs.readFileSync(filename, 'utf-8'),
    code = md
      .render(source)
      .split(/\n/gim)
      .map(line => `        ${line}`)
      .join('\n')
      .trim(),
    styles = getStyles(),
    markdownCss = styles.markdown
      .split(/\n/gim)
      .map(line => `          ${line}`)
      .join('\n')
      .trim(),
    stylesCss = styles.styles
      .split(/\n/gim)
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
        <link
          rel="stylesheet"
          type="text/css"
          media="all"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/monokai.min.css" />
          <script src="https://kit.fontawesome.com/479ba04dd7.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/languages/javascript.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/languages/bash.min.js"></script>
        <script>
          document.addEventListener('DOMContentLoaded', (event) => {
            document.querySelectorAll('pre code').forEach((block) => {
              hljs.highlightBlock(block);
            });
          });
        </script>
      `,
      code: `
        <style>
          ${markdownCss}
        </style>
        <style>
          ${stylesCss}
        </style>
      `
    },
    marker = ['⏹️'][0],
    stylesCode = [css.links, css.code],
    favicon = (source.split('<!-- favicon: ')[1] || '').split(' -->')[0] || '',
    result = code
      .replace(/\sdata-a="([a-zA-Z0-9-_$]+)">/gim, `> <a name="$1"></a>`)
      .replace(/\{\{marker\}\}/gim, marker),
    html = compressContent(
      [
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
        `    <script src="./filter.js"></script>`,
        `  </body>`,
        `</html>`
      ].join('\n')
    ),
    linksHTML = html.replace('{{STYLES}}', stylesCode[0]),
    codeHTML = html.replace('{{STYLES}}', stylesCode[1]),
    outputLinks = path.resolve(__dirname, '../../docs/index.html'),
    outputCode = path.resolve(__dirname, '../../docs/compiled.html');
  fs.writeFileSync(outputLinks, linksHTML);
  fs.writeFileSync(outputCode, codeHTML);
}

function renderStyles() {
  let filename = path.resolve(__dirname, '../../docs/source/styles.styl'),
    css = styla.renderFile(filename),
    outputFilename = path.resolve(__dirname, '../../docs/styles.css');
  fs.writeFileSync(outputFilename, css);
}

function generateIndex() {
  renderHTML();
  renderStyles();
}

module.exports = {
  index: generateIndex,
  list: generateList
};
