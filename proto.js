const _ = {
  extend: require('./extend'),
}

module.exports = _.extend(proto, {
  chain: protoChain,
});

/** .all.objects.prototypes.fn
* Objects : proto(object) => prototype
* Returns object's prototype.
*/
function proto (object) {
  return Object.getPrototypeOf(object);
}

/** .all.objects.prototypes.fn
* Objects : proto.chain(obj1, obj2, obj3) => void
* Sets second argument as prototype of first, third as prototype of second etc.
*/
function protoChain (...chain) {
  chain.forEach((val, i) => {
    let next = chain[i + 1] || null;
    Object.setPrototypeOf(val, next);
  });
}
