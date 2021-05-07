const _ = {
  extend: require('./extend'),
  each: require('./each'),
};

// 1 / Infinity = 0

// Infinity / 1 = Infinity

// Infinity / Infinity = NaN

// 0 / 0 = NaN

// Infinity - Infinity

// 1.0000000000000001e-24 + 1 + 1

// 10e+24 + 1 = 10e+25

// 1.0e+24 + 1 = 1e+24

const state = {

  periods: {
    eternity: Infinity,
    eon: 10e+24, // or forever
    aeon: 20 * 1000000 * 365 * 24 * 60 * 60,
    myr: 1000000 * 365 * 24 * 60 * 60,
    millennium: 1000 * 365 * 24 * 60 * 60,
    century: 100 * 365 * 24 * 60 * 60,
    generation: 30 * 365 * 24 * 60 * 60,
    decade: 10 * 365 * 24 * 60 * 60,
    year: 365 * 24 * 60 * 60,
    semester: (365 / 2) * 24 * 60 * 60,
    quarter: (365 / 4) * 24 * 60 * 60,
    month: (365 / 12) * 24 * 60 * 60,
    week: 7 * 24 * 60 * 60,
    day: 24 * 60 * 60,
    hour: 60 * 60,
    minute: 60,
    second: 1,
    millisecond: 1.0e-3,
    ioctosecond: 1.0e-24,
    moment: NaN,
  },

};

module.exports = _.extend(datetime, {
  toSeconds,
  stamp,
});

function datetime () {

}

function stamp () {
  let date = new Date(),
    items = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      `${date.getMilliseconds()}`.padStart(3, '0'),
    ];
  return items
    .map(val => `${val}`.padStart(2, '0'))
    .join('-');
}

function toSeconds  (data = {}) {
  var seconds = 0;
  _.each(data, (value, p) => {
    var period = p.endsWith('s') ? p.slice(0, -1) : p,
      rate = state.periods[period],
      secs = value * rate;

    seconds += secs;
  });
  return seconds;
}
