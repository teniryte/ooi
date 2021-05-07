const _ = {
  extend: require('./extend'),
  trim: require('./trim'),
};

const state = {
  splitter: '/',
};

module.exports = _.extend(path, {
  normalize,
  basename,
  extname,
  split,
  resolve,
  join,
});

function path(p, ...items) { p = normalize(p);
  if (items.length) {
    p = resolve(p, ...items);
  }
  return p;
}

function normalize (p) {
  return p.replace(/\\/mg, state.splitter);
}

function basename(p, ext) { p = normalize(p);
  var items = split(p),
    name = items.pop();
  return ext ? _.trim.right(name, ext) : name;
}

function extname(p) { p = normalize(p);
  var name = basename(p);
  if (!name.includes('.'))
    return '';
  return '.' + name.split('.').pop();
}

function split(p) { p = normalize(p);
  return p.split(state.splitter);
}

function resolve(...paths) { paths = paths.map(p => normalize(p));
  var p = join(...paths),
    items = split(p);
  while (items.indexOf('..') > -1) {
    let index = items.indexOf('..');
    items.splice(index - 1, 2);
  }
  return join(...items);
}

function join(...paths) { paths = paths.map(p => normalize(p));
  var double = state.splitter + state.splitter,
    p = paths.join(state.splitter);
  while (p.indexOf(double) > -1)
    p = p.replace(double, state.splitter);
  return p;
}
