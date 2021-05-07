/** .all.fn
* Objects : aliases(data, { propName: [...aliases] }) => data
* Defines property aliases for object.
```js
const ooi = require('ooi');

let data = {
  one: 1,
  two: 2,
  three: 3,
};

ooi.aliases(data, {
  one: ['first', 'number1'],
  two: ['second', 'number2'],
  three: ['third', 'number3'],
});
```
*/

const _ = {
  each: require('./each'),
  extend: require('./extend'),
  flatten: require('./flatten'),
  defaults: require('./defaults'),
  type: require('./type'),
  get: require('./get'),
  set: require('./set'),
  map: require('./map'),
  keys: require('./keys'),
  trim: require('./trim'),
  ensureArray: require('./ensure-array'),
};

const state = {
  sameFlag: Object,
};

module.exports = _.extend(aliases, {
  same: state.sameFlag,
  enum: aliasesEnum,
  _create,
});

function setAliases(isEnum = false, data = {}, name = '', ...a) {
  if (_.type(name) === 'object' && arguments.length === 3) {
    _.each(name, (aliases, name) => {
      setAliases(isEnum, data, _.ensureArray(name), aliases);
    });
    return data;
  }
  var aliases = _.flatten(a);
  _.each(aliases, alias => {
    Object.defineProperty(data, alias, {
      enumerable: isEnum,
      get () {
        return data[name];
      },
      set (val) {
        data[name] = val;
      },
    });
  });
  return data;
}

function aliasesEnum(...args) {
  return setAliases(true, ...args);
}

function aliases(...args) {
  return setAliases(false, ...args);
}

function _create () {
  const opts = _.defaults(arguments, {
    enum: false,
    empty: false,
    same: state.sameFlag,
    target: {},
    source: {},
    isSame (value) {
      return this.same === value;
    },
  });
  let patches = _patch(opts.target, opts.source),
    result = opts.empty ? _.extend({}, target) : target;
  return _applyPatches(result, patches, opts.enum);
}

function _applyPatches (target = {}, patches = [], isEnum = false) {
  patches.forEach(patch => {
    _.set(target, patch.name, patch.value);
  });
  patches.forEach(patch => {
    target = setAliases(isEnum, target, patch.name, patch.aliases);
  });
  return target;
}

function _patch (dest = {}, source = {}) {
  let data = _.flatten(source);
  return _.keys(data).map(key => {
    let name = key.split('(')[0] || '',
      aliases = (key.split('(')[1] || '')
        .slice(0, -1)
        .split(',')
        .map(a => _.trim(a))
        .filter(a => !!a),
      isSame = state.isSame(data[key]),
      value = isSame ? _.get(dest, name) : data[key];
    return { key, name, aliases, isSame, dest, source, value };
  });
}
