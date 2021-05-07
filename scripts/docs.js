'use strict';

const path = require('path');
const docs = require('../lib/docs');

docs.generate(
  path.resolve(__dirname, '../lib/docs/ooi'),
  path.resolve(__dirname, '../docs/list.md')
);
