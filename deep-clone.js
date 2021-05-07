/** .all.copy.clone
 * Collections : deepClone(data) => data
 * Deep copy of object
```js
const deepClone = require('ooi/deep-clone');
// or
const deepClone = require('ooi/clone').deep;
```
 */

const _ = {
  each: require('./each'),
};

module.exports = deepClone;

function deepClone(data) {
  if (!data) return data;
  if (typeof data !== 'object') return data;
  var result = {};
  if (Array.isArray(data)) {
    return data.map((item) => deepClone(item));
  }
  _.each(data, (value, key) => {
    result[key] = deepClone(value);
  });
  return result;
}
