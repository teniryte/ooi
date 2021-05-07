'use strict';

const _ = require('ooi');
const path = require('path');
const fs = require('fs');

const createTable = require('./table');
const File = require('./file');

class Project extends _.EventEmitter {

  constructor (dirname) { super();
    _.define.box(this, 'meta');
    _.define.box(this, 'filter', {
      include: _.reg.combine('mi', /\.js$/),
      exclude: /node_modules|\.test\.|docs|index/,
    });
    _.define.box(this, 'files', {
      dirname: _.path.normalize(dirname),
      readmeFilename: path.resolve(__dirname, '../../README.md'),
      templatesDir: path.resolve(__dirname, './templates'),
    });
    _.define.box(this, 'templates', {
      document: this.createTemplate('document.md'),
      contents: this.createTemplate('contents.md'),
      section: this.createTemplate('section.md'),
      doc: this.createTemplate('doc.md'),
    });
  }

  toJSON () {
    let index = this.getIndex(),
      sections = this.getSections();
    return {
      files: Object.assign({}, this.files),
      index: index,
      sections: sections.map(section => section.name),
    };
  }

  dump (filename) {
    fs.writeFileSync(filename, JSON.stringify(this, null, 2));
  }

  makeReadme () {
    var code = this.render();
    fs.writeFileSync(this.files.readmeFilename, code);
    return this;
  }

  render () {
    var index = this.getIndex(),
      sections = this.getSections(),
      code = this.templates.document({
        title: 'ooi',
        desc: 'JavaScript Helpers & Tools',
        contentsCode: this.templates.contents(createContext()),
        sectionsCode: sections.map(
          section => this.templates.section(createContext({
            section,
            docsCode: _.flatten(
              section.docs.map(doc => this.templates.doc(createContext(doc)))
            ).join('\n'),
          }))
        ).join('\n')
      });

    return code;

    function createContext (target, ...sources) {
      return _.extend(target, {
        index, sections,
        upMark: `⇑⇧⇯⇫⌃⏏⏶`,
        table (...rows) {
          let table = createTable(rows);
          return table.formatted;
        },
        toUri (...names) {
          return _.strcase.dash(names.join('-'));
        },
      }, ...sources);
    }
  }

  createTemplate (file) {
    let filename = path.resolve(this.files.templatesDir, file);
    return _.template(fs.readFileSync(filename, 'utf-8'));
  }

  getSections () {
    if (this.meta.sections) return this.meta.sections;
    let index = this.getIndex(),
      sections = _
        .keys(index)
        .map(section => {
          return {
            name: section,
            docs: index[section],
          };
        })
        .sort((a, b) => a.name > b.name ? 1 : -1);
    this.meta.sections = sections;
    return sections;
  }

  getIndex () {
    if (this.meta.index) return this.meta.index;
    var index = {},
      docs = this.getDocs();
    docs.forEach(doc => {
      index[doc.section] = index[doc.section] || [];
      index[doc.section].push(doc);
    });
    this.meta.index = index;
    return index;
  }

  getDocs () {
    if (this.meta.docs) return this.meta.docs;
    let files = this.getFiles(),
      docs = [];
    files.forEach(file => {
      docs = docs.concat(file.getDocs());
    });
    this.meta.docs = docs;
    return docs;
  }

  getFiles () {
    if (this.meta.files) return this.meta.files;
    let files = this
      .getPaths()
      .map(filename => new File(filename, this));
    this.meta.files = files;
    return files;
  }

  getPaths () {
    if (this.meta.paths) return this.meta.paths;
    let paths = fs
      .readdirSync(this.files.dirname)
      .filter(file => file.search(this.filter.include) > -1)
      .filter(file => file.search(this.filter.exclude) === -1)
      .map(file => _.path.normalize(path.resolve(this.files.dirname, file)));
    this.meta.paths = paths;
    return paths;
  }

}

module.exports = Project;
