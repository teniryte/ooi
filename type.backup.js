const _ = {
  isClass: require('./is-class'),
  isArray: require('./is-array'),
  extend: require('./extend'),
  TypeManager: require('./type-manager'),
};

const state = {
  types: {
    'reg': {
      test: value => value instanceof RegExp,
      skip: ['object'],
    },
    'null': {
      test: value => value === null,
      skip: ['falsy'],
    },
    'undefined': {
      test: value => value === null,
      skip: ['falsy'],
    },
    'array': {
      test: value => _.isArray(value),
      skip: ['object'],
    },
    'nan': {
      test: value => typeof value === 'number' && isNaN(value),
      skip: ['number', 'falsy'],
    },
    'class': {
      test: value => _.isClass(value),
      skip: ['function'],
    },
    'number': {
      test: typeof value === 'number' && !isNaN(value),
    },
    'string': {
      test: typeof value === 'string',
    },
    'boolean': {
      test: typeof value === 'boolean',
    },
    'function': {
      test: typeof value === 'function',
    },
    'object': {
      test: typeof value === 'object' && !_.isArray(value),
    },
    'falsy': {
      test: value => !value,
    },
  },
};

module.exports = _.extend(type, {

});

function type (...args) {
  return args.length > 1 ? getTypes(...args) : getType(...args);
}

function skip () {}

function getType (value, skipClasses = false) {
  if (!skipClasses && value instanceof RegExp) return 'reg';
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (_.isArray(value)) return 'array';
  if (typeof value === 'number' && isNaN(value)) return 'nan';
  if (_.isClass(value)) return 'class';
  return typeof value;
}

function getTypes (values, skipClasses = false) {
  return values.map(getType);
}
