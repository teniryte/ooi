/** .all.fn
* Format : classNames(...any) => array
* Receives classes in any format, returns array of class names
*/

const _ = {
  each: require('./each'),
  flatten: require('./flatten'),
};

module.exports = classNames;

function classNames(...args) {
  var classes = _
      .flatten(args)
      .map(cl => cl.split(' ').map(s => s.split('.'))),
    result = new Set();
  _
    .flatten(classes)
    .filter(cl => !!(cl || '').trim())
    .forEach(cl => result.add(cl));
  return Array.from(result);
}
