'use strict';

const _ = {
  flatten: require('./flatten'),
};

function plural(number, ...words) {
  let cases = [2, 0, 1, 1, 1, 2],
    titles = _.flatten(words);
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

module.exports = plural;
