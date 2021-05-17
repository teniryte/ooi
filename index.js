'use strict';

require('./ipal');

const strcase = require('./strcase');

const ooi = (module.exports = {});

let files = [
  'aliases.js',
  'append.js',
  'base64.js',
  'class-meta.js',
  'class-names.js',
  'clone.js',
  'concat.js',
  'datetime.js',
  'deep-clone.js',
  'defaults.js',
  'define.js',
  'delegate.js',
  'each.js',
  'element-position.js',
  'ensure-array.js',
  'equals.js',
  'event-emitter.js',
  'exclude.js',
  'expression.js',
  'extend.js',
  'filesize.js',
  'fit.js',
  'flatten.js',
  'fn-args.js',
  'get.js',
  'hash.js',
  'id.js',
  'index-of.js',
  'index.js',
  'inspect-object.js',
  'inspect.js',
  'is-array.js',
  'is-class.js',
  'json.js',
  'keys.js',
  'list.js',
  'map.js',
  'match-tree.js',
  'parse-function.js',
  'path.js',
  'pick.js',
  'plural.js',
  'proto.js',
  'query.js',
  'random.js',
  'range.js',
  'reg.js',
  'repeat-string.js',
  'repeat.js',
  'require.js',
  'rgba.js',
  'round.js',
  'sample.js',
  'set.js',
  'sort.js',
  'strcase.js',
  'template.js',
  'to-array.js',
  'to-blob-url.js',
  'to-name-value.js',
  'trim-filename.js',
  'trim.js',
  'type-manager.js',
  'type.js',
  'unique-id.js',
  'unique.js',
  'uri.js',
  'values.js',
  'wire.js',
  'wrap.js',
];

files.forEach((file) => requireMethod(file));

function requireMethod(file) {
  try {
    let name = strcase.camel(file.slice(0, -3)),
      mod = require(`./${file}`);
    ooi[name] = mod;
    // console.log(`Module ${file} successfully loaded.`);
  } catch (err) {
    // console.log(`Module ${file} loading failed.`);
  }
}

ooi.EventEmitter = ooi.eventEmitter;
