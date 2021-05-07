<a name="[[self.toUri(self.section, self.name)]]"></a>

## [⇧](#contents) *[[self.type]]* [[self.name]]

### Call

```js
ooi.[[self.name]]([[self.args.map(arg => `${arg}`).join(', ')]]) => [[self.result]]
```

### Description

> [[self.desc]]

### Info

[[self.table(
  [
    `**Source File**`,
    `**Dependencies**`,
    `**Included in *index.js***`,
    `**Has Test**`,
    `**Tags**`
  ],
  [
    `\`${self.item.file}\``,
    self.item.deps
      .map(dep => `\`${dep}\``)
      .join(', '),
    self.item.isIndex ? '**✔**' : '**✖**',
    self.item.hasTest ? '**✔**' : '**✖**',
    self.tags
      .map(t => `\`${t}\``)
      .join(', '),
  ]
)]]

### Example

```[[self.lang]]
[[self.code]]
```

---
