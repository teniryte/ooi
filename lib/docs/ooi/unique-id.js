const state = {
  counters: {},
};

module.exports = uniqueId;

function uniqueId (prefix = '') {
  state.counters[prefix] = state.counters[prefix] || 0;
  return `${prefix}${++state.counters[prefix]}`;
}