const fn = require('./class-meta');

class Person {
  static a() {}

  static b() {}

  c() {}

  d() {}
}

class Programmer extends Person {
  static one() {}

  static two() {}

  three() {}

  four() {}
}

const meta = fn(Programmer);

test('meta methods names', () => {
  expect(meta.methodsNames).toEqual(['four', 'three']);
});

test('meta static methods names', () => {
  expect(meta.staticMethodsNames).toEqual(['one', 'two']);
});
