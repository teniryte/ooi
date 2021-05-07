/** .all.copy.fn
 * Collections : clone(data) => data
 * Shallow copy of object.
 */

const _ = {
  each: require('./each'),
  extend: require('./extend'),
  deepClone: require('./deep-clone'),
};

module.exports = _.extend(clone, {
  deep: _.deepClone,
});

function clone(data) {
  if (!data) return data;
  if (typeof data !== 'object') return data;
  var result = {};
  if (Array.isArray(data)) {
    return data.slice(0);
  }
  _.each(data, (value, key) => {
    result[key] = value;
  });
  return result;
}
