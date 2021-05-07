const _ = {
  isClass: require('./is-class'),
  isArray: require('./is-array'),
  extend: require('./extend'),
  each: require('./each'),
  strcase: require('./strcase'),
  define: require('./define'),
  defaults: require('./defaults'),
  wrap: require('./wrap'),
  flatten: require('./flatten'),
  keys: require('./keys'),
  values: require('./values'),
  sort: require('./sort'),
  set: require('./set'),
  get: require('./get'),
  EventEmitter: require('./event-emitter'),
};

module.exports = _.extend(typeManager, {

});

/** .all.fn
* Util : typeManager(name, options) => new TypeManager()
* Creates and returns new TypeManager instance;
```js
const typeManager = require('ooi/type-manager');

let manager = typeManager('app', {
  // ...
});

manager.create([
  number: {
    matcher: val => !isNaN(val),
    children: {
      integer: {
        matcher: val => +val === Math.round(+val),
      },
    },
  },
]);
```
*/
function typeManager (...args) {
  return new TypeManager(...args);
}

/** .all.class
* Util : TypeEntity(opts) => new TypeEntity
* Type entity class.
*/
class TypeEntity {

  // Static ====================================================================

  static optionNames = {
    name: _.extend(['name', 'type'], { defaultValue: '<unknown>' }),
    matcher: _.extend(['matcher', 'test', 'match'], { defaultValue: () => false }),
    defaultValue: _.extend(['defaultValue', 'default'], { defaultValue: null }),
    currentValue: _.extend(['currentValue', 'value', 'value'], { defaultValue: null }),
    children: _.extend(['children', '__'], { defaultValue: [] }),
    parent: _.extend(['parent'], { defaultValue: null }),
    transformer: _.extend(['transformer', 'transform', 'convert', 'parse', 'factory'], { defaultValue: v => v }),
    manager: _.extend(['manager'], { defaultValue: null }),
    skip: _.extend(['skip', 'ignore', 'abstract'], { defaultValue: false }),
  };

  static get propNames () {
    return _.flatten(_.values(this.optionNames));
  }

  // Constructor ===============================================================

  constructor (opts = {}) {
    const options = this._packOptions(opts);
    _.define.box(this, '$options', options);
  }

  _packOptions (opts = {}) {
    const options = {};
    _.each(this.Class.optionNames, (aliases, name) => {
      let value = _.defaults.get(opts, aliases, null);
      options[name] = value;
    });
    return options;
  }

  // Getters/Setters ===========================================================

  get name () {
    return this.getOption('name');
  }

  get parent () {
    return this.getOption('parent') || this.manager.types.entity;
  }

  get manager () {
    return this.getOption('manager');
  }

  get defaultValue () {
    return this.transform(this.getOption());
  }

  set defaultValue (value) {
    this.setOption('defaultValue', value);
  }

  get currentValue () {
    return this.transform(this.getOption(['currentValue', 'current'], null));
  }

  set currentValue (value) {
    this.setOption('currentValue', value);
  }

  get skip () {
    return this.getOption(['skip'], false);
  }

  get transformer () {
    return this.getOption(['transformer', 'transform', 'convert', 'factory'], val => val);
  }

  get matcher () {
    return this.getOption(['matcher'], () => true);
  }

  get Class () {
    return this.constructor;
  }

  get type () {
    return _.strcase.camel(this.getOption('name'));
  }

  get class () {
    return _.strcase.pascal(this.getOption('name'));
  }

  get key () {
    return _.strcase.dash(this.getOption('name'));
  }

  get path () {
    return `${this.isRoot() ? '' : `${this.parent.path}->`}${this.key}`;
  }

  get root () {
    return this.getRoot();
  }

  // Methods ===================================================================

  getOption (...args) {
    return _.defaults.get(this.$options, ...args);
  }

  setOption (name, value) {
    this.$options[name] = value;
    return this;
  }

  toPlain () {
    return {
      parent: this.parent.type,
      name: this.name,
      class: this.class,
      key: this.key,
      path: this.path,
      skip: this.skip,
      matcher: this.matcher,
      defaltValue: this.defaltValue,
      value: this.transform(),
    };
  }

  transform (value) {
    return this.transformer(value);
  }

  toString () {
    return `${this.valueOf()}`
  }

