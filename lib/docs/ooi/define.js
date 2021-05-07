const _ = {
  each: require('./each'),
  extend: require('./extend'),
  flatten: require('./flatten'),
  set: require('./set'),
  range: require('./range'),
};

module.exports = _.extend(define, {
  prop: defineProp,
  box: defineBox,
});

function define () {

}

/** .all.meta.objects
* Objects : define.box(object, name[, isEnumerable]) => data
* Defines new virtual property on object and serves it by property name. If the property gets assigned — new object deep merges with existing.
*/
function defineBox (...args) {
  const [object, name, initValue, enumerable] = _parseBoxArgs(args),
    box = _.extend({}, initValue);
  defineProp({
    object, name, enumerable,
    get () {
      return box;
    },
    set (data) {
      if (!data || typeof data !== 'object' || Array.isArray(data)) return box;
      _.each(_.flatten(data), (value, key) => {
        _.set(box, key, value);
      });
      return box;
    },
  });
  return box;
}

function _parseBoxArgs (args) {
  let opts = {
    'undefined': [{}, false],
    'boolean': [args[3] || {}, !!args[2]],
    'object': [args[2] || {}, !!args[3]]
  };
  return [
    args[0],
    args[1],
    ...opts[typeof args[2]]
  ];
}

/** .all.meta.objects
* Objects : define.prop({ object, name, value, get, set,configurable, enumerable, writable }) => object
* Defines new property on object.
*/
function defineProp (opts = {}) {
  var {
      object,
      name, value,
      get, set,
      configurable, enumerable, writable
    } = opts,
    desc = {};
  if (value !== undefined) desc.value = value;
  if (configurable !== undefined) desc.configurable = configurable;
  if (enumerable !== undefined) desc.enumerable = enumerable;
  if (writable !== undefined) desc.writable = writable;
  if (typeof get === 'function') desc.get = get;
  if (typeof set === 'function') desc.set = set;
  Object.defineProperty(object, name, desc);
  return object;
}
