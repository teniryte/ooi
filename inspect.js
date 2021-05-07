const _ = {
  isClass: require('./is-class'),
  isArray: require('./is-array'),
  parseFunction: require('./parse-function'),
  classMeta: require('./class-meta'),
  type: require('./type'),
  uniqueId: require('./unique-id'),
  extend: require('./extend'),
  keys: require('./keys'),
};

const state = {
  format: {

    pattern: (item, code) => `[${{
      reg: `RegExp `,
      null: `null`,
      undefined: `undefined`,
      array: `Array `,
      object: `object ${item.meta.name} `,
      number: `number `,
      string: `string `,
      class: `class ${item.meta.name} `,
      function: `function ${item.name} `,
      nan: `number `,
      boolean: `boolean `,
    }[item.type]}${code}]`,

    reg: item => `${item.entity + ''}`,
    null: item => ``,
    undefined: item => ``,
    array: item => `{${item.entity.length}}`,
    object: item => `(${
      _
        .keys(item.entity)
        .map(key => (false ? _.type(item.entity[key]) + ' ' : '') + key)
        .join(', ')
    })`,
    number: item => `= ${item.entity}`,
    string: item => `= "${item.entity}"`,
    class: item => `${
      item.meta.name !== 'Object'
        ? `extends ${item.inspectProto().meta.name} `
        : ``
    }{ ${
      item.meta.methodsNames
        .map(name => `${name} (${_.parseFunction(item.meta.methods[name]).args.join(', ')})`)
        .join(', ')
    } }`,
    function: item => `${item.name}(${
      item.fn.args.join(', ')
    })`,
    nan: item => `<NaN>`,
    boolean: item => `<${item.entity ? 'true' : 'false'}>`,
  },
};

module.exports = _.extend(inspect, {

});

class Inspected {

  static inspect (entity) {
    let inspected = new Inspected(entity);
    return inspected;
  }

  constructor (entity) {
    let type = _.type(entity),
      isVoid = ['null', 'undefined'].includes(type),
      Class = (type === 'class' || type === 'function')
        ? entity : (isVoid ? null : entity.constructor),
      proto = isVoid ? null : Object.getPrototypeOf(entity),
      classProto = isVoid ? null : Class.prototype,
      meta = Class ? _.classMeta(Class) : {},
      name = ['class', 'function'].includes(type)
        ? entity.name
        : null,
      fn = type === 'function' ? _.parseFunction(entity) : {};
    _.extend(this, {
      entity, name, isVoid, type, 
      proto, classProto, Class, meta, fn,
    });
  }

  get label () {
    return this.formatLabel();
  }

  formatLabel () {
    var pattern = state.format.pattern,
      formatter = state.format[this.type],
      value = formatter(this),
      label = pattern(this, value);
    return label;
  }

  inspectProto () {
    return Inspected.inspect(this.proto);
  }

  inspectProtos () {
    let protos = [],
      item = this;
    while (!item.isVoid) {
      protos.push(item);
      item = item.inspectProto();
    }
    return protos;
  }

}

function inspect (entity) {  
  return Inspected.inspect(entity);
}