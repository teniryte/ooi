const _ = {
  extend: require('./extend'),
  trim: require('./trim'),
  expression: require('./expression'),
  values: require('./values'),
};

module.exports = _.extend(reg, {
  combine,
  fromString,
  find, replace,
});

function reg (...vals) {
  let str = vals.join('').replace(/\|/mgi, '\\');
  return _.expression(
    str
      .replace(/\s*/mgi, '')
      .replace(/\/\*([\s\S]+?)\*\//mgi, '')
  );
}

function replace (re, str, cb = data => data.found) {
  return str.replace(re, (found, group, index, string, groups) => {
    let result = {
      found, group, index, string,
      groups: { ...groups },
    };
    return cb(result);
  });
}

function find (re, str) {
  let index = {};
  while (true) {
    let result = re.exec(str);
    if (!result || index[result.index]) break;
    index[result.index] = {
      index: result.index,
      groups: { ...result.groups },
    };
  }
  return _.values(index);
}

function combine (...regs) {
  let flags = typeof regs[0] === 'string' ? regs.shift() : '',
    code = regs
      .map(reg => _.trim(reg.toString(), '/'))
      .join('');
  return new RegExp(code, flags);
}

function fromString (str, flags = '', opts = {}) {
  var tmpl = opts === true ? str : str
    .replace(/([^a-zA-Z0-9])/mgi, (txt, s) => {
      return `\\${s}`;
    })
    .replace(/\\\.\\\.\\\.\\\./mgi, `([\\s\\S]+)`)
    .replace(/\\\.\\\.\\\./mgi, `([\\s\\S]+?)`);
  return new RegExp(tmpl, flags);
}
