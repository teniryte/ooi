/** .all.fn
* Arrays : ensureArray() => array
* Wrapper for array.
*/

const _ = {
  concat: require('./concat'),
  isArray: require('./is-array'),
};

function ensureArray(...args) {
  return _.concat(
    args.map(
      arg => _.isArray(arg) ? arg : [arg]
    )
  );
}

module.exports = ensureArray;
