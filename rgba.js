const _ = {
  flatten: require('./flatten'),
};

class RGBA {
  constructor() {
    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvas.height = 1;
    this.ctx = this.canvas.getContext('2d');
  }

  fromString(col) {
    let ctx = this.ctx;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = col;
    let computed = ctx.fillStyle;
    ctx.fillStyle = '#fff';
    ctx.fillStyle = col;
    if (computed !== ctx.fillStyle) {
      return;
    }
    ctx.fillRect(0, 0, 1, 1);
    return [...ctx.getImageData(0, 0, 1, 1).data];
  }

  rgbaToHex(rgb) {
    rgb = rgb.match(
      /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
    );
    return rgb && rgb.length === 4
      ? '#' +
          ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
          ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
          ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
      : '';
  }

  hexToRgba(hex, alpha = 100) {
    let color = this.parse(hex, alpha);
    return this.format(color);
  }

  toRGBA(data, alpha) {
    let color = this.parse(data, alpha);
    return this.format(color);
  }

  fromArray(...args) {
    let [r, g, b, a] = _.flatten.array(args);
    return { r, g, b, a };
  }

  fromObject(obj) {
    let { r, g, b, a } = obj;
    return [r, g, b, a];
  }

  format(color) {
    let [r, g, b, a] = this.parse(color);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  parse(data, alpha) {
    if (!data) return null;
    if (alpha) {
      return this.withAlpha(data, alpha);
    }
    if (typeof data === 'string') {
      return this.fromString(data);
    }
    if (Array.isArray(data)) {
      return data.slice(0);
    }
    if (typeof data === 'object') {
      return this.fromObject(data);
    }
    return data;
  }

  withAlpha(value, alpha = 1) {
    let a = alpha <= 1 && alpha >= 0 ? Math.round(255 * alpha) : alpha,
      color = this.fromString(value);
    color[3] = a;
    return color;
  }
}

const rgba = new RGBA();

function Rgba(...args) {
  return rgba.parse(...args);
}

Object.setPrototypeOf(Rgba, rgba);

module.exports = Rgba;

/**
 * colorOrFallbackColorToRGBA('white', 'transparent'); // [255, 255, 255, 255]
 * colorOrFallbackColorToRGBA('blah', 'transparent'); // [0, 0, 0, 0]
 */
// function colorOrFallbackColorToRGBA(color, fallbackColor) {
//   var fallbackRGBA = colorToRGBA(fallbackColor);
//   if (!fallbackRGBA) {
//     throw new Error(
//       `Invalid fallbackColor ${
//         fallbackColor != null ? JSON.stringify(fallbackColor) : fallbackColor
//       }`
//     );
//   }
//   return colorToRGBA(color) || fallbackRGBA;
// }

// function parse(str) {

// }

// function parseFallback(str, fallback) {
//   let [r, g, b, a] = colorOrFallbackColorToRGBA(str, fallback);
//   return { r, g, b, a };
// }

// function format(color) {}

// function rgba(...args) {
//   return parse(...args);
// }

// module.exports = Object.assign(rgba, {
//   colorToRGBA,
//   colorOrFallbackColorToRGBA,
//   parse,
//   parseFallback,
//   fallback: parseFallback,
// });

// function memoize(factory, ctx) {
//   let cache = {};
//   return (key) => {
//     if (!(key in cache)) {
//       cache[key] = factory.call(ctx, key);
//     }
//     return cache[key];
//   };
// }
