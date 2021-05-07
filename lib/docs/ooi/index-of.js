module.exports = indexOf;

function indexOf (obj, el) {
  var i = obj.length;
  while (i--)
    if (obj[i] === el) return i;
  return -1;
}
