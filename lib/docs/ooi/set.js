module.exports = set;

function set (obj, p, value) {
  var current = obj,
    names = p.split('.'),
    name;
  for (var i = 0; i < names.length - 1; i++) {
    name = names[i];
    if (!current[name]) {
      current[name] = {};
    }
    current = current[name];
  }
  current[names.pop()] = value;
  return obj;
}
