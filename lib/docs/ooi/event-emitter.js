/** .all.class
* Events : EventEmitter() => new EventEmitter()
* Class for events handling.
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
*/

const _ = {
  each: require('./each'),
  define: require('./define'),
  extend: require('./extend'),
};

const EventEmitter = extendedEventEmitter();

module.exports = _.extend(EventEmitter, {
  extend: extendedEventEmitter,
});

function extendedEventEmitter (Parent = Object) {

  class EventEmitter extends Parent {

    constructor (...args) { super(...args);
      _.define.box(this, 'handlers');
    }

    on (name, handler, oneTime) {
      var handlers = this.handlers;
      handlers[name] = handlers[name] || [];
      handlers[name].push({
        oneTime: !!oneTime,
        handler: handler
      });
      return this;
    }

    one (name, handler) {
      return this.on(name, handler, true);
    }

    once (...args) {
      return this.one(...args);
    }

    emit (name) {
      var args = Array.prototype.slice.call(arguments, 1),
        handlers = this.handlers;
      _.each(handlers[name], (ev, i) => {
        ev.handler.apply(this, args);
        if (ev.oneTime) {
          handlers[name].splice(i, 1);
        }
      });
      return this;
    }

  }

  return EventEmitter;

}
