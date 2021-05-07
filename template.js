/** .all.strings.fn
* Format : template(source, opts) => function(data)
* Creates function-template with specified template code, which returns content with replaced all expressions surrounded by [[ and ]].
*/

const _ = {
  extend: require('./extend'),
  expression: require('./expression'),
  reg: require('./reg'),
  trim: require('./trim'),
  proto: require('./proto'),
};

module.exports = _.extend(template, {
  create: createTemplate,
});

function template (...args) {
  return createTemplate(...args);
}

function createTemplate (source = '', o = {}) {
  var opts = {
      delims: o.delims || ['[[', ']]'],
      localsAs: o.localAs || 'self',
    },
    pattern = `${opts.delims[0]}...${opts.delims[1]}`,
    re = _.reg.fromString(pattern, 'mgi');
  return (locals = {}) => {
    var scope = opts.localsAs
      ? { [opts.localsAs]: locals }
      : locals;
    return source.replace(re, (txt, expr) => {
      let value = _.expression(expr, scope);
      return value;
    });
  };
}
