const _ = {
  isClass: require('./is-class'),
  isArray: require('./is-array'),
  extend: require('./extend'),
};

module.exports = _.extend(type, {
  
});

function type (value, skipClasses = false) {
  if (!skipClasses && value instanceof RegExp) return 'reg';
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (_.isArray(value)) return 'array';
  if (typeof value === 'number' && isNaN(value)) return 'nan';
  if (_.isClass(value)) return 'class';
  return typeof value;
}