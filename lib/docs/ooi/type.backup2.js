const _ = {
  isClass: require('./is-class'),
  isArray: require('./is-array'),
  extend: require('./extend'),
  TypeManager: require('./type-manager'),
};

module.exports = _.extend(type, {
  Manager: _.TypeManager,
  manager: createManager('type'),
  create: createManager,
  createTypes,
});

function createManager (name, opts = {}) {
  const manager = new _.TypeManager(name, opts);
  // manager.create(opts);
  return manager;
}

function createTypes (opts) {
  type.manager.create(opts);
}

function type (value, skipClasses = false) {
  if (!skipClasses && value instanceof RegExp) return 'reg';
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (_.isArray(value)) return 'array';
  if (typeof value === 'number' && isNaN(value)) return 'nan';
  if (_.isClass(value)) return 'class';
  return typeof value;
}
