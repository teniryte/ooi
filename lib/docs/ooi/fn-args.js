'use strict';

const _ = {};

const state = {};

function getFunctionArgs(fn) {
  var re = /(?:function\s+)?(?:[^(]+)?\s*\(([^)]+)/i,
    source = fn.toString(),
    result = re.exec(source) || [],
    argsStr = result[1],
    args = argsStr ? argsStr.split(',') : [];

  return args
    .map(function (name) {
      return name.trim();
    })
    .filter(function (name) {
      return !!name;
    });
}

module.exports = getFunctionArgs;
