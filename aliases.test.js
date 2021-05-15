// @ts-nocheck
/* eslint-disable */

const aliases = require('./aliases');

describe('aliases', () => {
  let o = {
    a: 1,
    b: 2,
    c: 3
  };

  let d = aliases(o, {
    a: 'x',
    b: ['y'],
    c: ['z', 'j']
  });

  test('settings aliases', () => {
    expect(o.x).toBe(1);
    expect(o.y).toBe(2);
    expect(o.z).toBe(3);
    expect(o.j).toBe(3);
  });
});
