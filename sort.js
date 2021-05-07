const _ = {
  extend: require('./extend'),
  keys: require('./keys'),
  isArray: require('./is-array'),
};

module.exports = _.extend(sort, {
  by: sortBy,
});

function sort (data, deep = false, skipArrays = false) {
  var result = {};
  if (!data || typeof data !== 'object') return data;
  if (!skipArrays && _.isArray(data)) return deep
    ? data.sort().map(item => sort(item))
    : data.sort();
  if (skipArrays && _.isArray(data)) return data;
  _
    .keys(data)
    .sort()
    .forEach(key => {
      result[key] = deep ? sort(data[key], deep, skipArrays) : data[key];
    });
  return result;
}

function sortBy (items, prop) {
  var fn = typeof prop === 'function' ? prop : function (a, b) {
      if (!prop) return a > b ? 1 : -1;
      var key = prop[0] === '-' ? prop.slice(1) : prop;
      return a[key] > b[key] ? 1 : -1;
    },
    result = items.slice(0).sort(fn);
  return prop && prop[0] === '-'
    ? result.reverse()
    : result;
}