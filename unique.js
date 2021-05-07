module.exports = unique;

function unique (items = []) {
  var set = new Set();
  items.forEach(item => set.add(item));
  return Array.from(set);
}