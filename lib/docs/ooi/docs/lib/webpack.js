const _ = {
  extend: require('ooi/extend'),
  each: require('ooi/each'),
  path: require('ooi/path'),
  flatten: require('ooi/flatten'),
  define: require('ooi/define'),
  strcase: require('ooi/strcase'),
  EventEmitter: require('ooi/event-emitter'),
};
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
var tmp = require('tmp');

const state = {
  CONFIG: require('../../webpack.config.js'),
};

class Pack extends _.EventEmitter {

  constructor (keys = {}) { super();
    this.keys = [];
    this.dirname = __dirname;
    this.temp = null;
    this.keys = keys;
    this.dirname = state.CONFIG.context;
  }

  getConfig (out) {
    let filename = this.createIndex(),
      output = path.resolve(out),
      outputDir = path.dirname(output),
      outputFilename = path.basename(output),
      config = {
        ...state.CONFIG,
        entry: filename,
        output: {
          path: outputDir,
          filename: outputFilename,
        },
      };
    return config;
  }

  webpack (out, onSuccess = () => '', onError = () => '') {
    let config = this.getConfig(out);
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        return onError(err, stats);
      }
      console.info(`File «${out}» compiled successfully!`);
      this.clearTemp();
      onSuccess(stats);
    });
  }

  getTempFilename () {
    return this.temp.name;
  }

  clearTemp () {
    this.temp.removeCallback();
    this.temp = null;
  }

  createTemp () {
    this.temp = tmp.fileSync({ prefix: 'ooi-', postfix: '.js' });
    return this.temp.name;
  }

  compileIndex () {
    let items = this.keys
      .map(key => ({
        key: key,
        path: `../../${key}`,
        file: `./${key}.js`,
        filename: path.resolve(this.dirname, `./${key}.js`),
      }))
      .map(item =>
        `${_.strcase.camel(item.key)}: require('${_.path.normalize(item.filename)}'),`),
      filename = this.createTemp(),
      code = ``
        + `const ooi = {\n  ${items.join('\n  ')}\n};`
        + `try { window.ooi = window.ooi || {}; ooi = Object.assign(window.ooi, ooi); } catch (err) {};`
        + `try { window._ = ooi; } catch (err) {};`
        + `module.exports = ooi;`;
      return code;
  }

  createIndex () {
    let code = this.compileIndex(),
      filename = this.createTemp();
    fs.writeFileSync(filename, code);
    return filename;
  }

  resolve (file) {
    return path.resolve(this.dirname, file);
  }

  getEntry () {
    return {};
  }

  getOutput () {
    return {};
  }

}

module.exports = _.extend(compile, {
  create,
});

function create (...ks) {
  let keys = _.flatten.array(ks),
    pack = new Pack(keys);
  return pack;
}

function compile (filename, ...keys) {
  return new Promise((resolve, reject) => {
    let pack = new Pack(_.flatten.array(keys));
    pack.webpack(filename, (stats) => resolve(stats), (err, stats) => reject(err));
  });
}
