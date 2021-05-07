const _ = {
  extend: require('./extend'),
};

module.exports = _.extend(json, {
  dump: jsonDump,
  parse: jsonParse,
})

function json (...args) {
  if (typeof args[0] === 'string') return jsonParse(...args);
  return jsonDump(...args);
}

function jsonDump (data, indent = 0, quite = `"`) {
  return JSON
    .stringify(data, null, indent)
    .replace(/\"([^(\")"]+)\":/g, `${quite}$1${quite}:`);
}

function jsonParse (code) {
  return JSON.parse(code);
}