const _ = {
  keys: require('./keys'),
  values: require('./values'),
};

module.exports = expression;

function expression(code = '', globals = {}) {
  var args = _.keys(globals),
    vals = _.values(globals);
  try {
    return (new Function(...args, `return ${code};`))(...vals);
  } catch(err) {
    return err;
  }
}