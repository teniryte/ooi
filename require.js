'use strict';

const _ = {
  each: require('./each'),
};

function requireModules(...args) {
  let lib = {},
    modules = args.length === 1 && typeof args[0] === 'object' ? args[0] : args;
  _.each(modules, (name, alias) => {
    if (typeof alias === 'number') alias = name;
    lib[alias] = require(`./${name}.js`);
  });
  return lib;
}

module.exports = requireModules;
