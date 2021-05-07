'use strict';

const _ = {
  extend: require('./extend'),
  flatten: require('./flatten'),
  keys: require('./keys'),
};

module.exports = _.extend(equals, {
  deep: deepEquals,
});

function equals (one, two) {
  return !_.keys(one).filter(key => one[key] !== two[key]).length;
}

function deepEquals (o, t) {
  let one = _.flatten(o),
    two = _.flatten(t);
  return equals(one, two);
}
