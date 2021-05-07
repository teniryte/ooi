'use strict';

const _ = {
  each: require('./each'),
  clone: require('./clone'),
  extend: require('./extend'),
  defaults: require('./defaults'),
};

const state = {
  config: {
    progressSplitter: '/',
    unknownLabel: '-.-',
  },
  units: [
    {
      size: 1,
      name: 'b',
      title: 'Byte',
    },
    {
      size: 1024,
      name: 'kb',
      title: 'KB',
    },
    {
      size: 1024 * 1024,
      name: 'mb',
      title: 'MB',
    },
    {
      size: 1024 * 1024 * 1024,
      name: 'gb',
      title: 'GB',
    },
    {
      size: 1024 * 1024 * 1024 * 1024,
      name: 'tb',
      title: 'TB',
    },
    {
      size: 1024 * 1024 * 1024 * 1024 * 1024,
      name: 'pb',
      title: 'PB',
    },
  ],
};

function filesize (v = 0, o = {}) {
  var opts = _.extend({
      unit: null,
      fixed: 2,
      inputUnit: 'b',
    }, o),
    val = translateValue(v, opts),
    unit = getRelevantUnit(val, opts.unit),
    value = val / unit.size,
    amount = value.toFixed(opts.fixed);
  return `${amount} ${unit.title}`;
}

function translateValue (val, opts = {}) {
  var unit = getUnitByName(opts.inputUnit || 'b') || state.units[0];
  return val * unit.size;
}

function setConfig (opts = {}) {
  _.extend(state.config, opts);
}

function formatProgressString (done = 0, total = 0, o = {}) {
  var opts = _.defaults(o, {
      unit: null,
      fixed: 1,
      splitter: state.config.progressSplitter || '/',
      unknownLabel: state.config.unknownLabel || 'Unknown',
      inputUnit: 'b',
      suffix: {
        rate: false,
        rateFixed: 0,
      },
    }),
    unit = opts.unit,
    fixed = opts.fixed,
    doneAmount = filesize(done, opts),
    totalAmount = filesize(total, opts),
    suffix = (opts.suffix.rate && total)
      ? ` (${(done / total * 100).toFixed(opts.suffix.rateFixed)}%)` : '';
  if (!total)
    return `${doneAmount} ${opts.splitter} ${opts.unknownLabel}${suffix}`;
  return `${doneAmount} ${opts.splitter} ${totalAmount}${suffix}`;
}

function getRelevantUnit (val = 0, o = {}) {
  var opts = _.defaults(o, {
      unit: null,
    }),
    unit = getUnitByName(opts.unit),
    units = _.clone(state.units);
  if (unit) return unit;
  do {
    unit = units.pop();
    if (!unit || (val >= unit.size && val <= unit.size * 1024))
      break;
  } while (unit)
  return unit || state.units[0];
}

function getUnitByName (name) {
  return state.units.filter(unit => unit.name === name)[0] || null;
}

function setUnitTitle (name, title) {
  var unit = getUnitByName(name);
  if (!unit) return;
  unit.title = title;
}

_.extend(filesize, {
  matchUnit: getRelevantUnit,
  progress: formatProgressString,
  config: setConfig,
  getUnit: getUnitByName,
  setUnitTitle: setUnitTitle,
});

module.exports = filesize;
