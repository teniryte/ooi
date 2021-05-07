<a name="contents"></a>

# |ooi|
# JavaScript Helpers & Tools

---

## Table of Сontents


- [**Arrays**](#arrays)
  
  - [`append(arr, ...items)`](#arrays-append)
  - [`concat()`](#arrays-concat)
  - [`ensureArray()`](#arrays-ensure-array)
  - [`List(...values)`](#arrays-list)
  - [`list(...array)`](#arrays-list)

- [**Collections**](#collections)
  
  - [`clone(data)`](#collections-clone)
  - [`deepClone(data)`](#collections-deep-clone)
  - [`each(data, cb)`](#collections-each)
  - [`flatten(object)`](#collections-flatten)
  - [`flatten.unflatten(object)`](#collections-flatten-unflatten)

- [**Convert**](#convert)
  
  - [`base64.decode()`](#convert-base64-decode)
  - [`base64.encode()`](#convert-base64-encode)
  - [`parse(string)`](#convert-parse)
  - [`query(string | object)`](#convert-query)
  - [`stringify(object)`](#convert-stringify)
  - [`uri(string)`](#convert-uri)
  - [`uri(string)`](#convert-uri)

- [**Events**](#events)
  
  - [`EventEmitter()`](#events-event-emitter)

- [**Format**](#format)
  
  - [`classNames(...any)`](#format-class-names)
  - [`template(source, opts)`](#format-template)

- [**Meta**](#meta)
  
  - [`classMeta(Class)`](#meta-class-meta)
  - [`wrap.class(Class, options)`](#meta-wrap-class)

- [**Objects**](#objects)
  
  - [`aliases(data, { propName: [...aliases] })`](#objects-aliases)
  - [`define.box(object, name[, isEnumerable])`](#objects-define-box)
  - [`define.prop({ object, name, value, get, set, configurable, enumerable, writable })`](#objects-define-prop)
  - [`extend(target, ...sources)`](#objects-extend)
  - [`extend.deep(target, ...sources)`](#objects-extend-deep)
  - [`keys(object)`](#objects-keys)
  - [`proto(object)`](#objects-proto)
  - [`proto.chain(obj1, obj2, obj3)`](#objects-proto-chain)

- [**Util**](#util)
  
  - [`TypeEntity(opts)`](#util-type-entity)
  - [`TypeManager(opts)`](#util-type-manager)
  - [`typeManager(name, options)`](#util-type-manager)

- [**Utils**](#utils)
  
  - [`defaults(data, defaultData)`](#utils-defaults)



---

<a name="arrays"></a>

## [⇧](#contents) Arrays

<a name="arrays-append"></a>

## [⇧](#contents) *function* append

### Call

```js
ooi.append(arr, ...items) => arr
```

### Description

> Appends elements to array.

### Info

| **Source File** | **Dependencies** | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:-----------------|:---------------------------|:-------------|:------------|
| `append.js`     |                  | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import append from 'ooi/append';

let result = append(arr, ...items);
```

---

<a name="arrays-concat"></a>

## [⇧](#contents) *function* concat

### Call

```js
ooi.concat() => array
```

### Description

> Concatenates arrays.

### Info

| **Source File** | **Dependencies** | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:-----------------|:---------------------------|:-------------|:------------|
| `concat.js`     |                  | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import concat from 'ooi/concat';

let result = concat();
```

---

<a name="arrays-ensure-array"></a>

## [⇧](#contents) *function* ensureArray

### Call

```js
ooi.ensureArray() => array
```

### Description

> Wrapper for array.

### Info

| **Source File**   | **Dependencies**     | **Included in *index.js*** | **Has Test** | **Tags**    |
|:------------------|:---------------------|:---------------------------|:-------------|:------------|
| `ensure-array.js` | `concat`, `is-array` | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import ensureArray from 'ooi/ensure-array';

let result = ensureArray();
```

---

<a name="arrays-list"></a>

## [⇧](#contents) *class* List

### Call

```js
ooi.List(...values) => new List
```

### Description

> List class.

### Info

| **Source File** | **Dependencies**                                                                                         | **Included in *index.js*** | **Has Test** | **Tags**       |
|:----------------|:---------------------------------------------------------------------------------------------------------|:---------------------------|:-------------|:---------------|
| `list.js`       | `define`, `keys`, `extend`, `each`, `defaults`, `values`, `flatten`, `strcase`, `range`, `event-emitter` | **✖**                      | **✖**        | `all`, `class` |

### Example

```js
import List from 'ooi/list';

let result = List(...values);
```

---

<a name="arrays-list"></a>

## [⇧](#contents) *function* list

### Call

```js
ooi.list(...array) => new List(...array)
```

### Description

> Creates List object (extends Array) with additional list methods.

### Info

| **Source File** | **Dependencies**                                                                                         | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:---------------------------------------------------------------------------------------------------------|:---------------------------|:-------------|:------------|
| `list.js`       | `define`, `keys`, `extend`, `each`, `defaults`, `values`, `flatten`, `strcase`, `range`, `event-emitter` | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import list from 'ooi/list';

let result = list(...array);
```

---


---

<a name="collections"></a>

## [⇧](#contents) Collections

<a name="collections-clone"></a>

## [⇧](#contents) *function* clone

### Call

```js
ooi.clone(data) => data
```

### Description

> Shallow copy of object.

### Info

| **Source File** | **Dependencies**               | **Included in *index.js*** | **Has Test** | **Tags**            |
|:----------------|:-------------------------------|:---------------------------|:-------------|:--------------------|
| `clone.js`      | `each`, `extend`, `deep-clone` | **✖**                      | **✖**        | `all`, `copy`, `fn` |

### Example

```js
import clone from 'ooi/clone';

let result = clone(data);
```

---

<a name="collections-deep-clone"></a>

## [⇧](#contents) *function* deepClone

### Call

```js
ooi.deepClone(data) => data
```

### Description

> Deep copy of object.

### Info

| **Source File** | **Dependencies**                      | **Included in *index.js*** | **Has Test** | **Tags**               |
|:----------------|:--------------------------------------|:---------------------------|:-------------|:-----------------------|
| `deep-clone.js` | `ooi/deep-clone`, `ooi/clone`, `each` | **✖**                      | **✖**        | `all`, `copy`, `clone` |

### Example

```js
const deepClone = require('ooi/deep-clone');
// or
const deepClone = require('ooi/clone').deep;

```

---

<a name="collections-each"></a>

## [⇧](#contents) *function* each

### Call

```js
ooi.each(data, cb) => void
```

### Description

> Iterates over all properties of data and calls cb(value, key) for each of them.

### Info

| **Source File** | **Dependencies** | **Included in *index.js*** | **Has Test** | **Tags**                 |
|:----------------|:-----------------|:---------------------------|:-------------|:-------------------------|
| `each.js`       | `keys`           | **✖**                      | **✖**        | `all`, `iteration`, `fn` |

### Example

```js
import each from 'ooi/each';

let result = each(data, cb);
```

---

<a name="collections-flatten"></a>

## [⇧](#contents) *function* flatten

### Call

```js
ooi.flatten(object) => object
```

### Description

> Flattens all `object` properties and returns plain object.

### Info

| **Source File** | **Dependencies** | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:-----------------|:---------------------------|:-------------|:------------|
| `flatten.js`    | `set`, `keys`    | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import flatten from 'ooi/flatten';

let result = flatten(object);
```

---

<a name="collections-flatten-unflatten"></a>

## [⇧](#contents) *function* flatten.unflatten

### Call

```js
ooi.flatten.unflatten(object) => object
```

### Description

> Returns object with resurrected properties structure.

### Info

| **Source File** | **Dependencies** | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:-----------------|:---------------------------|:-------------|:------------|
| `flatten.js`    | `set`, `keys`    | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import flatten.unflatten from 'ooi/flatten';

let result = flatten.unflatten(object);
```

---


---

<a name="convert"></a>

## [⇧](#contents) Convert

<a name="convert-base64-decode"></a>

## [⇧](#contents) *function* base64.decode

### Call

```js
ooi.base64.decode() => string
```

### Description

> Converts base64-string to regular string.

### Info

| **Source File** | **Dependencies** | **Included in *index.js*** | **Has Test** | **Tags**                         |
|:----------------|:-----------------|:---------------------------|:-------------|:---------------------------------|
| `base64.js`     | `extend`         | **✖**                      | **✖**        | `all`, `strings`, `encode`, `fn` |

### Example

```js
import base64.decode from 'ooi/base64';

let result = base64.decode();
```

---

<a name="convert-base64-encode"></a>

## [⇧](#contents) *function* base64.encode

### Call

```js
ooi.base64.encode() => string
```

### Description

> Convert regular string to base64.

### Info

| **Source File** | **Dependencies** | **Included in *index.js*** | **Has Test** | **Tags**                         |
|:----------------|:-----------------|:---------------------------|:-------------|:---------------------------------|
| `base64.js`     | `extend`         | **✖**                      | **✖**        | `all`, `strings`, `encode`, `fn` |

### Example

```js
import base64.encode from 'ooi/base64';

let result = base64.encode();
```

---

<a name="convert-parse"></a>

## [⇧](#contents) *function* parse

### Call

```js
ooi.parse(string) => object
```

### Description

> Parse url query string.

### Info

| **Source File** | **Dependencies**    | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:--------------------|:---------------------------|:-------------|:------------|
| `query.js`      | `extend`, `flatten` | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import parse from 'ooi/query';

let result = parse(string);
```

---

<a name="convert-query"></a>

## [⇧](#contents) *function* query

### Call

```js
ooi.query(string | object) => object | string
```

### Description

> If receives not URI string, returns parsed query object. If receives object, returns stringified query url.

### Info

| **Source File** | **Dependencies**    | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:--------------------|:---------------------------|:-------------|:------------|
| `query.js`      | `extend`, `flatten` | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import query from 'ooi/query';

let result = query(string | object);
```

---

<a name="convert-stringify"></a>

## [⇧](#contents) *function* stringify

### Call

```js
ooi.stringify(object) => string
```

### Description

> Stringifies plain object into query url.

### Info

| **Source File** | **Dependencies**    | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:--------------------|:---------------------------|:-------------|:------------|
| `query.js`      | `extend`, `flatten` | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import stringify from 'ooi/query';

let result = stringify(object);
```

---

<a name="convert-uri"></a>

## [⇧](#contents) *function* uri

### Call

```js
ooi.uri(string) => object
```

### Description

> Parses string URI and returns object with properties uri, protocol, host, path, filename, extname, query, request.

### Info

| **Source File** | **Dependencies**                     | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:-------------------------------------|:---------------------------|:-------------|:------------|
| `uri.js`        | `extend`, `flatten`, `query`, `path` | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import uri from 'ooi/uri';

let result = uri(string);
```

---

<a name="convert-uri"></a>

## [⇧](#contents) *function* uri

### Call

```js
ooi.uri(string) => object
```

### Description

> Same as uri.parse.

### Info

| **Source File** | **Dependencies**                     | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:-------------------------------------|:---------------------------|:-------------|:------------|
| `uri.js`        | `extend`, `flatten`, `query`, `path` | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import uri from 'ooi/uri';

let result = uri(string);
```

---


---

<a name="events"></a>

## [⇧](#contents) Events

<a name="events-event-emitter"></a>

## [⇧](#contents) *class* EventEmitter

### Call

```js
ooi.EventEmitter() => new EventEmitter()
```

### Description

> Class for events handling.

### Info

| **Source File**    | **Dependencies**                  | **Included in *index.js*** | **Has Test** | **Tags**       |
|:-------------------|:----------------------------------|:---------------------------|:-------------|:---------------|
| `event-emitter.js` | `ooi`, `each`, `define`, `extend` | **✖**                      | **✖**        | `all`, `class` |

### Example

```js
const ooi = require('ooi');

class Manager extends ooi.EventEmitter {

  constructor () {
    super();
  }

}

let manager = new Manager();

manager.on('message', message => {
  console.log('New message:', message);
});

setTimeout(() => {
  manager.emit('message', 'This is new message!');
}, 1000);

```

---


---

<a name="format"></a>

## [⇧](#contents) Format

<a name="format-class-names"></a>

## [⇧](#contents) *function* classNames

### Call

```js
ooi.classNames(...any) => array
```

### Description

> Receives classes in any format, returns array of class names

### Info

| **Source File**  | **Dependencies**  | **Included in *index.js*** | **Has Test** | **Tags**    |
|:-----------------|:------------------|:---------------------------|:-------------|:------------|
| `class-names.js` | `each`, `flatten` | **✖**                      | **✔**        | `all`, `fn` |

### Example

```js
import classNames from 'ooi/class-names';

let result = classNames(...any);
```

---

<a name="format-template"></a>

## [⇧](#contents) *function* template

### Call

```js
ooi.template(source, opts) => function(data)
```

### Description

> Creates function-template with specified template code, which returns content with replaced all expressions surrounded by [[ and ]].

### Info

| **Source File** | **Dependencies**                               | **Included in *index.js*** | **Has Test** | **Tags**               |
|:----------------|:-----------------------------------------------|:---------------------------|:-------------|:-----------------------|
| `template.js`   | `extend`, `expression`, `reg`, `trim`, `proto` | **✖**                      | **✖**        | `all`, `strings`, `fn` |

### Example

```js
import template from 'ooi/template';

let result = template(source, opts);
```

---


---

<a name="meta"></a>

## [⇧](#contents) Meta

<a name="meta-class-meta"></a>

## [⇧](#contents) *function* classMeta

### Call

```js
ooi.classMeta(Class) => { methods, methodsNames, staticMethods, staticMethodsNames, extended }
```

### Description

> Extemdan;

### Info

| **Source File** | **Dependencies**         | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:-------------------------|:---------------------------|:-------------|:------------|
| `class-meta.js` | `extend`, `each`, `keys` | **✖**                      | **✔**        | `all`, `fn` |

### Example

```js
import classMeta from 'ooi/class-meta';

let result = classMeta(Class);
```

---

<a name="meta-wrap-class"></a>

## [⇧](#contents) *function* wrap.class

### Call

```js
ooi.wrap.class(Class, options) => Class
```

### Description

> Modifies target class with options: init.

### Info

| **Source File** | **Dependencies**                                               | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:---------------------------------------------------------------|:---------------------------|:-------------|:------------|
| `wrap.js`       | `extend`, `each`, `define`, `get`, `set`, `keys`, `expression` | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import wrap.class from 'ooi/wrap';

let result = wrap.class(Class, options);
```

---


---

<a name="objects"></a>

## [⇧](#contents) Objects

<a name="objects-aliases"></a>

## [⇧](#contents) *function* aliases

### Call

```js
ooi.aliases(data, { propName: [...aliases] }) => data
```

### Description

> Defines property aliases for object.

### Info

| **Source File** | **Dependencies**                                                                                            | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:------------------------------------------------------------------------------------------------------------|:---------------------------|:-------------|:------------|
| `aliases.js`    | `ooi`, `each`, `extend`, `flatten`, `defaults`, `type`, `get`, `set`, `map`, `keys`, `trim`, `ensure-array` | **✖**                      | **✔**        | `all`, `fn` |

### Example

```js
const ooi = require('ooi');

let data = {
  one: 1,
  two: 2,
  three: 3,
};

ooi.aliases(data, {
  one: ['first', 'number1'],
  two: ['second', 'number2'],
  three: ['third', 'number3'],
});

```

---

<a name="objects-define-box"></a>

## [⇧](#contents) *function* define.box

### Call

```js
ooi.define.box(object, name[, isEnumerable]) => data
```

### Description

> Defines new virtual property on object and serves it by property name. If the property gets assigned — new object deep merges with existing.

### Info

| **Source File** | **Dependencies**                            | **Included in *index.js*** | **Has Test** | **Tags**                 |
|:----------------|:--------------------------------------------|:---------------------------|:-------------|:-------------------------|
| `define.js`     | `each`, `extend`, `flatten`, `set`, `range` | **✖**                      | **✖**        | `all`, `meta`, `objects` |

### Example

```js
import define.box from 'ooi/define';

let result = define.box(object, name[, isEnumerable]);
```

---

<a name="objects-define-prop"></a>

## [⇧](#contents) *function* define.prop

### Call

```js
ooi.define.prop({ object, name, value, get, set, configurable, enumerable, writable }) => object
```

### Description

> Defines new property on object.

### Info

| **Source File** | **Dependencies**                            | **Included in *index.js*** | **Has Test** | **Tags**                 |
|:----------------|:--------------------------------------------|:---------------------------|:-------------|:-------------------------|
| `define.js`     | `each`, `extend`, `flatten`, `set`, `range` | **✖**                      | **✖**        | `all`, `meta`, `objects` |

### Example

```js
import define.prop from 'ooi/define';

let result = define.prop({ object, name, value, get, set, configurable, enumerable, writable });
```

---

<a name="objects-extend"></a>

## [⇧](#contents) *function* extend

### Call

```js
ooi.extend(target, ...sources) => object
```

### Description

> Extends `target` object with properties of sources objects.

### Info

| **Source File** | **Dependencies**                | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:--------------------------------|:---------------------------|:-------------|:------------|
| `extend.js`     | `each`, `set`, `get`, `flatten` | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import extend from 'ooi/extend';

let result = extend(target, ...sources);
```

---

<a name="objects-extend-deep"></a>

## [⇧](#contents) *function* extend.deep

### Call

```js
ooi.extend.deep(target, ...sources) => object
```

### Description

> Extends `target` object with properties of sources objects (deep extending).

### Info

| **Source File** | **Dependencies**                | **Included in *index.js*** | **Has Test** | **Tags** |
|:----------------|:--------------------------------|:---------------------------|:-------------|:---------|
| `extend.js`     | `each`, `set`, `get`, `flatten` | **✖**                      | **✖**        | `all`    |

### Example

```js
import extend.deep from 'ooi/extend';

let result = extend.deep(target, ...sources);
```

---

<a name="objects-keys"></a>

## [⇧](#contents) *function* keys

### Call

```js
ooi.keys(object) => array
```

### Description

> Returns array of `object` property names.

### Info

| **Source File** | **Dependencies** | **Included in *index.js*** | **Has Test** | **Tags**    |
|:----------------|:-----------------|:---------------------------|:-------------|:------------|
| `keys.js`       |                  | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
import keys from 'ooi/keys';

let result = keys(object);
```

---

<a name="objects-proto"></a>

## [⇧](#contents) *function* proto

### Call

```js
ooi.proto(object) => prototype
```

### Description

> Returns object's prototype.

### Info

| **Source File** | **Dependencies** | **Included in *index.js*** | **Has Test** | **Tags**                             |
|:----------------|:-----------------|:---------------------------|:-------------|:-------------------------------------|
| `proto.js`      | `extend`         | **✖**                      | **✖**        | `all`, `objects`, `prototypes`, `fn` |

### Example

```js
import proto from 'ooi/proto';

let result = proto(object);
```

---

<a name="objects-proto-chain"></a>

## [⇧](#contents) *function* proto.chain

### Call

```js
ooi.proto.chain(obj1, obj2, obj3) => void
```

### Description

> Sets second argument as prototype of first, third as prototype of second etc.

### Info

| **Source File** | **Dependencies** | **Included in *index.js*** | **Has Test** | **Tags**                             |
|:----------------|:-----------------|:---------------------------|:-------------|:-------------------------------------|
| `proto.js`      | `extend`         | **✖**                      | **✖**        | `all`, `objects`, `prototypes`, `fn` |

### Example

```js
import proto.chain from 'ooi/proto';

let result = proto.chain(obj1, obj2, obj3);
```

---


---

<a name="util"></a>

## [⇧](#contents) Util

<a name="util-type-entity"></a>

## [⇧](#contents) *class* TypeEntity

### Call

```js
ooi.TypeEntity(opts) => new TypeEntity
```

### Description

> Type entity class.

### Info

| **Source File**   | **Dependencies**                                                                                                                                                          | **Included in *index.js*** | **Has Test** | **Tags**       |
|:------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------|:-------------|:---------------|
| `type-manager.js` | `is-class`, `is-array`, `extend`, `each`, `strcase`, `define`, `defaults`, `wrap`, `flatten`, `keys`, `values`, `sort`, `set`, `get`, `event-emitter`, `ooi/type-manager` | **✖**                      | **✖**        | `all`, `class` |

### Example

```js
import TypeEntity from 'ooi/type-manager';

let result = TypeEntity(opts);
```

---

<a name="util-type-manager"></a>

## [⇧](#contents) *class* TypeManager

### Call

```js
ooi.TypeManager(opts) => new TypeManager
```

### Description

> Type manager class.

### Info

| **Source File**   | **Dependencies**                                                                                                                                                          | **Included in *index.js*** | **Has Test** | **Tags**       |
|:------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------|:-------------|:---------------|
| `type-manager.js` | `is-class`, `is-array`, `extend`, `each`, `strcase`, `define`, `defaults`, `wrap`, `flatten`, `keys`, `values`, `sort`, `set`, `get`, `event-emitter`, `ooi/type-manager` | **✖**                      | **✖**        | `all`, `class` |

### Example

```js
import TypeManager from 'ooi/type-manager';

let result = TypeManager(opts);
```

---

<a name="util-type-manager"></a>

## [⇧](#contents) *function* typeManager

### Call

```js
ooi.typeManager(name, options) => new TypeManager()
```

### Description

> Creates and returns new TypeManager instance;

### Info

| **Source File**   | **Dependencies**                                                                                                                                                          | **Included in *index.js*** | **Has Test** | **Tags**    |
|:------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------|:-------------|:------------|
| `type-manager.js` | `is-class`, `is-array`, `extend`, `each`, `strcase`, `define`, `defaults`, `wrap`, `flatten`, `keys`, `values`, `sort`, `set`, `get`, `event-emitter`, `ooi/type-manager` | **✖**                      | **✖**        | `all`, `fn` |

### Example

```js
const typeManager = require('ooi/type-manager');

let manager = typeManager('app', {
  // ...
});

manager.create([
  number: {
    matcher: val => !isNaN(val),
    children: {
      integer: {
        matcher: val => +val === Math.round(+val),
      },
    },
  },
]);

```

---


---

<a name="utils"></a>

## [⇧](#contents) Utils

<a name="utils-defaults"></a>

## [⇧](#contents) *function* defaults

### Call

```js
ooi.defaults(data, defaultData) => data
```

### Description

> Replaces all undefined properties of data object with defaultData analog.

### Info

| **Source File** | **Dependencies**                                            | **Included in *index.js*** | **Has Test** | **Tags**               |
|:----------------|:------------------------------------------------------------|:---------------------------|:-------------|:-----------------------|
| `defaults.js`   | `extend`, `each`, `keys`, `flatten`, `define`, `set`, `get` | **✖**                      | **✖**        | `all`, `options`, `fn` |

### Example

```js
import defaults from 'ooi/defaults';

let result = defaults(data, defaultData);
```

---


---

