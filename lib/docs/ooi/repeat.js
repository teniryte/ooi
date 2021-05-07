module.exports = repeat;

function repeat(count = 0, cb = function () {}) {
  for (let i = 0; i < count; i++) {
    cb(i);
  }
}