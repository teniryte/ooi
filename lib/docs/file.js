'use strict';

const _ = require('ooi');
const path = require('path');
const fs = require('fs');
const regs = require('./regs');

const indexFilename = path.resolve(__dirname, '../../index.js'),
  indexSource = fs.readFileSync(indexFilename, 'utf-8');

class File extends _.EventEmitter {

  constructor (filename, doc) { super();
    _.define.box(this, 'meta', {
      docs: null,
      item: null,
      file: {
        filename: _.path.normalize(path.resolve(doc.files.dirname, filename)),
        relative: _.path.normalize(path.relative(doc.files.dirname, filename)),
        ext: _.path.extname(filename),
        basename: _.path.basename(filename),
        name: _.strcase.camel(
          _.path.basename(filename, _.path.extname(filename))
        ),
      },
    });
  }

  // Gettters/Setters ==========================================================

  get file () {
    return this.meta.file;
  }

  get source () {
    return this.getSource();
  }

  get docs () {
    return this.getDocs();
  }

  // Methods ===================================================================

  getDocs () {
    let item = this._getItem(),
      docs = this._getDocs(),
      info = {
        filename: this.file.filename,
        ext: this.file.ext,
        basename: this.file.basename,
        name: this.file.name,
      };
    item.docs = docs;
    item.info = info;
    return docs.map(doc => Object.assign({ item, info }, doc));
  }

  getSource () {
    if (this.meta.source) return this.meta.source;
    let source = fs.readFileSync(this.file.filename, 'utf-8');
    this.meta.source = source;
    return source;
  }

  // Implementation ============================================================

  _getItem () {
    if (this.meta.item) return this.meta.item;
    let item = {
      deps: this._getDeps(),
      name: this.file.name,
      dashed: _.path.basename(this.file.filename, this.file.ext),
      file: this.file.relative,
      hasTest: fs.existsSync(this.file.filename.replace(this.file.ext, '.test' + this.file.ext)),
      isIndex: indexSource.includes(`require('./${_.path.basename(this.file.filename, this.file.ext)}')`),
    };
    this.meta.item = item;
    return item;
  }

  _getDocs () {
    if (this.meta.docs) return this.meta.docs;
    let docs = this
      ._parseDocs()
      .map(item => this._createDoc(item))
      .sort((a, b) => a.name > b.name ? 1 : -1);
    this.meta.docs = docs;
    return docs;
  }

  _parseDocs () {
    let re = regs.doc,
      source = this.source,
      items = [],
      result = re.exec(source);
    while (result) {
      items.push(Object.assign({}, result.groups));
      result = re.exec(source);
    }
    return items;
  }

  _getDeps () {
    var deps = [],
      source = this.source,
      re = regs.require,
      result = re.exec(source);
    while (result) {
      deps.push(_.trim(result[1], './'));
      result = re.exec(source);
    }
    return deps;
  }

  _createDoc (opts) {
    let tags = opts.tags
        .split('.')
        .map(tag => tag.trim())
        .filter(tag => !!tag),
      args = (opts.args || '')
        .split(',')
        .map(arg => arg.trim())
        .filter(arg => !!arg),
      lastTag = tags[tags.length - 1],
      type = {
        'fn': 'function',
        'function': 'function',
        'method': 'method',
        'class': 'class',
        'object': 'object'
      }[lastTag] || 'function',
      dashed = _.path.basename(this.file.filename, this.file.ext),
      doc = {
        tags, args, type,
        dashed: dashed,
        section: opts.section,
        name: opts.name || '',
        result: opts.result || '',
        desc: opts.desc || '',
        code: opts.code || `import ${opts.name} from 'ooi/${dashed}';\n\nlet result = ${opts.name}(${args.join(', ')});`,
        lang: opts.lang || 'js',
      };
    return doc;
  }

}

module.exports = File;
