# ES8 Polyfills

- **Core**
- **String**
  - `padStart`
  - `padEnd`
- **Regular Expressions**
  - `/Hello, (?<name>\w+)!/mgi`
- **Objects**
  - `Object.entries(object)`
  - `Object.getOwnPropertyDescriptors`
- **Functions**
  - Excess commas in function declarations and call: `function fn (a, b, c,) {}`, `fn(1, 2,)`
  - Async functions: `async function load (uri) { ... }`, `let content = await load(uri);`
- **Reflect**
