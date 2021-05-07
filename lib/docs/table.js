/** .all
* Convert : table() => void
* row{ cells, length, index }, cols{ index, header, cells, longest, max }, cell{ value, length, col, row }
*/

const _ = {
  flatten: require('ooi/flatten'),
  range: require('ooi/range'),
  extend: require('ooi/extend'),
  repeatString: require('ooi/repeat-string'),
};

const state = {
  lengthSort: (a, b) => a.length > b.length ? 1 : -1,
};

module.exports = _.extend(table, {

});

class Cell {

  constructor (table, cIndex, rIndex) {
    this.table = null;
    this.cIndex = 0;
    this.rIndex = 0;
    this.formatter = cell => cell;
    this.cache = {
      value: null,
    };
    this.table = table;
    this.cIndex = cIndex;
    this.rIndex = rIndex;
  }

  // Getters/Setters ===========================================================

  get col () {
    return this.getCol();
  }

  get row () {
    return this.getRow();
  }

  get value () {
    return this.getValue();
  }

  get length () {
    return this.getLength();
  }

  get formattedValue () {
    return this.getFormattedValue();
  }

  get formattedValueLength () {
    return this.getFormattedValueLength();
  }

  // Methods ===================================================================

  getFormattedValueLength () {
    return this.getFormattedValue().length;
  }

  getFormattedValue () {
    let value = this.getValue(),
      [ph, space] = this.table.spl('spacePlaceholder', 'space'),
      formatted = this.col.formatValue(value);
    return formatted.replace(new RegExp(ph, 'mgi'), space);
  }

  setFormatter (formatter) {
    this.formatter = formatter;
    return this;
  }

  getLength () {
    if (this.cache.length)
      return this.cache.length;
    let length = this.getValue().length;
    return length;
  }

  getValue () {
    if (this.cache.value)
      return this.cache.value;
    let value = (this.table.valueRows[this.rIndex] || [])[this.cIndex] || '';
    return value;
  }

  getCol () {
    if (this.cache.col)
      return this.cache.col;
    let col = this.table.getCol(this.cIndex);
    this.cache.col = col;
    return col;
  }

  getRow () {
    if (this.cache.row)
      return this.cache.row;
    let row = this.table.getRow(this.rIndex);
    this.cache.row = row;
    return row;
  }

  toJSON () {
    return this.toString();
  }

}

class Col {

  constructor (table, index) {
    this.table = null;
    this.index = 0;
    this.formatter = col => col;
    this.cache = {
      values: null,
      width: null,
      cells: null,
    };
    this.table = table;
    this.index = index;
  }

  // Getters/Setters ===========================================================

  get values () {
    return this.getValues();
  }

  get cells () {
    return this.getCells();
  }

  get width () {
    return this.getWidth();
  }

  get header () {
    return this.getHeader();
  }

  // Methods ===================================================================

  getCells () {
    if (this.cache.cells)
      return this.cache.cells;
    let cIndex = this.index,
      cells = [];
    for (let rIndex = 0; rIndex < this.table.size[1]; rIndex++) {
      let cell = this.table.getCell(cIndex, rIndex);
      cells.push(cell);
    }
    this.cache.cells = cells;
    return cells;
  }

  getFormattedValues () {
    return this
      .getValues()
      .map(value => this.formatValue(value));
  }

  formatValue (value = '') {
    let [placeholder] = this.table.spl('spacePlaceholder');
    return `${placeholder}${value}${this._getSpaces(value)}${placeholder}`;
  }

  getWidth () {
    if (this.cache.width)
      return this.cache.width;
    let width = (this
      .getValues()
      .slice(0)
      .sort(state.lengthSort)
      .reverse()
      .shift() || '').length;
    this.cache.width = width;
    return width;
  }

  getHeader () {
    return this.getValues()[0];
  }

  setFormatter (formatter) {
    this.formatter = formatter;
    return this;
  }

