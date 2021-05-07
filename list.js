/** .all.fn
* Arrays : list(...array) => new List(...array)
* Creates List object (extends Array) with additional list methods.
*/

const _ = {
  define: require('./define'),
  keys: require('./keys'),
  extend: require('./extend'),
  each: require('./each'),
  defaults: require('./defaults'),
  values: require('./values'),
  flatten: require('./flatten'),
  strcase: require('./strcase'),
  range: require('./range'),
  EventEmitter: require('./event-emitter'),
};

const state = {
  defaultOptions: {
    beginShift: 0,
    endShift: Infinity,
    count: null,
  },
  defaultCondition: val => !!val,
  defaultArguments: _
    .range(0, 1)
    .map(i => undefined),
  argmentsCount: 2,
  optionsPack: {
    parse (args) {
      let key = _
        .range(0, state.argmentsCount - 1)
        .map(key => args[key])
        .map(arg => typeof arg)
        .join('-');
      return _.extend({},
        state.defaultOptions,
        this[_.strcase.camel(key)](...args)
      );
    },
    undefinedUndefined: opts => ({}),
    objectUndefined: opts => ({
      beginShift: opts.start || 0,
      endShift: opts.finish || Infinity,
      count: opts.count || null,
    }),
    numberUndefined: finish => ({
      endShift: finish,
    }),
    numberNumber: (start, finish) => ({
      beginShift: start,
      endShift: finish,
    }),
    stringUndefined: (tag,
      range = tag.split('#')[0],
      count = +tag.split('#')[1],
      start = +range.split(':')[0],
      finish = +range.split(':')[1]
    ) => ({
      beginShift: isNaN(start) ? 0 : start,
      endShift: isNaN(finish) ? 0 : finish,
      count: isNaN(count) ? null : count,
    }),
  },
};

module.exports = _.extend(list, {

});

/** .all.class
* Arrays : List(...values) => new List
* List class.
*/
class List extends Array {

  // Static ====================================================================

  constructor (...values) { super(...values);
    _.define.box(this, 'meta', {});
  }

  // Getters/Setters ===========================================================

  get Class () {
    return this.constructor;
  }

  get array () {
    return this.toArray();
  }

  get clone () {
    return this.getClone();
  }

  get keys () {
    return this.getKeys();
  }

  get values () {
    return this.getValues();
  }

  get pairs () {
    return this.toPairs();
  }

  // Methods ===================================================================

  exclude (condition) {
    let values = this.clone();
    values.filter(
      (value, key) =>
        !this._matches(value, key, condition)
    );
  }

  splice (...args) {
    let values = (args
        .map((value, index) => ({ value, index }))
        .filter(item => Array.isArray(item.value))[0] || {}).value || [],
      otherArgs = args.filter(arg => !Array.isArray(arg)),
      opts = this._getSliceOptions(...otherArgs);
    super.splice(opts.begin, opts.count, ...values);
    return this;
  }

  truncate (...args) {
    return this.splice(...args);
  }

  removeKeys (...args) {
    let removeKeys = _.flatten(args).sort(),
      removeKey;
    while (removeKey = removeKeys.pop()) {
      this.splice(`${removeKey}#1`);
    }
    return this;
  }

  toPairs (keyName = 'key', valueName = 'value') {
    return this._getKeyValuePairs(keyName, valueName);
  }

  getClone () {
    return this.slice(0);
  }

  toArray () {
    return Array.from(this);
  }

  toString () {
    return '['
      + this.pairs
        .map(pair => `${pair.key}: ${pair.value}`)
        .join(', ')
      + ']';
  }

  filterValues (condition = state.defaultCondition) {
    return this.filter(
      (value, key) =>
        this._matches(value, key, condition)
    );
  }

  toObject () {
    let object = _.extend({
      length: this.length,
      meta: this.meta,
    });
    this
      ._injectIterator(object)
      ._injectListMethods(object);
    return object;
  }

  valueOf () {
    return this.array;
  }

  toJSON () {
    return this.toObject();
  }

  getKeys () {
    return _.keys(this).map(key => isNaN(+key) ? key : +key);
  }

  getValues () {
    return _.values(this);
  }

  fromKeys (...args) {
    return this._getSliceByKeys(args);
  }

  findKey (condition) {
    return this._findKeysByCondition(condition, 1)[0];
  }

  findKeys (condition) {
    return this._findKeysByCondition(condition);
  }

  // Implementation ============================================================

  _injectListMethods (object = {}) {
    Object.setPrototypeOf(object, {
      toArray () {
        return Array.from(this);
      },
      forEach (...args) {
        return this.toArray().forEach(...args);
      },
      slice (...args) {
        return this.toArray().slice(...args);
      },
      splice (...args) {
        return this.toArray().splice(...args);
      },
      map (...args) {
        return this.toArray().map(...args);
      },
    });
    return this;
  }

  _injectIterator (object = {}, condition = state.defaultCondition) {
    object[Symbol.iterator] = this._createIterator(condition);
    return this;
  }

  _createIterator (condition = state.defaultCondition) {
    return () => {
      let values = this.filterValues(condition),
        value = null;
      return {
        next () {
          value = values.shift();
          if (value === undefined) return { done: true };
          return { value: value, done: false };
        },
      };
    };
  }

  _getSliceOptions (...args) {
    let length = this.length,
      opts = state.optionsPack.parse(args),
      beginShift = _.range.limit.lower(opts.beginShift, 0),
      endShift = _.range.limit.higher(opts.endShift, length),
      begin = beginShift < 0 ? length + beginShift : beginShift,
      end = _.range.limit.higher(
        opts.count !== null
          ? begin + opts.count
          : opts.endShift <= 0 ? length + opts.endShift : opts.endShift,
        length
      ),
      count = _.range.limit(end - begin, 0, length);
    return {
      opts,
      beginShift, endShift,
      begin, end,
      length, count,
    };
  }

  _getKeyValuePairs (...names) {
    return this.map((value, key) => ({
      [`${names[0]}`]: key,
      [`${names[1]}`]: value,
    }));
  }

  _getSliceByKeys (ks = []) {
    let keys = _.flatten(ks),
      elements = this.toArray();
    return keys.map(key => elements[key]);
  }

  _findKeysByCondition (condition, count = Infinity) {
    let elements = this.toArray(),
      keys = [];
    for (let i = 0; i < elements.length; i++) {
      if (this._matches(elements[i], i, condition))
        keys.push(i);
      if (keys.length >= count)
        return keys;
    }
    return keys;
  }

  _matches (value, key, cd) {
    if (!cd)
      return !value;
    if (typeof cd === 'function')
      return !!cd(value, key);
    if (cd instanceof RegExp)
      return `${value}`.search(cd) > -1;
    return value === cd;
  }

}

function list (...args) {
  const item = new List(...args);
  return item;
}
