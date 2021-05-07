const _ = {
  extend: require('./extend'),
  each: require('./each'),
  isArray: require('./is-array'),
  toArray: require('./to-array'),
};

module.exports = _.extend(map, {
  property: mapProperty,
  array: mapArray,
  object: mapObject,
});

function map (value, cb) {
  if (!value || !cb || typeof value !== 'object') {
    return value;
  }
  if (_.isArray(value)) {
    return mapArray(_.toArray(value), cb);
  }
  return mapObject(value, cb);
}

function mapArray (items, cb) {
  return items.map(cb);
}

function mapObject (data, cb) {
  var changes = {};
  _.each(data || {}, (value, key) => {
    changes[key] = cb(value, key);
  });
  return _.extend(data, changes);
}

function mapProperty (items, name, cb) {
  return items.map(item => {
    item[name] = cb(item[name]);
    return item;
  });
}