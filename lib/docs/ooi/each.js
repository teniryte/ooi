/** .all.iteration.fn
* Collections : each(data, cb) => void
* Iterates over all properties of data and calls cb(value, key) for each of them.
*/

const _ = {
  keys: require('./keys'),
};

function each (items, cb = () => {}) {
  if (Array.isArray(items))
    return items.forEach(cb);
  return each(
    _.keys(items),
    key => cb(items[key], key)
  );
}

module.exports = each;
