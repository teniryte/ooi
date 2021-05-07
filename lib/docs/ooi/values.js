module.exports = values;

function values (data = {}) {
  return Object.values(data || {});
}