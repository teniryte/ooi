const _ = {
  extend: require('./extend'),
};

module.exports = _.extend(trim, {
  left: trimLeft,
  right: trimRight,
});

function trim(str, s = ' ') {
  return trimRight(trimLeft(str, s), s);
}

function trimLeft(str, s = ' ') {
  while (str.startsWith(s))
    str = str.slice(s.length);
  return str;
}

function trimRight(str, s = ' ') {
  while (str.endsWith(s))
    str = str.slice(0, -1 * s.length);
  return str;
}