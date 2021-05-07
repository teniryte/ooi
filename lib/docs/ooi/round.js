'use strict';

function round (...args) {
  return Math.round(...args);
}

function min (x, step) {
  step = step || 1;
  return Math.ceil(x - x % step);
}

function max (x, step) {
  step = step || 1;
  return Math.ceil(x - x % step + step);
}

module.exports = Object.assign(round, { min, max });
