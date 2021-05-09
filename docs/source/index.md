<!-- favicon: https://cdn.sencort.com/icons/sencort/logo.png -->

[![Generic badge](https://img.shields.io/badge/Version-0.1.1-green.svg)](https://shields.io/) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity) [![Maintaner](https://img.shields.io/badge/Maintainer-teniryte-blue)](https://img.shields.io/badge/maintainer-teniryte-blue) [![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://ooi.sencort.com/) [![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](http://commonmark.org) [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE) [![Profile views](https://gpvc.arturio.dev/teniryte)](https://gpvc.arturio.dev/teniryte) [![GitHub contributors](https://img.shields.io/github/contributors/teniryte/ooi.svg)](https://GitHub.com/teniryte/ooi/graphs/contributors/) [![GitHub issues](https://img.shields.io/github/issues/teniryte/ooi.svg)](https://GitHub.com/teniryte/ooi/issues/)
[![GitHub forks](https://img.shields.io/github/forks/teniryte/ooi.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/teniryte/ooi/network/) [![GitHub stars](https://img.shields.io/github/stars/teniryte/ooi.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/teniryte/ooi/stargazers/) [![GitHub watchers](https://img.shields.io/github/watchers/teniryte/ooi.svg?style=social&label=Watch&maxAge=2592000)](https://GitHub.com/teniryte/ooi/watchers/) [![GitHub followers](https://img.shields.io/github/followers/teniryte.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/teniryte?tab=followers)

<!-- Logo ================================================================== -->

<div class="section section--header" data-a="top">
<a href="https://github.com/teniryte/ooi" class="logo">
  <img src="https://cdn.sencort.com/icons/sencort/logo.png" alt="Logo" width="140" height="140">
</a>

<h3 align="center">OOI</h3>

<p align="center">
  <p class="section--header__slogan">
    JavaScript Utility & Tools Library
  </p>

  <br />

  <!-- {{DEL_START}} -->

  <p class="section--header__button">
    <a class="large-button" href="./list.html">
      <strong><i class="fas fa-list"></i> Explore Full Utils List</strong>
    </a>
  </p>

  <!-- {{DEL_END}} -->

  <p class="section--header__menu">
    <a href="./index.html"><i class="fas fa-home"></i> Home</a>
    <span> • </span>
    <a href="https://github.com/teniryte/ooi"><i class="fas fa-bug"></i> Report Bug</a>
    <span> • </span>
    <a href="https://github.com/teniryte/ooi/issues"><i class="fas fa-check-double"></i> Request Feature</a>
  </p>
</p>

</div>

<!-- {{CODE}} -->

<!-- {{DEL_START}} -->

<!-- Contents ============================================================== -->

<div class="section contents" data-a="table-of-contents">

## <span class="marker">{{marker}}</span> Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Documentation](#documentation)
- [CLI](#cli)
- [Testing](#testing)

</div>

<!-- Features ============================================================== -->

<div class="index-content">

<div class="section" data-a="features">

## <span class="marker">{{marker}}</span> Features <a href="#top">▲</a>

- [**Common JavaScript Utilities**](./list.html#tags-common). **ooi** provides some useful functions and classes to make some specific operations more reusable. Working with objects, arrays, collections, convertation, events, formatting, meta-data and types.
- [**Node.js Tools**](./list.html#tags-node). Some useful methods to simplify certain node.js operations.
- [**DOM Utilities & Tools**](./list.html#tags-dom). Get, create and modify DOM elements, working with DOM-events and so on.
- [**Polyfills**](./list.html#tags-polyfills). Contains some useful polyfills.

</div>

<!-- Installation ========================================================== -->

<div class="section" data-a="installation">

## <span class="marker">{{marker}}</span> Installation <a href="#top">▲</a>

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

</div>

<!-- Documentation ========================================================= -->

<div class="section" data-a="documentation">

## <span class="marker">{{marker}}</span> Documentation <a href="#top">▲</a>

<a class="large-button" href="./list.html">
  <strong><i class="fas fa-list"></i> Explore Full Utils List</strong>
</a>

**Sections**:

- [Arrays](./list.html#section-arrays)
- [Collections](./list.html#section-collections)
- [Convert](./list.html#section-convert)
- [Events](./list.html#section-events)
- [Format](./list.html#section-format)
- [Meta](./list.html#section-meta)
- [Objects](./list.html#section-objects)
- [Util](./list.html#section-util)

</div>

<!-- CLI =================================================================== -->

<div class="section" data-a="cli">

## <span class="marker">{{marker}}</span> CLI <a href="#top">▲</a>

**Install ooi as CLI:**

```bash
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

</div>

<!-- Testing =============================================================== -->

<div class="section" data-a="testing">

## <span class="marker">{{marker}}</span> Testing <a href="#top">▲</a>

**Test all utilities:**

```sh
npm test;
```

</div>

<!-- {{DEL_END}} -->

</div>
