'use strict';

const state = {
  counters: {},
};

module.exports = id;

function id(type = '') {
  state.counters[type] = state.counters[type] || 0;
  return ++state.counters[type];
}
