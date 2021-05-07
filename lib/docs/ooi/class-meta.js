/** .all.fn
* Meta : classMeta(Class) => { methods, methodsNames, staticMethods, staticMethodsNames, extended }
* Extemdan;
*/

const _ = {
  extend: require('./extend'),
  each: require('./each'),
  keys: require('./keys'),
};

module.exports = _.extend(classMeta, {
  methods: getMethods,
  methodsNames: getMethodsNames,
  staticMethods: getStaticMethods,
  staticMethodsNames: getStaticMethodsNames,
  extended: getExtendedClass,
});

function classMeta(Class) {
  var methods = getMethods(Class),
    staticMethods = getStaticMethods(Class);
  return {
    name: Class.name,
    methods: methods,
    methodsNames: _.keys(methods),
    staticMethods: staticMethods,
    staticMethodsNames: _.keys(staticMethods),
    extended: getExtendedClass(Class),
  };
}

function getMethodsNames(Class, exclude = []) {
  var excludedNames = exclude.concat(['constructor']);
  return Object
    .getOwnPropertyNames(Class.prototype)
    .filter(name => !excludedNames.includes(name))
    .sort();
}

function getStaticMethodsNames(Class, exclude = []) {
  var excludedNames = exclude.concat([]);
  return Object
    .getOwnPropertyNames(Class)
    .filter(name => typeof Class[name] === 'function')
    .filter(name => !excludedNames.includes(name))
    .sort();
}

function getMethods(Class, self = null, exclude = []) {
  var data = {};
  getMethodsNames(Class, exclude)
    .forEach(name => {
      data[name] = Class.prototype[name];
      if (self) data[name] = data[name];
    });
  return data;
}

function getStaticMethods(Class, exclude = []) {
  var data = {};
  getStaticMethodsNames(Class, exclude)
    .forEach(name => {
      data[name] = Class[name];
    });
  return data;
}

function getExtendedClass (Class) {
  if (Class === Object) {
    return null;
  }
  return Object
    .getPrototypeOf(Class.prototype)
    .constructor;
}
