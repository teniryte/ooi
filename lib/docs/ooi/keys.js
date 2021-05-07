/** .all.fn
* Objects : keys(object) => array
* Returns array of `object` property names.
*/

module.exports = keys;

function keys (data = {}) {
  return Object.keys(data || {});
}
