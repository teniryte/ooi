/** .all.fn
* Meta : wrap.class(Class, options) => Class
* Modifies target class with options: init.
*/

const _ = {
  extend: require('./extend'),
  each: require('./each'),
  define: require('./define'),
  get: require('./get'),
  set: require('./set'),
  keys: require('./keys'),
  expression: require('./expression'),
};

module.exports = _.extend(wrap, {
  class: wrapClass,
})

function wrap () {

}

function wrapClass (Class, opts = {}) {
  let box = _.extend({}, opts.box),
    init = opts.init;
  try { delete opts.init; }
  catch (err) {}
  _.each(opts, (value, key) => {
    if (!key.startsWith('box:')) return;
    let name = key.split(':')[1];
    box[name] = opts[key];
    try { delete opts[key]; }
    catch (err) {}
  });
  if (_.keys(box).length) {
    _.each(box, (value, name) => {
      _.define.box(Class, name, value);
    });
    try { delete opts.box; }
    catch (err) {}
  }
  _.each(opts, (value, name) => {
    if (typeof value === 'function')
      value = value.bind(Class);
    _.set(Class, name, value);
  });
  if (typeof init === 'function') {
    Class = init.call(Class, Class) || Class;
  }
  return Class;
}
