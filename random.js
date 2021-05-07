module.exports = random;

function random (start = 0, finish = 1, precision = 2) {
  if (arguments.length === 1) {
    finish = start;
    start = 0;
  }
  var rand = Math.random(),
    val = (start + ((finish - start) * rand));
  return +val.toFixed(precision);
}