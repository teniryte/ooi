module.exports = isClass;

function isClass(Class) {
  if (typeof Class !== 'function') {
    return false;
  }
  try {
    Class();
    return false;
  } catch (err) {
    if (/^Class constructor/.test(err.message)) {
      return true;
    }
    return false;
  }
}
