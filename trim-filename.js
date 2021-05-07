const _ = {
  trim: require('./trim'),
};

const state = {
  splitter: '/',
};

module.exports = trimFilename;

function trimFilename(
  file,
  count = 10,
  trimLastNumbers = false,
  splitExt = false
) {
  let filename = file.replace(/\\/g, '/'),
    path = filename.split(state.splitter),
    basename = path.pop(),
    name = trimName(basename.slice(0, basename.lastIndexOf('.')), count),
    ext = basename.slice(basename.lastIndexOf('.'));
  return (
    path.map((dir) => trimName(dir, count)).join(state.splitter) +
    (path.length ? state.splitter : '') +
    name +
    ext
  );
}

function trimName(name, count) {
  if (name.length <= count) return name;
  // return name.slice(0, count / 2) + 'â¦' + name.slice(-1 * (count / 2));
  return name.slice(0, count).replace(/[^a-zA-ZÐ°-ÑÐ-Ð¯0-9]$/gim, '') + 'â¦';
}