  getValues () {
    if (this.cache.values)
      return this.cache.values;
    let values = this.table.valueRows.map(values => values[this.index] || '');
    this.cache.values = values;
    return values;
  }

  toJSON () {
    return this.index;
  }

  // Implementation ============================================================

  _getSpacesCount (value = '') {
    return this.getWidth() - value.length;
  }

  _getSpaces (value = '') {
    let [placeholder] = this.table.spl('spacePlaceholder');
    return _.repeatString(placeholder, this._getSpacesCount(value));
  }

}

class Row {

  constructor (table, index) {
    this.table = null;
    this.index = 0;
    this.formatter = row => row;
    this.cache = {
      values: null,
      sizes: null,
      cells: null,
    };
    this.table = table;
    this.index = index;
  }

  // Getters/Setters ===========================================================

  get values () {
    return this.getValues();
  }

  get cells () {
    return this.getCells();
  }

  get sizes () {
    return this.getValueSizes();
  }

  get formatted () {
    return this.getFormatted();
  }

  get border () {
    return this.getFormatted(true);
  }

  // Methods ===================================================================

  getFormatted (border = false) {
    let [col] = this.table.spl('col');
    if (border) return this._getBorder();
    return col + this
      .getCells()
      .map(cell => cell.getFormattedValue())
      .join(col) + col;
  }

  getCells () {
    if (this.cache.cells)
      return this.cache.cells;
    let rIndex = this.index,
      cells = [];
    for (let cIndex = 0; cIndex < this.table.size[0]; cIndex++) {
      let cell = this.table.getCell(cIndex, rIndex);
      cells.push(cell);
    }
    this.cache.cells = cells;
    return cells;
  }

  setFormatter (formatter) {
    this.formatter = formatter;
    return this;
  }

  getValueSizes () {
    if (this.cache.sizes)
      return this.cache.sizes;
    let sizes = this.getValues().map(value => value.length);
    this.cache.sizes = sizes;
    return sizes;
  }

  getValues () {
    if (this.cache.values)
      return this.cache.values;
    let values = this.getCells().map(cell => cell.value);
    this.cache.values = values;
    return values;
  }

  toJSON () {
    return this.index;
  }

  // Implementation ============================================================

  _getBorder () {
    let [col, border] = this.table.spl('col', 'border'),
      line = col + this
        .getCells()
        .map(cell => cell.formattedValue.replace(/[\s\S]/g, border))
        .join(col) + col;
    return line.replace(/\|-/g, '|:');
  }

}

class Table {

  constructor (valueRows = [], o = {}) {
    let opts = _.extend.deep({
      cols: 0,
      rows: 0,
      splitters: {
        col: '|',
        border: '-',
        spacePlaceholder: '~',
        space: ' ',
      },
    }, o);
    this.customSize = [0, 0];
    this.valueRows = [];
    this.formatter = cell => cell;
    this.opts = {};
    this.cache = {
      rows: {},
      cols: {},
      cells: {},
    };
    this.opts = opts;
    this.customSize = [opts.cols, opts.rows];
    this.splitters = opts.splitters;
    this._addValueRows(valueRows);
  }

  // Getters/Setters ===========================================================

  get size () {
    return this.getSize();
  }

  get cols () {
    return this.getCols();
  }

  get rows () {
    return this.getRows();
  }

  get colsRange () {
    return this.getColsRange();
  }

  get rowsRange () {
    return this.getRowsRange();
  }

  get matrix () {
    return this.getRowsMatrix(this.format);
  }

  get colsMatrix () {
    return this.getColsMatrix(this.format);
  }

  get rowsMatrix () {
    return this.getRowsMatrix(this.format);
  }

  get lines () {
    return this.getLines();
  }

  get formatted () {
    return this.getFormatted();
  }

  // Methods ===================================================================

  spl (...names) {
    return names.map(name => this.splitters[name]);
  }

  getSpaceSymbol () {

  }

