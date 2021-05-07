/** .all.fn
* Objects : extend(target, ...sources) => object
* Extends `target` object with properties of sources objects.
*/

const _ = {
  each: require('./each'),
  set: require('./set'),
  get: require('./get'),
  flatten: require('./flatten'),
};

module.exports = extend(extend, {
  undefined: extendUndefined,
  deep: extendDeep,
});

function extend (dest, ...sources) {
  var items = sources.map(s => !s ? {} : s);
  return Object.assign(dest || {}, ...items);
}

/** .all
* Objects : extend.deep(target, ...sources) => object
* Extends `target` object with properties of sources objects (deep extending).
*/
function extendDeep (dest, ...sources) {
  var flatDest = _.flatten(dest, null, true),
    flatSources = sources.map(source => _.flatten(source, null, true));
  _.each(flatSources, source => {
    _.each(source, (value, key) => {
      let current = flatDest[key];
      if (Array.isArray(current)) {
        value = current
          .map((val, index) =>
          value[index] === undefined
            ? val
            : value[index]);
      }
      flatDest[key] = value;
    });
  });
  return _.flatten.unflatten(flatDest);
}

function extendUndefined(dest, ...sources) {
  var flatDest = _.flatten(dest),
    flatSources = sources.map(source => _.flatten(source));
  _.each(flatSources, source => {
    _.each(source, (value, key) => {
      if (flatDest[key] !== undefined) return;
      flatDest[key] = value;
    });
  });
  return _.flatten.unflatten(flatDest);
}
