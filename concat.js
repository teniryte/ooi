/** .all.fn
* Arrays : concat() => array
* Concatenates arrays.
*/

function concat(...args) {
  var result = [],
    items = [];
  if (args.length > 1) {
    items = args.slice(0);
  } else {
    items = args[0];
  }
  items.forEach(item => {
    result = result.concat(item)
  });
  return result;
}

module.exports = concat;