  getLines () {
    let lines = [
      this.rows[0].formatted,
      this.rows[0].border,
      ...this.rows.slice(1).map(row => row.formatted)
    ];
    return lines;
  }

  getFormatted () {
    return this.getLines().join('\n');
  }

  setFormatter (formatter) {
    this.formatter = formatter;
    return this;
  }

  getCells (...args) {
    let cells = new Set(),
      size = this.size,
      coords = {};

    _.flatten.array(args).map((val, index) => {
      let name = [`x1`, `y1`, `x2`, `y2`][index],
        limit = {
          x1: size[0],
          y1: size[1],
          x2: size[0],
          y2: size[1],
        }[name],
        value = _.range.limit(val, 0, limit);
      coords[name] = value;
    });

    for (let cIndex = coords.x1; cIndex <= coords.x2; cIndex++) {
      for (let rIndex = coords.y1; rIndex <= coords.y2; rIndex++) {
        cells.add(this.getCell(cIndex, rIndex));
      }
    }

    return Array.from(cells);
  }

  getColsMatrix (formatter = this.formatter) {
    return this.getMatrix('cols', formatter);
  }

  getRowsMatrix (formatter = this.formatter) {
    return this.getMatrix('rows', formatter);
  }

  getMatrix (onTop = 'cols', formatter = this.formatter) {
    let top = { rows: 1, cols: 0 }[onTop],
      mName = top ? 'reverse' : 'slice',
      ranges = [this.colsRange, this.rowsRange][mName]();
    return ranges[0]
      .map(
        one =>
          ranges[1]
            .map(two => [one, two][mName]())
            .map(args => formatter(this.getCell(...args)))
      );
  }

  getColsRange () {
    return _.range(0, this.size[0] - 1);
  }

  getRowsRange () {
    return _.range(0, this.size[1] - 1);
  }

  getCols () {
    return this.colsRange.map(cIndex => this.getCol(cIndex));
  }

  getRows () {
    return this.rowsRange.map(rIndex => this.getRow(rIndex));
  }

  getCell (cIndex = 0, rIndex = 0, cellKey = `${cIndex}-${rIndex}`) {
    if (this.cache.cells[cellKey])
      return this.cache.cells[cellKey];
    let cell = new Cell(this, cIndex, rIndex);
    this.cache.cells[cellKey] = cell;
    return cell;
  }

  getCol (cIndex = 0) {
    if (this.cache.cols[cIndex])
      return this.cache.cols[cIndex];
    let col = new Col(this, cIndex);
    this.cache.cols[cIndex] = col;
    return col;
  }

  getRow (rIndex = 0) {
    if (this.cache.rows[rIndex])
      return this.cache.rows[rIndex];
    let row = new Row(this, rIndex);
    this.cache.rows[rIndex] = row;
    return row;
  }

  getSize () {
    let custom = this.customSize,
      actual = this._getActualSize();
    return [
      Math.max(custom[0], actual[0]),
      Math.max(custom[1], actual[1]),
    ];
  }

  // Implementation ============================================================

  _getActualSize () {
    return [this._getValueColsCount(), this._getValueRowsCount()];
  }

  _getValueRowsCount () {
    return this.valueRows.length;
  }

  _getValueColsCount () {
    return Math.max(...this.valueRows.map(row => row.length));
  }

  _addValueRows (rowsValues = [])  {
    rowsValues.map(val => {
      let values = Array.isArray(val)
        ? val
        : val
          .split(',')
          .map(val => val.trim())
          .filter(val => `${val}`.length);
      return this._addRowValues(values);
    });
    return this;
  }

  _addRowValues (values = []) {
    this.valueRows.push(values);
    return this;
  }

}

function table (...args) {
  let last = args[args.length - 1],
    opts = last && typeof last === 'object'
      && !Array.isArray(last)
      ? Object.assign({}, args.pop())
      : {},
    values = args.shift();
  return new Table(values, opts);
}
