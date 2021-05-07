const _ = {
  extend: require('./extend'),
};

const state = {
  data: {},
  dataResolves: {},
};

function wire (...args) {
  if (args.length > 1) return send(...args);
  return receive(...args);
}

function send (name, data) {
  if (state.dataResolves[name]) {
    return state.dataResolves[name](data);
  }
  state.data[name] = data;
}

function receive (name) {
  return new Promise((resolve, reject) => {
    if (state.data[name]) {
      resolve(state.data[name]);
      state.data[name] = null;
      return;
    }
    state.dataResolves[name] = resolve;
  });
}

module.exports = _.extend(wire, {
  send,
  receive,
});
