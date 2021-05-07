const _ = {
  each: require('./each'),
  toNameValue: require('./to-name-value'),
  keys: require('./keys'),
};

module.exports = pick;

function pick (data = {}, predicate = [], bindMethods = false) {
  var result = {},
    names = typeof predicate === 'function'
      ? _
        .keys(data)
        .filter(key => !!predicate(data[key], key, data))
      : predicate;
  _.each(names, name => {
    var val = data[name];
    if (typeof bindMethods === 'function') {
      let mod = _.toNameValue(bindMethods(val, name));
      name = mod.name;
      val = mod.value;
    } else if (bindMethods && typeof val === 'function')
      val = val.bind(data);
    result[name] = val;
    if (!data.hasOwnProperty(name)) return;
    delete data[name];
  });
  return result;
}