'use strict';

module.exports = get;

function get(obj, p, defaultValue = undefined) {
  var current = obj,
    names = p.split('.'),
    name;
  for (var i = 0; i < names.length - 1; i++) {
    name = names[i];
    if (typeof current[name] !== 'object' || current[name] === null) {
      return defaultValue;
    }
    current = current[name];
  }
  return current[names.pop()];
}
