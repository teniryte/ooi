'use strict';

const _ = {};

function matchTree(elem, selector) {
  let parent = elem;
  while (parent && parent.tagName !== 'HTML') {
    if (parent.matches(selector)) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

module.exports = matchTree;
