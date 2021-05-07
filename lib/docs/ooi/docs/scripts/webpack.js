const webpack = require('../lib/webpack');
const path = require('path');

let output = path.resolve(process.cwd(), process.argv[2]),
  keys = process.argv.slice(3);

webpack(output, keys)
  .then(stats => console.log(`File «${output}» compiled successfully!`))
  .catch(err => console.log('Fail!', err));
