const _ = {
  each: require('./each'),
  flatten: require('./flatten'),
  set: require('./set'),
};

module.exports = exclude;

function exclude (data = {}, list = [], bindMethods = false) {
  var result = {};
  _.each(_.flatten(data), (value, path) => {
    if (list.includes(path)) return;
    if (bindMethods) value = value.bind(data);
    _.set(result, path, value);
  });
  return result;
}