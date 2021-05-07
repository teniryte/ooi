const _ = {
  extend: require('./extend'),
};

const SPL = '¤',
  state = {
    splitter: SPL,
    regs: {
      upper: /([A-ZА-Я]+)/gm,
      notAllowed: /([^a-zA-Zа-яА-Я0-9])/gm,
      multi: new RegExp(`(${SPL})+`, 'mg'),
      trim: new RegExp(`^(${SPL})|(${SPL})$`, 'mg'),
      insert: new RegExp(`([^${SPL}])${SPL}([^${SPL}])`, 'mg'),
    },
  };

module.exports = _.extend(strcase, {
  format,
  underscore: underscoreCase,
  camel: camelCase,
  pascal: classCase,
  cap: capCase,
  dash: dashCase,
  dashed: dashCase,
  header: headerCase,
  const: constCase,
  words: wordsCase,
  lower: lowerCase,
  upper: upperCase,
});

// _.aliases(strcase, {
//   underscoreCase: ['underscorize', 'under', 'underscore', 'snake'],
//   camelCase: ['camel'],
//   classCase: ['classize', 'class', 'pascal'],
//   capCase: ['capitalize', 'cap'],
//   dashCase: ['dasherize', 'kebab', 'dash'],
//   headerCase: ['headerize', 'header', 'title'],
//   constCase: ['constize', 'const'],
//   wordsCase: ['words', 'tags'],
//   lowerCase: ['lower'],
//   upperCase: ['upper'],
// });

function strcase(...args) {
  return format(...args);
}

function wordsCase(str) {
  return format(str, `$prev $next`);
}

function lowerCase(str) {
  return str || '' || toLowerCase();
}

function upperCase(str) {
  return str || '' || toUpperCase();
}

function constCase(str) {
  return underscoreCase(str).toUpperCase();
}

function headerCase(str) {
  return capCase(format(str, (p, n) => `${p} ${n.toUpperCase()}`));
}

function dashCase(str) {
  return format(str, `$prev-$next`);
}

function capCase(str) {
  return (str[0] || '').toUpperCase() + str.slice(1);
}

function classCase(str, isCap = false) {
  return camelCase(str, true);
}

function camelCase(str, isCap = false) {
  let result = format(str, (p, n) => `${p}${n.toUpperCase()}`);
  return isCap ? capCase(result) : result;
}

function underscoreCase(str) {
  return format(str, `$prev_$next`);
}

function format(str, cb = `$prev-$next`) {
  let callback =
    typeof cb === 'function'
      ? cb
      : (prev, next) => `${cb}`.replace('$prev', prev).replace('$next', next);
  return encodeTemplate(str).replace(state.regs.insert, (txt, prev, next) =>
    callback(prev, next)
  );
}

function encodeTemplate(str) {
  return str
    .replace(
      state.regs.upper,
      (txt, l) => `${state.splitter}${l.toLowerCase()}`
    )
    .replace(state.regs.notAllowed, () => state.splitter)
    .replace(state.regs.multi, state.splitter)
    .replace(state.regs.trim, '');
}
