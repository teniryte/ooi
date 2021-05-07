/** .all.options.fn
* Utils : defaults(data, defaultData) => data
* Replaces all undefined properties of data object with defaultData analog.
*/

const _ = {
  extend: require('./extend'),
  each: require('./each'),
  keys: require('./keys'),
  flatten: require('./flatten'),
  define: require('./define'),
  set: require('./set'),
  get: require('./get'),
};

module.exports = _.extend(defaults, {
  get: getProperty,
});

function defaults (o = {}, defs = {}) {
  const results = {},
    defaults = _.flatten(defs),
    opts = _.extend({}, o),
    options = _.flatten(opts);
  _.each(defaults, (val, key) => {
    let value = options.hasOwnProperty(key) ? options[key] : defaults[key];
    _.set(results, key, value);
  });
  return results;
}

function getProperty (object = {}, ks = [], defaultValue = undefined) {
  let keys = Array.isArray(ks) ? ks.slice(0) : [ks];
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (object.hasOwnProperty(key)) return object[key];
  }
  return defaultValue;
}
