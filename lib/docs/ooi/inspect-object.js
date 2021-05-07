const _ = {
  each: require('./each'),
  extend: require('./extend'),
  isClass: require('./is-class'),
};

module.exports = _.extend(inspectObject, {
  getChain,
});

function inspectObject(val) {
  var state;
  if (val === null) {
    state = { type: 'null' };
  } else if (val === undefined) {
    state = { type: 'undefined' };
  } else if (Array.isArray(val)) {
    state = {
      type: 'array',
      length: val.length,
      'constructor': Array,
      'constructorPrototype': Array.prototype,
      prototype: val.__proto__,
    };
  } else if (_.isClass(val)) {
    state = {
      type: 'class',
      name: val.name,
      'constructor': val['constructor'],
      'constructorPrototype': val['constructor'].prototype,
      prototype: val.__proto__,
    };
  } else if (typeof val === 'function') {
    state = {
      type: 'function',
      name: val.name,
      'constructor': val['constructor'],
      'constructorPrototype': val['constructor'].prototype,
      prototype: val.__proto__,
    };
  } else if (typeof val !== 'object') {
    state = {
      type: typeof val,
      'constructor': val['constructor'],
      'constructorPrototype': val['constructor'].prototype,
      prototype: val.__proto__,
    };
  } else {
    state = {
      type: 'object',
      'constructor': val['constructor'],
      'constructorPrototype': val['constructor'].prototype,
      prototype: val.__proto__,
    };
  }
  _.extend(state, {
    value: val,
    isPrototype: state['constructorPrototype'] !== state.prototype,
  });
  return state;
}

function getChain(obj) {
  var chain = [],
    val = obj;
  while (val) {
    chain.push({
      'name': val.name || val['constructor'].name,
      'value': val,
      'constructor': val['constructor'],
      'prototype': val.__proto__,
      'constructorPrototype': val['constructor'].prototype,
      'isPrototype': val['constructor'].prototype !== val.__proto__,
    });
    val = val.__proto__;
  }
  chain.push({
    'value': val,
    'constructor': null,
    'prototype': null,
    'isPrototype': true,
  });
  _.extend(chain, {
    get first () {
      return chain[0]
    },
    get last () {
      return chain[chain.length - 3];
    },
    get real () {
      return chain.filter(val => !val.isPrototype);
    },
    get prototypes () {
      return chain.filter(val => val.isPrototype);
    },
    get short () {
      return chain.slice(0, -2);
    },
  });
  return chain;
}
