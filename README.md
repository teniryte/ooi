<a name="top"></a>

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity) [![Maintaner](https://img.shields.io/badge/Maintainer-teniryte-blue)](https://img.shields.io/badge/maintainer-teniryte-blue) [![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://ooi.sencort.com/) [![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](http://commonmark.org) [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE) [![Profile views](https://gpvc.arturio.dev/teniryte)](https://gpvc.arturio.dev/teniryte) [![GitHub contributors](https://img.shields.io/github/contributors/teniryte/ooi.svg)](https://GitHub.com/teniryte/ooi/graphs/contributors/) [![GitHub issues](https://img.shields.io/github/issues/teniryte/ooi.svg)](https://GitHub.com/teniryte/ooi/issues/) 

[![GitHub forks](https://img.shields.io/github/forks/teniryte/ooi.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/teniryte/ooi/network/) [![GitHub stars](https://img.shields.io/github/stars/teniryte/ooi.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/teniryte/ooi/stargazers/) [![GitHub watchers](https://img.shields.io/github/watchers/teniryte/ooi.svg?style=social&label=Watch&maxAge=2592000)](https://GitHub.com/teniryte/ooi/watchers/) [![GitHub followers](https://img.shields.io/github/followers/teniryte.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/teniryte?tab=followers)

<br />

[![Logo](https://cdn.sencort.com/icons/ooi/ooi.png)](https://github.com/teniryte/ooi)

## **OOI**

**JavaScript Utility & Tools Library**

## [**🚀 Open Full Documentation**](https://ooi.sencort.com/)

<br />

[**🔸 Home**](https://ooi.sencort.com/index.html) [**🔸 Report Bug**](https://github.com/teniryte/ooi) [**🔸 Request Feature**](https://github.com/teniryte/ooi/issues)

<br />

## ⏹️ Table of Contents <a href="#top">▲</a>

- [⏹️ Features](#features)
- [⏹️ Installation](#installation)
- [⏹️ Import ooi-modules by `.ooi` text file](#import)
- [⏹️ Documentation](#documentation)
- [⏹️ CLI](#cli)
- [⏹️ Testing](#testing)

<br />

## ⏹️ Features<a href="#top">▲</a>

- [**Common JavaScript Utilities**](https://ooi.sencort.com/list.html#tags-common). **ooi** provides some useful functions and classes to make some specific operations more reusable. Working with objects, arrays, collections, convertation, events, formatting, meta-data and types.
- [**Node.js Tools**](https://ooi.sencort.com/list.html#tags-node). Some useful methods to simplify certain node.js operations.
- [**DOM Utilities & Tools**](https://ooi.sencort.com/list.html#tags-dom). Get, create and modify DOM elements, working with DOM-events and so on.
- [**Polyfills**](https://ooi.sencort.com/list.html#tags-polyfills). Contains some useful polyfills.

<br />

## ⏹️ Installation <a href="#top">▲</a>

**Installation as local package:**

```sh
npm i --save ooi;
```

**Using the Hole Library:**

```javascript
import ooi from 'ooi';

let arr = [1, 2, 3];

ooi.append(arr, 4, 5, 6);

[1, 2, 3, 4, 5, 6].forEach(num => {
  console.log(num);
});

console.log(arr);
```

<br />

## ⏹️ Import ooi-modules by `.ooi` text file <a href="#top">▲</a>

**File `util.ooi`:**

```txt
each
extend
flatten
class-meta
plural
isArray: $isarray
sse: ./util/sse.js
```

**Install plugin `esbuild-import-plugin`:**

```sh
npm i --save esbuild-import-plugin;
```

**Plug it:**

```js
const importPlugin = require('esbuild-import-plugin');

esbuild
  .build({
    entryPoints: ['./src/index.js'],
    bundle: true,
    outfile: './dist/app/app.js',
    loader: {
      '.js': 'jsx'
    },
    sourcemap: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    define: {
      'process.env.NODE_ENV': '"development"'
    },
    plugins: [
      // Here!
      importPlugin
    ]
  })
  .then(() => console.log('Builded!'))
  .catch(err => console.log(err));
```

**Now you can import file `util.ooi` from esbuild module:**

```js
import util from './util.ooi';

util.each([1, 2, 3], (n, i) => console.log(n, i));
```

<br />

## ⏹️ Documentation <a href="#top">▲</a>

### 🎟️ [**Explore Full Utils List**](https://ooi.sencort.com/list.html)

**Sections**:

- [Arrays](https://ooi.sencort.com/list.html#section-arrays)
- [Collections](https://ooi.sencort.com/list.html#section-collections)
- [Convert](https://ooi.sencort.com/list.html#section-convert)
- [Events](https://ooi.sencort.com/list.html#section-events)
- [Format](https://ooi.sencort.com/list.html#section-format)
- [Meta](https://ooi.sencort.com/list.html#section-meta)
- [Objects](https://ooi.sencort.com/list.html#section-objects)
- [Util](https://ooi.sencort.com/list.html#section-util)

<br />

## ⏹️ CLI <a href="#top">▲</a>

**Install ooi as CLI:**

```sh
sudo npm install --global ooi;
```

**Compile library for client:**

```sh
ooi compile
  -s objects collections
  -t fn objects
  -min
  -o assets/js/lib/ooi.min.js;
```

**Pack ooi as JS-module:**

```sh
cli pack
  -s objects collections
  -t fn objects
  -o src/lib/ooi.js
```

<br />

## ⏹️ Testing <a href="#top">▲</a>

**Test all utilities:**

```sh
npm test;
```
