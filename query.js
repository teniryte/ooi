const _ = {
  extend: require('./extend'),
  flatten: require('./flatten'),
};

_.extend(query, {
  parse, stringify,
});

module.exports = query;

/** .all.fn
* Convert : query(string | object) => object | string
* If receives not URI string, returns parsed query object. If receives object, returns stringified query url.
*/
function query(...args) {
  return typeof args[0] === 'string'
    ? (args[0].startsWith('http') ? basename(args[0]) : parse(...args))
    : stringify(...args);
}

/** .all.fn
* Convert : parse(string) => object
* Parse url query string.
*/
function parse(s, spl = '&') {
  var str = s.split('?').pop(),
    pairs = str.split(spl).map(s => s.trim().split('=')),
    data = {};
  if (!s) return {};
  pairs.forEach(pair => {
    var n = pair[0],
      name = n.endsWith('[]') ? n.slice(0, -2) : n,
      val = pair[1];
    if (data[name] && !Array.isArray(data[name])) {
      data[name] = [data[name]];
    }
    if (Array.isArray(data[name]) && n.endsWith('[]')) {
      return data[name].push(JSON.parse(decodeURIComponent(val)));
    }
    val = decodeURIComponent(val);
    try {
      val = JSON.parse(val);
    } catch(err) {}
    data[name] = val;
  });
  return _.flatten.unflatten(data);
}

/** .all.fn
* Convert : stringify(object) => string
* Stringifies plain object into query url.
*/
function stringify(d, spl = '&') {
  var data = _.flatten(d, undefined, true);
  return Object
    .keys(data)
    .sort()
    .map(key => {
      var val = data[key];
      if (Array.isArray(val)) {
        return val
          .map(v => `${key}[]=${encodeURIComponent(v)}`)
          .join(spl);
      }
      return `${key}=${encodeURIComponent(val)}`;
    })
    .join(spl);
}