  valueOf () {
    return `${this.Class.name} (${this.path})`;
  }

  isRoot () {
    return this === this.parent;
  }

  match (value) {
    let matcher = this.matcher;
    return matcher(value);
  }

  test (...args) {
    return this.match(...args);
  }

  extend (name, opts) {
    if (typeof name !== 'string') {
      opts = name;
      name = opts.name;
    }
    return this.Class.create(this, name, opts);
  }

  getRoot () {
    let parent = this;
    while (parent !== parent.parent) {
      parent = parent.parent;
    }
    return parent;
  }

  // Implementation ============================================================

  _injectChild (entity) {
    let name = entity.type;
    if (!this.$options.children.hasOwnProperty(name))
      this.$options.children[name] = entity;
    if (!this.hasOwnProperty(name))
      _.define.prop({
        object: this,
        name: name,
        enumerable: false,
        get () {
          return entity;
        },
      });
    return this;
  }

}

/** .all.class
* Util : TypeManager(opts) => new TypeManager
* Type manager class.
*/
class TypeManager extends _.EventEmitter {

  static EntityClass = TypeEntity;

  name = 'default';
  types = {};
  index = {};
  opts = {};

  constructor (name, opts = {}) {
    super();
    this.name = name || this.name;
    this.options = _.extend({}, opts);
    this._init();
  }

  // Getters/Setters ===========================================================

  get propNames () {
    return this.Class.EntityClass.propNames;
  }

  get root () {
    return this.getRoot();
  }

  get tree () {
    return this.filterTree();
  }

  get Class () {
    return this.constructor;
  }

  // Methods ===================================================================

  getRoot () {
    return this.types.entity;
  }

  create (parent = null, name, opts) {
    let childrenNames = _.keys(parent).filter(key => !this.propNames.includes(key));
    if (arguments.length === 1 && typeof parent === 'object' && childrenNames.length) {
      // console.log('CREATE',{});
      return _.each(childrenNames, name => {
        let opts = parent[name];
        this.create(null, name, opts);
      });
      return this;
    }
    if (arguments.length === 1 && typeof parent === 'object') {
      opts = parent;
      parent = opts.parent;
      name = opts.name;
    }
    let options = _.extend({
      manager: this,
      name,
      parent,
    });
    const entity = new this.Class.EntityClass(options);
    entity.parent._injectChild(entity);
    entity.__ = entity.path;
    this._register(entity);
    _.each(opts.children || opts.extended || opts.__, (data, n) => {
      let parent = entity,
        name = data.name || n || '',
        opts = _.extend({ name }, data);
      this.create(parent, name, opts);
    });
    return entity;
  }

  filterTree (p = '') {
    let entities = this.many(p),
      tree = {};
    _.each(entities, entity => {
      let path = entity.path.replace(/\-\>/mgi, '.');
      _.set(tree, path, entity);
      tree[path] = entity;
    })
    return _.extend({}, tree);
  }

  many (p = '') {
    if (!p)
      return _.keys(this.index).map(key => this.index[key]);
    let path = p.replace(/\./mgi, '->'),
      reg = path instanceof RegExp
        ? path
        : new RegExp(`${path}`, 'mg'),
      keys = _.keys(this.index),
      results = [];
    for (let i = 0; i < keys.length; i++) {
      let name = keys[i],
        entity = this.index[name];
      if (name.search(reg) === -1) continue;
      results.push(entity);
    }
    return _.sort.by(
      results,
      (a, b) =>
        (a.__ || '').length > (b.__ || '').length ? 1 : -1
    );
  }

  type (type) {
    return this.types[type] || null;
  }

  path (p) {
    let path = p.replace(/\./mgi, '->');
    return this.index[path] || this.one(path);
  }

  one (p) {
    let path = p.replace(/\./mgi, '->'),
      entities = this.many(path);
    return entities.pop();
  }

  // Implementation ============================================================

  _init () {
    const entity = new this.Class.EntityClass({
      name: 'entity',
      manager: this,
    });
    entity.$options.parent = entity;
    this.types.entity = entity;
    this.index['entity'] = entity;
  }

  _register (entity) {
    if (!this.index.hasOwnProperty(entity.path))
      this.index[entity.path] = entity;
    if (!this.types.hasOwnProperty(entity.type))
      this.types[entity.type] = entity;
    return entity;
  }

}
