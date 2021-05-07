const _ = {
  random: require('./random'),
};

module.exports = sample;

function sample (items) {
  var count = items.length;
  return items[Math.floor(_.random(0, count))];
}