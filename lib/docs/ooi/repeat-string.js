const _ = {
  repeat: require('./repeat'),
};

module.exports = repeatString;

function repeatString(str = '', count = 1) {
  var result = '';
  _.repeat(count, () => result += str);
  return result;
}