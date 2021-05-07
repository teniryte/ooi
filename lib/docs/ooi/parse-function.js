const _ = {
  reg: require('./reg'),
};

module.exports = parseFunction;

const state = {
  re: _.reg.combine('m',
    /(?:function)?/,
    /([^\s]*)/,
    /(?:\s*\=\s*)?/,
    /(?:function)?/,
    /\s*([a-zA-Z0-9\$\_]*)\s*/,
    /\(([\s\S]*)\s*\)/,
    /\s*(?:\=\>)?\s*/,
    /\{\s*([\s\S]*)\s*\}/
  ),
};

function parseFunction (fn) {
  let re = state.re,
    source = fn.toString(),
    [_outer, _inner, _args, _body] = re.exec(source).slice(1),
    name = _inner || _outer || fn.name,
    [args, defaults] = parseArgs(_args),
    body = _body.trim(),
    data = {
      name,
      args,
      defaults,
      body,
    };
  return data;
}

function parseArgs (source) {
  if (!(source || '').trim())
    return [[], {}];
  let raws = source
      .split(',')
      .map(raw => raw.trim()),
    args = [],
    defaults = {};
  
  console.log('PARSE', source);

  raws.forEach(raw => {
    let parts = raw.split('=').map(val => (val || '').trim()),
      name = parts[0],
      value = parts.length > 1 ? parts.slice(1).join('=') : undefined;
    args.push(name);
    defaults[name] = value;
  });

  return [args, defaults];
}
