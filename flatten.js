/** .all.fn
* Collections : flatten(object) => object
* Flattens all `object` properties and returns plain object.
*/

const _ = {
  set: require('./set'),
  keys: require('./keys'),
};

module.exports = Object.assign(flatten, {
  array: flattenArray,
  unflatten,
})

function flatten (obj, parentName = null, skipArrays = false, maxLevel = Infinity) {
  var data = {};
  if (Array.isArray(obj))
    return flattenArray(obj);
  if (!obj || typeof obj !== 'object')
    return obj;
  parentName = parentName || '';
  Object.keys(obj).forEach((name) => {
    var val = obj[name];
    name = parentName ? parentName + '.' + name : name;
    if (!val
      || typeof val !== 'object'
      || (skipArrays && Array.isArray(val))
      || name.split('.').length >= maxLevel) {
      data[name] = val;
      return;
    }
    Object.assign(data, flatten(val, name, skipArrays, maxLevel));
  });
  return data;
}

function flattenArray (arr) {
  var items = [];
  Array.from(arr, item => {
    if (!item || typeof item !== 'object') {
      return items.push(item);
    }
    if (item.length !== undefined) {
      item = Array.from(item);
    }
    items = items.concat(flattenArray(item));
  });
  return items;
}

/** .all.fn
* Collections : flatten.unflatten(object) => object
* Returns object with resurrected properties structure.
*/
function unflatten (obj) {
  var data = {};
  _.keys(obj).forEach(name => {
    _.set(data, name, obj[name]);
  });
  return data;
}
