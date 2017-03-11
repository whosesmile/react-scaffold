// Polyfill
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

// Polyfill
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

// Polyfill
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// 重载页面
const Reload = (nextState, replace, callback) => {
  // prevent loop infinity
  let reloaded = sessionStorage.getItem(location.pathname);
  if (!reloaded) {
    console.warn('React Router not found, Reload this page:', location.pathname);
    sessionStorage.setItem(location.pathname, true);
    window.location.reload();
  } else {
    console.error('Router not found on server:', location.pathname);
    sessionStorage.removeItem(location.pathname);
  }
};

const uuid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

const easing = (pos) => {
  return Math.sin(pos * (Math.PI / 2));
};

const scrollToY = (endY, duration, callback) => {
  if (typeof duration === 'function') {
    callback = duration;
    duration = 300;
  }
  duration = duration || 300;
  callback = callback || function() {};
  var startT = Date.now();
  var startY = window.scrollY;
  var finishT = startT + duration;

  var interpolate = function(source, target, shift) {
    return (source + (target - source) * shift);
  };

  var animate = function() {
    var now = Date.now();
    var shift = (now > finishT) ? 1 : (now - startT) / duration;
    window.scrollTo(0, interpolate(startY, endY, easing(shift)));
    if (now < finishT) {
      setTimeout(animate, 15);
    } else {
      window.scrollTo(0, endY);
      callback();
    }
  };

  animate();
};

export { Reload, scrollToY, uuid };
