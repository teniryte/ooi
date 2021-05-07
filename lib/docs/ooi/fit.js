'use strict';

const _ = {};

function getBounds(elem) {
  let styles = window.getComputedStyle(elem),
    bounds = [
      +styles.top.slice(0, -2),
      +styles.right.slice(0, -2),
      +styles.bottom.slice(0, -2),
      +styles.left.slice(0, -2),
    ];
  return bounds;
}

function outSide(elem, margin = '10px') {
  let side =
    ['top', 'right', 'bottom', 'left'][
      getBounds(elem)
        .map((val) => val < 0)
        .indexOf(true)
    ] || false;
  return side;
}

function fitIntoView(elem, margin = '10px') {
  let side = outSide(elem, (margin = '10px'));
  if (!side) return false;
  switch (side) {
    case 'top':
      elem.style.bottom = 'auto';
      elem.style.top = margin;
      break;
    case 'right':
      elem.style.left = 'auto';
      elem.style.right = margin;
      break;
    case 'bottom':
      elem.style.top = 'auto';
      elem.style.bottom = margin;
      break;
    case 'left':
      elem.style.right = 'auto';
      elem.style.left = margin;
      break;
    default:
      break;
  }
  return side;
}

module.exports = Object.assign(fitIntoView, {
  fitIntoView,
  outSide,
  getBounds,
});
