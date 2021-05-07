const _ = {
  extend: require('./extend'),
};

module.exports = _.extend(range, {
  limit: _.extend(limit, {
    higher: higherLimit,
    lower: lowerLimit,
  }),
});

function lowerLimit(val, margin = -Infinity) {
  var value = +val;
  return value < margin ? margin : value;
}

function higherLimit(val, margin = Infinity) {
  var value = +val;
  return value > margin ? margin : value;
}

function limit(val, start = -Infinity, finish = Infinity) {
  var value = +val;
  return higherLimit(lowerLimit(value, start), finish);
}

function range (start, finish, step = 1) {
  let position = start,
    sequence = [];
  if (arguments.length === 1) {
    finish = start;
    start = 0;
  }
  while (position <= finish) {
    sequence.push(position);
    position += step;
  }
  return sequence;
}
