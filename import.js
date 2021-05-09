'use strict';

const strcase = require('./strcase');
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const stylaPlugin = require('esbuild-styla-plugin');
const xyamlPlugin = require('esbuild-xyaml-plugin');
const tempfile = require('tempfile');
const handlebars = require('handlebars');
const axios = require('axios').default;

const state = {
  templates: {
    wrapper: handlebars.compile(`
      module.exports = {
        {{#each modules}}
        {{alias}}: require('{{filename}}'),
        {{/each}}
      };
    `)
  }
};

async function importLibrary(args, dir, importer) {
  console.log('ARGS', { args, dir, importer });
  let paths = [],
    flags = args.map(arg => {
      arg = arg.replace('://', '///');
      paths.push(arg.replace(/\$/gim, '').replace(/\%/gim, ''));
      if (arg.includes('$')) return 'common';
      if (arg.includes('///')) return 'download';
      return 'es';
    }),
    names = paths.map(name =>
      name
        .split(':')
        .map(name => name.trim())
        .filter(name => !!name)
        .pop()
    ),
    aliases = paths.map((name, i) =>
      name.includes(':') ? name.split(':')[0].trim() : strcase.camel(names[i])
    ),
    filenames = paths.map((p, i) => {
      let filename = names[i];
      try {
        filename = require.resolve(`ooi/${filename}.js`);
        if (!fs.existsSync(filename)) {
          throw new Error();
        }
      } catch (err) {}
      try {
        filename = require.resolve(filename);
        if (!fs.existsSync(filename)) {
          throw new Error();
        }
      } catch (err) {}
      try {
        filename = path.resolve(dir, filename);
        if (!fs.existsSync(filename)) {
          throw new Error();
        }
      } catch (err) {}
      return filename;
    }),
    modules = paths.map((path, i) => ({
      path: paths[i],
      flag: flags[i],
      name: names[i],
      alias: aliases[i],
      filename: filenames[i]
    })),
    wrapperFilename = tempfile('.js'),
    outputFilename = tempfile('.js'),
    wrapperCode = state.templates.wrapper({ modules });
  console.log('MODULES', modules);
  fs.writeFileSync(wrapperFilename, wrapperCode);
  try {
    await esbuild.build({
      entryPoints: [wrapperFilename],
      bundle: true,
      outfile: outputFilename,
      loader: {
        '.js': 'jsx'
      },
      sourcemap: false,
      format: 'cjs',
      target: ['es2019', 'edge18', 'firefox60', 'chrome61', 'safari11'],
      define: {
        'process.env.NODE_ENV': '"development"'
      },
      plugins: [
        stylaPlugin({
          imports: [path.resolve(__dirname, '../src/styles/tm.styl')]
        }),
        xyamlPlugin()
      ]
    });
  } catch (err) {}
  return fs.readFileSync(outputFilename, 'utf-8');
}

module.exports = importLibrary;
