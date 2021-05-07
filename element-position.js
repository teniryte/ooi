'use strict';

const state = {};

const _ = {
  extend: require('./extend'),
};

function elementPosition (elem) {
  return elem.getBoundingClientRect();
}

module.exports = elementPosition;
