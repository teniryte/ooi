'use strict';

const matchTree = require('./match-tree');

const _ = {
  each: require('./each'),
  matchTree: require('./match-tree'),
};

function delegate(root = document, events = {}) {
  _.each(events, (data, eventName) => {
    root.addEventListener(
      eventName,
      (ev) => {
        let target = ev;
        _.each(data, (handler, selector) => {
          let elem = matchTree(target, selector);
          if (!elem) {
            return;
          }
          handler(ev, elem);
        });
      },
      false
    );
  });
}

function undelegate(eventName, handler) {}

module.exports = delegate;
