const _ = {
  keys: require('./keys'),
  isArray: require('./is-array'),
};

module.exports = toNameValue;

function toNameValue (...args) {
  var data = args.length === 2
      ? [args[0], args[1]]
      : args[0],
    d = data || {},
    keys = _.keys(d),
    vals = [undefined, undefined];
  if (!data) {}
  else if (typeof data !== 'object') {}
  else if (_.isArray(data)) vals = [d[0], d[1]];
  else if (typeof data === 'object' && keys.length === 1) vals = [keys[0], d[keys[0]]];
  else if (typeof data === 'object') vals = [d.key || d.name || d.k || d.n, d.value || d.val || d.v];
  return {
    name: vals[0],
    value: vals[1],
  };
}